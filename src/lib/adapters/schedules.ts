import { Game, Team } from '@/types';

// The Odds API configuration
const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY || 'demo';
const ODDS_API_BASE = 'https://api.the-odds-api.com/v4/sports';

// NFL Schedule API endpoints
const NFL_SPORT_KEY = 'americanfootball_nfl';

// Mock data for schedules - 2025 season with all 32 teams
const mockGames: Game[] = [
  // Week 1 Games - 2025 Season
  {
    id: '1',
    week: 1,
    season: 2025,
    homeTeamId: 'bills',
    awayTeamId: 'jets',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '20:20',
    network: 'NBC',
    odds: {
      homeLine: -2.5,
      awayLine: 2.5,
      total: 46.5,
      homeMoneyline: -140,
      awayMoneyline: +120,
    },
  },
  {
    id: '2',
    week: 1,
    season: 2025,
    homeTeamId: 'dolphins',
    awayTeamId: 'patriots',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '13:00',
    network: 'CBS',
    odds: {
      homeLine: -3.5,
      awayLine: 3.5,
      total: 44.5,
      homeMoneyline: -180,
      awayMoneyline: +155,
    },
  },
  {
    id: '3',
    week: 1,
    season: 2025,
    homeTeamId: 'ravens',
    awayTeamId: 'bengals',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '13:00',
    network: 'FOX',
    odds: {
      homeLine: -1.5,
      awayLine: 1.5,
      total: 48.5,
      homeMoneyline: -110,
      awayMoneyline: -110,
    },
  },
  {
    id: '4',
    week: 1,
    season: 2025,
    homeTeamId: 'chiefs',
    awayTeamId: 'raiders',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '16:25',
    network: 'CBS',
    odds: {
      homeLine: -6.5,
      awayLine: 6.5,
      total: 52.5,
      homeMoneyline: -280,
      awayMoneyline: +230,
    },
  },
  {
    id: '5',
    week: 1,
    season: 2025,
    homeTeamId: 'cowboys',
    awayTeamId: 'giants',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '13:00',
    network: 'FOX',
    odds: {
      homeLine: -4.5,
      awayLine: 4.5,
      total: 45.5,
      homeMoneyline: -200,
      awayMoneyline: +170,
    },
  },
  {
    id: '6',
    week: 1,
    season: 2025,
    homeTeamId: 'eagles',
    awayTeamId: 'commanders',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '13:00',
    network: 'FOX',
    odds: {
      homeLine: -3.5,
      awayLine: 3.5,
      total: 47.5,
      homeMoneyline: -170,
      awayMoneyline: +150,
    },
  },
  {
    id: '7',
    week: 1,
    season: 2025,
    homeTeamId: 'bears',
    awayTeamId: 'lions',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '13:00',
    network: 'FOX',
    odds: {
      homeLine: 2.5,
      awayLine: -2.5,
      total: 43.5,
      homeMoneyline: +120,
      awayMoneyline: -140,
    },
  },
  {
    id: '8',
    week: 1,
    season: 2025,
    homeTeamId: '49ers',
    awayTeamId: 'seahawks',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-07',
    time: '16:25',
    network: 'FOX',
    odds: {
      homeLine: -4.5,
      awayLine: 4.5,
      total: 46.5,
      homeMoneyline: -200,
      awayMoneyline: +170,
    },
  },

  // Week 2 Games - 2025 Season
  {
    id: '9',
    week: 2,
    season: 2025,
    homeTeamId: 'bills',
    awayTeamId: 'dolphins',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-14',
    time: '13:00',
    network: 'CBS',
    odds: {
      homeLine: -1.5,
      awayLine: 1.5,
      total: 48.5,
      homeMoneyline: -110,
      awayMoneyline: -110,
    },
  },
  {
    id: '10',
    week: 2,
    season: 2025,
    homeTeamId: 'patriots',
    awayTeamId: 'jets',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-14',
    time: '13:00',
    network: 'CBS',
    odds: {
      homeLine: 1.5,
      awayLine: -1.5,
      total: 42.5,
      homeMoneyline: +110,
      awayMoneyline: -130,
    },
  },
  {
    id: '11',
    week: 2,
    season: 2025,
    homeTeamId: 'ravens',
    awayTeamId: 'steelers',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-14',
    time: '13:00',
    network: 'CBS',
    odds: {
      homeLine: -3.5,
      awayLine: 3.5,
      total: 45.5,
      homeMoneyline: -170,
      awayMoneyline: +150,
    },
  },
  {
    id: '12',
    week: 2,
    season: 2025,
    homeTeamId: 'bengals',
    awayTeamId: 'browns',
    homeScore: undefined,
    awayScore: undefined,
    status: 'scheduled',
    date: '2025-09-14',
    time: '13:00',
    network: 'FOX',
    odds: {
      homeLine: -2.5,
      awayLine: 2.5,
      total: 46.5,
      homeMoneyline: -130,
      awayMoneyline: +110,
    },
  },
];

// Fetch real NFL schedule from The Odds API
async function fetchNFLSchedule(week?: number, season: number = 2025): Promise<Game[]> {
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

// Calculate NFL week based on date for 2025 season
function calculateWeek(date: Date, season: number = 2025): number {
  // NFL 2025 season typically starts first Thursday in September
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
export async function getSchedules(week?: number, season: number = 2025): Promise<Game[]> {
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

export async function getWeeklySchedule(week: number, season: number = 2025): Promise<Game[]> {
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
