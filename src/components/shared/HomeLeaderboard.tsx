'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

interface LeaderboardEntry {
  display_name: string;
  score: number;
  rank: number;
}

export function HomeLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    fetch('/api/pre-draft-leaderboard')
      .then((res) => res.json())
      .then((data: LeaderboardEntry[]) => {
        if (Array.isArray(data) && data.length >= 3) {
          setEntries(data.slice(0, 5));
        }
      })
      .catch(() => {});
  }, []);

  if (entries.length < 3) return null;

  return (
    <div className="mt-6 rounded-xl bg-black/20 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-nfl-gold/90">
          <Trophy className="h-3.5 w-3.5" />
          Top scorers
        </div>
        <Link
          href="/leaderboard"
          className="text-xs font-medium text-white/80 hover:text-nfl-gold transition-colors"
        >
          View all →
        </Link>
      </div>
      <div className="mt-2 space-y-1 text-sm text-white">
        {entries.map((e) => (
          <div key={e.display_name + e.rank}>
            <span className="font-bold text-nfl-gold">#{e.rank}</span>{' '}
            <span className="font-medium">{sanitizeDisplayName(e.display_name)}</span>
            <span className="text-white/70"> ({e.score})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
