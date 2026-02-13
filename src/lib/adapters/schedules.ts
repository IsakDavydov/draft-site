import { Game, Team } from '@/types';

// The Odds API configuration
const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY || 'demo';
const ODDS_API_BASE = 'https://api.the-odds-api.com/v4/sports';

// NFL Schedule API endpoints
const NFL_SPORT_KEY = 'americanfootball_nfl';

// Mock data for schedules - 2026 season (Week 1 from nflplayoff.com)
const mockGames: Game[] = [
  // Week 1 - 2026 Season (Thu Sep 3, Sun Sep 6, Mon Sep 7)
  {
    id: '1',
    week: 1,
    season: 2026,
    homeTeamId: 'bills',
    awayTeamId: 'dolphins',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-03',
    time: '20:20',
    network: 'NFLN',
  },
  {
    id: '2',
    week: 1,
    season: 2026,
    homeTeamId: 'saints',
    awayTeamId: 'panthers',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'FOX',
  },
  {
    id: '3',
    week: 1,
    season: 2026,
    homeTeamId: 'bengals',
    awayTeamId: 'bears',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'FOX',
  },
  {
    id: '4',
    week: 1,
    season: 2026,
    homeTeamId: 'texans',
    awayTeamId: 'browns',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'CBS',
  },
  {
    id: '5',
    week: 1,
    season: 2026,
    homeTeamId: 'colts',
    awayTeamId: 'rams',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'FOX',
  },
  {
    id: '6',
    week: 1,
    season: 2026,
    homeTeamId: 'jaguars',
    awayTeamId: 'broncos',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'CBS',
  },
  {
    id: '7',
    week: 1,
    season: 2026,
    homeTeamId: 'lions',
    awayTeamId: 'packers',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'FOX',
  },
  {
    id: '8',
    week: 1,
    season: 2026,
    homeTeamId: 'jets',
    awayTeamId: 'patriots',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'CBS',
  },
  {
    id: '9',
    week: 1,
    season: 2026,
    homeTeamId: 'eagles',
    awayTeamId: '49ers',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'FOX',
  },
  {
    id: '10',
    week: 1,
    season: 2026,
    homeTeamId: 'steelers',
    awayTeamId: 'raiders',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '13:00',
    network: 'CBS',
  },
  {
    id: '11',
    week: 1,
    season: 2026,
    homeTeamId: 'vikings',
    awayTeamId: 'cardinals',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '16:05',
    network: 'FOX',
  },
  {
    id: '12',
    week: 1,
    season: 2026,
    homeTeamId: 'falcons',
    awayTeamId: 'buccaneers',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '16:05',
    network: 'FOX',
  },
  {
    id: '13',
    week: 1,
    season: 2026,
    homeTeamId: 'chargers',
    awayTeamId: 'cowboys',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '16:25',
    network: 'CBS',
  },
  {
    id: '14',
    week: 1,
    season: 2026,
    homeTeamId: 'seahawks',
    awayTeamId: 'titans',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '16:25',
    network: 'CBS',
  },
  {
    id: '15',
    week: 1,
    season: 2026,
    homeTeamId: 'chiefs',
    awayTeamId: 'ravens',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-06',
    time: '20:20',
    network: 'NBC',
  },
  {
    id: '16',
    week: 1,
    season: 2026,
    homeTeamId: 'giants',
    awayTeamId: 'commanders',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2026-09-07',
    time: '20:15',
    network: 'ESPN',
  },
];

