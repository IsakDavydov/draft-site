'use client';

import { useState, useEffect } from 'react';
import { getProspects } from '@/lib/adapters';
import { Prospect } from '@/types';
import { getPositionAbbreviation } from '@/lib/utils';

export function ProspectDirectory() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    position: '',
    school: '',
  });

  useEffect(() => {
    loadProspects();
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

  const positions = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'CB', 'S', 'K', 'P'];
  const schools = Array.from(new Set(prospects.map(p => p.school))).sort();

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

      {/* Prospects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prospects.map((prospect) => (
          <div key={prospect.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{prospect.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="font-medium">{prospect.position}</span>
                  <span>•</span>
                  <span>{prospect.school}</span>
                  <span>•</span>
                  <span>{prospect.class}</span>
                </div>
              </div>
              {prospect.bigBoardRank && (
                <div className="bg-nfl-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{prospect.bigBoardRank}
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Height:</span>
                <span className="font-medium">{prospect.height}</span>
              </div>
              <div className="flex justify-between">
                <span>Weight:</span>
                <span className="font-medium">{prospect.weight} lbs</span>
              </div>
              {prospect.ras && (
                <div className="flex justify-between">
                  <span>RAS:</span>
                  <span className="font-medium">{prospect.ras}/10</span>
                </div>
              )}
            </div>

            {prospect.measurables && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Measurables
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {prospect.measurables.fortyYardDash && (
                    <div className="flex justify-between">
                      <span>40:</span>
                      <span className="font-medium">{prospect.measurables.fortyYardDash}s</span>
                    </div>
                  )}
                  {prospect.measurables.verticalJump && (
                    <div className="flex justify-between">
                      <span>Vert:</span>
                      <span className="font-medium">{prospect.measurables.verticalJump}"</span>
                    </div>
                  )}
                  {prospect.measurables.benchPress && (
                    <div className="flex justify-between">
                      <span>Bench:</span>
                      <span className="font-medium">{prospect.measurables.benchPress}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {prospect.mockDraftRound && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Mock Draft
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Round {prospect.mockDraftRound}, Pick {prospect.mockDraftPick}
                  </div>
                  {prospect.team && (
                    <div className="text-xs text-gray-600 mt-1">
                      to {prospect.team}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {prospects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No prospects found with the selected filters
        </div>
      )}
    </div>
  );
}
