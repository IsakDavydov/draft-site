# Pre-launch checklist: SAK Football

Use this before marketing and scaling to hundreds/thousands of mock drafts. Items are grouped by area; **🔴 Critical** = do before launch, **🟡 Recommended** = soon after, **🟢 Nice-to-have** = when you have time.

---

## Database & data layer

- [x] **🔴 Run missing migrations**  
  The app expects columns that aren’t in `schema.sql`. In Supabase **SQL Editor**, run in order:
  1. `supabase/migrations/20260212000000_multiple_drafts.sql`  
  2. `supabase/migrations/20260212000001_custom_draft_order.sql`  
  3. `supabase/migrations/20260212000002_leaderboard_public_read.sql` (lets everyone see all leaderboard entries; without it, each user only sees their own)  
  (If you use Supabase CLI: `supabase db push` or run these files manually.)

- [x] **🟡 Document migration order in SUPABASE_SETUP.md**  
  Add a step “4a. Run migrations” after schema: run the two files in `supabase/migrations/` so new environments get `name`, `is_leaderboard_entry`, `custom_draft_order` and indexes.

- [ ] **🟡 Backups**  
  Supabase Pro includes point-in-time recovery. For free tier, use dashboard backups or `pg_dump` on a schedule. Decide who can restore and how.

---

## Security

- [x] **🔴 Validate redirect in auth callback**  
  `src/app/auth/callback/route.ts` uses `next` from the URL. Restrict to same-origin paths (e.g. allow only `next` that start with `/` and don’t start with `//`) to avoid open redirects.

- [ ] **🟡 Rate limiting**  
  Add rate limits on auth (sign in/up, password reset) and on `/api/pre-draft-leaderboard` so abuse doesn’t overwhelm Supabase. Use Vercel (e.g. edge middleware or a rate-limit package) or Supabase limits.

- [ ] **🟢 Server-side display name length**  
  You already validate and sanitize display name in the app; consider a DB check constraint (e.g. `char_length(display_name) <= 50`) so bad clients can’t bypass.

---

## API & backend

- [x] **🟡 Pre-draft leaderboard API errors**  
  `/api/pre-draft-leaderboard` returns `[]` on any error. Return `500` and a generic message on failure so the client can show “Leaderboard temporarily unavailable” instead of an empty list.

- [ ] **🟢 Draft name length in DB**  
  UI limits draft name to 40 chars; add a check constraint or application validation on update so the DB never stores oversized names.

---

## Features & UX

- [x] **🔴 Delete draft**  
  Implemented: users can delete a draft from the draft selector (trash icon). Required to free a slot when at 5 drafts.

- [x] **🟡 Error boundaries**  
  `src/app/leaderboard/error.tsx` added so a failed load shows "Leaderboard unavailable" with Try again / Home.

- [ ] **🟡 Empty/loading states**  
  Ensure every list (leaderboard, groups, drafts) has a clear loading and empty state.

- [ ] **🟢 Export**  
  Optional: export my drafts or leaderboard as CSV/JSON for power users.

---

## Design & polish

- [ ] **🟡 Google site verification**  
  In `src/app/layout.tsx`, replace `google: 'your-google-verification-code'` with your real verification meta value from Search Console, or remove the key if you don’t use it.

- [ ] **🟢 Accessibility**  
  Quick pass: focus order, keyboard navigation for modals, and `alt` text for any non-decorative images (e.g. share card logos).

---

## Scalability & performance

- [ ] **🟡 Leaderboard at scale**  
  Pre-draft leaderboard loads all entries and sorts in memory. With thousands of users, either:
  - Cap to top N (e.g. 500) and add `limit`, or  
  - Paginate (e.g. top 100 per page).  
  Indexes in the new migrations help; consider a materialized view or cached endpoint if needed.

- [x] **🟡 Cache pre-draft leaderboard**  
  `GET /api/pre-draft-leaderboard` now sends `Cache-Control: public, s-maxage=60, stale-while-revalidate=60`.

- [ ] **🟢 CDN / images**  
  Team logos already use cache headers. If you add more static or external images, keep using Next.js Image and cache where possible.

---

## DevOps & monitoring

- [x] **🔴 Environment docs**  
  `.env.example` is updated with Supabase and optional `ODDS_API_KEY`. SUPABASE_SETUP points new devs to copy `.env.example` and fill in Supabase keys.

- [ ] **🟡 CI**  
  Add a GitHub Action (or similar) that runs `npm run lint` and `npm run type-check` on push/PR so broken types or lint don’t reach production.

- [ ] **🟡 Error tracking**  
  Integrate Sentry (or similar) for client and server errors so you see real failures and stack traces in production.

- [ ] **🟢 Logging**  
  Replace ad-hoc `console.error` with a small logger (or use your error-tracking SDK) and consistent log levels for API and auth.

---

## Quick reference: what was done in this pass

- **Migrations added**: `supabase/migrations/20260212000000_multiple_drafts.sql` and `20260212000001_custom_draft_order.sql` (multiple drafts per user, `name`, `is_leaderboard_entry`, `custom_draft_order`, indexes).
- **.env.example**: Updated for Supabase + optional Odds API; removed obsolete NextAuth/DATABASE/Sanity.
- **Delete draft**: Users can delete a draft from the predict page (trash on each draft tab) to free a slot.
- **Display name validation**: `validateDisplayNameForSave()` in `src/lib/display-name-filter.ts`; used on “Submit to leaderboard” and “Update display name” so blocklisted/inappropriate names are rejected before save.

---

When the critical and recommended items are done, you’re in good shape to market and handle hundreds to thousands of mock drafts. Revisit scalability and monitoring as traffic grows.

---

## Troubleshooting

### Leaderboard: "Someone submitted but I don't see them"

**Cause:** Row Level Security (RLS) only allows "Users can view own predictions", so when you load the leaderboard you only see your own row. Other users' submissions exist in the DB but are hidden.

**Fix:** Run the migration that allows public read for 2026 leaderboard rows:
- In Supabase **SQL Editor**, run `supabase/migrations/20260212000002_leaderboard_public_read.sql` (or run `supabase db push` so all migrations apply). After that, the leaderboard will show everyone with `is_leaderboard_entry = true`.

**Verify a specific user's submission:** In Supabase SQL Editor (as a user with table access), run:
```sql
select id, display_name, user_id, is_leaderboard_entry,
       (select count(*) from prediction_picks pp where pp.prediction_id = dp.id) as pick_count
from draft_predictions dp
where draft_year = 2026 and is_leaderboard_entry = true
order by display_name;
```
If your buddy's `display_name` appears with `pick_count = 32`, they submitted correctly; the missing RLS policy was preventing you from seeing it.

---

## Next steps (after migrations)

**Done in this pass:** Pre-draft leaderboard API now returns 500 on failure and caches success for 60s; leaderboard page has an error boundary.

**Still recommended before marketing:**
1. **Rate limiting** – Auth (sign in/up) and `/api/pre-draft-leaderboard` so traffic spikes don’t overwhelm Supabase.
2. **Google verification** – In `layout.tsx`, set your real `google` meta value or remove the key.
3. **CI** – GitHub Action for `lint` + `type-check` on push/PR.
4. **Error tracking** – e.g. Sentry so you see production errors.

**When traffic grows:** Cap or paginate leaderboard (e.g. top 500), consider Supabase connection limits and backups.
