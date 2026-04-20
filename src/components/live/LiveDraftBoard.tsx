'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Radio, Trophy, CheckCircle, Circle } from 'lucide-react';

interface DraftResult {
  id: string;
  pick_number: number;
  prospect_id: string;
  prospect_name: string;
  team: string;
  draft_year: number;
}

interface DraftSlot {
  pick: number;
  team: string;
}

interface LeaderboardEntry {
  prediction_id: string;
  display_name: string;
  score: number;
  rank: number;
}

interface Scorer {
  prediction_id: string;
  display_name: string;
  points: number;
  predicted_pick: number;
}

interface PickEvent {
  result: DraftResult;
  scorers: Scorer[];
  timestamp: number;
}

interface LiveDraftBoardProps {
  initialResults: DraftResult[];
  draftOrder: DraftSlot[];
  initialLeaderboard: LeaderboardEntry[];
}

export function LiveDraftBoard({ initialResults, draftOrder, initialLeaderboard }: LiveDraftBoardProps) {
  const [results, setResults] = useState<DraftResult[]>(initialResults);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  const [pickEvents, setPickEvents] = useState<PickEvent[]>([]);
  const [latestPick, setLatestPick] = useState<DraftResult | null>(
    initialResults.length > 0 ? initialResults[initialResults.length - 1] : null
  );
  const [isConnected, setIsConnected] = useState(false);
  const supabase = createClient();
  const feedRef = useRef<HTMLDivElement>(null);

  // Fetch updated leaderboard
  async function refreshLeaderboard() {
    const { data } = await supabase.rpc('get_leaderboard', { p_year: 2026 });
    if (data) {
      setLeaderboard(data.map((r: { prediction_id: string; display_name: string; score: number | bigint; rank: number | bigint }) => ({
        prediction_id: r.prediction_id,
        display_name: r.display_name,
        score: Number(r.score),
        rank: Number(r.rank),
      })));
    }
  }

  // Fetch scorers for a pick
  async function fetchScorers(pickNumber: number): Promise<Scorer[]> {
    const { data } = await supabase.rpc('get_pick_scorers', {
      p_pick_number: pickNumber,
      p_year: 2026,
    });
    return (data ?? []).map((r: { prediction_id: string; display_name: string; points: number; predicted_pick: number }) => ({
      prediction_id: r.prediction_id,
      display_name: r.display_name,
      points: r.points,
      predicted_pick: r.predicted_pick,
    }));
  }

  useEffect(() => {
    const channel = supabase
      .channel('live-draft-results')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'draft_results' },
        async (payload) => {
          const newResult = payload.new as DraftResult;
          setResults((prev) => {
            const exists = prev.some((r) => r.pick_number === newResult.pick_number);
            if (exists) return prev;
            return [...prev, newResult].sort((a, b) => a.pick_number - b.pick_number);
          });
          setLatestPick(newResult);

          // Scroll feed to top
          feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

          // Fetch who scored + refresh leaderboard
          const [scorers] = await Promise.all([
            fetchScorers(newResult.pick_number),
            refreshLeaderboard(),
          ]);

          setPickEvents((prev) => [
            { result: newResult, scorers, timestamp: Date.now() },
            ...prev.slice(0, 31), // keep last 32 events
          ]);
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => { supabase.removeChannel(channel); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completedPicks = new Set(results.map((r) => r.pick_number));
  const nextPick = draftOrder.find((slot) => !completedPicks.has(slot.pick));
  const totalPicks = results.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left: On the clock + pick feed */}
      <div className="lg:col-span-2 space-y-4">

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700">
          <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            <span className="text-xs font-semibold">
              {isConnected ? 'Live' : 'Connecting…'}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {totalPicks} / 32 picks announced
          </span>
        </div>

        {/* On the clock */}
        {nextPick && (
          <div className="rounded-2xl bg-rose-500 p-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">On the Clock</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black tabular-nums leading-none">#{nextPick.pick}</span>
              <div className="pb-0.5">
                <p className="text-xl font-bold">{nextPick.team}</p>
                <p className="text-sm text-white/60">2026 NFL Draft · Round 1</p>
              </div>
            </div>
          </div>
        )}

        {totalPicks === 32 && (
          <div className="rounded-2xl bg-green-50 border border-green-200 px-5 py-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-green-700">Round 1 Complete — All 32 picks are in!</p>
          </div>
        )}

        {/* Latest pick highlight */}
        {latestPick && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Latest Pick</p>
            </div>
            <div className="px-5 py-4 flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-500 flex items-center justify-center text-white text-lg font-black">
                {latestPick.pick_number}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{latestPick.prospect_name}</p>
                <p className="text-sm text-gray-400">{latestPick.team}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pick feed */}
        <div
          ref={feedRef}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden max-h-[500px] overflow-y-auto"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#d1d5db #f9fafb' }}
        >
          <div className="px-5 py-3 border-b border-gray-200 bg-gray-50 sticky top-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pick Feed</p>
          </div>
          {pickEvents.length === 0 && initialResults.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">
              Waiting for the draft to begin…
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* Live events first */}
              {pickEvents.map((event) => (
                <PickFeedRow
                  key={`event-${event.result.pick_number}`}
                  result={event.result}
                  scorers={event.scorers}
                  isNew
                />
              ))}
              {/* Historical picks from server (not in events yet) */}
              {results
                .filter((r) => !pickEvents.some((e) => e.result.pick_number === r.pick_number))
                .sort((a, b) => b.pick_number - a.pick_number)
                .map((r) => (
                  <PickFeedRow key={`hist-${r.pick_number}`} result={r} scorers={[]} isNew={false} />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Live leaderboard */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="h-[3px] bg-gradient-to-r from-brand-red/0 via-brand-red to-brand-red/0" />
          <div className="px-5 py-4 border-b border-gray-200 flex items-center gap-2">
            <Trophy className="h-4 w-4 text-rose-500" />
            <h2 className="text-sm font-bold text-gray-900">Live Leaderboard</h2>
          </div>
          {leaderboard.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">
              Scores appear as picks come in
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {leaderboard.slice(0, 20).map((entry) => (
                <div key={entry.prediction_id} className="flex items-center gap-3 px-4 py-3">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1 ? 'bg-rose-500 text-white' :
                    entry.rank === 2 ? 'bg-brand-gold text-black' :
                    entry.rank === 3 ? 'bg-gray-400 text-white' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    {entry.rank}
                  </span>
                  <Link
                    href={`/predictions/${entry.prediction_id}`}
                    className="flex-1 min-w-0 text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors truncate"
                  >
                    {entry.display_name}
                  </Link>
                  <span className={`flex-shrink-0 text-sm font-bold tabular-nums ${
                    entry.rank === 1 ? 'text-rose-500' :
                    entry.rank === 2 ? 'text-brand-gold' :
                    entry.rank === 3 ? 'text-gray-500' :
                    'text-gray-600'
                  }`}>
                    {entry.score}
                  </span>
                </div>
              ))}
            </div>
          )}
          {leaderboard.length > 20 && (
            <div className="px-5 py-3 border-t border-gray-200">
              <Link
                href="/leaderboard"
                className="text-xs font-semibold text-rose-500 hover:text-rose-500/80 transition-colors"
              >
                View full leaderboard →
              </Link>
            </div>
          )}
        </div>

        {/* Draft board mini tracker */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Pick Tracker</p>
          </div>
          <div className="p-4 grid grid-cols-8 gap-1.5">
            {draftOrder.map((slot) => {
              const done = completedPicks.has(slot.pick);
              const isNext = slot.pick === nextPick?.pick;
              return (
                <div
                  key={slot.pick}
                  title={done ? results.find(r => r.pick_number === slot.pick)?.prospect_name : slot.team}
                  className={`h-7 w-full rounded flex items-center justify-center text-[10px] font-bold transition-all ${
                    done
                      ? 'bg-rose-500 text-white'
                      : isNext
                        ? 'bg-rose-100 text-rose-500 ring-2 ring-rose-300 animate-pulse'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {slot.pick}
                </div>
              );
            })}
          </div>
          <div className="px-4 pb-3 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-rose-500" />
              Announced
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-gray-100 ring-1 ring-gray-200" />
              Pending
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PickFeedRow({
  result,
  scorers,
  isNew,
}: {
  result: DraftResult;
  scorers: Scorer[];
  isNew: boolean;
}) {
  const [showScorers, setShowScorers] = useState(false);
  const scorerCount = scorers.filter(s => s.points > 0).length;

  return (
    <div className={`px-5 py-3 transition-colors ${isNew ? 'bg-green-50' : ''}`}>
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
          {result.pick_number}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{result.prospect_name}</p>
          <p className="text-xs text-gray-400">{result.team}</p>
        </div>
        {scorerCount > 0 && (
          <button
            onClick={() => setShowScorers(!showScorers)}
            className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2 py-0.5 hover:bg-green-200 transition-colors"
          >
            +{scorerCount} scored
            {showScorers ? <Radio className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
          </button>
        )}
      </div>
      {showScorers && scorers.length > 0 && (
        <div className="mt-2 ml-11 space-y-1">
          {scorers.map((s) => (
            <div key={s.prediction_id} className="flex items-center gap-2">
              <span className={`text-xs font-bold ${s.points === 15 ? 'text-green-600' : 'text-amber-600'}`}>
                +{s.points}
              </span>
              <Link
                href={`/predictions/${s.prediction_id}`}
                className="text-xs text-gray-600 hover:text-rose-500 truncate"
              >
                {s.display_name}
              </Link>
              {s.predicted_pick !== result.pick_number && (
                <span className="text-xs text-gray-500">(predicted #{s.predicted_pick})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
