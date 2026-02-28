-- Run this AFTER schema.sql and leaderboard-and-seed.sql
-- Allows the pre-draft leaderboard API to read draft_predictions and prediction_picks
-- so the homepage can display top scorers (anonymous users need to see everyone's scores).

-- Anyone can read 2026 draft predictions (for leaderboard display)
create policy "Anyone can read 2026 predictions for leaderboard"
  on public.draft_predictions for select
  using (draft_year = 2026);

-- Anyone can read picks for 2026 predictions (needed to calculate pre-draft scores)
create policy "Anyone can read 2026 picks for leaderboard"
  on public.prediction_picks for select
  using (
    exists (
      select 1 from public.draft_predictions dp
      where dp.id = prediction_id and dp.draft_year = 2026
    )
  );
