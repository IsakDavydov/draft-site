'use client';

import { useState, useEffect } from 'react';
import { getSchedules, getTeams } from '@/lib/adapters';
import { Game, Team } from '@/types';
import { formatDate, formatTime, getTeamColors } from '@/lib/utils';
import { Calendar, Clock, Tv, MapPin, Users } from 'lucide-react';

export function SeasonSchedule() {
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [gamesData, teamsData] = await Promise.all([
          getSchedules(), // Get all games
          getTeams(),
        ]);
        setAllGames(gamesData);
        setTeams(teamsData);
      } catch (error) {
        console.error('Error loading season schedule:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter games based on selections
  const filteredGames = allGames.filter(game => {
    const teamMatch = selectedTeam === 'all' || 
                     game.homeTeamId === selectedTeam || 
                     game.awayTeamId === selectedTeam;
    const weekMatch = selectedWeek === 'all' || game.week === parseInt(selectedWeek);
    return teamMatch && weekMatch;
  });

  // Group games by week
  const gamesByWeek = filteredGames.reduce((acc, game) => {
    if (!acc[game.week]) {
      acc[game.week] = [];
    }
    acc[game.week].push(game);
    return acc;
  }, {} as Record<number, Game[]>);

  // Get unique weeks for filter
  const uniqueWeeks = [...new Set(allGames.map(game => game.week))].sort((a, b) => a - b);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getTeam = (teamId: string) => teams.find(t => t.id === teamId);

  const getGameStatus = (game: Game) => {
    const gameDate = new Date(game.date + 'T' + (game.time || '00:00'));
    const now = new Date();
    
    if (game.status === 'final') {
      return { label: 'Final', color: 'bg-green-100 text-green-800' };
    }
    
    if (game.status === 'live') {
      return { label: 'LIVE', color: 'bg-red-100 text-red-800' };
    }
    
    if (gameDate < now) {
      return { label: 'Final', color: 'bg-green-100 text-green-800' };
    }
    
    if (game.date === now.toISOString().split('T')[0]) {
      return { label: 'Today', color: 'bg-blue-100 text-blue-800' };
    }
    
    return { label: 'Scheduled', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Team:</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-red focus:border-transparent"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>
                  {team.city} {team.nickname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Week:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-red focus:border-transparent"
            >
              <option value="all">All Weeks</option>
              {uniqueWeeks.map(week => (
                <option key={week} value={week}>
                  Week {week}
                </option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500">
            {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Schedule by Week */}
      <div className="space-y-8">
        {Object.keys(gamesByWeek).length > 0 ? (
          Object.entries(gamesByWeek)
            .sort(([a], [b]) => parseInt(a) - parseInt(b))
            .map(([week, games]) => (
              <div key={week} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Week {week} - {games.length} Game{games.length !== 1 ? 's' : ''}
                  </h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {games.map((game) => {
                    const homeTeam = getTeam(game.homeTeamId);
                    const awayTeam = getTeam(game.awayTeamId);
                    const status = getGameStatus(game);

                    if (!homeTeam || !awayTeam) return null;

                    return (
                      <div key={game.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          {/* Teams */}
                          <div className="flex items-center space-x-6">
                            {/* Away Team */}
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                                style={{ backgroundColor: getTeamColors(awayTeam.slug).primary }}
                              >
                                {awayTeam.nickname.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{awayTeam.city} {awayTeam.nickname}</div>
                                {game.awayScore !== undefined && (
                                  <div className="text-xl font-bold text-gray-900">{game.awayScore}</div>
                                )}
                              </div>
                            </div>

                            {/* VS */}
                            <div className="text-gray-400 font-medium">@</div>

                            {/* Home Team */}
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm"
                                style={{ backgroundColor: getTeamColors(homeTeam.slug).primary }}
                              >
                                {homeTeam.nickname.charAt(0)}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{homeTeam.city} {homeTeam.nickname}</div>
                                {game.homeScore !== undefined && (
                                  <div className="text-xl font-bold text-gray-900">{game.homeScore}</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Game Details */}
                          <div className="text-right">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              {status.label}
                            </div>
                            
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(game.date)}</span>
                              </div>
                              
                              {game.time && (
                                <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                                  <Clock className="w-3 h-3" />
                                  <span>{formatTime(game.date + 'T' + game.time)}</span>
                                </div>
                              )}
                              
                              {game.network && game.network !== 'TBD' && (
                                <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                                  <Tv className="w-3 h-3" />
                                  <span>{game.network}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Odds (if available) */}
                        {game.odds && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
                              <div>
                                <span className="font-medium">Spread:</span> {game.odds.homeLine && game.odds.homeLine > 0 ? `+${game.odds.homeLine}` : game.odds.homeLine || 'N/A'}
                              </div>
                              <div>
                                <span className="font-medium">Total:</span> {game.odds.total || 'N/A'}
                              </div>
                              <div>
                                <span className="font-medium">ML:</span> {game.odds.homeMoneyline && game.odds.homeMoneyline > 0 ? `+${game.odds.homeMoneyline}` : game.odds.homeMoneyline || 'N/A'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No games found with the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
