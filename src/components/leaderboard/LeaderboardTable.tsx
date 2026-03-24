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
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500 text-sm font-semibold ring-1 ring-gray-200">
      {rank}
    </span>
  );
}

function rowBg(rank: number) {
  if (rank === 1) return 'bg-amber-50/70 hover:bg-amber-50';
  if (rank === 2) return 'bg-slate-50/60 hover:bg-slate-50';
  if (rank === 3) return 'bg-orange-50/40 hover:bg-orange-50/70';
  return 'hover:bg-gray-50/80';
}

function rankAccent(rank: number) {
  if (rank === 1) return 'border-l-[3px] border-l-amber-400';
  if (rank === 2) return 'border-l-[3px] border-l-slate-400';
  if (rank === 3) return 'border-l-[3px] border-l-amber-700/70';
  return '';
}

export function LeaderboardTable({
  rows,
  showScores = true,
  scoreSuffix = 'pts',
  animate = true,
}: LeaderboardTableProps) {
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
                        row.rank === 1 ? 'text-amber-700' :
                        row.rank === 2 ? 'text-slate-600' :
                        row.rank === 3 ? 'text-amber-800' :
                        'text-gray-700'
                      }`}>
                        {row.score}{scoreSuffix ? ` ${scoreSuffix}` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
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
