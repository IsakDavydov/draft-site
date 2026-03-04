'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProspects, getProspectAge } from '@/lib/adapters';
import { Prospect } from '@/types';
import { CollegeLogo } from '@/components/shared/CollegeLogo';

const PROSPECTS_PER_PAGE = 12;

export function ProspectDirectory() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    position: '',
    school: '',
  });

  useEffect(() => {
    loadProspects();
  }, [filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  async function loadProspects() {
    try {
      setLoading(true);
      const data = await getProspects(
        filters.position || undefined,
        filters.school || undefined
      );
      setProspects(data);
    } catch (error) {
      console.error('Error loading prospects:', error);
    } finally {
      setLoading(false);
    }
  }

  const positions = ['QB', 'RB', 'WR', 'TE', 'OT', 'IOL', 'EDGE', 'DT', 'LB', 'CB', 'S'];
  const schools = Array.from(new Set(prospects.map(p => p.school))).sort();

  const totalPages = Math.ceil(prospects.length / PROSPECTS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * PROSPECTS_PER_PAGE;
  const paginatedProspects = prospects.slice(startIndex, startIndex + PROSPECTS_PER_PAGE);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.position}
          onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
        >
          <option value="">All Positions</option>
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <select
          value={filters.school}
          onChange={(e) => setFilters(prev => ({ ...prev, school: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
        >
          <option value="">All Schools</option>
          {schools.map(school => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600 mb-4">
        Showing {startIndex + 1}–{Math.min(startIndex + PROSPECTS_PER_PAGE, prospects.length)} of {prospects.length} prospects
      </div>

      {/* Prospects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedProspects.map((prospect) => (
          <Link
            key={prospect.id}
            href={`/draft/prospects/${prospect.id}`}
            className="group relative bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            {/* Subtle top accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-nfl-blue/20 group-hover:to-nfl-blue/5" />

            <div className="p-5">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ring-1 ring-gray-100">
                    <CollegeLogo school={prospect.school} size={32} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base truncate group-hover:text-nfl-blue transition-colors">
                      {prospect.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {prospect.position} · {prospect.school}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{prospect.class}</p>
                  </div>
                </div>
                {prospect.bigBoardRank && (
                  <span className="flex-shrink-0 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-gray-900 text-white text-xs font-bold">
                    #{prospect.bigBoardRank}
                  </span>
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100">
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Ht</p>
                  <p className="text-sm font-semibold text-gray-900">{prospect.height}</p>
                </div>
                <div className="text-center border-x border-gray-100">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Wt</p>
                  <p className="text-sm font-semibold text-gray-900">{prospect.weight}</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Age</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {getProspectAge(prospect) != null ? `${getProspectAge(prospect)}` : '—'}
                  </p>
                </div>
              </div>

              {prospect.measurables &&
                (prospect.measurables.fortyYardDash ||
                  prospect.measurables.verticalJump ||
                  prospect.measurables.benchPress) && (
                  <div className="mt-4 flex gap-4">
                    {prospect.measurables.fortyYardDash && (
                      <div className="flex-1 rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                        <span className="text-[10px] text-gray-500">40</span>
                        <p className="text-xs font-semibold text-gray-900">{prospect.measurables.fortyYardDash}s</p>
                      </div>
                    )}
                    {prospect.measurables.verticalJump && (
                      <div className="flex-1 rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                        <span className="text-[10px] text-gray-500">Vert</span>
                        <p className="text-xs font-semibold text-gray-900">{prospect.measurables.verticalJump}"</p>
                      </div>
                    )}
                    {prospect.measurables.benchPress && (
                      <div className="flex-1 rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                        <span className="text-[10px] text-gray-500">Bench</span>
                        <p className="text-xs font-semibold text-gray-900">{prospect.measurables.benchPress}</p>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && prospects.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-nfl-blue"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 text-sm font-medium rounded-md border focus:outline-none focus:ring-2 focus:ring-nfl-blue ${
                  currentPage === page
                    ? 'bg-nfl-blue border-nfl-blue text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-nfl-blue"
          >
            Next
          </button>
        </div>
      )}

      {prospects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No prospects found with the selected filters
        </div>
      )}
    </div>
  );
}
