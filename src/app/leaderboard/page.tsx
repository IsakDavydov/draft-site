import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { sanitizeDisplayName } from '@/lib/display-name-filter';
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
  ] = await Promise.all([
    supabase.rpc('get_leaderboard', { p_year: 2026 }),
    supabase.rpc('get_leaderboard_participants', { p_year: 2026 }),
    supabase.from('draft_results').select('*', { count: 'exact', head: true }).eq('draft_year', 2026),
  ]);

  const hasResults = (resultsCount ?? 0) > 0;

  // Pre-draft scores when no results yet (works with base schema - no is_leaderboard_entry or custom_draft_order)
  let preDraftLeaderboard: { display_name: string; score: number; rank: number }[] = [];
  if (!hasResults) {
    const { data: predictions } = await supabase
      .from('draft_predictions')
      .select('id, display_name')
      .eq('draft_year', 2026)
      .eq('is_leaderboard_entry', true);

    if (predictions && predictions.length > 0) {
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
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Predictions
          </Link>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-sm text-nfl-blue hover:underline"
          >
            Compete with friends →
          </Link>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-amber-500" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  2026 Draft Leaderboard
                </h1>
                <p className="text-gray-600 mt-1">
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
            <p className="text-sm text-gray-600 mb-4">
              {preDraftLeaderboard.length > 0
                ? 'Scores will update after the 2026 NFL Draft.'
                : 'Scores will appear after the 2026 NFL Draft. Submit predictions to see your score.'}
            </p>
            {preDraftLeaderboard.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preDraftLeaderboard.map((row, i) => (
                      <tr key={row.display_name + i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              row.rank === 1 ? 'bg-amber-400 text-amber-900' :
                              row.rank === 2 ? 'bg-gray-300 text-gray-700' :
                              row.rank === 3 ? 'bg-amber-700 text-amber-100' :
                              'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {row.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sanitizeDisplayName(row.display_name)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-semibold">
                          {row.score}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (!participants || participants.length === 0) ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
                <p className="text-gray-600">No predictions yet. Be the first!</p>
                <Link
                  href="/predict"
                  className="inline-block mt-4 text-nfl-red font-medium hover:underline"
                >
                  Submit your predictions →
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {participants.map((row: { display_name: string; rank: number }, i: number) => (
                      <tr key={row.display_name + i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                            {row.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sanitizeDisplayName(row.display_name)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right">—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-red-600">Unable to load leaderboard. Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-gray-600">No predictions yet. Be the first!</p>
            <Link
              href="/predict"
              className="inline-block mt-4 text-nfl-red font-medium hover:underline"
            >
              Submit your predictions →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((row: { display_name: string; score: number; rank: number }, i: number) => (
                  <tr key={row.display_name + i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          row.rank === 1 ? 'bg-amber-400 text-amber-900' :
                          row.rank === 2 ? 'bg-gray-300 text-gray-700' :
                          row.rank === 3 ? 'bg-amber-700 text-amber-100' :
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {sanitizeDisplayName(row.display_name)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-semibold">
                      {row.score} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {hasResults && (
          <p className="mt-6 text-sm text-gray-500">
            15 pts = correct player at correct pick. 5 pts = player went 1 pick before or after. Max 480 pts.
          </p>
        )}
      </div>
    </div>
  );
}
