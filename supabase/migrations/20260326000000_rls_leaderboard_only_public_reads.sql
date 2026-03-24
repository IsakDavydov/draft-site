-- Tighten public reads: only is_leaderboard_entry rows are world-readable for 2026.
-- Add group-peer policies so authenticated users in the same group can still see each other's
-- non-leaderboard drafts (metadata + picks) for 2026.

-- Helper: viewer (auth.uid()) shares at least one group with the draft's owner
CREATE OR REPLACE FUNCTION public.auth_user_shares_group_with_draft_owner(p_draft_prediction_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.draft_predictions dp
    INNER JOIN public.group_members gm_owner ON gm_owner.user_id = dp.user_id
    INNER JOIN public.group_members gm_viewer
      ON gm_viewer.group_id = gm_owner.group_id
     AND gm_viewer.user_id = auth.uid()
    WHERE dp.id = p_draft_prediction_id
      AND dp.draft_year = 2026
  );
$$;

REVOKE ALL ON FUNCTION public.auth_user_shares_group_with_draft_owner(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.auth_user_shares_group_with_draft_owner(uuid) TO authenticated;

-- draft_predictions: replace broad 2026 read with leaderboard-only public read
DROP POLICY IF EXISTS "Anyone can read 2026 predictions for leaderboard" ON public.draft_predictions;

CREATE POLICY "Anyone can read 2026 leaderboard draft predictions"
  ON public.draft_predictions FOR SELECT
  USING (draft_year = 2026 AND is_leaderboard_entry = true);

CREATE POLICY "Group peers can read each other's 2026 draft metadata"
  ON public.draft_predictions FOR SELECT
  TO authenticated
  USING (
    draft_year = 2026
    AND public.auth_user_shares_group_with_draft_owner(id)
  );

-- prediction_picks: replace broad 2026 read with leaderboard-only
DROP POLICY IF EXISTS "Anyone can read 2026 picks for leaderboard" ON public.prediction_picks;

CREATE POLICY "Anyone can read picks for 2026 leaderboard entries"
  ON public.prediction_picks FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.draft_predictions dp
      WHERE dp.id = prediction_picks.prediction_id
        AND dp.draft_year = 2026
        AND dp.is_leaderboard_entry = true
    )
  );

CREATE POLICY "Group peers can read picks for shared 2026 drafts"
  ON public.prediction_picks FOR SELECT
  TO authenticated
  USING (public.auth_user_shares_group_with_draft_owner(prediction_id));
