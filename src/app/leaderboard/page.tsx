import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/admin';
import Link from 'next/link';
import { Trophy, ArrowLeft, Zap, Users } from 'lucide-react';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { LeaderboardLiveRefresh } from '@/components/leaderboard/LeaderboardLiveRefresh';
import { calculatePreDraftScore } from '@/lib/adapters';
import { resolveDraftDisplayLabel } from '@/lib/display-name-filter';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leaderboard',
  description: '2026 NFL Draft prediction leaderboard. See who has the best mock draft.',
};

export default async function LeaderboardPage() {
  const supabase = createServiceRoleClient() ?? (await createClient());

  const [
    { data: leaderboard, error },
    { data: participants },
    { count: resultsCount },
    { data: predictions },
  ] = await Promise.all([
    supabase.rpc('get_leaderboard', { p_year: 2026 }),
    supabase.rpc('get_leaderboard_participants', { p_year: 2026 }),
    supabase.from('draft_results').select('*', { count: 'exact', head: true }).eq('draft_year', 2026),
    supabase.from('draft_predictions').select('id, display_name, name').eq('draft_year', 2026).eq('is_leaderboard_entry', true),
  ]);

  const hasResults = (resultsCount ?? 0) > 0;

  // Pre-draft scores when no results yet
  let preDraftLeaderboard: { display_name: string; score: number; rank: number; prediction_id: string }[] = [];
  if (!hasResults && predictions && predictions.length > 0) {
    const { data: picks } = await supabase
      .from('prediction_picks')
      .select('prediction_id, pick_number, prospect_id, team')
      .in('prediction_id', predictions.map((p) => p.id));

    const picksByPrediction = new Map<string, Array<{ pick_number: number; prospect_id: string; team: string }>>();
    for (const pick of picks ?? []) {
      const list = picksByPrediction.get(pick.prediction_id) ?? [];
      list.push({
        pick_number: pick.pick_number,
        prospect_id: pick.prospect_id,
        team: pick.team,
      });
      picksByPrediction.set(pick.prediction_id, list);
    }

    const withScores = predictions
      .map((pred: { id: string; display_name: string | null; name: string | null }) => {
        const predPicks = picksByPrediction.get(pred.id) ?? [];
        const label = resolveDraftDisplayLabel(pred.display_name, pred.name);
        return {
          display_name: label ?? '',
          score: calculatePreDraftScore(predPicks),
          prediction_id: pred.id,
          pickCount: predPicks.length,
        };
      })
      .filter((row) => row.pickCount > 0)
      .map(({ pickCount: _c, ...row }) => row);

    withScores.sort((a, b) => b.score - a.score);
    preDraftLeaderboard = withScores.map((row, i) => ({
      ...row,
      rank: i + 1,
    }));
  }

  // Participant count for stats strip
  const participantCount = hasResults
    ? (leaderboard?.length ?? 0)
    : preDraftLeaderboard.length > 0
      ? preDraftLeaderboard.length
      : (participants?.length ?? 0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-nfl-red via-[#012252] to-[#001530]">
        <div className="absolute inset-0 hero-lines pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
                <Trophy className="h-3 w-3" />
                2026 Draft Challenge
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Draft Leaderboard
              </h1>
              <p className="mt-2 text-base leading-relaxed text-gray-300/90">
                {hasResults
                  ? 'Final standings — ranked by correct first-round picks'
                  : 'Live rankings before draft night. Submit your picks to compete.'}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Submit picks
                </Link>
                <Link
                  href="/groups"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  <Users className="h-3.5 w-3.5" />
                  Private groups
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <DraftCountdown variant="compact" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats Strip ─────────────────────────────────────────────────── */}
      {participantCount > 0 && (
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-8 py-4">
              <div>
                <p className="font-display text-2xl font-extrabold tabular-nums text-gray-900">{participantCount}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Competitors</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <p className="font-display text-2xl font-extrabold text-gray-900">480</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Max Points</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <p className="font-display text-2xl font-extrabold text-gray-900">32</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Round 1 Picks</p>
              </div>
              {hasResults && (
                <>
                  <div className="h-8 w-px bg-gray-200" />
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-green-700">Live</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── Content ─────────────────────────────────────────────────────── */}
      <div className="leaderboard-inner mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

        <Link
          href="/predict"
          className="group mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Predictions
        </Link>

        {!hasResults ? (
          <>
            {preDraftLeaderboard.length > 0 ? (
              <>
                <p className="mb-4 text-sm text-gray-500">
                  Scores will update after the 2026 NFL Draft. Based on completeness and team-fit.
                </p>
                <LeaderboardTable
                  rows={preDraftLeaderboard}
                  showScores
                  scoreSuffix=""
                />
                <p className="mt-3 text-xs text-gray-400">
                  Click a name to preview their first-round picks 1–10.
                </p>
              </>
            ) : (!participants || participants.length === 0) ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-nfl-blue/10">
                  <Trophy className="h-7 w-7 text-nfl-blue" />
                </div>
                <p className="font-display text-lg font-bold text-gray-900">No predictions yet</p>
                <p className="mt-1 text-sm text-gray-500">Be the first to submit and claim the #1 spot.</p>
                <Link
                  href="/predict"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-nfl-blue/90 hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4" />
                  Submit your predictions
                </Link>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-500">
                  Scores will appear after the 2026 NFL Draft.
                </p>
                <LeaderboardTable
                  rows={participants.map(
                    (p: { prediction_id?: string; display_name: string; rank: number }) => ({
                      prediction_id: p.prediction_id,
                      display_name: p.display_name,
                      rank: Number(p.rank),
                    })
                  )}
                  showScores={false}
                />
                <p className="mt-3 text-xs text-gray-400">
                  Click a name to preview their first-round picks 1–10.
                </p>
              </>
            )}
            {(preDraftLeaderboard.length > 0 || (participants && participants.length > 0)) && (
              <p className="mt-5 text-sm text-gray-500">
                <Link href="/predict" className="font-bold text-nfl-blue hover:text-nfl-blue/80 transition-colors">
                  Submit your predictions →
                </Link>{' '}
                {preDraftLeaderboard.length > 0 ? 'to join or update your score.' : 'to join the leaderboard.'}
              </p>
            )}
          </>
        ) : error ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="font-semibold text-red-600">Unable to load leaderboard.</p>
            <p className="mt-1 text-sm text-gray-500">Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-nfl-blue/10">
              <Trophy className="h-7 w-7 text-nfl-blue" />
            </div>
            <p className="font-display text-lg font-bold text-gray-900">No predictions yet</p>
            <p className="mt-1 text-sm text-gray-500">Be the first to submit and claim the #1 spot.</p>
            <Link
              href="/predict"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-nfl-blue/90 hover:scale-[1.02]"
            >
              <Zap className="h-4 w-4" />
              Submit your predictions
            </Link>
          </div>
        ) : (
          <>
            <LeaderboardTable
              rows={leaderboard.map(
                (r: {
                  prediction_id?: string;
                  display_name: string;
                  score: number | bigint;
                  rank: number | bigint;
                }) => ({
                  prediction_id: r.prediction_id,
                  display_name: r.display_name,
                  score: Number(r.score),
                  rank: Number(r.rank),
                })
              )}
              showScores
              scoreSuffix="pts"
            />
            <p className="mt-3 text-xs text-gray-400">
              Click a name to preview their first-round picks 1–10.
            </p>
          </>
        )}

        {/* Scoring key + live indicator */}
        {hasResults && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-green-100 text-[10px] font-bold text-green-800">15</span>
              <span className="text-xs text-gray-600">correct pick + team</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-yellow-100 text-[10px] font-bold text-yellow-800">5</span>
              <span className="text-xs text-gray-600">off by 1 pick</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 shadow-sm">
              <span className="text-[10px] font-bold text-gray-500">480</span>
              <span className="text-xs text-gray-600">max possible</span>
            </div>
            <LeaderboardLiveRefresh enabled={hasResults} />
          </div>
        )}
      </div>
    </div>
  );
}
