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
  if (rank <= 5) return 'Top 5 Pick';
  if (rank <= 10) return 'Top 10 Pick';
  if (rank <= 20) return 'Mid First Round';
  if (rank <= 32) return 'Late First Round';
  if (rank <= 64) return 'Second Round';
  return 'Third Round';
}

function positionColor(position: string): string {
  switch (position) {
    case 'QB': return '#D50A0A';
    case 'WR': case 'TE': case 'RB': return '#013369';
    case 'OT': case 'IOL': return '#475569';
    case 'EDGE': case 'DT': case 'LB': return '#047857';
    case 'CB': case 'S': return '#7e22ce';
    default: return '#6b7280';
  }
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
  const posColor = positionColor(prospect.position);

  const hasRightContent = true; // always show stats, analysis, or meters

  return (
    <div className="min-h-screen bg-cream-deep">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/draft"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 mb-8 transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Draft
        </Link>

        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* ── Left Column: Identity Card (sticky on desktop) ── */}
          <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-24">
            <div
              className="relative rounded-2xl border-2 overflow-hidden shadow-sm"
              style={{ borderColor: schoolColor }}
            >
              {/* Hero gradient */}
              <div
                className="relative px-6 pt-8 pb-6 bg-white"
                style={{
                  background: `linear-gradient(160deg, ${schoolColor}12 0%, ${schoolColor}06 50%, #ffffff 100%)`,
                }}
              >
                {/* College logo */}
                <div className="flex justify-center mb-5">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm border border-gray-200 bg-white"
                  >
                    <CollegeLogo school={prospect.school} size={54} />
                  </div>
                </div>

                {/* Rank + position badges */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  {prospect.bigBoardRank && (
                    <span className="inline-flex h-7 items-center justify-center rounded-lg px-2.5 text-xs font-black text-white" style={{ backgroundColor: '#D50A0A' }}>
                      #{prospect.bigBoardRank}
                    </span>
                  )}
                  <span
                    className="inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: posColor }}
                  >
                    {prospect.position}
                  </span>
                </div>

                {/* Name */}
                <h1 className="text-center text-2xl font-black tracking-tight text-gray-900 xl:text-3xl">
                  {prospect.name}
                </h1>
                <p className="text-center text-sm text-gray-500 mt-1">
                  {prospect.school} · {prospect.class}
                </p>

                {/* Draft projection */}
                {prospect.bigBoardRank != null && (
                  <div className="mt-4 text-center">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 ring-1 ring-gray-200">
                      Projected: {getDraftProjection(prospect.bigBoardRank)}
                    </span>
                  </div>
                )}
              </div>

              {/* Physical stats */}
              <div className="border-t border-gray-200 bg-white px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 text-center">
                  Physical Profile
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-3 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Ht</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">{prospect.height}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-3 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Wt</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">{prospect.weight}</p>
                  </div>
                  <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-3 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Age</p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {getProspectAge(prospect) != null ? `${getProspectAge(prospect)}` : '—'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Measurables (if any) */}
              {prospect.measurables &&
                (prospect.measurables.fortyYardDash ||
                  prospect.measurables.verticalJump ||
                  prospect.measurables.benchPress) && (
                  <div className="border-t border-gray-200 bg-white px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 text-center">
                      Combine
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {prospect.measurables.fortyYardDash && (
                        <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-2 py-3 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">40 yd</p>
                          <p className="mt-1 text-sm font-bold text-gray-900">{prospect.measurables.fortyYardDash}s</p>
                        </div>
                      )}
                      {prospect.measurables.verticalJump && (
                        <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-2 py-3 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Vert</p>
                          <p className="mt-1 text-sm font-bold text-gray-900">{prospect.measurables.verticalJump}&quot;</p>
                        </div>
                      )}
                      {prospect.measurables.benchPress && (
                        <div className="rounded-xl bg-gray-50 ring-1 ring-gray-200 px-2 py-3 text-center">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">Bench</p>
                          <p className="mt-1 text-sm font-bold text-gray-900">{prospect.measurables.benchPress}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Play style tags */}
              {profile?.playStyleTags && profile.playStyleTags.length > 0 && (
                <div className="border-t border-gray-200 bg-white px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3 text-center">
                    Play Style
                  </p>
                  <PlayStyleTags tags={profile.playStyleTags} />
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: Scouting Content ── */}
          {hasRightContent && (
            <div className="mt-6 lg:mt-0 flex-1 min-w-0 space-y-4">

              {/* Impact Meters */}
              {profile && (
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-6 py-6 animate-slide-up opacity-0" style={{ animationDelay: '0.05s' }}>
                  <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-5">
                    Impact & Projection
                  </h2>
                  <div className="space-y-5">
                    <ImpactMeter label="Immediate Impact" value={profile.immediateImpact} variant="impact" />
                    <ImpactMeter label="Potential" value={profile.potential} variant="potential" />
                    <ImpactMeter label="Risk Level" value={profile.riskLevel} variant="risk" />
                  </div>
                </div>
              )}

              {/* Analysis */}
              {(profile?.analysis || mockDraftNotes) && (
                <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-6 py-6 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
                  <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                    Scouting Report
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-[15px]">
                    {profile?.analysis ?? mockDraftNotes}
                  </p>
                </div>
              )}

              {/* Season Stats */}
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm px-6 py-6 animate-slide-up opacity-0" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-5">
                  2025 Season Stats
                </h2>
                <SeasonStats prospect={prospect} />
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
