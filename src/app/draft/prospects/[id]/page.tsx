import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getProspectById, getBigBoard, getMockDraftNotesForProspect } from '@/lib/adapters';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';

interface ProspectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProspectPageProps): Promise<Metadata> {
  const prospect = await getProspectById(params.id);
  if (!prospect) {
    return { title: 'Prospect Not Found' };
  }
  return {
    title: `${prospect.name} - ${prospect.position} - ${prospect.school} | 2026 NFL Draft`,
    description: `${prospect.name}, ${prospect.position} from ${prospect.school}. ${prospect.height}, ${prospect.weight} lbs. Big Board rank #${prospect.bigBoardRank || 'N/A'}.`,
  };
}

export async function generateStaticParams() {
  const prospects = await getBigBoard();
  return prospects.map((p) => ({ id: p.id }));
}

export default async function ProspectPage({ params }: ProspectPageProps) {
  const prospect = await getProspectById(params.id);

  if (!prospect) {
    notFound();
  }

  const mockDraftNotes = getMockDraftNotesForProspect(prospect.name);
  const teamColor = prospect.team ? TEAM_COLORS_BY_NAME[prospect.team] : undefined;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/draft"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Draft
        </Link>

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {prospect.bigBoardRank && (
                <span
                  className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2.5 text-sm font-bold text-white bg-nfl-blue"
                >
                  #{prospect.bigBoardRank}
                </span>
              )}
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {prospect.position}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-2">
              {prospect.name}
            </h1>
            <p className="text-lg text-gray-600">
              {prospect.school} · {prospect.class}
            </p>
          </div>

          {/* Stats */}
          <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              Physical
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500">Height</p>
                <p className="text-base font-semibold text-gray-900">{prospect.height}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-base font-semibold text-gray-900">{prospect.weight} lbs</p>
              </div>
              {prospect.ras != null && (
                <div>
                  <p className="text-xs text-gray-500">RAS</p>
                  <p className="text-base font-semibold text-gray-900">{prospect.ras}/10</p>
                </div>
              )}
            </div>
          </div>

          {/* Mock Draft Projection */}
          {prospect.mockDraftRound && prospect.mockDraftPick && prospect.team && (
            <div
              className="border-t border-gray-200 px-6 py-6 sm:px-8"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: teamColor || '#1d4ed8',
              }}
            >
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Mock Draft
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                Round {prospect.mockDraftRound}, Pick {prospect.mockDraftPick}
              </p>
              <p className="text-gray-600 mt-1">{prospect.team}</p>
              <Link
                href="/articles/post-super-bowl-mock-draft-2026"
                className="inline-block mt-3 text-sm font-medium text-nfl-red hover:underline"
              >
                Read full analysis →
              </Link>
            </div>
          )}

          {/* Analysis / Notes */}
          {mockDraftNotes && (
            <div className="border-t border-gray-200 px-6 py-6 sm:px-8 bg-gray-50/50">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                Analysis
              </h2>
              <p className="text-gray-800 leading-relaxed">
                {mockDraftNotes}
              </p>
            </div>
          )}

          {/* Measurables */}
          {prospect.measurables && (prospect.measurables.fortyYardDash || prospect.measurables.verticalJump || prospect.measurables.benchPress) && (
            <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                Measurables
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {prospect.measurables.fortyYardDash && (
                  <div>
                    <p className="text-xs text-gray-500">40-yard dash</p>
                    <p className="text-base font-semibold text-gray-900">{prospect.measurables.fortyYardDash}s</p>
                  </div>
                )}
                {prospect.measurables.verticalJump && (
                  <div>
                    <p className="text-xs text-gray-500">Vertical jump</p>
                    <p className="text-base font-semibold text-gray-900">{prospect.measurables.verticalJump}&quot;</p>
                  </div>
                )}
                {prospect.measurables.benchPress && (
                  <div>
                    <p className="text-xs text-gray-500">Bench press</p>
                    <p className="text-base font-semibold text-gray-900">{prospect.measurables.benchPress} reps</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
