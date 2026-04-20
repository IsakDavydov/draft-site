import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Users, Plus, LogIn, ArrowLeft, Globe, Trophy, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-cream-deep">

      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-500 ring-1 ring-inset ring-rose-200">
                <Users className="h-3 w-3" />
                Private Leagues
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Compete with Friends
              </h1>
              <p className="mt-2 text-base leading-relaxed text-gray-500">
                Create a private group, share the invite code, and see who really knows the draft.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Submit your picks first
                </Link>
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Trophy className="h-3.5 w-3.5" />
                  Global leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">

        <Link
          href="/predict"
          className="group mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Predictions
        </Link>

        <div className="space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-rose-500" />
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                  <Plus className="h-5 w-5 text-rose-500" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Create Group</h2>
              </div>
              <CreateGroupForm />
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-rose-500" />
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                  <LogIn className="h-5 w-5 text-rose-500" />
                </div>
                <h2 className="font-display text-lg font-bold text-gray-900">Join Group</h2>
              </div>
              <JoinGroupForm />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                <Trophy className="h-4 w-4 text-rose-500" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-gray-900">Leaderboards</h2>
                <p className="text-xs text-gray-400">See how you stack up against everyone or your groups.</p>
              </div>
            </div>
            <div className="p-6">
              <Link
                href="/leaderboard"
                className="group/link flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 py-4 px-4 transition-all duration-200 hover:border-rose-200 hover:bg-cream-deep hover:shadow-sm mb-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50">
                    <Globe className="h-5 w-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover/link:text-rose-500 transition-colors">Global Leaderboard</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Best mock drafts across the entire site
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-gray-500 group-hover/link:text-rose-500 transition-colors text-sm font-semibold">→</span>
              </Link>

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-3">My Groups</p>
              <GroupsList groups={groups} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
