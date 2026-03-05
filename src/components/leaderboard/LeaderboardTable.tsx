'use client';

import { sanitizeDisplayName } from '@/lib/display-name-filter';

export interface LeaderboardRow {
  display_name: string;
  score?: number;
  rank: number;
}

interface LeaderboardTableProps {
  rows: LeaderboardRow[];
  showScores?: boolean;
  scoreSuffix?: string;
  /** Optional index for stagger animation delay */
  animate?: boolean;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-amber-950 text-sm font-bold shadow-[0_2px_8px_-2px_rgba(251,191,36,0.5)] ring-1 ring-amber-300/50">
        {rank}
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 text-slate-900 text-sm font-bold shadow-[0_2px_8px_-2px_rgba(148,163,184,0.4)] ring-1 ring-slate-300/60">
        {rank}
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-amber-50 text-sm font-bold shadow-[0_2px_8px_-2px_rgba(180,83,9,0.4)] ring-1 ring-amber-600/40">
        {rank}
      </span>
    );
  }
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 text-sm font-semibold ring-1 ring-gray-200/80">
      {rank}
    </span>
  );
}

export function LeaderboardTable({
  rows,
  showScores = true,
  scoreSuffix = 'pts',
  animate = true,
}: LeaderboardTableProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200/60 via-nfl-blue/30 to-amber-200/60" />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200/80">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                #
              </th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Name
              </th>
              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, i) => (
              <tr
                key={row.display_name + row.rank + i}
                className={`group transition-colors duration-150 hover:bg-gray-50/80 ${animate ? 'animate-leaderboard-row' : ''}`}
                style={animate ? { animationDelay: `${Math.min(i * 40, 400)}ms` } : undefined}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <RankBadge rank={row.rank} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900 group-hover:text-gray-800">
                    {sanitizeDisplayName(row.display_name)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {showScores && row.score != null ? (
                    <span className="font-semibold text-gray-700 tabular-nums">
                      {row.score}{scoreSuffix ? ` ${scoreSuffix}` : ''}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
