'use client';

import { useState, useEffect } from 'react';
import { getSchedules, getTeams, getUpcomingGames, getTodaysGames } from '@/lib/adapters';
import { Game, Team } from '@/types';
import { formatDate, formatTime, getTeamColors } from '@/lib/utils';
import { Calendar, Clock, Tv, TrendingUp } from 'lucide-react';

export function WeeklySchedule() {
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [viewMode, setViewMode] = useState<'weekly' | 'upcoming' | 'today'>('weekly');
  const [apiStatus, setApiStatus] = useState<'real' | 'mock'>('mock');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        let gamesData: Game[];
        const teamsData = await getTeams();

        // Load games based on view mode
        switch (viewMode) {
          case 'weekly':
            gamesData = await getSchedules(selectedWeek);
            break;
          case 'upcoming':
            gamesData = await getUpcomingGames(20);
            break;
          case 'today':
            gamesData = await getTodaysGames();
            break;
          default:
            gamesData = await getSchedules(selectedWeek);
        }

        setGames(gamesData);
        setTeams(teamsData);
        
        // Check if we got real data or mock data
        if (gamesData.length > 0 && gamesData[0].id !== '1') {
          setApiStatus('real');
        } else {
          setApiStatus('mock');
        }
      } catch (error) {
        console.error('Error loading schedule:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [selectedWeek, viewMode]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
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
    
    // Check if game is today
    if (game.date === now.toISOString().split('T')[0]) {
      return { label: 'Today', color: 'bg-blue-100 text-blue-800' };
    }
    
    // Check if game is this week
    const gameTime = gameDate.getTime();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    if (gameTime >= weekStart.getTime()) {
      return { label: 'This Week', color: 'bg-yellow-100 text-yellow-800' };
    }
    
    return { label: 'Upcoming', color: 'bg-gray-100 text-gray-800' };
  };

  const getTimeUntilGame = (game: Game) => {
    const gameDate = new Date(game.date + 'T' + (game.time || '00:00'));
    const now = new Date();
    const diff = gameDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'Game time!';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div>
      {/* View Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'weekly'
                ? 'bg-nfl-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weekly View
          </button>
          <button
            onClick={() => setViewMode('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'upcoming'
                ? 'bg-nfl-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming Games
          </button>
          <button
            onClick={() => setViewMode('today')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'today'
                ? 'bg-nfl-red text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Today's Games
          </button>
        </div>

        {/* Week Selector (only for weekly view) */}
        {viewMode === 'weekly' && (
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Week:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-nfl-red focus:border-transparent"
            >
              {[...Array(18)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  Week {i + 1}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* API Status Indicator */}
      {apiStatus === 'mock' && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-yellow-800">
              Using sample data. Get your free API key at{' '}
              <a 
                href="https://the-odds-api.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-yellow-900"
              >
                the-odds-api.com
              </a>
            </span>
          </div>
        </div>
      )}

      {/* Games Grid */}
      <div className="space-y-4">
        {games.map((game) => {
          const homeTeam = getTeam(game.homeTeamId);
          const awayTeam = getTeam(game.awayTeamId);
          const status = getGameStatus(game);

          if (!homeTeam || !awayTeam) return null;

          return (
            <div key={game.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                {/* Game Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-6">
                    {/* Away Team */}
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        style={{ backgroundColor: getTeamColors(awayTeam.slug).primary }}
                      >
                        {awayTeam.nickname.charAt(0)}
                    </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{awayTeam.city} {awayTeam.nickname}</div>
                        {game.awayScore !== undefined && (
                          <div className="text-3xl font-bold text-gray-900">{game.awayScore}</div>
                        )}
                      </div>
                    </div>

                    {/* VS */}
                    <div className="text-gray-400 font-medium text-2xl">@</div>

                    {/* Home Team */}
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg"
                        style={{ backgroundColor: getTeamColors(homeTeam.slug).primary }}
                      >
                        {homeTeam.nickname.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{homeTeam.city} {awayTeam.nickname}</div>
                        {game.homeScore !== undefined && (
                          <div className="text-3xl font-bold text-gray-900">{game.homeScore}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Details */}
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                    {status.label}
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(game.date)}</span>
                    </div>
                    
                    {game.time && (
                      <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(game.date + 'T' + game.time)}</span>
                      </div>
                    )}
                    
                    {game.network && game.network !== 'TBD' && (
                      <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                        <Tv className="w-4 h-4" />
                        <span>{game.network}</span>
                      </div>
                    )}
                  </div>

                  {/* Countdown for upcoming games */}
                  {game.status === 'scheduled' && (
                    <div className="mt-3 text-xs text-gray-500">
                      {getTimeUntilGame(game)}
                    </div>
                  )}
                </div>
              </div>

              {/* Odds (if available) */}
              {game.odds && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-8 text-sm">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Spread:</span>
                      <span className="text-gray-900">
                        {game.odds.homeLine && game.odds.homeLine > 0 ? `+${game.odds.homeLine}` : game.odds.homeLine || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Total:</span>
                      <span className="text-gray-900">{game.odds.total || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-700">ML:</span>
                      <span className="text-gray-900">
                        {game.odds.homeMoneyline && game.odds.homeMoneyline > 0 ? `+${game.odds.homeMoneyline}` : game.odds.homeMoneyline || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {games.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {viewMode === 'today' ? 'No games scheduled for today' : 
           viewMode === 'upcoming' ? 'No upcoming games found' : 
           `No games scheduled for Week ${selectedWeek}`}
        </div>
      )}
    </div>
  );
}
