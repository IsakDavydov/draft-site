'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

interface LeaderboardEntry {
  display_name: string;
  score: number;
  rank: number;
  prediction_id?: string;
}

export function HomeLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch('/api/pre-draft-leaderboard')
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setEntries((data as LeaderboardEntry[]).slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  if (entries.length < 1) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-nfl-gold/95">
          <Trophy className="h-3.5 w-3.5" />
          Top scorers
        </div>
        <Link
          href="/leaderboard"
          className="text-xs font-medium text-white/85 transition-colors hover:text-nfl-gold"
        >
          View all →
        </Link>
      </div>
      <div className="mt-3 space-y-2 text-sm text-white">
        {entries.map((e) => (
          <div key={(e.prediction_id ?? '') + e.display_name + e.rank} className="flex items-center justify-between gap-2">
            <span className="font-bold tabular-nums text-nfl-gold">#{e.rank}</span>
            {e.prediction_id ? (
              <Link
                href={`/predictions/${e.prediction_id}?ref=leaderboard`}
                className="min-w-0 flex-1 truncate font-medium transition-colors underline-offset-2 hover:text-nfl-gold hover:underline decoration-nfl-gold/50 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nfl-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-black/20"
                title="View picks 1–10"
              >
                {sanitizeDisplayName(e.display_name)}
              </Link>
            ) : (
              <span className="min-w-0 flex-1 truncate font-medium">{sanitizeDisplayName(e.display_name)}</span>
            )}
            <span className="shrink-0 text-white/70">({e.score})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
