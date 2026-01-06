'use client';

import { useState, useEffect } from 'react';
import { getMockDraft, getMockDrafts } from '@/lib/adapters';
import { MockDraft } from '@/types';

export function WeeklyMock() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [mockDraft, setMockDraft] = useState<MockDraft | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMockDraft();
  }, [selectedWeek, selectedSeason]);

  async function loadMockDraft() {
    try {
      setLoading(true);
      const data = await getMockDraft(selectedWeek, selectedSeason);
      setMockDraft(data);
    } catch (error) {
      console.error('Error loading mock draft:', error);
    } finally {
      setLoading(false);
    }
  }

  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const seasons = [2024, 2023];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
        >
          {seasons.map(season => (
            <option key={season} value={season}>{season} Season</option>
          ))}
        </select>

        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
        >
          {weeks.map(week => (
            <option key={week} value={week}>Week {week}</option>
          ))}
        </select>
      </div>

      {mockDraft ? (
        <div>
          {/* Mock Draft Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Week {mockDraft.week} Mock Draft v{mockDraft.version}
              </h3>
              <p className="text-sm text-gray-600">
                Created: {new Date(mockDraft.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Picks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDraft.picks.map((pick) => (
              <div key={pick.pick} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-nfl-blue mb-2">#{pick.pick}</div>
                  <div className="text-sm text-gray-600 mb-2">
                    {pick.teamId.charAt(0).toUpperCase() + pick.teamId.slice(1)}
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {pick.prospectId}
                  </div>
                  {pick.trade && (
                    <div className="mt-2 text-xs text-gray-500 bg-yellow-100 p-2 rounded">
                      Trade: {pick.trade.fromTeamId} → {pick.trade.toTeamId}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No mock draft available for Week {selectedWeek} of the {selectedSeason} season
        </div>
      )}
    </div>
  );
}
