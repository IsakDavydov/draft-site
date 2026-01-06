import { Suspense } from 'react';
import { FantasyRankings } from '@/components/fantasy/FantasyRankings';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function FantasyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Fantasy Rankings"
          description="Position-by-position rankings with tier lists and scoring system toggles"
        />
        
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Rankings</h2>
          </div>
          <div className="p-6">
            <Suspense fallback={<div>Loading rankings...</div>}>
              <FantasyRankings />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
