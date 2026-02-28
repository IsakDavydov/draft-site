# Supabase migrations

Run these in the **Supabase SQL Editor** in order:

1. `schema.sql` (in `supabase/` folder)
2. `leaderboard-and-seed.sql` (in `supabase/`)
3. `20260212_multiple_drafts.sql` – multiple drafts per user, leaderboard entries
4. `20260212_custom_draft_order.sql` – trade picks between teams

If you see "Couldn't load drafts" on the predict page, run migrations 3 and 4.
