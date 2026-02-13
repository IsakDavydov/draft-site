import { Suspense } from 'react';
import { StandingsTable } from '@/components/season/StandingsTable';
import { PlayoffOddsChart } from '@/components/season/PlayoffOddsChart';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function SeasonPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="NFL Season"
          description="Standings, playoff odds, and team analysis"
        />
        
        <div className="space-y-8">
          {/* Standings Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Standings</h2>
            </div>
            <Suspense fallback={<div className="p-6">Loading standings...</div>}>
              <StandingsTable />
            </Suspense>
          </div>

          {/* Playoff Odds Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Playoff Odds</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading playoff odds...</div>}>
                <PlayoffOddsChart />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
