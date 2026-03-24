import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/admin';
import { calculatePreDraftScore } from '@/lib/adapters';
import { resolveDraftDisplayLabel } from '@/lib/display-name-filter';
import { NextResponse } from 'next/server';

/** Short cache so new leaderboard submissions show up quickly on the home page. */
const CACHE_SECONDS = 10;

export async function GET() {
  try {
    const supabase = createServiceRoleClient() ?? (await createClient());

    const { data: predictions, error: predError } = await supabase
      .from('draft_predictions')
      .select('id, display_name, name')
      .eq('draft_year', 2026)
      .eq('is_leaderboard_entry', true);

    if (predError) {
      console.error('Pre-draft leaderboard:', predError);
      return NextResponse.json(
        { error: 'Leaderboard temporarily unavailable' },
        { status: 500 }
      );
    }

    if (!predictions?.length) {
      const res = NextResponse.json([]);
      res.headers.set('Cache-Control', `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`);
      return res;
    }

    const { data: picks } = await supabase
      .from('prediction_picks')
      .select('prediction_id, pick_number, prospect_id, team')
      .in('prediction_id', predictions.map((p) => p.id));

    const picksByPrediction = new Map<string, Array<{ pick_number: number; prospect_id: string; team: string }>>();
    for (const pick of picks ?? []) {
      const list = picksByPrediction.get(pick.prediction_id) ?? [];
      list.push({ pick_number: pick.pick_number, prospect_id: pick.prospect_id, team: pick.team });
      picksByPrediction.set(pick.prediction_id, list);
    }

    const withScores = predictions.map((pred: { id: string; display_name: string | null; name: string | null }) => {
      const predPicks = picksByPrediction.get(pred.id) ?? [];
      const label = resolveDraftDisplayLabel(pred.display_name, pred.name);
      return {
        display_name: label ?? '',
        score: calculatePreDraftScore(predPicks),
        prediction_id: pred.id,
      };
    });

    withScores.sort((a, b) => b.score - a.score);
    const leaderboard = withScores.map((row, i) => ({ ...row, rank: i + 1 }));

    const res = NextResponse.json(leaderboard);
    res.headers.set('Cache-Control', `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS}`);
    return res;
  } catch (err) {
    console.error('Pre-draft leaderboard:', err);
    return NextResponse.json(
      { error: 'Leaderboard temporarily unavailable' },
      { status: 500 }
    );
  }
}
