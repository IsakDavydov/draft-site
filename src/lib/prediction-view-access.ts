import type { SupabaseClient } from '@supabase/supabase-js';

export type ViewablePredictionMeta = {
  id: string;
  user_id: string;
  display_name: string | null;
  is_leaderboard_entry: boolean;
  draft_year: number;
};

/**
 * Who can view another user's picks (top 10 preview):
 * - Leaderboard entry: anyone (anon can read per RLS for 2026)
 * - Otherwise: owner, or any authenticated user who shares a group with the owner
 */
export async function getPredictionIfViewable(
  supabase: SupabaseClient,
  predictionId: string,
  viewerUserId: string | null
): Promise<ViewablePredictionMeta | null> {
  const { data: pred, error } = await supabase
    .from('draft_predictions')
    .select('id, user_id, display_name, is_leaderboard_entry, draft_year')
    .eq('id', predictionId)
    .single();

  if (error || !pred || pred.draft_year !== 2026) {
    return null;
  }

  if (pred.is_leaderboard_entry) {
    return pred;
  }

  if (!viewerUserId) {
    return null;
  }

  if (pred.user_id === viewerUserId) {
    return pred;
  }

  const { data: myMemberships } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', viewerUserId);

  const groupIds = myMemberships?.map((m) => m.group_id) ?? [];
  if (groupIds.length === 0) {
    return null;
  }

  const { data: shared } = await supabase
    .from('group_members')
    .select('group_id')
    .eq('user_id', pred.user_id)
    .in('group_id', groupIds)
    .limit(1)
    .maybeSingle();

  if (shared) {
    return pred;
  }

  return null;
}
