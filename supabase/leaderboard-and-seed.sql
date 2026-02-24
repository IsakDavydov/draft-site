-- Run this AFTER schema.sql
-- 1. Adds get_leaderboard function for scoring
-- 2. NO seed: draft_results stays empty until the real draft. Leaderboard shows
--    "available after the 2026 NFL Draft" until you insert real results.
-- For testing: run supabase/seed-draft-results-test.sql to add mock data.

-- Leaderboard function: returns display_name, score, rank for a given draft year
-- Scoring: 15 pts = correct player at correct pick, 5 pts = player went 1 pick before/after
create or replace function public.get_leaderboard(p_year integer default 2026)
returns table (
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
      dp.display_name,
      coalesce(sum(ps.points), 0)::bigint as total_score
    from draft_predictions dp
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

-- Allow anyone to call the leaderboard function
grant execute on function public.get_leaderboard(integer) to anon;
grant execute on function public.get_leaderboard(integer) to authenticated;

-- Participants list: returns everyone who submitted predictions (for display before draft results)
-- Used when draft_results is empty so users can see who's competing
create or replace function public.get_leaderboard_participants(p_year integer default 2026)
returns table (
  display_name text,
  rank bigint
)
language sql
security definer
set search_path = public
as $$
  select
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

grant execute on function public.get_leaderboard_participants(integer) to anon;
grant execute on function public.get_leaderboard_participants(integer) to authenticated;
