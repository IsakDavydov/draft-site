-- Custom draft order (trades): which team holds which pick.
-- Run after 20260212000000_multiple_drafts.sql.

alter table public.draft_predictions
  add column if not exists custom_draft_order jsonb;

comment on column public.draft_predictions.custom_draft_order is
  'Maps pick number (as string key) to team name for trade scenarios, e.g. {"1":"Bears","2":"Commanders"}';

-- Index for loading picks by prediction (used when loading drafts with nested picks)
create index if not exists idx_prediction_picks_prediction_id
  on public.prediction_picks (prediction_id);
