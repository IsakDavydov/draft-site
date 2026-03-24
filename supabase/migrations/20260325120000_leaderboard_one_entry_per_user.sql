-- At most one draft per user/year may have is_leaderboard_entry = true.
-- Fixes duplicate / stale leaderboard rows (e.g. ghost "Draft 1" with 0 pts).
-- Also restricts get_leaderboard_participants to opted-in drafts only.

-- 1) Dedupe: keep one leaderboard row per (user_id, draft_year) — most picks, then newest.
WITH ranked AS (
  SELECT
    dp.id,
    ROW_NUMBER() OVER (
      PARTITION BY dp.user_id, dp.draft_year
      ORDER BY
        (SELECT COUNT(*)::int FROM public.prediction_picks pp WHERE pp.prediction_id = dp.id) DESC,
        dp.created_at DESC NULLS LAST
    ) AS rn
  FROM public.draft_predictions dp
  WHERE dp.is_leaderboard_entry = true
)
UPDATE public.draft_predictions dp
SET is_leaderboard_entry = false
FROM ranked r
WHERE dp.id = r.id AND r.rn > 1;

-- 2) Enforce at most one true per user/year (partial unique index)
DROP INDEX IF EXISTS public.idx_draft_predictions_one_leaderboard_per_user_year;
CREATE UNIQUE INDEX idx_draft_predictions_one_leaderboard_per_user_year
  ON public.draft_predictions (user_id, draft_year)
  WHERE is_leaderboard_entry = true;

-- 3) Trigger: before setting leaderboard true, clear other drafts for same user/year
CREATE OR REPLACE FUNCTION public.draft_predictions_enforce_single_leaderboard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.is_leaderboard_entry IS TRUE THEN
    UPDATE public.draft_predictions
    SET is_leaderboard_entry = false
    WHERE user_id = NEW.user_id
      AND draft_year = NEW.draft_year
      AND id IS DISTINCT FROM NEW.id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_draft_predictions_single_leaderboard ON public.draft_predictions;
CREATE TRIGGER trg_draft_predictions_single_leaderboard
  BEFORE INSERT OR UPDATE OF is_leaderboard_entry ON public.draft_predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.draft_predictions_enforce_single_leaderboard();

-- 4) RPCs: only opted-in drafts in global leaderboard; participants list = leaderboard only
DROP FUNCTION IF EXISTS public.get_leaderboard(integer);
DROP FUNCTION IF EXISTS public.get_group_leaderboard(uuid, integer);
DROP FUNCTION IF EXISTS public.get_leaderboard_participants(integer);

