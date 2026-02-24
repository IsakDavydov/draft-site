'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Prospect } from '@/types';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';
import { Zap, Trash2 } from 'lucide-react';
import type { MockDraftFromFile } from '@/types';

const DRAFT_YEAR = 2026;

interface DraftOrderItem {
  pick: number;
  team: string;
}

interface PredictionFormProps {
  prospects: Prospect[];
  draftOrder: DraftOrderItem[];
  userId: string;
  mockDraftTemplate?: MockDraftFromFile | null;
  teamNeeds?: Record<number, string[]>;
}

export function PredictionForm({ prospects, draftOrder, userId, mockDraftTemplate, teamNeeds = {} }: PredictionFormProps) {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [existingPrediction, setExistingPrediction] = useState<{ id: string; picks: { pick_number: number; prospect_id: string; prospect_name: string; team: string }[] } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    loadExistingPrediction();
  }, []);

  async function loadExistingPrediction() {
    const { data, error } = await supabase
      .from('draft_predictions')
      .select(`
        id,
        display_name,
        prediction_picks (pick_number, prospect_id, prospect_name, team)
      `)
      .eq('user_id', userId)
      .eq('draft_year', DRAFT_YEAR)
      .single();

    if (data && !error) {
      setDisplayName(data.display_name || '');
      const picksMap: Record<number, string> = {};
      (data.prediction_picks || []).forEach((p: { pick_number: number; prospect_id: string }) => {
        picksMap[p.pick_number] = p.prospect_id;
      });
      setPicks(picksMap);
      setExistingPrediction({ id: data.id, picks: data.prediction_picks || [] });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!displayName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a display name.' });
      return;
    }

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

    setLoading(true);
    setMessage(null);

    try {
      if (existingPrediction) {
        await supabase
          .from('draft_predictions')
          .update({ display_name: displayName.trim() })
          .eq('id', existingPrediction.id);

        await supabase
          .from('prediction_picks')
          .delete()
          .eq('prediction_id', existingPrediction.id);
      }

      const { data: prediction, error: predError } = existingPrediction
        ? { data: { id: existingPrediction.id }, error: null }
        : await supabase
            .from('draft_predictions')
            .insert({
              user_id: userId,
              draft_year: DRAFT_YEAR,
              display_name: displayName.trim(),
            })
            .select('id')
            .single();

      if (predError && !existingPrediction) {
        throw predError;
      }

      const predictionId = prediction?.id || existingPrediction?.id;
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

      const { error: picksError } = await supabase
        .from('prediction_picks')
        .insert(picksToInsert);

      if (picksError) throw picksError;

      setSaved(true);
      setMessage({ type: 'success', text: 'Your predictions have been saved!' });
      if (!existingPrediction) {
        setExistingPrediction({ id: predictionId, picks: picksToInsert });
      }
    } catch (err: unknown) {
      const isDuplicateName =
        err && typeof err === 'object' && 'code' in err && (err as { code: string }).code === '23505';
      setMessage({
        type: 'error',
        text: isDuplicateName
          ? 'That display name is already taken for 2026. Please choose another.'
          : err instanceof Error
            ? err.message
            : 'Failed to save predictions.',
      });
    } finally {
      setLoading(false);
    }
  }

  const usedIds = new Set(Object.values(picks).filter(Boolean));

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
          Display name (shown on leaderboard)
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          maxLength={30}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
          placeholder="e.g. DraftKing"
        />
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
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Zap className="h-4 w-4" />
              Fill from Big Board
            </button>
            {mockDraftTemplate && (
              <button
                type="button"
                onClick={fillFromMockDraft}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Zap className="h-4 w-4" />
                Use mock draft
              </button>
            )}
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
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
                <div className="mb-2 flex-shrink-0">
                  <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-md px-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: teamColor }}>
                    {pick}
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-900">{team}</span>
                </div>
                {needs.length > 0 && (
                  <p className="text-xs text-gray-500 mb-1 flex-shrink-0 line-clamp-2">
                    Needs: {needs.join(', ')}
                  </p>
                )}
                <div className="mt-auto flex-shrink-0">
                <select
                  value={picks[pick] || ''}
                  onChange={(e) => setPicks((prev) => ({ ...prev, [pick]: e.target.value }))}
                  disabled={loading}
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white text-gray-900 focus:ring-2 focus:ring-nfl-blue focus:border-transparent disabled:opacity-50"
                >
                  <option value="">Select prospect</option>
                  {prospects.map((prospect) => (
                    <option
                      key={prospect.id}
                      value={prospect.id}
                      disabled={usedIds.has(prospect.id) && picks[pick] !== prospect.id}
                    >
                      {prospect.name} ({prospect.position}, {prospect.school})
                    </option>
                  ))}
                </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {message && (
        <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-nfl-red px-6 py-2.5 text-base font-semibold text-white hover:bg-nfl-red/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Saving...' : saved ? 'Update Predictions' : 'Save Predictions'}
      </button>
    </form>
  );
}
