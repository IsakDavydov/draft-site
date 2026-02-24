import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Trophy, ArrowLeft, Users } from 'lucide-react';
import { GroupInviteCard } from '@/components/groups/GroupInviteCard';
import { sanitizeDisplayName } from '@/lib/display-name-filter';

export const metadata = {
  title: 'Group',
  description: 'Group leaderboard for draft predictions.',
};

export const dynamic = 'force-dynamic';

export default async function GroupDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?next=/groups/' + id);
  }

  const { data: group, error: groupError } = await supabase
    .from('groups')
    .select('id, name, invite_code, created_by')
    .eq('id', id)
    .single();

  if (groupError || !group) {
    notFound();
  }

  const { data: membership } = await supabase
    .from('group_members')
    .select('role')
    .eq('group_id', id)
    .eq('user_id', user.id)
    .single();

  if (!membership) {
    redirect('/groups/join/' + group.invite_code);
  }

  const [leaderboardRes, membersRes] = await Promise.all([
    supabase.rpc('get_group_leaderboard', { p_group_id: id, p_year: 2026 }),
    supabase.rpc('get_group_members', { p_group_id: id }),
  ]);
  const leaderboard = leaderboardRes.data;
  const members = membersRes.data;

  const { count: memberCount } = await supabase
    .from('group_members')
    .select('*', { count: 'exact', head: true })
    .eq('group_id', id);

  const { count } = await supabase
    .from('draft_results')
    .select('*', { count: 'exact', head: true })
    .eq('draft_year', 2026);

  const hasResults = (count ?? 0) > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/groups"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Groups
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-full bg-nfl-blue/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-nfl-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
            <p className="text-gray-500 text-sm">
              {(memberCount ?? 0)} member{(memberCount ?? 0) !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <GroupInviteCard inviteCode={group.invite_code} groupName={group.name} />

        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-amber-500" />
            <h2 className="text-lg font-semibold text-gray-900">Group Leaderboard</h2>
          </div>

          {!hasResults ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Scores will appear after the 2026 NFL Draft. For now, here&apos;s who&apos;s in your group:
              </p>
              {(!members || members.length === 0) ? (
                <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
                  <p className="text-gray-600">No members yet. Invite friends to join!</p>
                </div>
              ) : (
              <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {members.map((row: { display_name: string; role: string; rank: number }, i: number) => (
                      <tr key={row.display_name + i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold bg-gray-100 text-gray-700">
                            {row.rank}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sanitizeDisplayName(row.display_name)}
                          {row.role === 'owner' && (
                            <span className="ml-2 text-xs text-amber-600 font-normal">Owner</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 text-right">
                          —
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              )}
              {members && members.length > 0 && (
                <>
                  <p className="mt-3 text-sm text-gray-500">
                    Submit your predictions to be ready when the draft finishes.
                  </p>
                  <Link
                    href="/predict"
                    className="inline-block mt-2 text-nfl-red font-medium hover:underline"
                  >
                    Submit your predictions →
                  </Link>
                </>
              )}
            </>
          ) : !leaderboard || leaderboard.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
              <p className="text-gray-600">
                No one in this group has submitted predictions yet.
              </p>
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
        </div>
      </div>
    </div>
  );
}
