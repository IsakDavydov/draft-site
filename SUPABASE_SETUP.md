# Supabase Setup for Draft Predictions

This guide walks you through setting up Supabase for the draft prediction game.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Choose your organization, name the project (e.g. `sakfootball`), set a database password
4. Select a region close to your users
5. Click **Create new project** and wait for it to provision

## 2. Get Your API Keys

1. In the Supabase dashboard, go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** (e.g. `https://xxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## 3. Configure Environment Variables

Create a `.env.local` file in the project root (or add to your existing `.env`):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the contents of `supabase/schema.sql`
4. Paste and click **Run**

This creates the `profiles`, `draft_predictions`, `prediction_picks`, and `draft_results` tables with Row Level Security (RLS).

## 4b. Run the Leaderboard Setup (Optional but recommended)

1. In **SQL Editor**, click **New query**
2. Copy the contents of `supabase/leaderboard-and-seed.sql`
3. Paste and click **Run**

This adds the `get_leaderboard` function and seeds `draft_results` with the mock draft (so you can test the leaderboard immediately).

## 4c. Run the Groups Setup (Optional)

1. In **SQL Editor**, click **New query**
2. Copy the contents of `supabase/groups.sql`
3. Paste and click **Run**

This creates the `groups` and `group_members` tables, plus the `join_group_by_code` and `get_group_leaderboard` functions. Users can then create or join groups to compete with friends.

## 5. Configure Auth (Optional)

1. Go to **Authentication** → **Providers**
2. **Email** is enabled by default
3. For email confirmations: **Authentication** → **Settings** → toggle "Confirm email" on or off
   - If ON: users must click a confirmation link before signing in
   - If OFF: users can sign in immediately after signup (faster for testing)

## 6. Test It

1. Run `npm run dev`
2. Go to `/predict` – you should be redirected to sign in
3. Click "Sign up" and create an account
4. After signing in, you should see the prediction form
5. Select prospects for all 32 picks and click "Save Predictions"

## Troubleshooting

- **"Invalid API key"**: Double-check your `.env.local` and that the keys are correct
- **"relation does not exist"**: Run the schema SQL again
- **RLS errors**: Make sure you ran the full `schema.sql` including the policies
- **Email not sending**: Check **Authentication** → **Email Templates**; Supabase has rate limits on the free tier

## Newsletter Export

To export user emails for newsletters:

1. Supabase dashboard → **Authentication** → **Users**
2. Or run SQL: `select email from auth.users;` (requires service role key, do this server-side only)
