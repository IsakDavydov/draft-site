'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const POLL_INTERVAL_MS = 20_000; // 20 seconds during the draft

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
    <p className="mt-2 text-xs text-gray-500">
      Live • scores update every {POLL_INTERVAL_MS / 1000}s
    </p>
  );
}
