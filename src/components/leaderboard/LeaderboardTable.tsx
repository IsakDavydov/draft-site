'use client';

import Link from 'next/link';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

export interface LeaderboardRow {
  display_name: string;
  score?: number;
  rank: number;
  /** When set, name links to a read-only top-10 picks preview */
  prediction_id?: string | null;
}

interface LeaderboardTableProps {
  rows: LeaderboardRow[];
  showScores?: boolean;
  scoreSuffix?: string;
  /** Optional index for stagger animation delay */
  animate?: boolean;
  /** When true, shows a "gap to leader" column next to score */
  showGap?: boolean;
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700 text-sm font-black">
        1
      </span>
    );
  }
  if (rank <= 3) {
    return (
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 text-sm font-bold">
        {rank}
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-400 text-sm font-semibold">
      {rank}
    </span>
  );
}

function rowBg(rank: number) {
  if (rank === 1) return 'bg-amber-50/60 hover:bg-amber-50';
  return 'hover:bg-gray-50';
}

function rankAccent(rank: number) {
  if (rank === 1) return 'border-l-2 border-l-amber-400';
  return '';
}

export function LeaderboardTable({
  rows,
  showScores = true,
  scoreSuffix = 'pts',
  animate = true,
  showGap = false,
}: LeaderboardTableProps) {
  const leaderScore = showGap && rows.length > 0 ? (rows[0].score ?? 0) : 0;
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 sm:px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 w-16">
                Rank
              </th>
              <th className="px-3 sm:px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                Name
              </th>
              {showScores && (
                <th className="px-3 sm:px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Score
                </th>
              )}
              {showScores && showGap && (
                <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hidden sm:table-cell">
                  Gap
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((row, i) => (
              <tr
                key={(row.prediction_id ?? '') + row.display_name + row.rank + i}
                className={`group transition-colors duration-150 ${rowBg(row.rank)} ${animate ? 'animate-leaderboard-row' : ''}`}
                style={animate ? { animationDelay: `${Math.min(i * 40, 400)}ms` } : undefined}
              >
                <td className={`px-3 sm:px-6 py-4 whitespace-nowrap ${rankAccent(row.rank)}`}>
                  <RankBadge rank={row.rank} />
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  {row.prediction_id ? (
                    <Link
                      href={`/predictions/${row.prediction_id}?ref=leaderboard`}
                      className="font-medium text-gray-700 no-underline visited:text-gray-700 transition-colors underline-offset-2 group-hover:text-gray-900 hover:text-rose-500 hover:underline decoration-rose-400/40 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      title="View picks 1–10"
                    >
                      {sanitizeDisplayName(row.display_name)}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {sanitizeDisplayName(row.display_name)}
                    </span>
                  )}
                </td>
                {showScores && (
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                    {row.score != null ? (
                      <span className={`font-bold tabular-nums ${
                        row.rank === 1 ? 'text-amber-600' :
                        row.rank === 2 ? 'text-gray-600' :
                        row.rank === 3 ? 'text-gray-500' :
                        'text-gray-700'
                      }`}>
                        {row.score}{scoreSuffix ? ` ${scoreSuffix}` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400">&mdash;</span>
                    )}
                  </td>
                )}
                {showScores && showGap && (
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden sm:table-cell">
                    {row.rank === 1 ? (
                      <span className="text-xs font-bold text-rose-500">Leader</span>
                    ) : row.score != null ? (
                      <span className="text-xs font-semibold text-gray-500 tabular-nums">
                        &minus;{leaderScore - row.score}
                      </span>
                    ) : null}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
