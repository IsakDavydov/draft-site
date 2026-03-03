import { createBrowserClient } from '@supabase/ssr';

/**
 * No-op lock: runs the callback directly without using Navigator LockManager.
 * The default navigator lock can timeout (10000ms) on slow/flaky WiFi or when
 * multiple tabs are open, causing "Acquiring an exclusive Navigator LockManager
 * lock timed out" and blocking the entire app. Using a no-op avoids this.
 * Trade-off: possible session race if multiple tabs refresh at once (rare).
 */
const noOpLock = async <R>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<R>
): Promise<R> => fn();

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        lock: noOpLock,
      },
    }
  );
}
