-- Add custom_draft_order for trade scenarios
-- Run after 20260212_multiple_drafts.sql

alter table public.draft_predictions
  add column if not exists custom_draft_order jsonb;

comment on column public.draft_predictions.custom_draft_order is 'Optional: pick number (1-32) -> team name. When set, overrides default draft order for trades.';
