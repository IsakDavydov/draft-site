'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trophy } from 'lucide-react';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

interface WeeklyTopBannerProps {
  variant?: 'light' | 'dark';
}

export function WeeklyTopBanner({ variant = 'light' }: WeeklyTopBannerProps) {
  const [top, setTop] = useState<{ display_name: string; score: number } | null>(null);

  useEffect(() => {
    fetch('/api/weekly-top')
      .then((res) => res.json())
      .then((data) => {
        if (data.display_name && data.score != null) {
          setTop(data);
        }
      })
      .catch(() => {});
  }, []);

  if (!top) return null;

  if (variant === 'dark') {
    return (
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-400/40 bg-amber-500/20 px-4 py-2.5 text-sm backdrop-blur-sm">
        <Trophy className="h-5 w-5 shrink-0 text-nfl-gold" />
        <span className="text-white">
          <span className="font-semibold text-nfl-gold">#1 this week:</span>{' '}
          <span className="font-bold">{sanitizeDisplayName(top.display_name)}</span>
          {' '}({top.score} pts)
        </span>
        <Link
          href="/leaderboard"
          className="ml-auto font-medium text-nfl-gold hover:text-white hover:underline"
        >
          View leaderboard →
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm">
      <Trophy className="h-5 w-5 shrink-0 text-amber-500" />
      <span className="text-amber-900">
        <span className="font-semibold">#1 this week:</span>{' '}
        <span className="font-bold text-amber-700">{sanitizeDisplayName(top.display_name)}</span>
        {' '}({top.score} pts)
      </span>
      <Link
        href="/leaderboard"
        className="ml-auto text-amber-700 font-medium hover:text-amber-800 hover:underline"
      >
        View leaderboard →
      </Link>
    </div>
  );
}
