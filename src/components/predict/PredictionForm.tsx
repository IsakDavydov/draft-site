'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Prospect } from '@/types';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';
import { TeamLogo } from '@/components/shared/TeamLogo';
import Link from 'next/link';
import { Zap, Trash2, Plus, Trophy, Share2, TrendingUp } from 'lucide-react';
import { ShareDraftModal } from './ShareDraftModal';
import { ProspectPicker } from './ProspectPicker';
import { calculatePreDraftScore } from '@/lib/adapters';
import type { MockDraftFromFile } from '@/types';

const DRAFT_YEAR = 2026;
const MAX_DRAFTS = 5;

interface DraftOrderItem {
  pick: number;
  team: string;
}

interface DraftSummary {
  id: string;
  name: string | null;
  display_name: string | null;
  is_leaderboard_entry: boolean;
  picks: Array<{ pick_number: number; prospect_id: string; prospect_name: string; team: string }>;
}

interface PredictionFormProps {
  prospects: Prospect[];
  draftOrder: DraftOrderItem[];
  userId: string;
  mockDraftTemplate?: MockDraftFromFile | null;
  teamNeeds?: Record<number, string[]>;
}

function computeScore(
  picks: Array<{ pick_number: number; prospect_id: string; team: string }>,
  draftOrder: DraftOrderItem[]
): number {
  const picksWithTeam = picks.map((p) => ({
    ...p,
    team: draftOrder.find((d) => d.pick === p.pick_number)?.team ?? '',
  }));
  return calculatePreDraftScore(picksWithTeam);
}

