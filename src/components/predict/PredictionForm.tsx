'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Prospect } from '@/types';
import { TEAM_COLORS_BY_NAME, NFL_TEAM_NAMES } from '@/lib/adapters/teams';
import { TeamLogo } from '@/components/shared/TeamLogo';
import Link from 'next/link';
import { Zap, Trash2, Plus, Trophy, Share2, TrendingUp, ArrowLeftRight } from 'lucide-react';
import { ShareDraftModal } from './ShareDraftModal';
import { ShareFullDraftModal } from './ShareFullDraftModal';
import { ProspectPicker, type ProspectPickerHandle } from './ProspectPicker';
import {
  calculatePreDraftScore,
  getEffectiveDraftOrder,
  applyPickSwap,
  applyTeamToPick,
  serializeDraftOrder,
  getNeedsForTeam,
  getRecommendedProspects,
} from '@/lib/adapters';
import { validateDisplayNameForSave } from '@/lib/display-name-filter';
import type { MockDraftFromFile } from '@/types';

const DRAFT_YEAR = 2026;
const MAX_DRAFTS = 5;

interface DraftOrderItem {
  pick: number;
  team: string;
}

type TradeMode = 'swap' | 'assign';

function TradeModal({
  effectiveOrder,
  onSwap,
  onAssign,
  onClose,
  loading,
}: {
  effectiveOrder: DraftOrderItem[];
  onSwap: (pickA: number, pickB: number) => void;
  onAssign: (pick: number, team: string) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [mode, setMode] = useState<TradeMode>('swap');
  const [pickA, setPickA] = useState(1);
  const [pickB, setPickB] = useState(2);
  const [assignPick, setAssignPick] = useState(1);
  const [assignTeam, setAssignTeam] = useState(NFL_TEAM_NAMES[0] ?? '');
  const teamA = effectiveOrder.find((d) => d.pick === pickA)?.team ?? '—';
  const teamB = effectiveOrder.find((d) => d.pick === pickB)?.team ?? '—';
  const currentHolder = effectiveOrder.find((d) => d.pick === assignPick)?.team ?? '—';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-sak-card rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl ring-1 ring-white/[0.06] max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-white mb-2">Trade Picks</h3>
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('swap')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${mode === 'swap' ? 'bg-brand-red text-white' : 'bg-sak-hover text-gray-400 hover:bg-sak-border'}`}
          >
            Swap two
          </button>
          <button
            type="button"
            onClick={() => setMode('assign')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${mode === 'assign' ? 'bg-brand-red text-white' : 'bg-sak-hover text-gray-400 hover:bg-sak-border'}`}
          >
            Assign team
          </button>
        </div>
        {mode === 'swap' ? (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Select two picks to swap. The teams at those spots will exchange draft positions.
            </p>
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Pick A</label>
                <select
                  value={pickA}
                  onChange={(e) => setPickA(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-sak-border rounded-lg text-sm bg-sak-hover text-gray-200"
                >
                  {effectiveOrder.map((d) => (
                    <option key={d.pick} value={d.pick}>
                      {d.pick}. {d.team}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Pick B</label>
                <select
                  value={pickB}
                  onChange={(e) => setPickB(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-sak-border rounded-lg text-sm bg-sak-hover text-gray-200"
                >
                  {effectiveOrder.map((d) => (
                    <option key={d.pick} value={d.pick}>
                      {d.pick}. {d.team}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {pickA !== pickB && (
              <p className="text-sm text-gray-400 mb-4">
                After swap: <strong className="text-white">{pickA}. {teamB}</strong> ↔ <strong className="text-white">{pickB}. {teamA}</strong>
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Assign a team (e.g. one without a first-round pick) to a specific pick—for when a team trades into the first round.
            </p>
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Pick</label>
                <select
                  value={assignPick}
                  onChange={(e) => setAssignPick(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-sak-border rounded-lg text-sm bg-sak-hover text-gray-200"
                >
                  {effectiveOrder.map((d) => (
                    <option key={d.pick} value={d.pick}>
                      {d.pick}. {d.team}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">New team</label>
                <select
                  value={assignTeam}
                  onChange={(e) => setAssignTeam(e.target.value)}
                  className="w-full px-3 py-2 border border-sak-border rounded-lg text-sm bg-sak-hover text-gray-200"
                >
                  {NFL_TEAM_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Pick <strong className="text-white">{assignPick}</strong> will be held by <strong className="text-white">{assignTeam}</strong>
              {assignTeam !== currentHolder && (
                <span className="block mt-1 text-gray-500">(currently {currentHolder})</span>
              )}
            </p>
          </>
        )}
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-400 hover:bg-sak-hover rounded-lg"
          >
            Cancel
          </button>
          {mode === 'swap' ? (
            <button
              type="button"
              onClick={() => pickA !== pickB && onSwap(pickA, pickB)}
              disabled={loading || pickA === pickB}
              className="px-4 py-2 text-sm font-semibold bg-brand-red text-white rounded-lg hover:bg-brand-red/90 disabled:opacity-50"
            >
              Swap
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAssign(assignPick, assignTeam)}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold bg-brand-red text-white rounded-lg hover:bg-brand-red/90 disabled:opacity-50"
            >
              Assign
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface DraftSummary {
  id: string;
  name: string | null;
  display_name: string | null;
  is_leaderboard_entry: boolean;
  custom_draft_order: Record<string, string> | null;
  picks: Array<{ pick_number: number; prospect_id: string; prospect_name: string; team: string }>;
}

interface PredictionFormProps {
  prospects: Prospect[];
  draftOrder: DraftOrderItem[];
  userId: string;
  mockDraftTemplate?: MockDraftFromFile | null;
}

function computeScore(
  picks: Array<{ pick_number: number; prospect_id: string; team: string }>,
  order: DraftOrderItem[]
): number {
  const picksWithTeam = picks.map((p) => ({
    ...p,
    team: order.find((d) => d.pick === p.pick_number)?.team ?? '',
  }));
  return calculatePreDraftScore(picksWithTeam);
}

export function PredictionForm({ prospects, draftOrder, userId, mockDraftTemplate }: PredictionFormProps) {
  const [drafts, setDrafts] = useState<DraftSummary[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [draftName, setDraftName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitToLeaderboardModal, setSubmitToLeaderboardModal] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareFullModalOpen, setShareFullModalOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ rank: number; score: number } | null>(null);

  const selectedDraft = drafts.find((d) => d.id === selectedDraftId);
  const effectiveOrder = getEffectiveDraftOrder(draftOrder, selectedDraft?.custom_draft_order ?? null);
  const allPicksFilled = effectiveOrder.every(({ pick }) => picks[pick]);

  const supabase = createClient();
  /** Only load picks from the server when switching drafts — not on every `drafts` refresh (e.g. after a trade), so in-progress picks are not wiped. */
  const hydratedDraftIdRef = useRef<string | null>(null);
  const prospectPickerRefs = useRef<Record<number, ProspectPickerHandle | null>>({});
  const pickCardRefs = useRef<Record<number, HTMLDivElement | null>>({});
  useEffect(() => {
    loadDrafts();
  }, []);

  useEffect(() => {
    if (!selectedDraftId) {
      setPicks({});
      setDraftName('');
      setSaved(false);
      hydratedDraftIdRef.current = null;
      return;
    }

    const draft = drafts.find((d) => d.id === selectedDraftId);
    if (!draft) return;

    setDraftName(draft.name || draft.display_name || '');
    setSaved(true);

    const shouldHydratePicksFromServer =
      hydratedDraftIdRef.current === null || hydratedDraftIdRef.current !== selectedDraftId;

    if (shouldHydratePicksFromServer) {
      const picksMap: Record<number, string> = {};
      draft.picks.forEach((p) => {
        picksMap[p.pick_number] = p.prospect_id;
      });
      setPicks(picksMap);
      hydratedDraftIdRef.current = selectedDraftId;
    }
  }, [selectedDraftId, drafts]);

  async function loadDrafts() {
    const { data, error } = await supabase
      .from('draft_predictions')
      .select(`
        id,
        name,
        display_name,
        is_leaderboard_entry,
        custom_draft_order,
        prediction_picks (pick_number, prospect_id, prospect_name, team)
      `)
      .eq('user_id', userId)
      .eq('draft_year', DRAFT_YEAR)
      .order('created_at', { ascending: true });

    if (!error && data) {
      const summaries: DraftSummary[] = data.map((d: { id: string; name: string | null; display_name: string | null; is_leaderboard_entry: boolean; custom_draft_order: Record<string, string> | null; prediction_picks: Array<{ pick_number: number; prospect_id: string; prospect_name: string; team: string }> }) => ({
        id: d.id,
        name: d.name,
        display_name: d.display_name,
        is_leaderboard_entry: d.is_leaderboard_entry ?? false,
        custom_draft_order: d.custom_draft_order ?? null,
        picks: d.prediction_picks || [],
      }));
      setDrafts(summaries);
      if (summaries.length > 0 && !selectedDraftId) {
        setSelectedDraftId(summaries[0].id);
      }
      setMessage(null);
    } else if (error) {
      setMessage({
        type: 'error',
        text: `Couldn't load drafts. Run migrations in Supabase SQL Editor (in order): supabase/migrations/20260212000000_multiple_drafts.sql then 20260212000001_custom_draft_order.sql`,
      });
    }
  }

  async function handleCreateNewDraft() {
    if (drafts.length >= MAX_DRAFTS) {
      setMessage({ type: 'error', text: `Maximum ${MAX_DRAFTS} drafts allowed. Delete one to create another.` });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const { data, error } = await supabase
        .from('draft_predictions')
        .insert({
          user_id: userId,
          draft_year: DRAFT_YEAR,
          display_name: null,
          name: `Draft ${drafts.length + 1}`,
        })
        .select('id')
        .single();

      if (error) throw error;
      await loadDrafts();
      setSelectedDraftId(data.id);
      setPicks({});
      setDraftName(`Draft ${drafts.length + 1}`);
      setSaved(false);
      setMessage({ type: 'success', text: 'New draft created. Add your picks.' });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err);
      const hint = /null value|violates not-null|duplicate key|violates unique/.test(msg)
        ? ' Run migrations: 20260212000000_multiple_drafts.sql then 20260212000001_custom_draft_order.sql in Supabase SQL Editor.'
        : '';
      setMessage({ type: 'error', text: msg + hint });
    } finally {
      setLoading(false);
    }
  }

  async function savePicksToDb(predictionId: string, options?: { syncDisplayName?: boolean }) {
    const trimmed = draftName.trim() || null;
    const draftRow = drafts.find((d) => d.id === predictionId);
    const payload: { name: string | null; display_name?: string | null } = { name: trimmed };
    if (draftRow?.is_leaderboard_entry || options?.syncDisplayName) {
      payload.display_name = trimmed;
    }
    await supabase.from('draft_predictions').update(payload).eq('id', predictionId);
    await supabase.from('prediction_picks').delete().eq('prediction_id', predictionId);
    const prospectMap = Object.fromEntries(prospects.map((p) => [p.id, p]));
    const picksToInsert = effectiveOrder.map(({ pick, team }) => {
      const prospectId = picks[pick];
      const prospect = prospectMap[prospectId];
      return {
        prediction_id: predictionId,
        pick_number: pick,
        prospect_id: prospectId,
        prospect_name: prospect?.name || '',
        team,
      };
    });
    const { error } = await supabase.from('prediction_picks').insert(picksToInsert);
    if (error) throw error;
  }

  async function handleSave() {
    const selectedIds = Object.values(picks).filter(Boolean);
    if (selectedIds.length !== 32) {
      setMessage({ type: 'error', text: `Please select a prospect for all 32 picks. You have ${selectedIds.length}/32.` });
      return;
    }
    const uniqueIds = new Set(selectedIds);
    if (uniqueIds.size !== 32) {
      setMessage({ type: 'error', text: 'Each prospect can only be selected once.' });
      return;
    }

    if (!selectedDraftId) return;

    if (selectedDraft?.is_leaderboard_entry) {
      const nameValidation = validateDisplayNameForSave(draftName.trim());
      if (!nameValidation.valid) {
        setMessage({ type: 'error', text: nameValidation.error });
        return;
      }
    }

    setLoading(true);
    setMessage(null);
    try {
      await savePicksToDb(selectedDraftId);
      await loadDrafts();
      setSaved(true);
      setMessage({ type: 'success', text: 'Draft saved!' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to save.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitToLeaderboard() {
    const name = draftName.trim();
    const validation = validateDisplayNameForSave(name);
    if (!validation.valid) {
      setMessage({ type: 'error', text: validation.error });
      return;
    }
    if (!selectedDraftId) return;

    const selectedIds = Object.values(picks).filter(Boolean);
    if (selectedIds.length !== 32) {
      setMessage({ type: 'error', text: 'Complete all 32 picks before submitting to the leaderboard.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    setSubmitToLeaderboardModal(false);

    try {
      await supabase
        .from('draft_predictions')
        .update({ is_leaderboard_entry: false })
        .eq('user_id', userId)
        .eq('draft_year', DRAFT_YEAR);

      await supabase
        .from('draft_predictions')
        .update({ is_leaderboard_entry: true, display_name: name, name: name })
        .eq('id', selectedDraftId);

      await savePicksToDb(selectedDraftId, { syncDisplayName: true });
      await loadDrafts();

      const res = await fetch('/api/pre-draft-leaderboard');
      const leaderboard: Array<{ display_name: string; score: number; rank: number }> = await res.json();
      const entry = leaderboard.find((e) => e.display_name?.toLowerCase() === name.toLowerCase());
      if (entry) {
        setSubmitResult({ rank: entry.rank, score: entry.score });
      }
      setMessage({ type: 'success', text: 'Submitted to leaderboard! Your best draft is now live.' });
    } catch (err: unknown) {
      setSubmitResult(null);
      const isDuplicate =
        err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505';
      setMessage({
        type: 'error',
        text: isDuplicate
          ? 'That name is already taken on the leaderboard. Choose another draft name.'
          : err instanceof Error ? err.message : 'Failed to submit.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleApplyTrade(pickA: number, pickB: number) {
    if (!selectedDraftId) return;
    const newOrder = applyPickSwap(effectiveOrder, pickA, pickB);
    const customOrder = serializeDraftOrder(newOrder);

    setLoading(true);
    setMessage(null);
    setTradeModalOpen(false);

    try {
      const { error } = await supabase
        .from('draft_predictions')
        .update({ custom_draft_order: customOrder })
        .eq('id', selectedDraftId);

      if (error) throw error;
      await loadDrafts();
      setMessage({ type: 'success', text: 'Trade applied. Pick cards updated.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to apply trade.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleAssignTeam(pick: number, team: string) {
    if (!selectedDraftId) return;
    const newOrder = applyTeamToPick(effectiveOrder, pick, team);
    const customOrder = serializeDraftOrder(newOrder);

    setLoading(true);
    setMessage(null);
    setTradeModalOpen(false);

    try {
      const { error } = await supabase
        .from('draft_predictions')
        .update({ custom_draft_order: customOrder })
        .eq('id', selectedDraftId);

      if (error) throw error;
      await loadDrafts();
      setMessage({ type: 'success', text: 'Trade applied. Pick cards updated.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to apply trade.' });
    } finally {
      setLoading(false);
    }
  }

  async function handleClearTrades() {
    if (!selectedDraftId) return;

    setLoading(true);
    setMessage(null);
    setTradeModalOpen(false);

    try {
      const { error } = await supabase
        .from('draft_predictions')
        .update({ custom_draft_order: null })
        .eq('id', selectedDraftId);

      if (error) throw error;
      await loadDrafts();
      setMessage({ type: 'success', text: 'Trades cleared. Back to default order.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to clear trades.' });
    } finally {
      setLoading(false);
    }
  }

  const usedIds = new Set(Object.values(picks).filter(Boolean));
  const filledCount = effectiveOrder.filter(({ pick }) => Boolean(picks[pick])).length;
  const totalPicks = effectiveOrder.length;
  const selectedIdsForStatus = Object.values(picks).filter(Boolean);
  const hasDuplicates =
    selectedIdsForStatus.length > 0 &&
    selectedIdsForStatus.length !== new Set(selectedIdsForStatus).size;
  const currentPicksForScore = effectiveOrder.map(({ pick, team }) => ({
    pick_number: pick,
    prospect_id: picks[pick] ?? '',
    team,
  })).filter((p) => p.prospect_id);
  const currentScore =
    currentPicksForScore.length === 32
      ? computeScore(
          currentPicksForScore.map((p) => ({ pick_number: p.pick_number, prospect_id: p.prospect_id, team: p.team })),
          effectiveOrder
        )
      : null;

  const advanceToNextEmptyPick = useCallback(
    (filledPick: number, nextPicks: Record<number, string>) => {
      if (loading) return;
      const idx = effectiveOrder.findIndex((o) => o.pick === filledPick);
      if (idx < 0) return;
      let nextEmptyPick: number | null = null;
      for (let i = idx + 1; i < effectiveOrder.length; i++) {
        const p = effectiveOrder[i].pick;
        if (!nextPicks[p]) {
          nextEmptyPick = p;
          break;
        }
      }
      if (nextEmptyPick === null) return;
      requestAnimationFrame(() => {
        pickCardRefs.current[nextEmptyPick!]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        prospectPickerRefs.current[nextEmptyPick!]?.open();
      });
    },
    [effectiveOrder, loading]
  );

  function fillFromBigBoard() {
    const sorted = [...prospects].sort((a, b) => (a.bigBoardRank ?? 99) - (b.bigBoardRank ?? 99));
    const next: Record<number, string> = {};
    effectiveOrder.forEach(({ pick }, i) => {
      const prospect = sorted[i];
      if (prospect) next[pick] = prospect.id;
    });
    setPicks(next);
  }

  function fillFromMockDraft() {
    if (!mockDraftTemplate) return;
    const nameToProspect = Object.fromEntries(prospects.map((p) => [p.name.toLowerCase(), p]));
    const next: Record<number, string> = {};
    mockDraftTemplate.picks.forEach(({ pick, player }) => {
      const prospect = nameToProspect[player.toLowerCase()];
      if (prospect) next[pick] = prospect.id;
    });
    setPicks((prev) => ({ ...prev, ...next }));
  }

  /** Fill only empty slots with mostly need-based, slightly randomized picks (no overwrite). */
  function fillRemaining() {
    const used = new Set(Object.values(picks).filter(Boolean));
    const next: Record<number, string> = { ...picks };
    for (const { pick, team } of effectiveOrder) {
      if (next[pick]) continue;
      const needsForTeam = getNeedsForTeam(team);

      // 20% chance to ignore needs and go "best available" by big board.
      const useBestAvailable = Math.random() < 0.2;

      let candidate: Prospect | undefined;

      if (!useBestAvailable && needsForTeam.length > 0) {
        // Need-based: take a random player from top 4 need fits by big board.
        const needMatches = getRecommendedProspects(prospects, needsForTeam, used, 8);
        const topNeedMatches = needMatches.filter((p) => !used.has(p.id)).slice(0, 4);
        if (topNeedMatches.length > 0) {
          const randomIndex = Math.floor(Math.random() * topNeedMatches.length);
          candidate = topNeedMatches[randomIndex];
        }
      }

      if (!candidate) {
        // Fallback / best-available path: random from top 4 by big board among all remaining.
        const available = prospects
          .filter((p) => !used.has(p.id))
          .sort((a, b) => (a.bigBoardRank ?? 99) - (b.bigBoardRank ?? 99))
          .slice(0, 4);
        if (available.length === 0) continue;
        const randomIndex = Math.floor(Math.random() * available.length);
        candidate = available[randomIndex];
      }

      if (!candidate) continue;
      next[pick] = candidate.id;
      used.add(candidate.id);
    }
    setPicks(next);
  }

  function clearAll() {
    setPicks({});
  }

  async function handleDeleteDraft(draftId: string) {
    if (!confirm('Delete this draft permanently? This cannot be undone.')) return;
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.from('draft_predictions').delete().eq('id', draftId);
      if (error) throw error;
      const remaining = drafts.filter((d) => d.id !== draftId);
      setSelectedDraftId(remaining[0]?.id ?? null);
      setPicks({});
      setDraftName('');
      setSaved(false);
      await loadDrafts();
      setMessage({ type: 'success', text: 'Draft deleted.' });
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete draft.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Draft selector */}
      <div className="rounded-2xl border border-white/[0.06] bg-sak-card px-5 py-4 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Your Drafts</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {drafts.map((draft) => {
                const score = draft.picks.length === 32
                  ? computeScore(
                      draft.picks.map((p) => ({ pick_number: p.pick_number, prospect_id: p.prospect_id, team: p.team })),
                      effectiveOrder
                    )
                  : null;
                const isSelected = draft.id === selectedDraftId;
                const onLeaderboard = draft.is_leaderboard_entry;
                return (
                  <div
                    key={draft.id}
                    className="flex flex-shrink-0 items-center gap-0.5 rounded-lg border border-white/[0.06] bg-sak-hover"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDraftId(draft.id)}
                      aria-pressed={isSelected}
                      title={onLeaderboard ? 'Leaderboard entry' : undefined}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-all rounded-l-md ${
                        isSelected
                          ? 'bg-brand-red text-white shadow-sm'
                          : 'bg-sak-hover text-gray-400 hover:bg-sak-border hover:text-gray-200'
                      }`}
                    >
                      {onLeaderboard && (
                        <Trophy
                          className={`h-3.5 w-3.5 flex-shrink-0 ${isSelected ? 'text-amber-700' : 'text-amber-500'}`}
                          aria-hidden
                        />
                      )}
                      <span className="truncate max-w-[120px]">
                        {draft.name || draft.display_name || `Draft ${drafts.indexOf(draft) + 1}`}
                      </span>
                      {score !== null && (
                        <span className="text-[11px] opacity-90">({score})</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDraft(draft.id);
                      }}
                      disabled={loading}
                      aria-label={`Delete ${draft.name || draft.display_name || 'draft'}`}
                      className="p-1.5 text-gray-600 hover:text-brand-red hover:bg-brand-red/10 disabled:opacity-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
            {selectedDraft?.is_leaderboard_entry && (
              <p className="mt-2 inline-flex max-w-full flex-wrap items-center gap-2 rounded-lg border border-brand-gold/20 bg-brand-gold/10 px-3 py-2 text-xs text-brand-gold">
                <Trophy className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
                <span>
                  <span className="font-semibold">Leaderboard draft</span>
                  <span className="text-brand-gold/80">
                    {' '}
                    — you&apos;re editing the entry shown on the public leaderboard (save to apply changes).
                  </span>
                </span>
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCreateNewDraft}
            disabled={loading || drafts.length >= MAX_DRAFTS}
            className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-dashed border-white/[0.1] px-3 py-1.5 text-xs font-semibold text-gray-500 hover:border-brand-red/40 hover:text-brand-red transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">
              New draft {drafts.length > 0 && `(${drafts.length}/${MAX_DRAFTS})`}
            </span>
          </button>
        </div>
      </div>

      {message && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium border ${message.type === 'error' ? 'bg-brand-red/10 text-brand-red border-brand-red/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
          {message.text}
        </div>
      )}
      {submitResult && message?.type === 'success' && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-green-400">
                You&apos;re ranked <span className="text-brand-gold font-display font-black">#{submitResult.rank}</span> with <span className="text-brand-gold font-display font-black">{submitResult.score}</span> points!
              </p>
              <p className="mt-0.5 text-xs sm:text-sm text-green-400/80">
                Refine your picks and resubmit this draft to try to climb the leaderboard.
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-green-400 hover:text-green-300 hover:underline"
            >
              <TrendingUp className="h-4 w-4" />
              View full leaderboard
            </Link>
          </div>
        </div>
      )}

      {selectedDraftId && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-6"
        >
          <div className="rounded-2xl border border-white/[0.06] bg-sak-card px-5 py-4 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="max-w-md">
                <label htmlFor="draftName" className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                  Draft name
                </label>
                <input
                  id="draftName"
                  type="text"
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  maxLength={50}
                  className="mt-1 w-full max-w-xs px-3 py-2 border border-sak-border rounded-lg bg-sak-hover text-sm text-white placeholder:text-gray-600 focus:ring-2 focus:ring-brand-red focus:border-transparent"
                  placeholder="e.g. DraftKing"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Shown in your draft list. If you submit to the leaderboard, this same name appears publicly.
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 md:items-end">
                {selectedDraft?.is_leaderboard_entry ? (
                  <div className="inline-flex flex-col items-start gap-1 sm:items-end sm:text-right">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-brand-gold/10 px-3 py-1.5 text-xs sm:text-sm text-brand-gold">
                      <Trophy className="h-4 w-4 shrink-0" />
                      <span>
                        On leaderboard as{' '}
                        <span className="font-semibold text-white">
                          {selectedDraft.display_name || selectedDraft.name || '—'}
                        </span>
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-gold/70 max-w-xs">
                      Edit the draft name above and save to update the leaderboard.
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSubmitToLeaderboardModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-3 py-1.5 text-xs sm:text-sm font-semibold text-sak-dark hover:bg-brand-gold/90"
                  >
                    <Trophy className="h-4 w-4" />
                    Submit this draft to leaderboard
                  </button>
                )}
                {currentScore !== null && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm text-gray-300 font-medium">
                      Pre-draft score: <strong className="text-brand-gold font-display">{currentScore}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShareModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-sak-hover px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-300 ring-1 ring-white/[0.06] hover:bg-sak-border"
                    >
                      <Share2 className="h-4 w-4" />
                      Share top 5
                    </button>
                    {allPicksFilled && (
                      <button
                        type="button"
                        onClick={() => setShareFullModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-sak-hover px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-300 ring-1 ring-white/[0.06] hover:bg-sak-border"
                      >
                        <Share2 className="h-4 w-4" />
                        Share full draft
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Progress bar */}
            <div className="rounded-2xl border border-white/[0.06] bg-sak-card px-5 py-4 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-base font-bold text-white">Your First Round Picks</h2>
                <span className={`text-sm font-bold tabular-nums ${filledCount === totalPicks ? 'text-brand-red' : 'text-gray-500'}`}>
                  {filledCount}<span className="font-normal text-gray-500">/{totalPicks}</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-sak-hover overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-gold transition-all duration-500"
                  style={{ width: `${totalPicks > 0 ? (filledCount / totalPicks) * 100 : 0}%` }}
                />
              </div>
              {hasDuplicates && (
                <p className="mt-2 text-xs font-medium text-red-400">Remove duplicate players before saving</p>
              )}
              <p className="mt-1.5 text-xs text-gray-500">
                {filledCount === totalPicks ? '🎉 All picks filled — ready to save!' : 'Select one prospect per pick. Each player can only be used once.'}
              </p>
            </div>
            {/* Quick-fill toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={fillFromBigBoard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-red/10 text-brand-red border border-brand-red/20 hover:bg-brand-red/15 transition-colors"
              >
                <Zap className="h-3.5 w-3.5" />
                Use Big Board
              </button>
              <button
                type="button"
                onClick={fillRemaining}
                disabled={effectiveOrder.every(({ pick }) => picks[pick])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sak-hover text-gray-400 hover:bg-white/[0.08] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Zap className="h-3.5 w-3.5" />
                Fill remaining
              </button>
              <div className="h-4 w-px bg-white/10" />
              <button
                type="button"
                onClick={() => setTradeModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sak-hover text-gray-400 hover:bg-white/[0.08] transition-colors"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                Add trade
              </button>
              {selectedDraft?.custom_draft_order && (
                <button
                  type="button"
                  onClick={handleClearTrades}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-brand-gold border border-brand-gold/20 hover:bg-brand-gold/10 transition-colors"
                >
                  Reset trades
                </button>
              )}
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors ml-auto"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear all
              </button>
            </div>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {effectiveOrder.map(({ pick, team }) => {
                const teamColor = TEAM_COLORS_BY_NAME[team] || '#1d4ed8';
                const needsForTeam = getNeedsForTeam(team);
                const recommended = getRecommendedProspects(prospects, needsForTeam, usedIds, 5);
                const teamNickname = team.split(' ').slice(-1)[0] ?? team;
                return (
                  <div
                    key={pick}
                    ref={(el) => {
                      if (el) pickCardRefs.current[pick] = el;
                      else delete pickCardRefs.current[pick];
                    }}
                    className="flex flex-col rounded-xl border border-white/[0.06] bg-sak-card p-3 sm:p-4 shadow-sm hover:shadow-card transition-shadow"
                    style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
                  >
                    <div className="mb-2 flex-shrink-0 flex items-center gap-2">
                      <span
                        className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded px-1.5 text-[11px] font-extrabold text-white font-display"
                        style={{ backgroundColor: teamColor }}
                      >
                        {pick}
                      </span>
                      <TeamLogo teamName={team} size={20} />
                      <span className="text-sm font-bold text-gray-200 truncate">{teamNickname}</span>
                    </div>
                    {needsForTeam.length > 0 && (
                      <div className="mb-2 flex-shrink-0">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Team Needs</p>
                        <div className="flex flex-wrap gap-1">
                          {needsForTeam.slice(0, 5).map((need) => (
                            <span key={need} className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-white/[0.06] text-gray-500">
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-auto flex-shrink-0">
                      <ProspectPicker
                        ref={(el) => {
                          if (el) prospectPickerRefs.current[pick] = el;
                          else delete prospectPickerRefs.current[pick];
                        }}
                        prospects={prospects}
                        value={picks[pick] || ''}
                        onChange={(id) => {
                          setPicks((prev) => {
                            const next = { ...prev, [pick]: id };
                            queueMicrotask(() => advanceToNextEmptyPick(pick, next));
                            return next;
                          });
                        }}
                        usedIds={usedIds}
                        disabled={loading}
                        recommended={recommended}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-8 py-3 text-base font-bold text-white shadow-lg shadow-brand-red/25 hover:bg-brand-red/90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Zap className="h-5 w-5" />
              {loading ? 'Saving...' : saved ? 'Update Draft' : 'Save Draft'}
            </button>
            {!allPicksFilled && (
              <span className="text-xs text-gray-400">{totalPicks - filledCount} picks remaining</span>
            )}
          </div>
        </form>
      )}

      {drafts.length === 0 && (
        <p className="text-gray-400 text-sm">
          Click &quot;New draft&quot; to create your first mock draft, or your drafts will load shortly.
        </p>
      )}

      {/* Share draft modal (top 5) */}
      {shareModalOpen && currentScore !== null && (
        <ShareDraftModal
          onClose={() => setShareModalOpen(false)}
          score={currentScore}
          topPicks={effectiveOrder.slice(0, 5).map(({ pick, team }) => {
            const prospectId = picks[pick];
            const prospect = prospects.find((p) => p.id === prospectId);
            return {
              pick,
              team,
              prospectName: prospect?.name ?? '—',
            };
          })}
        />
      )}

      {/* Share full draft modal (all 32 picks) */}
      {shareFullModalOpen && currentScore !== null && (
        <ShareFullDraftModal
          onClose={() => setShareFullModalOpen(false)}
          allPicks={effectiveOrder.map(({ pick, team }) => {
            const prospectId = picks[pick];
            const prospect = prospects.find((p) => p.id === prospectId);
            return {
              pick,
              team,
              prospectName: prospect?.name ?? '—',
            };
          })}
        />
      )}

      {/* Trade modal: swap two picks */}
      {tradeModalOpen && (
        <TradeModal
          effectiveOrder={effectiveOrder}
          onSwap={(pickA, pickB) => handleApplyTrade(pickA, pickB)}
          onAssign={(pick, team) => handleAssignTeam(pick, team)}
          onClose={() => setTradeModalOpen(false)}
          loading={loading}
        />
      )}

      {/* Submit to leaderboard modal */}
      {submitToLeaderboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-sak-card border border-white/[0.08] rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-2">Submit to Leaderboard</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your entry will appear as{' '}
              <span className="font-semibold text-white">
                {draftName.trim() || '—'}
              </span>{' '}
              (your draft name). This replaces any other draft you&apos;ve submitted.
            </p>
            {!draftName.trim() && (
              <p className="text-sm text-brand-gold bg-brand-gold/10 rounded-lg px-3 py-2 mb-4">
                Add a draft name in the field above first.
              </p>
            )}
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSubmitToLeaderboardModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.06] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitToLeaderboard}
                disabled={loading || !draftName.trim()}
                className="px-4 py-2 text-sm font-semibold bg-brand-gold text-white rounded-lg hover:bg-brand-gold/90 disabled:opacity-50 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
