'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy, Zap } from 'lucide-react';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

interface LeaderboardEntry {
  display_name: string;
  score: number;
  rank: number;
  prediction_id?: string;
}

export function LeaderboardPreviewSection() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pre-draft-leaderboard')
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          const all = data as LeaderboardEntry[];
          setTotal(all.length);
          setEntries(all.slice(0, 10));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5 p-12 text-center">
        <Trophy className="mx-auto h-12 w-12 text-gray-200 mb-4" />
        <p className="text-lg font-semibold text-gray-900 mb-2">No entries yet</p>
        <p className="text-gray-500 mb-6">Be the first to submit your mock draft and claim the top spot.</p>
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 rounded-lg bg-nfl-blue px-6 py-3 text-sm font-bold text-white hover:bg-nfl-blue/90 transition-all hover:scale-[1.02]"
        >
          <Zap className="h-4 w-4" />
          Submit Your Picks
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Trophy className="h-5 w-5 text-amber-500" />
          <span className="font-semibold text-gray-900">Top Predictions</span>
        </div>
        {total > 0 && (
          <span className="text-sm text-gray-500">
            {total} fan{total !== 1 ? 's' : ''} competing
          </span>
        )}
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {entries.map((e) => (
          <div
            key={(e.prediction_id ?? '') + e.display_name + e.rank}
            className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <span
                className={`w-7 text-right font-bold tabular-nums text-sm flex-shrink-0 ${
                  e.rank === 1
                    ? 'text-amber-500 text-base'
                    : e.rank <= 3
                    ? 'text-gray-700'
                    : 'text-gray-400'
                }`}
              >
                #{e.rank}
              </span>
              {e.rank === 1 && (
                <Trophy className="h-4 w-4 text-amber-500 -ml-2 flex-shrink-0" />
              )}
              {e.prediction_id ? (
                <Link
                  href={`/predictions/${e.prediction_id}?ref=home`}
                  className="truncate font-medium text-gray-900 hover:text-nfl-red transition-colors text-sm"
                >
                  {sanitizeDisplayName(e.display_name)}
                </Link>
              ) : (
                <span className="truncate font-medium text-gray-900 text-sm">
                  {sanitizeDisplayName(e.display_name)}
                </span>
              )}
            </div>
            <span className="ml-4 flex-shrink-0 text-sm font-semibold text-gray-700 tabular-nums">
              {e.score} pts
            </span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-gray-600">
          Submit your picks to appear on the leaderboard.
        </p>
        <Link
          href="/predict"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-lg bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-nfl-blue/90 transition-all hover:scale-[1.02]"
        >
          <Zap className="h-4 w-4" />
          Enter the Challenge
        </Link>
      </div>
    </div>
  );
}
