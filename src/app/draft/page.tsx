import { Suspense } from 'react';
import Link from 'next/link';
import { ProspectDirectory } from '@/components/draft/ProspectDirectory';
import { BigBoard } from '@/components/draft/BigBoard';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FileText } from 'lucide-react';

export default function DraftPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="NFL Draft"
          description="Prospect database and big board rankings"
        />

        <Link
          href="/articles/post-super-bowl-mock-draft-2026"
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-nfl-red px-6 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-nfl-red/90 hover:shadow-md"
        >
          <FileText className="h-5 w-5" />
          Post Super Bowl Mock Draft 2026
        </Link>
        
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
        </div>
      </div>
    </div>
  );
}
