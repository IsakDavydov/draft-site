-- =============================================================================
-- SAKFootball Supabase Full Setup
-- Run this entire file in Supabase SQL Editor (one query at a time or all at once)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. SCHEMA (tables, RLS, triggers)
-- -----------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists public.draft_predictions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  draft_year integer not null default 2026,
  display_name text not null,
  created_at timestamptz default now() not null,
  locked_at timestamptz,
  unique(user_id, draft_year)
);

alter table public.draft_predictions drop constraint if exists draft_predictions_display_name_draft_year_key;
alter table public.draft_predictions add constraint draft_predictions_display_name_draft_year_key unique (display_name, draft_year);

create table if not exists public.prediction_picks (
  id uuid default gen_random_uuid() primary key,
  prediction_id uuid references public.draft_predictions on delete cascade not null,
  pick_number integer not null check (pick_number >= 1 and pick_number <= 32),
  prospect_id text not null,
  prospect_name text not null,
  team text not null,
  unique(prediction_id, pick_number)
);

create table if not exists public.draft_results (
  id uuid default gen_random_uuid() primary key,
  draft_year integer not null,
  pick_number integer not null,
  prospect_id text not null,
  prospect_name text not null,
  team text not null,
  unique(draft_year, pick_number)
);

alter table public.profiles enable row level security;
alter table public.draft_predictions enable row level security;
alter table public.prediction_picks enable row level security;
alter table public.draft_results enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can view own predictions" on public.draft_predictions;
drop policy if exists "Users can insert own predictions" on public.draft_predictions;
drop policy if exists "Users can update own predictions" on public.draft_predictions;
drop policy if exists "Users can delete own predictions" on public.draft_predictions;
create policy "Users can view own predictions" on public.draft_predictions for select using (auth.uid() = user_id);
create policy "Users can insert own predictions" on public.draft_predictions for insert with check (auth.uid() = user_id);
create policy "Users can update own predictions" on public.draft_predictions for update using (auth.uid() = user_id);
create policy "Users can delete own predictions" on public.draft_predictions for delete using (auth.uid() = user_id);

drop policy if exists "Users can view own picks" on public.prediction_picks;
drop policy if exists "Users can insert picks for own prediction" on public.prediction_picks;
drop policy if exists "Users can update picks for own prediction" on public.prediction_picks;
drop policy if exists "Users can delete picks for own prediction" on public.prediction_picks;
create policy "Users can view own picks" on public.prediction_picks for select using (
  exists (select 1 from public.draft_predictions where draft_predictions.id = prediction_id and draft_predictions.user_id = auth.uid())
);
create policy "Users can insert picks for own prediction" on public.prediction_picks for insert with check (
  exists (select 1 from public.draft_predictions where draft_predictions.id = prediction_id and draft_predictions.user_id = auth.uid())
);
create policy "Users can update picks for own prediction" on public.prediction_picks for update using (
  exists (select 1 from public.draft_predictions where draft_predictions.id = prediction_id and draft_predictions.user_id = auth.uid())
);
create policy "Users can delete picks for own prediction" on public.prediction_picks for delete using (
  exists (select 1 from public.draft_predictions where draft_predictions.id = prediction_id and draft_predictions.user_id = auth.uid())
);

drop policy if exists "Anyone can read draft results" on public.draft_results;
create policy "Anyone can read draft results" on public.draft_results for select using (true);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();


-- -----------------------------------------------------------------------------
-- 2. LEADERBOARD + SEED
-- -----------------------------------------------------------------------------

create or replace function public.get_leaderboard(p_year integer default 2026)
returns table (display_name text, score bigint, rank bigint)
language sql security definer set search_path = public as $$
  with results_exists as (select 1 from draft_results where draft_year = p_year limit 1),
  prediction_results as (
    select pp.prediction_id, pp.pick_number as predicted_pick, pp.prospect_id, dr.pick_number as actual_pick
    from prediction_picks pp
    join draft_predictions dp on dp.id = pp.prediction_id
    left join draft_results dr on dr.draft_year = dp.draft_year and dr.prospect_id = pp.prospect_id
    where dp.draft_year = p_year
  ),
  pick_scores as (
    select prediction_id,
      case when actual_pick is null then 0
           when actual_pick = predicted_pick then 15
           when actual_pick = predicted_pick - 1 or actual_pick = predicted_pick + 1 then 5
           else 0 end as points
    from prediction_results
  ),
  scores as (
    select dp.display_name, coalesce(sum(ps.points), 0)::bigint as total_score
    from draft_predictions dp
    left join pick_scores ps on ps.prediction_id = dp.id
    where dp.draft_year = p_year
    group by dp.id, dp.display_name
  ),
  ranked as (
    select display_name, total_score as score, row_number() over (order by total_score desc, display_name) as rn
    from scores
  )
  select r.display_name, r.score, r.rn as rank from ranked r where exists (select 1 from results_exists);
$$;

grant execute on function public.get_leaderboard(integer) to anon;
grant execute on function public.get_leaderboard(integer) to authenticated;

create or replace function public.get_leaderboard_participants(p_year integer default 2026)
returns table (display_name text, rank bigint)
language sql security definer set search_path = public as $$
  select dp.display_name, row_number() over (order by dp.display_name)::bigint as rank
  from draft_predictions dp
  where dp.draft_year = p_year
  and exists (select 1 from prediction_picks pp where pp.prediction_id = dp.id limit 1);
$$;
grant execute on function public.get_leaderboard_participants(integer) to anon;
grant execute on function public.get_leaderboard_participants(integer) to authenticated;
-- draft_results stays empty until the real draft. Run supabase/seed-draft-results-test.sql for testing.


