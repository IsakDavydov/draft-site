-- Allow multiple drafts per user per year and add name + leaderboard flag.
-- Run after schema.sql. Referenced by app (PredictionForm) if missing.

-- Drop one-per-user-per-year constraint so users can have up to 5 drafts
alter table public.draft_predictions drop constraint if exists draft_predictions_user_id_draft_year_key;

-- Display name can be null until user submits to leaderboard or sets it
alter table public.draft_predictions alter column display_name drop not null;

-- Optional label for the draft (e.g. "Draft 1", "My bold take")
alter table public.draft_predictions add column if not exists name text;

-- Which draft (if any) counts for the public leaderboard per user/year
alter table public.draft_predictions add column if not exists is_leaderboard_entry boolean not null default false;

-- Index for leaderboard queries (pre- and post-draft)
create index if not exists idx_draft_predictions_leaderboard
  on public.draft_predictions (draft_year, is_leaderboard_entry)
  where is_leaderboard_entry = true;

create index if not exists idx_draft_predictions_user_year
  on public.draft_predictions (user_id, draft_year);
