'use client';

import { useState, useEffect } from 'react';
import { getStandings, getTeams } from '@/lib/adapters';
import { Standings, Team } from '@/types';
import { TeamLogo } from '@/components/shared/TeamLogo';
export function StandingsTable() {
  const [standings, setStandings] = useState<Standings[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

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

  const divisionOrder = ['East', 'North', 'South', 'West'];
  const conferenceOrder = ['AFC', 'NFC'];

  // Group standings by conference + division
  const divisionsByConference = conferenceOrder.flatMap(conference =>
    divisionOrder.map(division => ({ conference, division }))
  );

  const divisionStandings = divisionsByConference.map(({ conference, division }) => {
    const divStandings = standings
      .filter(standing => {
        const team = teams.find(t => t.id === standing.teamId);
        return team?.conference === conference && team?.division === division;
      })
      .sort((a, b) => b.winPercentage - a.winPercentage);

    return { conference, division, standings: divStandings };
  });

  return (
    <div className="p-6 space-y-6">
      {divisionStandings.map(({ conference, division, standings: divStandings }) => (
        <div
          key={`${conference}-${division}`}
          className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {conference} {division}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                {divStandings.map((standing) => {
                  const team = teams.find(t => t.id === standing.teamId);
                  if (!team) return null;

                  return (
                    <tr key={standing.teamId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <TeamLogo teamName={team.name} size={32} />
                          <div className="text-sm font-medium text-gray-900">
                            {team.city} {team.nickname}
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
      ))}
    </div>
  );
}
