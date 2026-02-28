import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Trophy, ArrowLeft, Users } from 'lucide-react';
import { sanitizeDisplayName } from '@/lib/display-name-filter';
import { calculatePreDraftScore, getDraftOrder2026, getEffectiveDraftOrder } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: GroupDetailPageProps) {
  const { id: groupId } = await params;
  const supabase = await createClient();
  const { data: group } = await supabase
    .from('groups')
    .select('name')
    .eq('id', groupId)
    .single();
  return {
    title: group ? `${group.name} | Group Leaderboard` : 'Group Leaderboard',
  };
}

interface GroupDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id: groupId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/signin?next=/groups/' + groupId);
  }

  // Verify membership and load group
  const { data: membership } = await supabase
    .from('group_members')
    .select('role')
    .eq('group_id', groupId)
    .eq('user_id', user.id)
    .single();

  if (!membership) {
    notFound();
  }

  const { data: group } = await supabase
    .from('groups')
    .select('id, name, invite_code')
    .eq('id', groupId)
    .single();

  if (!group) {
    notFound();
  }

  const [
    { data: leaderboard, error },
    { data: members },
    { count: resultsCount },
  ] = await Promise.all([
    supabase.rpc('get_group_leaderboard', { p_group_id: groupId, p_year: 2026 }),
    supabase.rpc('get_group_members', { p_group_id: groupId }),
    supabase.from('draft_results').select('*', { count: 'exact', head: true }).eq('draft_year', 2026),
  ]);

  const hasResults = (resultsCount ?? 0) > 0;

  // Pre-draft scores when no results yet
  let preDraftLeaderboard: { display_name: string; score: number; rank: number }[] = [];
  if (!hasResults) {
    const { data: memberRows } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId);

    if (memberRows && memberRows.length > 0) {
      const memberIds = memberRows.map((r: { user_id: string }) => r.user_id);
      const defaultOrder = getDraftOrder2026();
      const { data: predictions } = await supabase
        .from('draft_predictions')
        .select('id, display_name, custom_draft_order')
        .eq('draft_year', 2026)
        .eq('is_leaderboard_entry', true)
        .in('user_id', memberIds);

      if (predictions && predictions.length > 0) {
        const { data: picks } = await supabase
          .from('prediction_picks')
          .select('prediction_id, pick_number, prospect_id, team')
          .in('prediction_id', predictions.map((p: { id: string }) => p.id));

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
            const effectiveOrder = getEffectiveDraftOrder(defaultOrder, pred.custom_draft_order ?? null);
            const picksWithTeam = predPicks.map((p) => ({
              ...p,
              team: effectiveOrder.find((d) => d.pick === p.pick_number)?.team ?? p.team,
            }));
            return {
              display_name: pred.display_name || 'Player',
              score: calculatePreDraftScore(picksWithTeam),
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
  }

  const showPreDraft = !hasResults && preDraftLeaderboard.length > 0;
  const showMembersOnly = !hasResults && preDraftLeaderboard.length === 0 && members && members.length > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Groups
          </Link>
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 text-sm text-nfl-blue hover:underline"
          >
            Predict →
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-full bg-nfl-blue/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-nfl-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-gray-600 mt-1">
              Invite code: <span className="font-mono font-medium">{group.invite_code}</span>
            </p>
          </div>
        </div>

        {!hasResults ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {showPreDraft
                ? 'Scores will update after the 2026 NFL Draft.'
                : showMembersOnly
                  ? 'Submit predictions to see the leaderboard.'
                  : 'Submit predictions to compete.'}
            </p>
            {showPreDraft ? (
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {preDraftLeaderboard.map((row, i) => (
                      <tr key={row.display_name + i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                              row.rank === 1
                                ? 'bg-amber-400 text-amber-900'
                                : row.rank === 2
                                  ? 'bg-gray-300 text-gray-700'
                                  : row.rank === 3
                                    ? 'bg-amber-700 text-amber-100'
                                    : 'bg-gray-100 text-gray-700'
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
            ) : showMembersOnly ? (
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((row: { display_name: string; rank: number }, i: number) => (
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
            ) : (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
                <p className="text-gray-600">No members have submitted predictions yet.</p>
                <Link
                  href="/predict"
                  className="inline-block mt-4 text-nfl-red font-medium hover:underline"
                >
                  Submit your predictions →
                </Link>
              </div>
            )}
            {(showPreDraft || showMembersOnly) && (
              <p className="mt-4 text-sm text-gray-500">
                <Link href="/predict" className="text-nfl-red font-medium hover:underline">
                  Submit your predictions →
                </Link>{' '}
                {showPreDraft ? 'to join or update your score.' : 'to join the leaderboard.'}
              </p>
            )}
          </>
        ) : error ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-red-600">Unable to load leaderboard. Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-gray-600">No scores yet. Scores appear after the 2026 NFL Draft.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((row: { display_name: string; score: number; rank: number }, i: number) => (
                  <tr key={row.display_name + i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          row.rank === 1
                            ? 'bg-amber-400 text-amber-900'
                            : row.rank === 2
                              ? 'bg-gray-300 text-gray-700'
                              : row.rank === 3
                                ? 'bg-amber-700 text-amber-100'
                                : 'bg-gray-100 text-gray-700'
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
