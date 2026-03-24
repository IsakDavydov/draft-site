import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only client that bypasses RLS. Use for public aggregates (e.g. leaderboard)
 * when `SUPABASE_SERVICE_ROLE_KEY` is set in the environment.
 * If unset, callers should fall back to the cookie-based client.
 */
export function createServiceRoleClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
