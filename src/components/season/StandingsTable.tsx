'use client';

import { useState, useEffect } from 'react';
import { getStandings, getTeams } from '@/lib/adapters';
import { Standings, Team } from '@/types';
import { cn, formatRecord, calculateWinPercentage } from '@/lib/utils';

export function StandingsTable() {
  const [standings, setStandings] = useState<Standings[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [conference, setConference] = useState<'all' | 'AFC' | 'NFC'>('all');
  const [division, setDivision] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        const [standingsData, teamsData] = await Promise.all([
          getStandings(),
          getTeams(),
        ]);
        setStandings(standingsData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error loading standings:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredStandings = standings.filter(standing => {
    const team = teams.find(t => t.id === standing.teamId);
    if (!team) return false;
    
    if (conference !== 'all' && team.conference !== conference) return false;
    if (division !== 'all' && team.division !== division) return false;
    
    return true;
  });

  const sortedStandings = filteredStandings.sort((a, b) => {
    // Sort by conference, division, then win percentage
    const teamA = teams.find(t => t.id === a.teamId);
    const teamB = teams.find(t => t.id === b.teamId);
    
    if (!teamA || !teamB) return 0;
    
    if (teamA.conference !== teamB.conference) {
      return teamA.conference.localeCompare(teamB.conference);
    }
    
    if (teamA.division !== teamB.division) {
      return teamA.division.localeCompare(teamB.division);
    }
    
    return b.winPercentage - a.winPercentage;
  });

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={conference}
          onChange={(e) => setConference(e.target.value as 'all' | 'AFC' | 'NFC')}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-red focus:border-transparent"
        >
          <option value="all">All Conferences</option>
          <option value="AFC">AFC</option>
          <option value="NFC">NFC</option>
        </select>
        
        <select
          value={division}
          onChange={(e) => setDivision(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-red focus:border-transparent"
        >
          <option value="all">All Divisions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>

      {/* Standings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Team
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                W
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                T
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PCT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PF
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Playoff %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStandings.map((standing, index) => {
              const team = teams.find(t => t.id === standing.teamId);
              if (!team) return null;
              
              return (
                <tr key={standing.teamId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: team.colors.primary }}
                        >
                          {team.nickname.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {team.city} {team.nickname}
                        </div>
                        <div className="text-sm text-gray-500">
                          {team.conference} {team.division}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.ties}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.winPercentage.toFixed(3).replace(/^0+/, '')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.pointsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {standing.pointsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="mr-2">{(standing.playoffOdds * 100).toFixed(1)}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-nfl-red h-2 rounded-full transition-all duration-300"
                          style={{ width: `${standing.playoffOdds * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