export function PredictionForm({ prospects, draftOrder, userId, mockDraftTemplate, teamNeeds = {} }: PredictionFormProps) {
  const [drafts, setDrafts] = useState<DraftSummary[]>([]);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [draftName, setDraftName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitToLeaderboardModal, setSubmitToLeaderboardModal] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ rank: number; score: number } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadDrafts();
  }, []);

  useEffect(() => {
    if (selectedDraftId) {
      const draft = drafts.find((d) => d.id === selectedDraftId);
      if (draft) {
        const picksMap: Record<number, string> = {};
        draft.picks.forEach((p) => {
          picksMap[p.pick_number] = p.prospect_id;
        });
        setPicks(picksMap);
        setDraftName(draft.name || '');
        setDisplayName(draft.display_name || '');
        setSaved(true);
      }
    } else {
      setPicks({});
      setDraftName('');
      setDisplayName('');
      setSaved(false);
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
        prediction_picks (pick_number, prospect_id, prospect_name, team)
      `)
      .eq('user_id', userId)
      .eq('draft_year', DRAFT_YEAR)
      .order('created_at', { ascending: true });

    if (!error && data) {
      const summaries: DraftSummary[] = data.map((d: { id: string; name: string | null; display_name: string | null; is_leaderboard_entry: boolean; prediction_picks: Array<{ pick_number: number; prospect_id: string; prospect_name: string; team: string }> }) => ({
        id: d.id,
        name: d.name,
        display_name: d.display_name,
        is_leaderboard_entry: d.is_leaderboard_entry ?? false,
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
        text: `Couldn't load drafts. Run the migration in Supabase: supabase/migrations/20260212_multiple_drafts.sql`,
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
      setDisplayName('');
      setSaved(false);
      setMessage({ type: 'success', text: 'New draft created. Add your picks.' });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : (err as { message?: string })?.message ?? String(err);
      const hint = /null value|violates not-null|duplicate key|violates unique/.test(msg)
        ? ' Run the migration: supabase/migrations/20260212_multiple_drafts.sql in Supabase SQL Editor.'
        : '';
      setMessage({ type: 'error', text: msg + hint });
    } finally {
      setLoading(false);
    }
  }

  async function savePicksToDb(predictionId: string) {
    await supabase.from('draft_predictions').update({ name: draftName.trim() || null }).eq('id', predictionId);
    await supabase.from('prediction_picks').delete().eq('prediction_id', predictionId);
    const prospectMap = Object.fromEntries(prospects.map((p) => [p.id, p]));
    const picksToInsert = draftOrder.map(({ pick, team }) => {
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
    const name = displayName.trim();
    if (!name) {
      setMessage({ type: 'error', text: 'Please enter a display name for the leaderboard.' });
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
        .update({ is_leaderboard_entry: true, display_name: name })
        .eq('id', selectedDraftId);

      await savePicksToDb(selectedDraftId);
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
          ? 'That display name is already taken. Choose another.'
          : err instanceof Error ? err.message : 'Failed to submit.',
      });
    } finally {
      setLoading(false);
    }
  }

  const usedIds = new Set(Object.values(picks).filter(Boolean));
  const selectedDraft = drafts.find((d) => d.id === selectedDraftId);
  const currentPicksForScore = draftOrder.map(({ pick, team }) => ({
    pick_number: pick,
    prospect_id: picks[pick] ?? '',
    team,
  })).filter((p) => p.prospect_id);
  const currentScore =
    currentPicksForScore.length === 32
      ? computeScore(
          currentPicksForScore.map((p) => ({ pick_number: p.pick_number, prospect_id: p.prospect_id, team: p.team })),
          draftOrder
        )
      : null;

  function fillFromBigBoard() {
    const sorted = [...prospects].sort((a, b) => (a.bigBoardRank ?? 99) - (b.bigBoardRank ?? 99));
    const next: Record<number, string> = {};
    draftOrder.forEach(({ pick }, i) => {
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

  function clearAll() {
    setPicks({});
  }

  return (
    <div className="space-y-6">
      {/* Draft selector */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {drafts.map((draft) => {
            const score = draft.picks.length === 32
              ? computeScore(
                  draft.picks.map((p) => ({ pick_number: p.pick_number, prospect_id: p.prospect_id, team: p.team })),
                  draftOrder
                )
              : null;
            const isSelected = draft.id === selectedDraftId;
            return (
              <button
                key={draft.id}
                type="button"
                onClick={() => setSelectedDraftId(draft.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-nfl-red text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{draft.name || `Draft ${drafts.indexOf(draft) + 1}`}</span>
                {score !== null && (
                  <span className="text-xs opacity-90">({score})</span>
                )}
                {draft.is_leaderboard_entry && (
                  <Trophy className="h-3.5 w-3.5" />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleCreateNewDraft}
          disabled={loading || drafts.length >= MAX_DRAFTS}
          className="inline-flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:border-nfl-red hover:text-nfl-red disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          New draft {drafts.length > 0 && `(${drafts.length}/${MAX_DRAFTS})`}
        </button>
      </div>

      {message && (
        <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}
      {submitResult && message?.type === 'success' && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <p className="font-semibold text-green-800">
            You&apos;re ranked <span className="text-green-900">#{submitResult.rank}</span> with {submitResult.score} points!
          </p>
          <p className="mt-1 text-sm text-green-700">
            Beat your score and climb the leaderboard. Refine your picks and resubmit to improve your rank.
          </p>
          <Link
            href="/leaderboard"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-green-800 hover:text-green-900 hover:underline"
          >
            <TrendingUp className="h-4 w-4" />
            View full leaderboard →
          </Link>
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
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label htmlFor="draftName" className="block text-sm font-medium text-gray-700 mb-1">
                Draft name (for your reference)
              </label>
              <input
                id="draftName"
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                maxLength={40}
                className="w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
                placeholder="e.g. Big Board"
              />
            </div>
            {selectedDraft?.is_leaderboard_entry ? (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                <Trophy className="h-4 w-4" />
                On leaderboard as {selectedDraft.display_name}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSubmitToLeaderboardModal(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
              >
                <Trophy className="h-4 w-4" />
                Submit to leaderboard
              </button>
            )}
            {currentScore !== null && (
              <>
                <span className="text-sm text-gray-600 font-medium">
                  Pre-draft score: <strong>{currentScore}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setShareModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Your First Round Picks</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  Select one prospect for each pick. Each prospect can only be used once.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={fillFromBigBoard}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Zap className="h-4 w-4" />
                  Fill from Big Board
                </button>
                {mockDraftTemplate && (
                  <button
                    type="button"
                    onClick={fillFromMockDraft}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    <Zap className="h-4 w-4" />
                    Use mock draft
                  </button>
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear all
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {draftOrder.map(({ pick, team }) => {
                const teamColor = TEAM_COLORS_BY_NAME[team] || '#1d4ed8';
                const needs = teamNeeds[pick] ?? [];
                return (
                  <div
                    key={pick}
                    className="flex flex-col min-h-[200px] rounded-lg border border-gray-200 bg-white p-4"
                    style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
                  >
                    <div className="mb-2 flex-shrink-0 flex items-center gap-2">
                      <span
                        className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-md px-1.5 text-xs font-bold text-white"
                        style={{ backgroundColor: teamColor }}
                      >
                        {pick}
                      </span>
                      <TeamLogo teamName={team} size={28} />
                      <span className="text-sm font-medium text-gray-900">{team}</span>
                    </div>
                    {needs.length > 0 && (
                      <p className="text-xs text-gray-500 mb-1 flex-shrink-0 line-clamp-2">
                        Needs: {needs.join(', ')}
                      </p>
                    )}
                    <div className="mt-auto flex-shrink-0">
                      <ProspectPicker
                        prospects={prospects}
                        value={picks[pick] || ''}
                        onChange={(id) => setPicks((prev) => ({ ...prev, [pick]: id }))}
                        usedIds={usedIds}
                        disabled={loading}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-nfl-red px-6 py-2.5 text-base font-semibold text-white hover:bg-nfl-red/90 disabled:opacity-50"
          >
            {loading ? 'Saving...' : saved ? 'Update Draft' : 'Save Draft'}
          </button>
        </form>
      )}

      {drafts.length === 0 && (
        <p className="text-gray-500 text-sm">
          Click &quot;New draft&quot; to create your first mock draft, or your drafts will load shortly.
        </p>
      )}

      {/* Share draft modal */}
      {shareModalOpen && currentScore !== null && (
        <ShareDraftModal
          onClose={() => setShareModalOpen(false)}
          score={currentScore}
          topPicks={draftOrder.slice(0, 5).map(({ pick, team }) => {
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

      {/* Submit to leaderboard modal */}
      {submitToLeaderboardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit to Leaderboard</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter a display name. This draft will replace any other draft you&apos;ve submitted.
            </p>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. DraftKing"
              maxLength={30}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setSubmitToLeaderboardModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitToLeaderboard}
                disabled={loading || !displayName.trim()}
                className="px-4 py-2 text-sm font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
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
