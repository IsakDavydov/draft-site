import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Users, Plus, LogIn, ArrowLeft, Globe, Trophy } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/predict"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-nfl-red"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Predictions
          </Link>
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-nfl-blue transition-colors hover:text-nfl-blue/80"
          >
            <Trophy className="h-4 w-4" />
            View leaderboard →
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-nfl-blue/15 to-nfl-blue/5 ring-1 ring-nfl-blue/20 shadow-card-sm">
            <Users className="h-7 w-7 text-nfl-blue" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Compete with Friends
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Create or join a group to see a private leaderboard with your buddies
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-gray-300/80">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-nfl-green/40 via-nfl-green/20 to-transparent" />
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nfl-green/10 ring-1 ring-nfl-green/20">
                  <Plus className="h-5 w-5 text-nfl-green" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Create Group</h2>
              </div>
              <CreateGroupForm />
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-gray-300/80">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-nfl-blue/40 via-nfl-blue/20 to-transparent" />
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-nfl-blue/10 ring-1 ring-nfl-blue/20">
                  <LogIn className="h-5 w-5 text-nfl-blue" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Join Group</h2>
              </div>
              <JoinGroupForm />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200/60 via-nfl-blue/30 to-amber-200/60" />
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Leaderboards</h2>
              <p className="text-sm text-gray-600 mb-5">See how you stack up against everyone or your groups.</p>

              <Link
                href="/leaderboard"
                className="group/link flex items-center justify-between rounded-2xl border border-gray-200/60 bg-gradient-to-br from-amber-50/50 to-white py-4 px-4 transition-all duration-200 hover:border-amber-200/80 hover:shadow-accent mb-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-200/60">
                    <Globe className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover/link:text-amber-800 transition-colors">Everyone</p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Global leaderboard — best mock drafts across the entire site
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-gray-400 group-hover/link:text-amber-600 transition-colors">→</span>
              </Link>

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">My Groups</p>
              <GroupsList groups={groups} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
