'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBigBoard, getProspectAge } from '@/lib/adapters';
import { getSchoolPrimaryColor } from '@/lib/adapters/colleges';
import { CollegeLogo } from '@/components/shared/CollegeLogo';
import { Prospect } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROWS_PER_PAGE = 25;

const positionColor: Record<string, string> = {
  QB:   '#2563eb',
  RB:   '#16a34a',
  WR:   '#9333ea',
  TE:   '#0891b2',
  OT:   '#d97706',
  IOL:  '#d97706',
  OL:   '#d97706',
  DT:   '#dc2626',
  EDGE: '#dc2626',
  DL:   '#dc2626',
  LB:   '#ea580c',
  CB:   '#0d9488',
  S:    '#0d9488',
  K:    '#6b7280',
  P:    '#6b7280',
};

function getRankStyle(rank: number) {
  if (rank === 1) return { bg: 'bg-brand-red', text: 'text-white' };
  if (rank <= 5) return { bg: 'bg-brand-red/10', text: 'text-brand-red' };
  if (rank <= 10) return { bg: 'bg-white/[0.06]', text: 'text-gray-200' };
  return { bg: 'bg-white/[0.06]', text: 'text-gray-500' };
}

export function BigBoard() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadBigBoard();
  }, []);

  async function loadBigBoard() {
    try {
      setLoading(true);
      const data = await getBigBoard();
      setProspects(data);
    } catch (error) {
      console.error('Error loading big board:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(prospects.length / ROWS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedProspects = prospects.slice(startIndex, startIndex + ROWS_PER_PAGE);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse h-[68px] bg-white/[0.06] rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Count strip */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          {prospects.length} prospects ranked
        </p>
        <p className="text-xs text-gray-400">
          {startIndex + 1}–{Math.min(startIndex + ROWS_PER_PAGE, prospects.length)} of {prospects.length}
        </p>
      </div>

      {/* Rows */}
      <div className="space-y-1.5">
        {paginatedProspects.map((prospect, index) => {
          const rank = startIndex + index + 1;
          const { bg, text } = getRankStyle(rank);
          const schoolColor = getSchoolPrimaryColor(prospect.school);
          const posColor = positionColor[prospect.position] ?? '#6b7280';
          const age = getProspectAge(prospect);

          return (
            <Link
              key={prospect.id}
              href={`/draft/prospects/${prospect.id}`}
              className="group flex items-center gap-3 rounded-xl bg-sak-card ring-1 ring-white/[0.06] px-4 py-3 hover:ring-brand-red/30 hover:shadow-card transition-all"
            >
              {/* Rank */}
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold ${bg} ${text}`}>
                {rank}
              </div>

              {/* School logo with school-color tint */}
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ring-1 ring-white/[0.08]"
                style={{ backgroundColor: `${schoolColor}18` }}
              >
                <CollegeLogo school={prospect.school} size={26} />
              </div>

              {/* Name + school + measurables */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate group-hover:text-brand-red transition-colors">
                    {prospect.name}
                  </span>
                  {/* Position badge */}
                  <span
                    className="flex-shrink-0 inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
                    style={{ backgroundColor: posColor }}
                  >
                    {prospect.position}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-gray-400">{prospect.school}</span>
                  {age != null && (
                    <>
                      <span className="text-gray-500">·</span>
                      <span className="text-xs text-gray-400">{age} yrs</span>
                    </>
                  )}
                  {prospect.height && (
                    <>
                      <span className="text-gray-500">·</span>
                      <span className="text-xs text-gray-400">{prospect.height}, {prospect.weight} lbs</span>
                    </>
                  )}
                </div>
              </div>

              {/* Draft projection */}
              {prospect.mockDraftRound != null && (
                <div className="flex-shrink-0 hidden sm:flex flex-col items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Proj.</span>
                  <span className="text-xs font-bold text-gray-400">
                    Rd {prospect.mockDraftRound}{prospect.mockDraftPick != null ? ` · #${prospect.mockDraftPick}` : ''}
                  </span>
                </div>
              )}

              {/* School color accent bar on right edge */}
              <div
                className="flex-shrink-0 w-[3px] h-8 rounded-full opacity-60"
                style={{ backgroundColor: schoolColor }}
              />
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-white/[0.08] bg-sak-card text-gray-400 hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .reduce<(number | '...')[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p as number)}
                    className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === p
                        ? 'bg-brand-red text-white'
                        : 'text-gray-400 hover:bg-white/[0.06]'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-white/[0.08] bg-sak-card text-gray-400 hover:bg-white/[0.06] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
