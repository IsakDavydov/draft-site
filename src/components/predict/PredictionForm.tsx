'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Prospect } from '@/types';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';

const DRAFT_YEAR = 2026;

interface DraftOrderItem {
  pick: number;
  team: string;
}

interface PredictionFormProps {
  prospects: Prospect[];
  draftOrder: DraftOrderItem[];
  userId: string;
}

export function PredictionForm({ prospects, draftOrder, userId }: PredictionFormProps) {
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
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save predictions.',
      });
    } finally {
      setLoading(false);
    }
  }

  const usedIds = new Set(Object.values(picks).filter(Boolean));

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
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
          placeholder="e.g. DraftKing"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Your First Round Picks</h2>
        <p className="text-sm text-gray-600">
          Select one prospect for each pick. Each prospect can only be used once.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {draftOrder.map(({ pick, team }) => {
            const teamColor = TEAM_COLORS_BY_NAME[team] || '#1d4ed8';
            return (
              <div
                key={pick}
                className="rounded-lg border border-gray-200 bg-white p-4"
                style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
              >
                <div className="mb-2">
                  <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-md px-1.5 text-xs font-bold text-white"
                    style={{ backgroundColor: teamColor }}>
                    {pick}
                  </span>
                  <span className="ml-2 text-sm font-medium text-gray-900">{team}</span>
                </div>
                <select
                  value={picks[pick] || ''}
                  onChange={(e) => setPicks((prev) => ({ ...prev, [pick]: e.target.value }))}
                  className="w-full text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
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
