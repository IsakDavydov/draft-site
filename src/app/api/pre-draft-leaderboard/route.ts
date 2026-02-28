import { createClient } from '@/lib/supabase/server';
import { calculatePreDraftScore } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: predictions, error: predError } = await supabase
      .from('draft_predictions')
      .select('id, display_name')
      .eq('draft_year', 2026)
      .eq('is_leaderboard_entry', true);

    if (predError || !predictions?.length) {
      return Response.json([]);
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
    const leaderboard = withScores.map((row, i) => ({ ...row, rank: i + 1 }));

    return Response.json(leaderboard);
  } catch {
    return Response.json([]);
  }
}
