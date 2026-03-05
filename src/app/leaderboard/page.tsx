import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { calculatePreDraftScore } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leaderboard',
  description: '2026 NFL Draft prediction leaderboard. See who has the best mock draft.',
};

export default async function LeaderboardPage() {
  const supabase = await createClient();

  const [
    { data: leaderboard, error },
    { data: participants },
    { count: resultsCount },
    { data: predictions },
  ] = await Promise.all([
    supabase.rpc('get_leaderboard', { p_year: 2026 }),
    supabase.rpc('get_leaderboard_participants', { p_year: 2026 }),
    supabase.from('draft_results').select('*', { count: 'exact', head: true }).eq('draft_year', 2026),
    supabase.from('draft_predictions').select('id, display_name').eq('draft_year', 2026).eq('is_leaderboard_entry', true),
  ]);

  const hasResults = (resultsCount ?? 0) > 0;

  // Pre-draft scores when no results yet (works with base schema - no is_leaderboard_entry or custom_draft_order)
  let preDraftLeaderboard: { display_name: string; score: number; rank: number }[] = [];
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
      .map((pred) => {
        const predPicks = picksByPrediction.get(pred.id) ?? [];
        if (predPicks.length === 0) return null;
        return {
          display_name: pred.display_name,
          score: calculatePreDraftScore(predPicks),
        };
      })
      .filter((x): x is { display_name: string; score: number } => x !== null);

    withScores.sort((a, b) => b.score - a.score);
    preDraftLeaderboard = withScores.map((row, i) => ({
      ...row,
      rank: i + 1,
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white bg-gray-50">
      <div className="leaderboard-inner mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/predict"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-nfl-red transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Predictions
          </Link>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-sm font-medium text-nfl-blue hover:text-nfl-blue/80 transition-colors"
          >
            Compete with friends →
          </Link>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 ring-1 ring-amber-200/60 shadow-card-sm">
                <Trophy className="h-7 w-7 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  2026 Draft Leaderboard
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {hasResults
                    ? 'Everyone who predicted — ranked by correct first-round picks'
                    : 'Everyone competing'}
                </p>
              </div>
            </div>
            <DraftCountdown variant="compact" />
          </div>
        </div>

        {!hasResults ? (
          <>
            <p className="mb-4 text-sm text-gray-600">
              {preDraftLeaderboard.length > 0
                ? 'Scores will update after the 2026 NFL Draft.'
                : 'Scores will appear after the 2026 NFL Draft. Submit predictions to see your score.'}
            </p>
            {preDraftLeaderboard.length > 0 ? (
              <LeaderboardTable
                rows={preDraftLeaderboard}
                showScores
                scoreSuffix=""
              />
            ) : (!participants || participants.length === 0) ? (
              <div className="rounded-3xl border border-gray-200/80 bg-white p-10 text-center shadow-card-sm">
                <p className="text-gray-600">No predictions yet. Be the first!</p>
                <Link
                  href="/predict"
                  className="mt-4 inline-block font-medium text-nfl-red transition-colors hover:text-nfl-red/90"
                >
                  Submit your predictions →
                </Link>
              </div>
            ) : (
              <LeaderboardTable
                rows={participants.map((p: { display_name: string; rank: number }) => ({
                  display_name: p.display_name,
                  rank: p.rank,
                }))}
                showScores={false}
              />
            )}
            {(preDraftLeaderboard.length > 0 || (participants && participants.length > 0)) && (
              <p className="mt-4 text-sm text-gray-500">
                <Link href="/predict" className="text-nfl-red font-medium hover:underline">
                  Submit your predictions →
                </Link>{' '}
                {preDraftLeaderboard.length > 0 ? 'to join or update your score.' : 'to join the leaderboard.'}
              </p>
            )}
          </>
        ) : error ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-card-sm">
            <p className="text-red-600">Unable to load leaderboard. Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-card-sm">
            <p className="text-gray-600">No predictions yet. Be the first!</p>
            <Link
              href="/predict"
              className="mt-4 inline-block font-medium text-nfl-red transition-colors hover:text-nfl-red/90"
            >
              Submit your predictions →
            </Link>
          </div>
        ) : (
          <LeaderboardTable
            rows={leaderboard}
            showScores
            scoreSuffix="pts"
          />
        )}

        {hasResults && (
          <p className="mt-6 text-[13px] text-gray-500">
            15 pts = correct player at correct pick. 5 pts = player went 1 pick before or after. Max 480 pts.
          </p>
        )}
      </div>
    </div>
  );
}
