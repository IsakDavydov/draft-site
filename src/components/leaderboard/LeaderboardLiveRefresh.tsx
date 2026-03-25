'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const POLL_INTERVAL_MS = 10_000; // 10 seconds during the draft

interface LeaderboardLiveRefreshProps {
  /** When true, the page will refresh periodically so scores update as draft_results change. */
  enabled: boolean;
}

export function LeaderboardLiveRefresh({ enabled }: LeaderboardLiveRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => {
      router.refresh();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [enabled, router]);

  if (!enabled) return null;

  return (
    <div className="mt-2 inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <p className="text-xs font-semibold text-green-600">
        Live scoring — updates every {POLL_INTERVAL_MS / 1000}s as picks are announced
      </p>
    </div>
  );
}