// Fetch real NFL schedule from The Odds API
async function fetchNFLSchedule(week?: number, season: number = 2026): Promise<Game[]> {
  try {
    // The Odds API provides upcoming games
    const response = await fetch(`${ODDS_API_BASE}/${NFL_SPORT_KEY}/odds?apiKey=${ODDS_API_KEY}&regions=us&markets=spreads,totals,h2h&oddsFormat=american`);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform API data to our Game format
    const games: Game[] = data.map((game: any, index: number) => {
      const gameDate = new Date(game.commence_time);
      const gameWeek = calculateWeek(gameDate, season);
      
      return {
        id: game.id || `game-${index}`,
        week: gameWeek,
        season: season,
        homeTeamId: game.home_team.toLowerCase().replace(/\s+/g, '-'),
        awayTeamId: game.away_team.toLowerCase().replace(/\s+/g, '-'),
        homeScore: undefined, // Not available for upcoming games
        awayScore: undefined,
        status: 'scheduled',
        date: gameDate.toISOString().split('T')[0],
        time: gameDate.toTimeString().split(' ')[0].substring(0, 5),
        network: game.media?.media_type || 'TBD',
        odds: {
          homeLine: game.bookmakers?.[0]?.markets?.[0]?.outcomes?.find((o: any) => o.name === game.home_team)?.point || 0,
          awayLine: game.bookmakers?.[0]?.markets?.[0]?.outcomes?.find((o: any) => o.name === game.away_team)?.point || 0,
          total: game.bookmakers?.[0]?.markets?.[1]?.outcomes?.[0]?.point || 0,
          homeMoneyline: game.bookmakers?.[0]?.markets?.[2]?.outcomes?.find((o: any) => o.name === game.home_team)?.price || 0,
          awayMoneyline: game.bookmakers?.[0]?.markets?.[2]?.outcomes?.find((o: any) => o.name === game.away_team)?.price || 0,
        },
      };
    });

    // Filter by week if specified
    if (week) {
      return games.filter(game => game.week === week);
    }

    return games;
  } catch (error) {
    console.error('Error fetching NFL schedule:', error);
    // Return mock data as fallback
    return week ? mockGames.filter(game => game.week === week) : mockGames;
  }
}

// Calculate NFL week based on date for 2026 season
function calculateWeek(date: Date, season: number = 2026): number {
  // NFL 2026 season kicks off Thursday Sep 3, 2026
  const seasonStart = new Date(season, 8, 1); // September 1st, 2025
  const firstThursday = new Date(seasonStart);
  
  // Find first Thursday
  while (firstThursday.getDay() !== 4) { // 4 = Thursday
    firstThursday.setDate(firstThursday.getDate() + 1);
  }
  
  // Add 3 days to get to Sunday (first game day)
  firstThursday.setDate(firstThursday.getDate() + 3);
  
  const diffTime = date.getTime() - firstThursday.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;
  
  // Cap at 18 weeks (regular season)
  return Math.min(Math.max(week, 1), 18);
}

// Enhanced schedule functions
export async function getSchedules(week?: number, season: number = 2026): Promise<Game[]> {
  // Try to fetch real data first, fallback to mock
  try {
    const realGames = await fetchNFLSchedule(week, season);
    if (realGames.length > 0) {
      return realGames;
    }
  } catch (error) {
    console.warn('Falling back to mock data:', error);
  }
  
  // Fallback to mock data
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (week) {
    return mockGames.filter(game => game.week === week);
  }
  
  return mockGames;
}

export async function getGame(gameId: string): Promise<Game | null> {
  try {
    const realGames = await fetchNFLSchedule();
    const realGame = realGames.find(game => game.id === gameId);
    if (realGame) {
      return realGame;
    }
  } catch (error) {
    console.warn('Falling back to mock data for game lookup:', error);
  }
  
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockGames.find(game => game.id === gameId) || null;
}

export async function getWeeklySchedule(week: number, season: number = 2026): Promise<Game[]> {
  return getSchedules(week, season);
}

// New function to get upcoming games
export async function getUpcomingGames(limit: number = 10): Promise<Game[]> {
  try {
    const realGames = await fetchNFLSchedule();
    return realGames
      .filter(game => game.status === 'scheduled')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, limit);
  } catch (error) {
    console.warn('Falling back to mock data for upcoming games:', error);
    return mockGames
      .filter(game => game.status === 'scheduled')
      .slice(0, limit);
  }
}

// New function to get today's games
export async function getTodaysGames(): Promise<Game[]> {
  try {
    const realGames = await fetchNFLSchedule();
    const today = new Date().toISOString().split('T')[0];
    return realGames.filter(game => game.date === today);
  } catch (error) {
    console.warn('Falling back to mock data for today\'s games:', error);
    const today = new Date().toISOString().split('T')[0];
    return mockGames.filter(game => game.date === today);
  }
}
