-- Multiple mock drafts per user (max 5), one submitted to leaderboard
-- Run this in Supabase SQL Editor after schema.sql and leaderboard-and-seed.sql

-- 1. Drop the one-prediction-per-user-per-year constraint
alter table public.draft_predictions drop constraint if exists draft_predictions_user_id_draft_year_key;

-- 2. Drop the display_name unique constraint (we'll add a partial one for leaderboard entries)
alter table public.draft_predictions drop constraint if exists draft_predictions_display_name_draft_year_key;

-- 3. Add new columns
alter table public.draft_predictions
  add column if not exists name text,
  add column if not exists is_leaderboard_entry boolean not null default false;

-- 4. Migrate existing rows: mark as leaderboard entry
update public.draft_predictions
set is_leaderboard_entry = true
where is_leaderboard_entry = false
  and (user_id, draft_year) in (
    select user_id, draft_year
    from public.draft_predictions
    group by user_id, draft_year
    having count(*) = 1
  );

-- For users with exactly one prediction, set it as leaderboard entry
update public.draft_predictions dp
set is_leaderboard_entry = true
where not exists (
  select 1 from public.draft_predictions other
  where other.user_id = dp.user_id and other.draft_year = dp.draft_year and other.id != dp.id
);

-- 5. Make display_name nullable for non-leaderboard drafts
alter table public.draft_predictions alter column display_name drop not null;

-- 6. Leaderboard display names must be unique per year (only for is_leaderboard_entry = true)
create unique index if not exists draft_predictions_leaderboard_display_name_key
  on public.draft_predictions (display_name, draft_year)
  where is_leaderboard_entry = true and display_name is not null and display_name != '';

-- 7. Enforce max 5 drafts per user per year via trigger
create or replace function public.check_draft_count()
returns trigger
language plpgsql
as $$
begin
  if (select count(*) from public.draft_predictions where user_id = new.user_id and draft_year = new.draft_year) >= 5 then
    raise exception 'Maximum 5 drafts per year allowed';
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_max_drafts on public.draft_predictions;
create trigger enforce_max_drafts
  before insert on public.draft_predictions
  for each row execute procedure public.check_draft_count();

-- 8. Update leaderboard/participants to only include is_leaderboard_entry = true
create or replace function public.get_leaderboard(p_year integer default 2026)
returns table (display_name text, score bigint, rank bigint)
language sql security definer set search_path = public as $$
  with results_exists as (
    select 1 from draft_results where draft_year = p_year limit 1
  ),
  prediction_results as (
    select pp.prediction_id, pp.pick_number as predicted_pick, pp.prospect_id, dr.pick_number as actual_pick
    from prediction_picks pp
    join draft_predictions dp on dp.id = pp.prediction_id and dp.is_leaderboard_entry = true
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
    where dp.draft_year = p_year and dp.is_leaderboard_entry = true
    group by dp.id, dp.display_name
  ),
  ranked as (
    select display_name, total_score as score, row_number() over (order by total_score desc, display_name) as rn
    from scores
  )
  select r.display_name, r.score, r.rn as rank from ranked r
  where exists (select 1 from results_exists);
$$;

create or replace function public.get_leaderboard_participants(p_year integer default 2026)
returns table (display_name text, rank bigint)
language sql security definer set search_path = public as $$
  select dp.display_name, row_number() over (order by dp.display_name)::bigint as rank
  from draft_predictions dp
  where dp.draft_year = p_year and dp.is_leaderboard_entry = true
  and exists (select 1 from prediction_picks pp where pp.prediction_id = dp.id limit 1);
$$;

-- 9. Update group leaderboard and members to use leaderboard-entry-only predictions
create or replace function public.get_group_leaderboard(p_group_id uuid, p_year integer default 2026)
returns table (display_name text, score bigint, rank bigint)
language sql security definer set search_path = public as $$
  with group_users as (select user_id from public.group_members where group_id = p_group_id),
  results_exists as (select 1 from draft_results where draft_year = p_year limit 1),
  prediction_results as (
    select pp.prediction_id, pp.pick_number as predicted_pick, pp.prospect_id, dr.pick_number as actual_pick
    from prediction_picks pp
    join draft_predictions dp on dp.id = pp.prediction_id and dp.is_leaderboard_entry = true
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
    from draft_predictions dp
    join group_users gu on gu.user_id = dp.user_id
    left join pick_scores ps on ps.prediction_id = dp.id
    where dp.draft_year = p_year and dp.is_leaderboard_entry = true
    group by dp.id, dp.display_name
  ),
  ranked as (
    select display_name, total_score as score, row_number() over (order by total_score desc, display_name) as rn
    from scores
  )
  select r.display_name, r.score, r.rn as rank from ranked r
  where exists (select 1 from results_exists);
$$;

-- 10. RLS: anyone can read leaderboard submissions (for public leaderboard display)
create policy "Anyone can read leaderboard predictions"
  on public.draft_predictions for select
  using (is_leaderboard_entry = true);

create policy "Anyone can read leaderboard picks"
  on public.prediction_picks for select
  using (
    exists (
      select 1 from public.draft_predictions dp
      where dp.id = prediction_id and dp.is_leaderboard_entry = true
    )
  );

-- 11. Update group leaderboard and members
create or replace function public.get_group_members(p_group_id uuid)
returns table (display_name text, role text, rank bigint)
language sql security definer set search_path = public as $$
  with member_info as (
    select gm.role,
      coalesce(dp.display_name, p.display_name, 'Player') as display_name
    from public.group_members gm
    left join public.profiles p on p.id = gm.user_id
    left join public.draft_predictions dp on dp.user_id = gm.user_id and dp.draft_year = 2026 and dp.is_leaderboard_entry = true
    where gm.group_id = p_group_id
  )
  select display_name, role, row_number() over (order by display_name)::bigint as rank
  from member_info;
$$;
