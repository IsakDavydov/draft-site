-- Add prediction_id to leaderboard RPCs so the app can link to "view top 10 picks" pages.
-- Postgres cannot change a function's return row type with CREATE OR REPLACE; drop first.

drop function if exists public.get_leaderboard(integer);
drop function if exists public.get_group_leaderboard(uuid, integer);
drop function if exists public.get_leaderboard_participants(integer);

create function public.get_leaderboard(p_year integer default 2026)
returns table (
  prediction_id uuid,
  display_name text,
  score bigint,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  with results_exists as (
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
      dp.id as prediction_id,
      dp.display_name,
      coalesce(sum(ps.points), 0)::bigint as total_score
    from draft_predictions dp
    left join pick_scores ps on ps.prediction_id = dp.id
    where dp.draft_year = p_year
    group by dp.id, dp.display_name
  ),
  ranked as (
    select
      s.prediction_id,
      s.display_name,
      s.total_score as score,
      row_number() over (order by s.total_score desc, s.display_name) as rn
    from scores s
  )
  select
    r.prediction_id,
    r.display_name,
    r.score,
    r.rn as rank
  from ranked r
  where exists (select 1 from results_exists);
$$;

create function public.get_group_leaderboard(p_group_id uuid, p_year integer default 2026)
returns table (
  prediction_id uuid,
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
      dp.id as prediction_id,
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
      s.prediction_id,
      s.display_name,
      s.total_score as score,
      row_number() over (order by s.total_score desc, s.display_name) as rn
    from scores s
  )
  select
    r.prediction_id,
    r.display_name,
    r.score,
    r.rn as rank
  from ranked r
  where exists (select 1 from results_exists);
$$;

create function public.get_leaderboard_participants(p_year integer default 2026)
returns table (
  prediction_id uuid,
  display_name text,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  select
    dp.id as prediction_id,
    dp.display_name,
    row_number() over (order by dp.display_name)::bigint as rank
  from draft_predictions dp
  where dp.draft_year = p_year
  and exists (
    select 1 from prediction_picks pp
    where pp.prediction_id = dp.id
    limit 1
  );
$$;

grant execute on function public.get_leaderboard(integer) to anon;
grant execute on function public.get_leaderboard(integer) to authenticated;
grant execute on function public.get_leaderboard_participants(integer) to anon;
grant execute on function public.get_leaderboard_participants(integer) to authenticated;
grant execute on function public.get_group_leaderboard(uuid, integer) to authenticated;
