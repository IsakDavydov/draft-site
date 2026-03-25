import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/admin';
import { ArrowLeft, Users, Trophy } from 'lucide-react';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { LeaderboardLiveRefresh } from '@/components/leaderboard/LeaderboardLiveRefresh';
import { calculatePreDraftScore } from '@/lib/adapters';
import { resolveDraftDisplayLabel } from '@/lib/display-name-filter';

export const dynamic = 'force-dynamic';

interface GroupDetailPageProps {
  params: Promise<{ id: string }>;
}

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

export default async function GroupDetailPage({ params }: GroupDetailPageProps) {
  const { id: groupId } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/signin?next=/groups/' + groupId);
  }

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

  // Pre-draft scores when no results yet (works with base schema - no is_leaderboard_entry or custom_draft_order)
  let preDraftLeaderboard: { display_name: string; score: number; rank: number; prediction_id: string }[] = [];
  if (!hasResults) {
    const { data: memberRows } = await supabase
      .from('group_members')
      .select('user_id')
      .eq('group_id', groupId);

    if (memberRows && memberRows.length > 0) {
      const memberIds = memberRows.map((r: { user_id: string }) => r.user_id);
      const dbForLeaderboard = createServiceRoleClient() ?? supabase;
      const { data: predictions } = await dbForLeaderboard
        .from('draft_predictions')
        .select('id, display_name, name')
        .eq('draft_year', 2026)
        .eq('is_leaderboard_entry', true)
        .in('user_id', memberIds);

      if (predictions && predictions.length > 0) {
        const { data: picks } = await dbForLeaderboard
          .from('prediction_picks')
          .select('prediction_id, pick_number, prospect_id, team')
          .in('prediction_id', predictions.map((p) => p.id));

        const picksByPrediction = new Map<string, Array<{ pick_number: number; prospect_id: string; team: string }>>();
        for (const pick of picks ?? []) {
          const list = picksByPrediction.get(pick.prediction_id) ?? [];
          list.push({ pick_number: pick.pick_number, prospect_id: pick.prospect_id, team: pick.team });
          picksByPrediction.set(pick.prediction_id, list);
        }

        const withScores = predictions
          .map((pred: { id: string; display_name: string | null; name: string | null }) => {
            const predPicks = picksByPrediction.get(pred.id) ?? [];
            const label = resolveDraftDisplayLabel(pred.display_name, pred.name);
            return {
              display_name: label || 'Player',
              score: calculatePreDraftScore(predPicks),
              prediction_id: pred.id,
              pickCount: predPicks.length,
            };
          })
          .filter((row) => row.pickCount > 0)
          .map(({ pickCount: _c, ...row }) => row);

        withScores.sort((a, b) => b.score - a.score);
        preDraftLeaderboard = withScores.map((row, i) => ({ ...row, rank: i + 1 }));
      }
    }
  }

  const showPreDraft = !hasResults && preDraftLeaderboard.length > 0;
  const showMembersOnly = !hasResults && preDraftLeaderboard.length === 0 && members && members.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/groups"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-all duration-200 hover:text-nfl-red"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Groups
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-nfl-blue transition-colors hover:text-nfl-blue/80"
            >
              <Trophy className="h-4 w-4" />
              View full leaderboard →
            </Link>
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Predict →
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nfl-blue/15 to-nfl-blue/5 ring-1 ring-nfl-blue/20 shadow-card-sm">
            <Users className="h-7 w-7 text-nfl-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{group.name}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Invite code: <span className="font-mono font-semibold text-gray-700">{group.invite_code}</span>
            </p>
          </div>
        </div>

        {!hasResults ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              {showPreDraft
                ? 'Scores go live pick-by-pick on draft night.'
                : showMembersOnly
                  ? 'Submit predictions to see the leaderboard.'
                  : 'Submit predictions to compete.'}
            </p>
            {showPreDraft ? (
              <>
                <LeaderboardTable
                  rows={preDraftLeaderboard}
                  showScores
                  scoreSuffix=""
                />
                <p className="mt-3 text-xs text-gray-500">
                  Click a name to see their first-round picks 1–10.
                </p>
              </>
            ) : showMembersOnly ? (
              <LeaderboardTable
                rows={members.map((m: { display_name: string; rank: number }) => ({
                  display_name: m.display_name,
                  rank: m.rank,
                }))}
                showScores={false}
              />
            ) : (
              <div className="rounded-3xl border border-gray-200/80 bg-white p-10 text-center shadow-card-sm">
                <p className="text-gray-600">No members have submitted predictions yet.</p>
                <Link href="/predict" className="mt-4 inline-block font-medium text-nfl-red transition-colors hover:text-nfl-red/90">
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
          <div className="rounded-3xl border border-gray-200/80 bg-white p-10 text-center shadow-card-sm">
            <p className="text-red-600">Unable to load leaderboard. Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="rounded-3xl border border-gray-200/80 bg-white p-10 text-center shadow-card-sm">
            <p className="text-gray-600">No scores yet. Scores appear after the 2026 NFL Draft.</p>
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
              showGap
            />
            <p className="mt-3 text-xs text-gray-500">
              Click a name to see their first-round picks 1–10.
            </p>
          </>
        )}

        {hasResults && (
          <>
            <p className="mt-6 text-[13px] text-gray-500">
              15 pts = correct player at correct pick. 5 pts = player went 1 pick before or after. Max 480 pts.
            </p>
            <LeaderboardLiveRefresh enabled={hasResults} />
          </>
        )}
      </div>
    </div>
  );
}
