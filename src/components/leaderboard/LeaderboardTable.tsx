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
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-nfl-blue to-nfl-blue/80 text-white text-sm font-black shadow-[0_2px_8px_-2px_rgba(213,10,10,0.45)] ring-1 ring-nfl-blue/30">
        {rank}
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-nfl-red to-nfl-red/80 text-white text-sm font-black shadow-[0_2px_8px_-2px_rgba(1,51,105,0.4)] ring-1 ring-nfl-red/30">
        {rank}
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 text-white text-sm font-black shadow-[0_2px_8px_-2px_rgba(71,85,105,0.4)] ring-1 ring-slate-500/40">
        {rank}
      </span>
    );
  }
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 text-sm font-semibold ring-1 ring-gray-200">
      {rank}
    </span>
  );
}

function rowBg(rank: number) {
  if (rank === 1) return 'bg-red-50/50 hover:bg-red-50/80';
  if (rank === 2) return 'bg-blue-50/30 hover:bg-blue-50/60';
  if (rank === 3) return 'bg-slate-50/50 hover:bg-slate-50/80';
  return 'hover:bg-gray-50/80';
}

function rankAccent(rank: number) {
  if (rank === 1) return 'border-l-[3px] border-l-nfl-blue';
  if (rank === 2) return 'border-l-[3px] border-l-nfl-red';
  if (rank === 3) return 'border-l-[3px] border-l-slate-500';
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
      {/* Top accent stripe */}
      <div className="h-[3px] bg-gradient-to-r from-nfl-red/0 via-nfl-blue to-nfl-red/0" />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/80">
              <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 w-16">
                Rank
              </th>
              <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Name
              </th>
              {showScores && (
                <th className="px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  Score
                </th>
              )}
              {showScores && showGap && (
                <th className="px-4 py-3.5 text-right text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hidden sm:table-cell">
                  Gap
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, i) => (
              <tr
                key={(row.prediction_id ?? '') + row.display_name + row.rank + i}
                className={`group transition-colors duration-150 ${rowBg(row.rank)} ${animate ? 'animate-leaderboard-row' : ''}`}
                style={animate ? { animationDelay: `${Math.min(i * 40, 400)}ms` } : undefined}
              >
                <td className={`px-6 py-4 whitespace-nowrap ${rankAccent(row.rank)}`}>
                  <RankBadge rank={row.rank} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {row.prediction_id ? (
                    <Link
                      href={`/predictions/${row.prediction_id}?ref=leaderboard`}
                      className="font-medium text-gray-900 no-underline visited:text-gray-900 transition-colors underline-offset-2 group-hover:text-gray-800 hover:text-nfl-blue hover:underline decoration-nfl-blue/40 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nfl-blue/35 focus-visible:ring-offset-2"
                      title="View picks 1–10"
                    >
                      {sanitizeDisplayName(row.display_name)}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-900 group-hover:text-gray-800">
                      {sanitizeDisplayName(row.display_name)}
                    </span>
                  )}
                </td>
                {showScores && (
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {row.score != null ? (
                      <span className={`font-bold tabular-nums ${
                        row.rank === 1 ? 'text-nfl-blue' :
                        row.rank === 2 ? 'text-nfl-red' :
                        row.rank === 3 ? 'text-slate-600' :
                        'text-gray-700'
                      }`}>
                        {row.score}{scoreSuffix ? ` ${scoreSuffix}` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                )}
                {showScores && showGap && (
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden sm:table-cell">
                    {row.rank === 1 ? (
                      <span className="text-xs font-bold text-nfl-blue">Leader</span>
                    ) : row.score != null ? (
                      <span className="text-xs font-semibold text-gray-400 tabular-nums">
                        −{leaderScore - row.score}
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
