'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, BarChart2 } from 'lucide-react';

interface ConsensusPick {
  pick_number: number;
  prospect_id: string;
  prospect_name: string;
  pick_count: number;
  total_entries: number;
  pick_rank: number;
}

interface DraftSlot {
  pick: number;
  team: string;
}

interface ConsensusBoardProps {
  picks: ConsensusPick[];
  draftOrder: DraftSlot[];
  totalEntries: number;
}

// Group picks by slot into a map: pick_number → top picks array
function groupBySlot(picks: ConsensusPick[]): Map<number, ConsensusPick[]> {
  const map = new Map<number, ConsensusPick[]>();
  for (const p of picks) {
    const arr = map.get(p.pick_number) ?? [];
    arr.push(p);
    map.set(p.pick_number, arr);
  }
  return map;
}

// NFL team abbreviations for display
const TEAM_ABBR: Record<string, string> = {
  'Arizona Cardinals': 'ARI', 'Atlanta Falcons': 'ATL', 'Baltimore Ravens': 'BAL',
  'Buffalo Bills': 'BUF', 'Carolina Panthers': 'CAR', 'Chicago Bears': 'CHI',
  'Cincinnati Bengals': 'CIN', 'Cleveland Browns': 'CLE', 'Dallas Cowboys': 'DAL',
  'Denver Broncos': 'DEN', 'Detroit Lions': 'DET', 'Green Bay Packers': 'GB',
  'Houston Texans': 'HOU', 'Indianapolis Colts': 'IND', 'Jacksonville Jaguars': 'JAX',
  'Kansas City Chiefs': 'KC', 'Las Vegas Raiders': 'LV', 'Los Angeles Chargers': 'LAC',
  'Los Angeles Rams': 'LAR', 'Miami Dolphins': 'MIA', 'Minnesota Vikings': 'MIN',
  'New England Patriots': 'NE', 'New Orleans Saints': 'NO', 'New York Giants': 'NYG',
  'New York Jets': 'NYJ', 'Philadelphia Eagles': 'PHI', 'Pittsburgh Steelers': 'PIT',
  'San Francisco 49ers': 'SF', 'Seattle Seahawks': 'SEA', 'Tampa Bay Buccaneers': 'TB',
  'Tennessee Titans': 'TEN', 'Washington Commanders': 'WAS',
};

export function ConsensusBoard({ picks, draftOrder, totalEntries }: ConsensusBoardProps) {
  const [expanded, setExpanded] = useState(false);
  const bySlot = groupBySlot(picks);
  const visibleSlots = expanded ? draftOrder : draftOrder.slice(0, 10);

  if (totalEntries === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="h-[3px] bg-gradient-to-r from-nfl-red/0 via-nfl-blue to-nfl-red/0" />
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-nfl-blue/10">
          <BarChart2 className="h-4 w-4 text-nfl-blue" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Top Picks Consensus</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Most popular pick at each slot across {totalEntries.toLocaleString()} entries
          </p>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[3rem_5rem_1fr_6rem] gap-2 px-5 py-2 border-b border-gray-100 bg-gray-50/60">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">#</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Team</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Top Pick</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">% Picked</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {visibleSlots.map((slot) => {
          const slotPicks = bySlot.get(slot.pick) ?? [];
          const top = slotPicks[0];
          const pct = top && totalEntries > 0
            ? Math.round((top.pick_count / totalEntries) * 100)
            : 0;
          const abbr = TEAM_ABBR[slot.team] ?? slot.team.split(' ').pop()?.slice(0, 3).toUpperCase() ?? '—';

          return (
            <div
              key={slot.pick}
              className="grid grid-cols-[3rem_5rem_1fr_6rem] gap-2 items-center px-5 py-3 hover:bg-gray-50/80 transition-colors"
            >
              {/* Pick number */}
              <span className="text-xs font-bold text-gray-400 tabular-nums">{slot.pick}</span>

              {/* Team */}
              <span className="text-xs font-semibold text-gray-500 truncate">{abbr}</span>

              {/* Prospect name */}
              <div className="min-w-0">
                {top ? (
                  <Link
                    href={`/draft/prospects/${top.prospect_id}`}
                    className="text-sm font-semibold text-gray-900 hover:text-nfl-blue transition-colors truncate block"
                  >
                    {top.prospect_name}
                  </Link>
                ) : (
                  <span className="text-sm text-gray-300">—</span>
                )}
                {/* Runner-up */}
                {slotPicks[1] && (
                  <span className="text-xs text-gray-400 truncate block mt-0.5">
                    2nd: {slotPicks[1].prospect_name}{' '}
                    <span className="text-gray-300">
                      ({Math.round((slotPicks[1].pick_count / totalEntries) * 100)}%)
                    </span>
                  </span>
                )}
              </div>

              {/* Percentage bar */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-bold tabular-nums text-gray-700">{pct}%</span>
                <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-nfl-blue"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more / less */}
      {draftOrder.length > 10 && (
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-nfl-blue hover:text-nfl-blue/80 transition-colors"
          >
            {expanded ? (
              <>Show less <ChevronUp className="h-3.5 w-3.5" /></>
            ) : (
              <>Show all 32 picks <ChevronDown className="h-3.5 w-3.5" /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
