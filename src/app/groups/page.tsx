import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Users, Plus, LogIn, ArrowLeft } from 'lucide-react';
import { GroupsList } from '@/components/groups/GroupsList';
import { CreateGroupForm } from '@/components/groups/CreateGroupForm';
import { JoinGroupForm } from '@/components/groups/JoinGroupForm';

export const metadata = {
  title: 'Groups',
  description: 'Create or join groups to compete with friends in the draft prediction game.',
};

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin?next=/groups');
  }

  const { data: memberships } = await supabase
    .from('group_members')
    .select(`
      group_id,
      role,
      groups (id, name, invite_code)
    `)
    .eq('user_id', user.id);

  const groups = (memberships || [])
    .filter((m): m is typeof m & { groups: { id: string; name: string; invite_code: string } } => m.groups != null)
    .map((m) => ({ id: m.groups.id, name: m.groups.name, inviteCode: m.groups.invite_code, role: m.role }));

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Predictions
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Users className="h-8 w-8 text-nfl-blue" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Compete with Friends
            </h1>
            <p className="text-gray-600 mt-1">
              Create or join a group to see a private leaderboard with your buddies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="h-5 w-5 text-nfl-green" />
                <h2 className="text-lg font-semibold text-gray-900">Create Group</h2>
              </div>
              <CreateGroupForm />
            </div>
            <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <LogIn className="h-5 w-5 text-nfl-blue" />
                <h2 className="text-lg font-semibold text-gray-900">Join Group</h2>
              </div>
              <JoinGroupForm />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Groups</h2>
            <GroupsList groups={groups} />
          </div>
        </div>
      </div>
    </div>
  );
}
