'use client';

import { useState, useEffect } from 'react';
import { getSeasonRecord } from '@/lib/adapters';

export function PickRecord() {
  const [seasonRecord, setSeasonRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(2026);

  useEffect(() => {
    loadSeasonRecord();
  }, [selectedSeason]);

  async function loadSeasonRecord() {
    try {
      setLoading(true);
      const data = await getSeasonRecord(selectedSeason);
      setSeasonRecord(data);
    } catch (error) {
      console.error('Error loading season record:', error);
    } finally {
      setLoading(false);
    }
  }

  // Only show 2026 season since that's what we're tracking
  const seasons = [2026];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!seasonRecord) {
    return (
      <div className="text-center py-8 text-gray-500">
        No season record available for {selectedSeason}
      </div>
    );
  }

  const winRate = seasonRecord.totalWins + seasonRecord.totalLosses > 0 
    ? (seasonRecord.totalWins / (seasonRecord.totalWins + seasonRecord.totalLosses)) * 100 
    : 0;

  return (
    <div>
      {/* Season Selector - Only 2026 */}
      <div className="flex justify-center mb-6">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 mb-2">2026 NFL Season</div>
          <div className="text-sm text-gray-600">Fresh start - no picks yet!</div>
        </div>
      </div>

      {/* Season Summary - All 0s */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{seasonRecord.totalWins}</div>
          <div className="text-sm text-gray-600">Total Wins</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{seasonRecord.totalLosses}</div>
          <div className="text-sm text-gray-600">Total Losses</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{seasonRecord.totalPushes}</div>
          <div className="text-sm text-gray-600">Total Pushes</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{winRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Win Rate</div>
        </div>
      </div>

      {/* Units and ROI - All 0s */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-900">{seasonRecord.totalUnits}</div>
          <div className="text-sm text-gray-600">Total Units Wagered</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {seasonRecord.totalRoi.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Total ROI</div>
        </div>
      </div>

      {/* Season Start Message */}
      <div className="mt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-lg font-medium text-blue-900 mb-2">2026 Season Starting Soon!</div>
          <div className="text-sm text-blue-700">
            The 2026 NFL season begins in September. Your picks and performance tracking will appear here once the season starts.
          </div>
        </div>
      </div>
    </div>
  );
}