CREATE FUNCTION public.get_leaderboard(p_year integer default 2026)
RETURNS TABLE (
  prediction_id uuid,
  display_name text,
  score bigint,
  rank bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH results_exists AS (
    SELECT 1 FROM draft_results WHERE draft_year = p_year LIMIT 1
  ),
  prediction_results AS (
    SELECT
      pp.prediction_id,
      pp.pick_number AS predicted_pick,
      pp.prospect_id,
      dr.pick_number AS actual_pick
    FROM prediction_picks pp
    JOIN draft_predictions dp ON dp.id = pp.prediction_id
    LEFT JOIN draft_results dr ON dr.draft_year = dp.draft_year AND dr.prospect_id = pp.prospect_id
    WHERE dp.draft_year = p_year
  ),
  pick_scores AS (
    SELECT
      prediction_id,
      CASE
        WHEN actual_pick IS NULL THEN 0
        WHEN actual_pick = predicted_pick THEN 15
        WHEN actual_pick = predicted_pick - 1 OR actual_pick = predicted_pick + 1 THEN 5
        ELSE 0
      END AS points
    FROM prediction_results
  ),
  scores AS (
    SELECT
      dp.id AS prediction_id,
      COALESCE(NULLIF(TRIM(dp.display_name), ''), NULLIF(TRIM(dp.name), '')) AS display_name,
      COALESCE(SUM(ps.points), 0)::bigint AS total_score
    FROM draft_predictions dp
    LEFT JOIN pick_scores ps ON ps.prediction_id = dp.id
    WHERE dp.draft_year = p_year
      AND dp.is_leaderboard_entry = true
    GROUP BY dp.id, dp.display_name, dp.name
  ),
  ranked AS (
    SELECT
      s.prediction_id,
      s.display_name,
      s.total_score AS score,
      ROW_NUMBER() OVER (ORDER BY s.total_score DESC, s.display_name) AS rn
    FROM scores s
  )
  SELECT
    r.prediction_id,
    r.display_name,
    r.score,
    r.rn AS rank
  FROM ranked r
  WHERE EXISTS (SELECT 1 FROM results_exists);
$$;

CREATE FUNCTION public.get_group_leaderboard(p_group_id uuid, p_year integer default 2026)
RETURNS TABLE (
  prediction_id uuid,
  display_name text,
  score bigint,
  rank bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  WITH group_users AS (
    SELECT user_id FROM public.group_members WHERE group_id = p_group_id
  ),
  results_exists AS (
    SELECT 1 FROM draft_results WHERE draft_year = p_year LIMIT 1
  ),
  prediction_results AS (
    SELECT
      pp.prediction_id,
      pp.pick_number AS predicted_pick,
      pp.prospect_id,
      dr.pick_number AS actual_pick
    FROM prediction_picks pp
    JOIN draft_predictions dp ON dp.id = pp.prediction_id
    JOIN group_users gu ON gu.user_id = dp.user_id
    LEFT JOIN draft_results dr ON dr.draft_year = dp.draft_year AND dr.prospect_id = pp.prospect_id
    WHERE dp.draft_year = p_year
  ),
  pick_scores AS (
    SELECT
      prediction_id,
      CASE
        WHEN actual_pick IS NULL THEN 0
        WHEN actual_pick = predicted_pick THEN 15
        WHEN actual_pick = predicted_pick - 1 OR actual_pick = predicted_pick + 1 THEN 5
        ELSE 0
      END AS points
    FROM prediction_results
  ),
  scores AS (
    SELECT
      dp.id AS prediction_id,
      COALESCE(NULLIF(TRIM(dp.display_name), ''), NULLIF(TRIM(dp.name), '')) AS display_name,
      COALESCE(SUM(ps.points), 0)::bigint AS total_score
    FROM draft_predictions dp
    JOIN group_users gu ON gu.user_id = dp.user_id
    LEFT JOIN pick_scores ps ON ps.prediction_id = dp.id
    WHERE dp.draft_year = p_year
      AND dp.is_leaderboard_entry = true
    GROUP BY dp.id, dp.display_name, dp.name
  ),
  ranked AS (
    SELECT
      s.prediction_id,
      s.display_name,
      s.total_score AS score,
      ROW_NUMBER() OVER (ORDER BY s.total_score DESC, s.display_name) AS rn
    FROM scores s
  )
  SELECT
    r.prediction_id,
    r.display_name,
    r.score,
    r.rn AS rank
  FROM ranked r
  WHERE EXISTS (SELECT 1 FROM results_exists);
$$;

CREATE FUNCTION public.get_leaderboard_participants(p_year integer default 2026)
RETURNS TABLE (
  prediction_id uuid,
  display_name text,
  rank bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    dp.id AS prediction_id,
    COALESCE(NULLIF(TRIM(dp.display_name), ''), NULLIF(TRIM(dp.name), '')) AS display_name,
    ROW_NUMBER() OVER (
      ORDER BY COALESCE(NULLIF(TRIM(dp.display_name), ''), NULLIF(TRIM(dp.name), ''))
    )::bigint AS rank
  FROM draft_predictions dp
  WHERE dp.draft_year = p_year
    AND dp.is_leaderboard_entry = true
    AND EXISTS (
      SELECT 1 FROM prediction_picks pp
      WHERE pp.prediction_id = dp.id
      LIMIT 1
    );
$$;

GRANT EXECUTE ON FUNCTION public.get_leaderboard(integer) TO anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_leaderboard_participants(integer) TO anon;
GRANT EXECUTE ON FUNCTION public.get_leaderboard_participants(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_group_leaderboard(uuid, integer) TO authenticated;
