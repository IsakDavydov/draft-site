import { Suspense } from 'react';
import { ProspectDirectory } from '@/components/draft/ProspectDirectory';
import { BigBoard } from '@/components/draft/BigBoard';
import { WeeklyMock } from '@/components/draft/WeeklyMock';
import { SectionHeader } from '@/components/shared/SectionHeader';

export default function DraftPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="NFL Draft"
          description="Prospect database, big board rankings, and weekly mock drafts"
        />
        
        <div className="space-y-8">
          {/* Prospect Directory */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Prospect Directory</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading prospects...</div>}>
                <ProspectDirectory />
              </Suspense>
            </div>
          </div>

          {/* Big Board */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Big Board</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading big board...</div>}>
                <BigBoard />
              </Suspense>
            </div>
          </div>

          {/* Weekly Mock Draft */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Mock Draft</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div>Loading mock draft...</div>}>
                <WeeklyMock />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
