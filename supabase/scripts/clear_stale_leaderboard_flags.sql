-- One-off cleanup: clear leaderboard flag on drafts that have no saved picks (ghost entries).
-- Run in Supabase SQL Editor after replacing YOUR_USER_ID with your auth.users id (UUID).

-- Preview: drafts flagged for leaderboard but with zero picks
SELECT
  dp.id,
  dp.name,
  dp.display_name,
  dp.is_leaderboard_entry,
  (SELECT COUNT(*)::int FROM public.prediction_picks pp WHERE pp.prediction_id = dp.id) AS pick_count
FROM public.draft_predictions dp
WHERE dp.draft_year = 2026
  AND dp.is_leaderboard_entry = true
  AND NOT EXISTS (
    SELECT 1 FROM public.prediction_picks pp WHERE pp.prediction_id = dp.id
  );

-- Clear the stale flag (all users — safe; only affects rows with zero picks)
UPDATE public.draft_predictions dp
SET is_leaderboard_entry = false
WHERE dp.draft_year = 2026
  AND dp.is_leaderboard_entry = true
  AND NOT EXISTS (
    SELECT 1 FROM public.prediction_picks pp WHERE pp.prediction_id = dp.id
  );

-- Optional: only your account (uncomment and set user id)
-- UPDATE public.draft_predictions dp
-- SET is_leaderboard_entry = false
-- WHERE dp.user_id = 'YOUR_USER_ID'::uuid
--   AND dp.draft_year = 2026
--   AND dp.name = 'Draft 1'
--   AND dp.is_leaderboard_entry = true;
