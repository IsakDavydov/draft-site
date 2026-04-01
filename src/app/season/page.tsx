import { Suspense } from 'react';
import { StandingsTable } from '@/components/season/StandingsTable';
import { PlayoffOddsChart } from '@/components/season/PlayoffOddsChart';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function SeasonPage() {
  return (
    <div className="bg-sak-darker min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="NFL Season"
          description="Standings, playoff odds, and team analysis"
        />

        <div className="space-y-8">
          {/* Standings Section */}
          <div className="bg-sak-card rounded-2xl border border-white/[0.06] shadow-card">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-white">Standings</h2>
            </div>
            <Suspense fallback={<div className="p-6">Loading standings...</div>}>
              <StandingsTable />
            </Suspense>
          </div>

          {/* Playoff Odds Section */}
          <div className="bg-sak-card rounded-2xl border border-white/[0.06] shadow-card">
            <div className="px-6 py-4 border-b border-white/[0.06]">
              <h2 className="text-lg font-semibold text-white">Playoff Odds</h2>
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
