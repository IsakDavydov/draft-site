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
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

Set **`NEXT_PUBLIC_SITE_URL`** to your **canonical** production URL (no trailing slash), matching **Authentication → URL Configuration → Site URL** in Supabase. The app uses this for password-reset and signup `redirectTo` URLs so `www` vs apex mismatches don’t break auth emails.

## 4. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy the contents of `supabase/schema.sql`
4. Paste and click **Run**

This creates the `profiles`, `draft_predictions`, `prediction_picks`, and `draft_results` tables with Row Level Security (RLS).

## 4a. Run migrations (multiple drafts + indexes)

The app supports multiple drafts per user and leaderboard/custom order. Run these in the **SQL Editor** in order:

1. **New query** → paste contents of `supabase/migrations/20260212000000_multiple_drafts.sql` → **Run**
2. **New query** → paste contents of `supabase/migrations/20260212000001_custom_draft_order.sql` → **Run**
3. **New query** → paste contents of `supabase/migrations/20260212000002_leaderboard_public_read.sql` → **Run** (if not already)
4. **New query** → paste contents of `supabase/migrations/20260213000000_leaderboard_add_prediction_id.sql` → **Run**

This adds `name`, `is_leaderboard_entry`, `custom_draft_order`, leaderboard RLS, and `prediction_id` on leaderboard RPCs (for “view top 10 picks” links).

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

## 5b. Forgot Password – URL config, templates, and email delivery

Password reset is handled by **Supabase Auth** (`resetPasswordForEmail`). The Next.js app does **not** call Resend or any mail API directly—Supabase sends the email. If **Resend** shows no sends, that usually means either auth mail is still using Supabase’s default mailer, or SMTP isn’t wired correctly (see below).

### 1. URL configuration (common failure: no email or “invalid redirect”)

1. **Authentication** → **URL Configuration**
   - **Site URL**: Your canonical site (e.g. `https://yoursite.com`)—same host you use in **`NEXT_PUBLIC_SITE_URL`** on Vercel.
   - **Redirect URLs**: Include at least:
     - `https://yoursite.com/auth/callback` (or use a wildcard such as `https://yoursite.com/**` to cover query strings)
     - `http://localhost:3000/**` for local dev

If **`redirectTo`** from the app isn’t allowlisted, Supabase can **reject the request** (user may see an error on the forgot-password page). Mismatches like **`www`** vs **non-www** (e.g. Site URL is `https://yoursite.com` but users open `https://www.yoursite.com`) are a frequent cause—add both hosts to Redirect URLs or standardize on one and set `NEXT_PUBLIC_SITE_URL` to match.

### 2. Reset Password email template

The default template can be awkward for server-side Next.js. Use a link that hits your `/auth/callback` route with `token_hash` and `type=recovery`:

```html
<h2>Reset Password</h2>
<p>Follow this link to reset the password for your user:</p>
<p><a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=recovery&next=/auth/update-password">Reset Password</a></p>
```

Optional: if you rely on the `redirectTo` passed from the app, Supabase also exposes **`{{ .RedirectTo }}`** in templates—see [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates). Either way, **Site URL** must match the domain users use.

### 3. Resend and “no emails in Resend”

- **Resend’s dashboard only shows sends if Supabase is configured to send mail through Resend.**  
  Go to **Project Settings** → **Auth** → **SMTP Settings** and enable custom SMTP using [Resend’s SMTP instructions](https://resend.com/docs/send-with-smtp) (host `smtp.resend.com`, verify your domain in Resend, use your API key as the password where documented).
- Until SMTP is set, Supabase uses its **built-in** mail path—**Resend will show nothing**, which is expected.
- After SMTP is configured, check **Project** → **Logs** → **Auth** (or **Edge Logs**) in Supabase for delivery errors.

### 4. Other checks

- **Authentication** → **Providers** → **Email** enabled.
- **Rate limits** on the free tier; wait and retry if many tests were sent.
- Spam/junk folder; default “from” address may look unfamiliar until custom SMTP/domain is set.

### 5. Gmail / Outlook “This message seems dangerous” or phishing warnings

Mail clients flag **password-reset** and **unfamiliar senders** aggressively. Common causes:

- **Sender domain**: Supabase’s default mail (`@mail.app.supabase.io` or similar) is not your brand domain, so filters are stricter.
- **Link vs domain**: A mismatch between the **from** domain and the **link** domain (e.g. reset link goes to your site but mail is from Supabase) can trigger warnings.
- **No SPF/DKIM on your domain** if you use custom SMTP without full DNS setup.

**What helps**

- Configure **custom SMTP** (e.g. Resend) with a **verified sending domain** so “From” matches your site.
- Add **SPF**, **DKIM**, and **DMARC** for that domain (Resend provides records).
- Use clear **subject** and body copy (“Reset your SAK Football password”) so users recognize the mail.
- After fixing **callback cookies** (see app `auth/callback` route), the reset **link should work in one click**; repeated opens or broken sessions can look like “suspicious” behavior to users (reporting as phishing).

The app’s `/auth/callback` route is implemented so **session cookies are attached to the redirect response**—without that, users could briefly see the reset page then get sent back to sign-in (no session).

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
- **Password reset / confirmation email not sending**: See **§5b** (URL allowlist, `NEXT_PUBLIC_SITE_URL`, SMTP/Resend). Check **Logs** → **Auth** in Supabase. Remember: **Resend only logs sends if Supabase Auth SMTP uses Resend.**
- **Email not sending (general)**: **Authentication** → **Email Templates**; Supabase has rate limits on the free tier

## Newsletter Export

To export user emails for newsletters:

1. Supabase dashboard → **Authentication** → **Users**
2. Or run SQL: `select email from auth.users;` (requires service role key, do this server-side only)
