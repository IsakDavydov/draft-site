import { createServiceRoleClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { getDraftOrder2026 } from '@/lib/adapters';
import { LiveDraftBoard } from '@/components/live/LiveDraftBoard';
import { Radio } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Live Draft Scoring',
  description: 'Live 2026 NFL Draft scoring. Watch picks roll in and see who leads the SAKFootball prediction challenge.',
};

export default async function LiveDraftPage() {
  const supabase = createServiceRoleClient() ?? (await createClient());
  const draftOrder = getDraftOrder2026();

  const [
    { data: results },
    { data: leaderboard },
  ] = await Promise.all([
    supabase
      .from('draft_results')
      .select('id, pick_number, prospect_id, prospect_name, team, draft_year')
      .eq('draft_year', 2026)
      .order('pick_number'),
    supabase.rpc('get_leaderboard', { p_year: 2026 }),
  ]);

  const hasResults = (results?.length ?? 0) > 0;
  const completedPicks = results?.length ?? 0;

  return (
    <div className="min-h-screen bg-sak-darker">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sak-dark via-sak-darker to-sak-dark">
        <div className="absolute inset-0 hero-lines pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
                <Radio className="h-3 w-3" />
                2026 NFL Draft
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Live Draft Scoring
              </h1>
              <p className="mt-2 text-base text-gray-300/90">
                {hasResults
                  ? `${completedPicks} of 32 picks announced · Scores update in real time`
                  : 'Scores update in real time as picks are announced on draft night'}
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-3xl font-black text-white tabular-nums">{completedPicks}<span className="text-white/40 text-lg font-bold"> / 32</span></p>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mt-1">Picks Announced</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <LiveDraftBoard
          initialResults={results ?? []}
          draftOrder={draftOrder}
          initialLeaderboard={(leaderboard ?? []).map(
            (r: { prediction_id: string; display_name: string; score: number | bigint; rank: number | bigint }) => ({
              prediction_id: r.prediction_id,
              display_name: r.display_name,
              score: Number(r.score),
              rank: Number(r.rank),
            })
          )}
        />
      </div>
    </div>
  );
}
