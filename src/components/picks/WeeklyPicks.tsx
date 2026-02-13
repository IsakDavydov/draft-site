'use client';

import { useState, useEffect } from 'react';
import { getWeeklyPicks, getPicksHistory } from '@/lib/adapters';
import type { WeeklyPicks as WeeklyPicksType } from '@/types';

export function WeeklyPicks() {
  const [weeklyPicks, setWeeklyPicks] = useState<WeeklyPicksType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(2026);

  useEffect(() => {
    loadPicks();
  }, [selectedWeek, selectedSeason]);

  async function loadPicks() {
    try {
      setLoading(true);
      const data = await getWeeklyPicks(selectedWeek, selectedSeason);
      setWeeklyPicks(data);
    } catch (error) {
      console.error('Error loading picks:', error);
    } finally {
      setLoading(false);
    }
  }

  // Only show 2026 season
  const seasons = [2026];
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Season and Week Selector */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Season:</label>
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-nfl-green focus:border-transparent"
          >
            {seasons.map(season => (
              <option key={season} value={season}>{season} Season</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Week:</label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-nfl-green focus:border-transparent"
          >
            {weeks.map(week => (
              <option key={week} value={week}>Week {week}</option>
            ))}
          </select>
        </div>
      </div>

      {/* No Picks Message for 2026 Season */}
      {selectedSeason === 2026 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Picks Yet</h3>
            <p className="text-gray-600 mb-4">
              The 2026 NFL season hasn't started yet. Your weekly picks will appear here once the season begins.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="text-sm text-blue-800">
                <strong>Season Start:</strong> September 2026<br />
                <strong>First Picks:</strong> Week 1 games
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Picks Display (will show when picks are available) */}
      {weeklyPicks && weeklyPicks.picks.length > 0 && (
        <div className="space-y-4">
          {weeklyPicks.picks.map((pick) => (
            <div key={pick.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    pick.result === 'win' ? 'bg-green-500' :
                    pick.result === 'loss' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {pick.type === 'spread' ? 'Spread' : 'Total'} Pick
                    </div>
                    <div className="text-sm text-gray-600">
                      {pick.selection === 'home' ? 'Home Team' : 
                       pick.selection === 'away' ? 'Away Team' : 
                       pick.selection === 'over' ? 'Over' : 'Under'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Confidence: {pick.confidence}/5
                  </div>
                  <div className="text-sm text-gray-600">
                    Units: {pick.units}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Week Summary (will show when picks are available) */}
      {weeklyPicks && weeklyPicks.picks.length > 0 && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-gray-900">{weeklyPicks.record.wins}</div>
              <div className="text-sm text-gray-600">Wins</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{weeklyPicks.record.losses}</div>
              <div className="text-sm text-gray-600">Losses</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900">{weeklyPicks.record.pushes}</div>
              <div className="text-sm text-gray-600">Pushes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
