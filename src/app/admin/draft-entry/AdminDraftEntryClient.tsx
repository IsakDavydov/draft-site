'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, AlertCircle, Mail, Trash2, Radio } from 'lucide-react';
import Link from 'next/link';

interface Prospect {
  id: string;
  name: string;
  position: string;
  school: string;
}

interface DraftSlot {
  pick: number;
  team: string;
}

interface ExistingResult {
  pick_number: number;
  prospect_id: string;
  prospect_name: string;
  team: string;
}

interface AdminDraftEntryClientProps {
  prospects: Prospect[];
  draftOrder: DraftSlot[];
  existingResults: ExistingResult[];
}

export function AdminDraftEntryClient({
  prospects,
  draftOrder,
  existingResults,
}: AdminDraftEntryClientProps) {
  const supabase = createClient();
  const [results, setResults] = useState<ExistingResult[]>(existingResults);
  const [selectedPick, setSelectedPick] = useState<number | null>(null);
  const [selectedProspect, setSelectedProspect] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [notifying, setNotifying] = useState(false);

  const completedPickNums = new Set(results.map((r) => r.pick_number));
  const nextUnannounced = draftOrder.find((s) => !completedPickNums.has(s.pick));

  const filteredProspects = prospects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function showToast(type: 'success' | 'error', msg: string) {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  }

  async function submitPick() {
    if (!selectedPick || !selectedProspect) return;
    const slot = draftOrder.find((s) => s.pick === selectedPick);
    const prospect = prospects.find((p) => p.id === selectedProspect);
    if (!slot || !prospect) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from('draft_results').upsert(
        {
          draft_year: 2026,
          pick_number: selectedPick,
          prospect_id: prospect.id,
          prospect_name: prospect.name,
          team: slot.team,
        },
        { onConflict: 'draft_year,pick_number' }
      );

      if (error) throw error;

      setResults((prev) => {
        const filtered = prev.filter((r) => r.pick_number !== selectedPick);
        return [...filtered, {
          pick_number: selectedPick,
          prospect_id: prospect.id,
          prospect_name: prospect.name,
          team: slot.team,
        }].sort((a, b) => a.pick_number - b.pick_number);
      });

      showToast('success', `Pick #${selectedPick}: ${prospect.name} to ${slot.team}`);
      setSelectedProspect('');
      setSearchQuery('');

      // Auto-advance to next pick
      const nextPick = draftOrder.find((s) => s.pick > selectedPick && !completedPickNums.has(s.pick));
      if (nextPick) setSelectedPick(nextPick.pick);

    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Failed to submit pick');
    } finally {
      setSubmitting(false);
    }
  }

  async function deletePick(pickNumber: number) {
    const { error } = await supabase
      .from('draft_results')
      .delete()
      .eq('draft_year', 2026)
      .eq('pick_number', pickNumber);

    if (error) {
      showToast('error', error.message);
    } else {
      setResults((prev) => prev.filter((r) => r.pick_number !== pickNumber));
      showToast('success', `Pick #${pickNumber} removed`);
    }
  }

  async function sendNotifications() {
    if (!confirm('Send score notification emails to all participants?')) return;
    setNotifying(true);
    try {
      const adminSecret = prompt('Enter admin secret:');
      if (!adminSecret) return;

      const res = await fetch('/api/notify-scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminSecret }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to send notifications');
      showToast('success', `Emails sent to ${data.sent} participants`);
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setNotifying(false);
    }
  }

  const currentSlot = selectedPick ? draftOrder.find((s) => s.pick === selectedPick) : null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Radio className="h-5 w-5 text-nfl-blue" />
          <h1 className="text-lg font-bold">Draft Entry</h1>
          <span className="text-xs text-gray-500 font-mono">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/live"
            target="_blank"
            className="text-xs font-semibold text-nfl-blue hover:text-nfl-blue/80 transition-colors"
          >
            View live page →
          </Link>
          <button
            onClick={sendNotifications}
            disabled={notifying || results.length < 32}
            className="flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-3 py-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Mail className="h-4 w-4" />
            {notifying ? 'Sending…' : 'Send Score Emails'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${
          toast.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left: Entry form */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-gray-900 border border-white/10 p-5">
            <h2 className="text-sm font-bold mb-4">Enter Pick</h2>

            {/* Pick selector */}
            <div className="mb-4">
              <label className="text-xs text-gray-400 mb-2 block">Pick #</label>
              <div className="grid grid-cols-8 gap-1.5">
                {draftOrder.map((slot) => {
                  const done = completedPickNums.has(slot.pick);
                  const isSelected = selectedPick === slot.pick;
                  return (
                    <button
                      key={slot.pick}
                      onClick={() => setSelectedPick(slot.pick)}
                      title={slot.team}
                      className={`h-8 rounded text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-nfl-blue text-white ring-2 ring-nfl-blue/50'
                          : done
                            ? 'bg-green-900/40 text-green-400'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {slot.pick}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto-suggest next pick */}
            {!selectedPick && nextUnannounced && (
              <button
                onClick={() => setSelectedPick(nextUnannounced.pick)}
                className="w-full mb-4 rounded-lg bg-nfl-blue/10 border border-nfl-blue/30 px-4 py-2 text-sm font-semibold text-nfl-blue hover:bg-nfl-blue/20 transition-colors"
              >
                Next pick: #{nextUnannounced.pick} — {nextUnannounced.team}
              </button>
            )}

            {currentSlot && (
              <p className="text-xs text-gray-400 mb-4">
                Pick <span className="font-bold text-white">#{currentSlot.pick}</span> — {currentSlot.team}
              </p>
            )}

            {/* Prospect search */}
            <div className="mb-3">
              <label className="text-xs text-gray-400 mb-2 block">Search Prospect</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, position, school…"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-nfl-blue/50"
              />
            </div>

            {/* Prospect list */}
            <div className="max-h-56 overflow-y-auto rounded-lg bg-black/20 border border-white/5">
              {filteredProspects.slice(0, 30).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProspect(p.id)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    selectedProspect === p.id
                      ? 'bg-nfl-blue text-white'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="font-semibold">{p.name}</span>
                  <span className="text-xs ml-2 opacity-60">{p.position} · {p.school}</span>
                </button>
              ))}
            </div>

            {/* Submit */}
            <button
              onClick={submitPick}
              disabled={!selectedPick || !selectedProspect || submitting}
              className="mt-4 w-full rounded-xl bg-nfl-blue px-4 py-3 text-sm font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-nfl-blue/90 transition-colors"
            >
              {submitting ? 'Submitting…' : `Submit Pick #${selectedPick ?? '?'}`}
            </button>
          </div>
        </div>

        {/* Right: Results log */}
        <div className="rounded-2xl bg-gray-900 border border-white/10 overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold">Announced Picks</h2>
            <span className="text-xs text-gray-500">{results.length} / 32</span>
          </div>
          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-600 text-center">No picks entered yet</p>
            ) : (
              results.map((r) => (
                <div key={r.pick_number} className="flex items-center gap-3 px-4 py-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
                    {r.pick_number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{r.prospect_name}</p>
                    <p className="text-xs text-gray-500">{r.team}</p>
                  </div>
                  <button
                    onClick={() => deletePick(r.pick_number)}
                    className="flex-shrink-0 rounded p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                    title="Delete pick"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
