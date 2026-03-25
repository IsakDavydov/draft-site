import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getPredictionIfViewable } from '@/lib/prediction-view-access';
import { getProspectById } from '@/lib/adapters/draft';
import { sanitizeDisplayName } from '@/lib/display-name-filter';
import { PredictionTopPicksGrid } from '@/components/predict/PredictionTopPicksGrid';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const meta = await getPredictionIfViewable(supabase, id, user?.id ?? null);
  if (!meta) {
    return { title: 'Mock draft' };
  }
  const name = meta.display_name ? sanitizeDisplayName(meta.display_name) : 'Mock draft';
  return {
    title: `${name} — Top 10 picks`,
    description: `First-round picks 1–10 for ${name}'s 2026 NFL mock draft.`,
  };
}

export default async function PredictionTopPicksPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const prediction = await getPredictionIfViewable(supabase, id, user?.id ?? null);
  if (!prediction) {
    notFound();
  }

  const { data: picks } = await supabase
    .from('prediction_picks')
    .select('pick_number, prospect_id, team')
    .eq('prediction_id', id)
    .lte('pick_number', 10)
    .order('pick_number', { ascending: true });

  const rows = picks ?? [];
  const displayName = sanitizeDisplayName(prediction.display_name || 'Player');

  const resolved = await Promise.all(
    rows.map(async (row) => {
      const prospect = await getProspectById(row.prospect_id);
      return {
        pick_number: row.pick_number,
        team: row.team,
        prospectName: prospect?.name ?? `Prospect ${row.prospect_id}`,
        position: prospect?.position ?? '—',
        school: prospect?.school ?? '',
      };
    })
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/leaderboard"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-nfl-red"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Leaderboard
          </Link>
          <Link
            href="/groups"
            className="text-sm font-medium text-nfl-blue hover:text-nfl-blue/80"
          >
            Groups →
          </Link>
        </div>

        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-card-sm sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {displayName}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            First-round picks 1–10 · 2026 NFL Draft mock
          </p>

          <PredictionTopPicksGrid picks={resolved} />

          <p className="mt-6 text-xs text-gray-500">
            Shared when this mock is on the leaderboard or you’re in a group with this player.
          </p>
        </div>
      </div>
    </div>
  );
}