-- -----------------------------------------------------------------------------
-- 3. GROUPS
-- -----------------------------------------------------------------------------

create table if not exists public.groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  invite_code text not null unique,
  created_by uuid references auth.users on delete cascade not null,
  created_at timestamptz default now() not null
);

create table if not exists public.group_members (
  group_id uuid references public.groups on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz default now() not null,
  primary key (group_id, user_id)
);

create index if not exists idx_groups_invite_code on public.groups(invite_code);

alter table public.groups enable row level security;
alter table public.group_members enable row level security;

create or replace function public.user_is_group_member(p_group_id uuid, p_user_id uuid default auth.uid())
returns boolean language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.group_members where group_id = p_group_id and user_id = p_user_id);
$$;

create or replace function public.user_is_group_owner(p_group_id uuid, p_user_id uuid default auth.uid())
returns boolean language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.group_members where group_id = p_group_id and user_id = p_user_id and role = 'owner');
$$;

drop policy if exists "Group members can view group" on public.groups;
drop policy if exists "Authenticated users can create groups" on public.groups;
drop policy if exists "Group owners can update their group" on public.groups;
drop policy if exists "Group owners can delete their group" on public.groups;
create policy "Group members can view group" on public.groups for select using (public.user_is_group_member(groups.id));
create policy "Authenticated users can create groups" on public.groups for insert with check (auth.uid() = created_by);

create or replace function public.create_group(p_name text, p_invite_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_group_id uuid;
begin
  if auth.uid() is null then return null; end if;
  insert into public.groups (name, invite_code, created_by) values (trim(p_name), p_invite_code, auth.uid()) returning id into v_group_id;
  return v_group_id;
end;
$$;
grant execute on function public.create_group(text, text) to authenticated;

create policy "Group owners can update their group" on public.groups for update using (public.user_is_group_owner(groups.id));
create policy "Group owners can delete their group" on public.groups for delete using (created_by = auth.uid());

create or replace function public.handle_new_group()
returns trigger as $$
begin
  insert into public.group_members (group_id, user_id, role) values (new.id, new.created_by, 'owner');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_group_created on public.groups;
create trigger on_group_created after insert on public.groups for each row execute procedure public.handle_new_group();

drop policy if exists "Group members can view members" on public.group_members;
drop policy if exists "Group owners can add members" on public.group_members;
drop policy if exists "Group owners can remove members" on public.group_members;
create policy "Group members can view members" on public.group_members for select using (public.user_is_group_member(group_members.group_id));
create policy "Group owners can add members" on public.group_members for insert with check (public.user_is_group_owner(group_members.group_id));

create or replace function public.join_group_by_code(p_invite_code text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_group_id uuid; v_creator_id uuid;
begin
  select id, created_by into v_group_id, v_creator_id from public.groups where upper(trim(invite_code)) = upper(trim(p_invite_code)) limit 1;
  if v_group_id is null then return null; end if;
  insert into public.group_members (group_id, user_id, role)
  values (v_group_id, auth.uid(), case when auth.uid() = v_creator_id then 'owner' else 'member' end)
  on conflict (group_id, user_id) do nothing;
  return v_group_id;
end;
$$;

grant execute on function public.join_group_by_code(text) to authenticated;

create policy "Group owners can remove members" on public.group_members for delete using (public.user_is_group_owner(group_members.group_id));

create or replace function public.get_group_leaderboard(p_group_id uuid, p_year integer default 2026)
returns table (display_name text, score bigint, rank bigint)
language sql security definer set search_path = public as $$
  with group_users as (select user_id from public.group_members where group_id = p_group_id),
  results_exists as (select 1 from draft_results where draft_year = p_year limit 1),
  prediction_results as (
    select pp.prediction_id, pp.pick_number as predicted_pick, pp.prospect_id, dr.pick_number as actual_pick
    from prediction_picks pp join draft_predictions dp on dp.id = pp.prediction_id
    join group_users gu on gu.user_id = dp.user_id
    left join draft_results dr on dr.draft_year = dp.draft_year and dr.prospect_id = pp.prospect_id
    where dp.draft_year = p_year
  ),
  pick_scores as (
    select prediction_id,
      case when actual_pick is null then 0
           when actual_pick = predicted_pick then 15
           when actual_pick = predicted_pick - 1 or actual_pick = predicted_pick + 1 then 5
           else 0 end as points
    from prediction_results
  ),
  scores as (
    select dp.display_name, coalesce(sum(ps.points), 0)::bigint as total_score
    from draft_predictions dp join group_users gu on gu.user_id = dp.user_id
    left join pick_scores ps on ps.prediction_id = dp.id
    where dp.draft_year = p_year
    group by dp.id, dp.display_name
  ),
  ranked as (
    select display_name, total_score as score, row_number() over (order by total_score desc, display_name) as rn
    from scores
  )
  select r.display_name, r.score, r.rn as rank from ranked r where exists (select 1 from results_exists);
$$;

grant execute on function public.get_group_leaderboard(uuid, integer) to authenticated;

create or replace function public.get_group_members(p_group_id uuid)
returns table (display_name text, role text, rank bigint)
language sql security definer set search_path = public as $$
  with member_info as (
    select gm.role, coalesce(dp.display_name, p.display_name, 'Player') as display_name
    from public.group_members gm
    left join public.profiles p on p.id = gm.user_id
    left join public.draft_predictions dp on dp.user_id = gm.user_id and dp.draft_year = 2026
    where gm.group_id = p_group_id
  )
  select display_name, role, row_number() over (order by display_name)::bigint as rank from member_info;
$$;
grant execute on function public.get_group_members(uuid) to authenticated;
