import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getProspectById, getBigBoard, getMockDraftNotesForProspect, getProspectAge } from '@/lib/adapters';
import { getSchoolPrimaryColor } from '@/lib/adapters/colleges';
import { ImpactMeter } from '@/components/draft/ImpactMeter';
import { PlayStyleTags } from '@/components/draft/PlayStyleTags';
import { SeasonStats } from '@/components/draft/SeasonStats';
import { CollegeLogo } from '@/components/shared/CollegeLogo';

interface ProspectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProspectPageProps): Promise<Metadata> {
  const { id } = await params;
  const prospect = await getProspectById(id);
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

function getDraftProjection(rank: number): string {
  if (rank <= 5) return 'Top 5';
  if (rank <= 10) return 'Top 10';
  if (rank <= 20) return 'Middle First Round';
  if (rank <= 32) return 'Late First Round';
  if (rank <= 64) return 'Second Round';
  return 'Third Round';
}

export default async function ProspectPage({ params }: ProspectPageProps) {
  const { id } = await params;
  const prospect = await getProspectById(id);

  if (!prospect) {
    notFound();
  }

  const mockDraftNotes = getMockDraftNotesForProspect(prospect.name);
  const profile = prospect.profile;
  const schoolColor = getSchoolPrimaryColor(prospect.school);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/draft"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-8 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Draft
        </Link>

        <div
          className="relative bg-white rounded-3xl border-2 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),0_8px_48px_-8px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.1),0_16px_64px_-8px_rgba(0,0,0,0.08)]"
          style={{ borderColor: schoolColor }}
        >
          {/* Header - Hero section with full gradient */}
          <div
            className="relative px-6 py-10 sm:px-10 sm:py-12"
            style={{
              background: `linear-gradient(135deg, ${schoolColor}18 0%, ${schoolColor}0a 40%, rgba(255,255,255,0.98) 100%)`,
            }}
          >
            <div className="relative flex flex-wrap items-start gap-6">
              <div
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-md flex items-center justify-center backdrop-blur-md border border-white/60"
                style={{ backgroundColor: `${schoolColor}12`, boxShadow: `0 4px 14px -2px ${schoolColor}25` }}
              >
                <CollegeLogo school={prospect.school} size={48} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {prospect.bigBoardRank && (
                    <span className="inline-flex h-8 items-center justify-center rounded-xl px-3 text-xs font-bold text-white bg-gray-900 shadow-sm">
                      #{prospect.bigBoardRank}
                    </span>
                  )}
                  <span className="inline-flex items-center rounded-xl bg-gray-100/90 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200/60">
                    {prospect.position}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl tracking-tight">
                  {prospect.name}
                </h1>
                <p className="text-base text-gray-600 mt-1">
                  {prospect.school} · {prospect.class}
                </p>
                <div className="mt-5 flex flex-wrap gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-gray-400">Ht</span>
                    <span className="font-semibold text-gray-900">{prospect.height}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-gray-400">Wt</span>
                    <span className="font-semibold text-gray-900">{prospect.weight} lbs</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs uppercase tracking-wider text-gray-400">Age</span>
                    <span className="font-semibold text-gray-900">
                      {getProspectAge(prospect) != null ? `${getProspectAge(prospect)} yrs (draft day)` : '—'}
                    </span>
                  </div>
                </div>
                {prospect.bigBoardRank != null && (
                  <p className="mt-3 text-sm font-medium text-gray-600">
                    Projected Pick: {getDraftProjection(prospect.bigBoardRank)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Impact Meters */}
          {profile && (
            <div className="border-t border-gray-100/80 px-6 py-8 sm:px-10 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
                Impact & Projection
              </h2>
              <div className="space-y-5">
                <ImpactMeter
                  label="Immediate Impact"
                  value={profile.immediateImpact}
                  variant="impact"
                />
                <ImpactMeter
                  label="Potential"
                  value={profile.potential}
                  variant="potential"
                />
                <ImpactMeter
                  label="Risk Level"
                  value={profile.riskLevel}
                  variant="risk"
                />
              </div>
            </div>
          )}

          {/* Play Style Tags */}
          {profile?.playStyleTags && profile.playStyleTags.length > 0 && (
            <div className="border-t border-gray-100/80 px-6 py-8 sm:px-10 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
                Play Style
              </h2>
              <PlayStyleTags tags={profile.playStyleTags} />
            </div>
          )}

          {/* Analysis */}
          {(profile?.analysis || mockDraftNotes) && (
            <div className="border-t border-gray-100/80 px-6 py-8 sm:px-10 bg-gray-50/40 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-4">
                Analysis
              </h2>
              <p className="text-gray-700 leading-relaxed text-[15px] tracking-tight">
                {profile?.analysis ?? mockDraftNotes}
              </p>
            </div>
          )}

          {/* Last Season Stats */}
          <div className="border-t border-gray-100/80 px-6 py-8 sm:px-10 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
              2025 Season Stats
            </h2>
            <SeasonStats prospect={prospect} />
          </div>

          {/* Measurables */}
          {prospect.measurables &&
            (prospect.measurables.fortyYardDash ||
              prospect.measurables.verticalJump ||
              prospect.measurables.benchPress) && (
              <div className="border-t border-gray-100/80 px-6 py-8 sm:px-10 bg-gray-50/40 animate-slide-up opacity-0" style={{ animationDelay: '0.5s' }}>
                <h2 className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.2em] mb-5">
                  Measurables
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {prospect.measurables.fortyYardDash && (
                    <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-gray-200/60 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">40-yard</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {prospect.measurables.fortyYardDash}s
                      </p>
                    </div>
                  )}
                  {prospect.measurables.verticalJump && (
                    <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-gray-200/60 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Vertical</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {prospect.measurables.verticalJump}&quot;
                      </p>
                    </div>
                  )}
                  {prospect.measurables.benchPress && (
                    <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-gray-200/60 shadow-sm backdrop-blur-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Bench</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {prospect.measurables.benchPress} <span className="text-sm font-normal text-gray-500">reps</span>
                      </p>
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
