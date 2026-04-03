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
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-red/80 text-white text-sm font-black shadow-glow ring-1 ring-brand-red/30">
        {rank}
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold/80 text-white text-sm font-black shadow-glow-gold ring-1 ring-brand-gold/30">
        {rank}
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-600 text-white text-sm font-black ring-1 ring-gray-400/30">
        {rank}
      </span>
    );
  }
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sak-hover text-gray-400 text-sm font-semibold ring-1 ring-white/[0.06]">
      {rank}
    </span>
  );
}

function rowBg(rank: number) {
  if (rank === 1) return 'bg-brand-red/[0.06] hover:bg-brand-red/[0.1]';
  if (rank === 2) return 'bg-brand-gold/[0.04] hover:bg-brand-gold/[0.08]';
  if (rank === 3) return 'bg-white/[0.02] hover:bg-white/[0.04]';
  return 'hover:bg-white/[0.03]';
}

function rankAccent(rank: number) {
  if (rank === 1) return 'border-l-[3px] border-l-brand-red';
  if (rank === 2) return 'border-l-[3px] border-l-brand-gold';
  if (rank === 3) return 'border-l-[3px] border-l-gray-500';
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
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-sak-card shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/[0.06] bg-sak-dark/50">
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
          <tbody className="divide-y divide-white/[0.04]">
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
                      className="font-medium text-gray-200 no-underline visited:text-gray-200 transition-colors underline-offset-2 group-hover:text-white hover:text-brand-red hover:underline decoration-brand-red/40 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/35 focus-visible:ring-offset-2 focus-visible:ring-offset-sak-card"
                      title="View picks 1–10"
                    >
                      {sanitizeDisplayName(row.display_name)}
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-200 group-hover:text-white">
                      {sanitizeDisplayName(row.display_name)}
                    </span>
                  )}
                </td>
                {showScores && (
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right">
                    {row.score != null ? (
                      <span className={`font-bold tabular-nums ${
                        row.rank === 1 ? 'text-brand-red' :
                        row.rank === 2 ? 'text-brand-gold' :
                        row.rank === 3 ? 'text-gray-300' :
                        'text-gray-300'
                      }`}>
                        {row.score}{scoreSuffix ? ` ${scoreSuffix}` : ''}
                      </span>
                    ) : (
                      <span className="text-gray-600">&mdash;</span>
                    )}
                  </td>
                )}
                {showScores && showGap && (
                  <td className="px-4 py-4 whitespace-nowrap text-right hidden sm:table-cell">
                    {row.rank === 1 ? (
                      <span className="text-xs font-bold text-brand-red">Leader</span>
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
