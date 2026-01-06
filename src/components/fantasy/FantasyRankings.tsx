'use client';

import { useState, useEffect } from 'react';
import { getFantasyRanks, getTeams } from '@/lib/adapters';
import { FantasyRankings as FantasyRankingsType, FantasyPlayer } from '@/types';
import { getScoringLabel } from '@/lib/utils';

export function FantasyRankings() {
  const [rankings, setRankings] = useState<FantasyRankingsType[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState('QB');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedScoring, setSelectedScoring] = useState<'standard' | 'half-ppr' | 'full-ppr'>('standard');

  useEffect(() => {
    loadRankings();
  }, [selectedPosition, selectedWeek, selectedScoring]);

  async function loadRankings() {
    try {
      setLoading(true);
      const [rankingsData, teamsData] = await Promise.all([
        getFantasyRanks(selectedWeek, selectedScoring, selectedPosition),
        getTeams(),
      ]);
      setRankings(rankingsData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error loading rankings:', error);
    } finally {
      setLoading(false);
    }
  }

  const positions = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K'];
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
  const scoringOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'half-ppr', label: 'Half PPR' },
    { value: 'full-ppr', label: 'Full PPR' },
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  const currentRanking = rankings.find(r => r.position === selectedPosition);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-purple focus:border-transparent"
        >
          {positions.map(pos => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>

        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-purple focus:border-transparent"
        >
          {weeks.map(week => (
            <option key={week} value={week}>Week {week}</option>
          ))}
        </select>

        <select
          value={selectedScoring}
          onChange={(e) => setSelectedScoring(e.target.value as 'standard' | 'half-ppr' | 'full-ppr')}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-purple focus:border-transparent"
        >
          {scoringOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Rankings */}
      {currentRanking ? (
        <div className="space-y-6">
          {currentRanking.tiers.map((tier) => (
            <div key={tier.tier} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Tier {tier.tier}
                </h3>
              </div>
              <div className="divide-y divide-gray-200">
                {tier.players.map((player, index) => {
                  const team = teams.find(t => t.id === player.teamId);
                  const ecrDelta = player.ecr ? player.ecr - player.rank : null;
                  
                  return (
                    <div key={player.id} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900 w-8">
                              {player.rank}
                            </span>
                            {ecrDelta && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                ecrDelta > 0 
                                  ? 'bg-green-100 text-green-800' 
                                  : ecrDelta < 0 
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                              }`}>
                                {ecrDelta > 0 ? '+' : ''}{ecrDelta} vs ECR
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{player.name}</div>
                            <div className="text-sm text-gray-600">
                              {team ? `${team.city} ${team.nickname}` : 'Unknown Team'} • {player.position}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          {player.ecr && (
                            <div className="text-sm text-gray-500">
                              ECR: {player.ecr}
                            </div>
                          )}
                          {player.notes && (
                            <div className="text-sm text-gray-600 mt-1 max-w-xs">
                              {player.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No rankings available for {selectedPosition} in Week {selectedWeek} with {getScoringLabel(selectedScoring)} scoring
        </div>
      )}
    </div>
  );
}
