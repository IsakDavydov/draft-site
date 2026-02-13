import { Suspense } from 'react';
import { WeeklyPicks } from '@/components/picks/WeeklyPicks';
import { PickRecord } from '@/components/picks/PickRecord';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function PicksPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="2026 Season Picks"
          description="Expert picks with confidence ratings, unit tracking, and ROI analysis for the 2026 NFL season"
        />
        
        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Gambling Disclaimer
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  21+ only. This is not investment advice. Please gamble responsibly. 
                  If you have a gambling problem, call 1-800-GAMBLER.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Pick Record */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">2026 Season Record</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading record...</div>}>
                <PickRecord />
              </Suspense>
            </div>
          </div>

          {/* Weekly Picks */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Weekly Picks</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading picks...</div>}>
                <WeeklyPicks />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
