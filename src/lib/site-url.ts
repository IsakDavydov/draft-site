/**
 * Canonical site origin for auth redirects (`redirectTo`, `emailRedirectTo`).
 * Must match **Authentication → URL Configuration** in Supabase (Site URL + allowlisted redirect URLs).
 *
 * In production, set `NEXT_PUBLIC_SITE_URL` to your canonical URL (e.g. `https://sakfootball.com`)
 * so it matches Supabase even when users visit `www.` or a preview URL — mismatches can cause
 * `redirectTo` to be rejected and password-reset / confirmation emails to fail.
 */
export function getBrowserSiteUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/+$/, '');
  }
  return window.location.origin;
}
