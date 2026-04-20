'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getProspects, getProspectAge } from '@/lib/adapters';
import { getSchoolPrimaryColor } from '@/lib/adapters/colleges';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-xl bg-white border border-gray-200 overflow-hidden">
            <div className="h-[3px] bg-gray-100" />
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-8 bg-gray-100 rounded" />
                <div className="h-8 bg-gray-100 rounded" />
                <div className="h-8 bg-gray-100 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Filter:</span>
        <select
          value={filters.position}
          onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">All Positions</option>
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <select
          value={filters.school}
          onChange={(e) => setFilters(prev => ({ ...prev, school: e.target.value }))}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">All Schools</option>
          {schools.map(school => (
            <option key={school} value={school}>{school}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm font-medium text-gray-500 mb-4">
        Showing {startIndex + 1}–{Math.min(startIndex + PROSPECTS_PER_PAGE, prospects.length)} of {prospects.length} prospects
      </div>

      {/* Prospects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedProspects.map((prospect) => (
          <Link
            key={prospect.id}
            href={`/draft/prospects/${prospect.id}`}
            className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-rose-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
          >
            {/* School-colored top accent */}
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ backgroundColor: getSchoolPrimaryColor(prospect.school) }}
            />

            <div className="p-5 pt-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm border border-gray-100"
                  >
                    <CollegeLogo school={prospect.school} size={32} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-base truncate group-hover:text-rose-500 transition-colors">
                      {prospect.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate mt-0.5">
                      <span className="font-semibold text-gray-700">{prospect.position}</span>
                      {' · '}
                      {prospect.school}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{prospect.class}</p>
                  </div>
                </div>
                {prospect.bigBoardRank && (
                  <span className="flex-shrink-0 inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg bg-rose-500 text-white text-xs font-black px-1.5">
                    #{prospect.bigBoardRank}
                  </span>
                )}
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-gray-200">
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Ht</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{prospect.height}</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Wt</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{prospect.weight}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">Age</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    {getProspectAge(prospect) != null ? `${getProspectAge(prospect)}` : '—'}
                  </p>
                </div>
              </div>

              {prospect.measurables &&
                (prospect.measurables.fortyYardDash ||
                  prospect.measurables.verticalJump ||
                  prospect.measurables.benchPress) && (
                  <div className="mt-3.5 flex gap-2.5">
                    {prospect.measurables.fortyYardDash && (
                      <div className="flex-1 rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">40</span>
                        <p className="text-xs font-bold text-gray-900 mt-0.5">{prospect.measurables.fortyYardDash}s</p>
                      </div>
                    )}
                    {prospect.measurables.verticalJump && (
                      <div className="flex-1 rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Vert</span>
                        <p className="text-xs font-bold text-gray-900 mt-0.5">{prospect.measurables.verticalJump}"</p>
                      </div>
                    )}
                    {prospect.measurables.benchPress && (
                      <div className="flex-1 rounded-lg bg-gray-50 border border-gray-100 px-2 py-1.5 text-center">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Bench</span>
                        <p className="text-xs font-bold text-gray-900 mt-0.5">{prospect.measurables.benchPress}</p>
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
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-rose-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors shadow-sm"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 text-sm font-semibold rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors ${
                  currentPage === page
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:text-rose-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-rose-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      )}

      {prospects.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No prospects found with the selected filters</p>
        </div>
      )}
    </div>
  );
}
