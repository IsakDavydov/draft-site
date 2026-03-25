-- Live scoring, consensus picks, and score detail functions for draft night.

-- 1. Enable realtime on draft_results so the live page can subscribe
alter publication supabase_realtime add table draft_results;

-- 2. Consensus picks: most popular prospect at each pick slot (top 3 per slot)
create or replace function public.get_consensus_picks(p_year integer default 2026)
returns table (
  pick_number  integer,
  prospect_id  text,
  prospect_name text,
  pick_count   bigint,
  total_entries bigint,
  pick_rank    integer
)
language sql
security definer
set search_path = public
as $$
  with entries as (
    select count(*)::bigint as total
    from draft_predictions
    where draft_year = p_year and is_leaderboard_entry = true
  ),
  ranked as (
    select
      pp.pick_number,
      pp.prospect_id,
      pp.prospect_name,
      count(*)::bigint as pick_count,
      row_number() over (
        partition by pp.pick_number
        order by count(*) desc, pp.prospect_name
      )::integer as pick_rank
    from prediction_picks pp
    join draft_predictions dp on dp.id = pp.prediction_id
    where dp.is_leaderboard_entry = true and dp.draft_year = p_year
    group by pp.pick_number, pp.prospect_id, pp.prospect_name
  )
  select r.pick_number, r.prospect_id, r.prospect_name, r.pick_count, e.total, r.pick_rank
  from ranked r, entries e
  where r.pick_rank <= 3
  order by r.pick_number, r.pick_rank;
$$;

grant execute on function public.get_consensus_picks(integer) to anon;
grant execute on function public.get_consensus_picks(integer) to authenticated;

-- 3. Per-pick scorers: who scored when a specific pick was announced?
--    Returns all users whose predicted prospect matched the actual pick ±1.
create or replace function public.get_pick_scorers(p_pick_number integer, p_year integer default 2026)
returns table (
  prediction_id uuid,
  display_name  text,
  points        integer,
  predicted_pick integer
)
language sql
security definer
set search_path = public
as $$
  select
    dp.id as prediction_id,
    coalesce(nullif(trim(dp.display_name), ''), nullif(trim(dp.name), ''), 'Player') as display_name,
    case
      when pp.pick_number = dr.pick_number then 15
      else 5
    end as points,
    pp.pick_number as predicted_pick
  from draft_results dr
  join prediction_picks pp
    on pp.prospect_id = dr.prospect_id
    and abs(pp.pick_number - dr.pick_number) <= 1
  join draft_predictions dp on dp.id = pp.prediction_id
  where dr.pick_number = p_pick_number
    and dr.draft_year = p_year
    and dp.is_leaderboard_entry = true
    and dp.draft_year = p_year
  order by points desc, display_name;
$$;

grant execute on function public.get_pick_scorers(integer, integer) to anon;
grant execute on function public.get_pick_scorers(integer, integer) to authenticated;

-- 4. Full score details for email notifications (service-role only via app layer)
--    Returns each leaderboard entry with score, rank, correct picks, near picks.
create or replace function public.get_all_score_details(p_year integer default 2026)
returns table (
  user_id       uuid,
  prediction_id uuid,
  display_name  text,
  score         bigint,
  rank          bigint,
  correct_picks bigint,
  near_picks    bigint
)
language sql
security definer
set search_path = public
as $$
  with pick_eval as (
    select
      dp.user_id,
      dp.id as prediction_id,
      coalesce(nullif(trim(dp.display_name), ''), nullif(trim(dp.name), ''), 'Player') as display_name,
      case
        when dr.pick_number is null then 0
        when pp.pick_number = dr.pick_number then 15
        when abs(pp.pick_number - dr.pick_number) = 1 then 5
        else 0
      end as points,
      case when pp.pick_number = dr.pick_number then 1 else 0 end as exact_hit,
      case when dr.pick_number is not null and abs(pp.pick_number - dr.pick_number) = 1 then 1 else 0 end as near_hit
    from draft_predictions dp
    join prediction_picks pp on pp.prediction_id = dp.id
    left join draft_results dr
      on dr.prospect_id = pp.prospect_id and dr.draft_year = dp.draft_year
    where dp.is_leaderboard_entry = true and dp.draft_year = p_year
  ),
  scores as (
    select
      user_id,
      prediction_id,
      display_name,
      sum(points)::bigint as score,
      sum(exact_hit)::bigint as correct_picks,
      sum(near_hit)::bigint as near_picks
    from pick_eval
    group by user_id, prediction_id, display_name
  )
  select
    user_id,
    prediction_id,
    display_name,
    score,
    rank() over (order by score desc) as rank,
    correct_picks,
    near_picks
  from scores
  order by score desc;
$$;

-- get_all_score_details is intentionally NOT granted to anon/authenticated —
-- it returns user_ids which should only be accessed server-side via service role.
grant execute on function public.get_all_score_details(integer) to service_role;
