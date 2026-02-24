-- Groups feature: create/join groups to compete with friends
-- Run this in Supabase SQL Editor after schema.sql and leaderboard-and-seed.sql

-- Groups table
create table if not exists public.groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  invite_code text not null unique,
  created_by uuid references auth.users on delete cascade not null,
  created_at timestamptz default now() not null
);

-- Group members (users in a group)
create table if not exists public.group_members (
  group_id uuid references public.groups on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz default now() not null,
  primary key (group_id, user_id)
);

-- Index for looking up groups by invite code
create index if not exists idx_groups_invite_code on public.groups(invite_code);

-- Enable RLS
alter table public.groups enable row level security;
alter table public.group_members enable row level security;

-- Helper: check group membership without RLS recursion (security definer bypasses RLS)
create or replace function public.user_is_group_member(p_group_id uuid, p_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.group_members where group_id = p_group_id and user_id = p_user_id);
$$;

create or replace function public.user_is_group_owner(p_group_id uuid, p_user_id uuid default auth.uid())
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.group_members where group_id = p_group_id and user_id = p_user_id and role = 'owner');
$$;

-- Groups: members can read; creators can update/delete their groups
drop policy if exists "Group members can view group" on public.groups;
drop policy if exists "Authenticated users can create groups" on public.groups;
drop policy if exists "Group owners can update their group" on public.groups;
drop policy if exists "Group owners can delete their group" on public.groups;
create policy "Group members can view group"
  on public.groups for select
  using (public.user_is_group_member(groups.id));

create policy "Authenticated users can create groups"
  on public.groups for insert
  with check (auth.uid() = created_by);

-- RPC to create group (bypasses RLS - use when direct insert fails)
create or replace function public.create_group(p_name text, p_invite_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group_id uuid;
begin
  if auth.uid() is null then
    return null;
  end if;
  insert into public.groups (name, invite_code, created_by)
  values (trim(p_name), p_invite_code, auth.uid())
  returning id into v_group_id;
  return v_group_id;
end;
$$;

grant execute on function public.create_group(text, text) to authenticated;

create policy "Group owners can update their group"
  on public.groups for update
  using (public.user_is_group_owner(groups.id));

create policy "Group owners can delete their group"
  on public.groups for delete
  using (created_by = auth.uid());

-- Trigger: add creator as owner when group is created
create or replace function public.handle_new_group()
returns trigger as $$
begin
  insert into public.group_members (group_id, user_id, role)
  values (new.id, new.created_by, 'owner');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_group_created on public.groups;
create trigger on_group_created
  after insert on public.groups
  for each row execute procedure public.handle_new_group();

-- Group members: members can view; owners can add; users add themselves via join_group_by_code
drop policy if exists "Group members can view members" on public.group_members;
drop policy if exists "Group owners can add members" on public.group_members;
drop policy if exists "Group owners can remove members" on public.group_members;
create policy "Group members can view members"
  on public.group_members for select
  using (public.user_is_group_member(group_members.group_id));

create policy "Group owners can add members"
  on public.group_members for insert
  with check (public.user_is_group_owner(group_members.group_id));

-- Allow users to insert themselves when joining via valid invite code
-- We use a security definer function for this since RLS would block self-insert
create or replace function public.join_group_by_code(p_invite_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_group_id uuid;
  v_creator_id uuid;
begin
  select id, created_by into v_group_id, v_creator_id
  from public.groups
  where upper(trim(invite_code)) = upper(trim(p_invite_code))
  limit 1;

  if v_group_id is null then
    return null;
  end if;

  -- Add user as member if not already
  insert into public.group_members (group_id, user_id, role)
  values (v_group_id, auth.uid(), case when auth.uid() = v_creator_id then 'owner' else 'member' end)
  on conflict (group_id, user_id) do nothing;

  return v_group_id;
end;
$$;

grant execute on function public.join_group_by_code(text) to authenticated;

create policy "Group owners can remove members"
  on public.group_members for delete
  using (public.user_is_group_owner(group_members.group_id));

-- Group leaderboard: same scoring as main leaderboard (15 pts exact, 5 pts ±1 pick)
create or replace function public.get_group_leaderboard(p_group_id uuid, p_year integer default 2026)
returns table (
  display_name text,
  score bigint,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  with group_users as (
    select user_id from public.group_members where group_id = p_group_id
  ),
  results_exists as (
    select 1 from draft_results where draft_year = p_year limit 1
  ),
  prediction_results as (
    select
      pp.prediction_id,
      pp.pick_number as predicted_pick,
      pp.prospect_id,
      dr.pick_number as actual_pick
    from prediction_picks pp
    join draft_predictions dp on dp.id = pp.prediction_id
    join group_users gu on gu.user_id = dp.user_id
    left join draft_results dr on dr.draft_year = dp.draft_year and dr.prospect_id = pp.prospect_id
    where dp.draft_year = p_year
  ),
  pick_scores as (
    select
      prediction_id,
      case
        when actual_pick is null then 0
        when actual_pick = predicted_pick then 15
        when actual_pick = predicted_pick - 1 or actual_pick = predicted_pick + 1 then 5
        else 0
      end as points
    from prediction_results
  ),
  scores as (
    select
      dp.display_name,
      coalesce(sum(ps.points), 0)::bigint as total_score
    from draft_predictions dp
    join group_users gu on gu.user_id = dp.user_id
    left join pick_scores ps on ps.prediction_id = dp.id
    where dp.draft_year = p_year
    group by dp.id, dp.display_name
  ),
  ranked as (
    select
      display_name,
      total_score as score,
      row_number() over (order by total_score desc, display_name) as rn
    from scores
  )
  select
    r.display_name,
    r.score,
    r.rn as rank
  from ranked r
  where exists (select 1 from results_exists);
$$;

grant execute on function public.get_group_leaderboard(uuid, integer) to authenticated;
