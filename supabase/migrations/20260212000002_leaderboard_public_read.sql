-- Allow anyone (including anon and other users) to read 2026 leaderboard entries.
-- Without this, RLS only allows "Users can view own predictions", so when you load
-- the leaderboard you only see your own row and other users' submissions are hidden.
-- Run this migration, then leaderboard will show everyone with is_leaderboard_entry = true.

drop policy if exists "Anyone can read 2026 predictions for leaderboard" on public.draft_predictions;
create policy "Anyone can read 2026 predictions for leaderboard"
  on public.draft_predictions for select
  using (draft_year = 2026);

drop policy if exists "Anyone can read 2026 picks for leaderboard" on public.prediction_picks;
create policy "Anyone can read 2026 picks for leaderboard"
  on public.prediction_picks for select
  using (
    exists (
      select 1 from public.draft_predictions dp
      where dp.id = prediction_id and dp.draft_year = 2026
    )
  );
