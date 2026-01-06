import { Standings } from '@/types';

// All 32 NFL teams with 0-0 records for the 2025 season
const mockStandings: Standings[] = [
  // AFC East
  {
    teamId: 'bills',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 1,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'dolphins',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 2,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'jets',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 3,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'patriots',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 4,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // AFC North
  {
    teamId: 'ravens',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 5,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'bengals',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 6,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'browns',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 7,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'steelers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 8,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // AFC South
  {
    teamId: 'texans',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 9,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'colts',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 10,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'jaguars',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 11,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'titans',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 12,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // AFC West
  {
    teamId: 'broncos',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 13,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'chiefs',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 14,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'raiders',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 15,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'chargers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 16,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // NFC East
  {
    teamId: 'cowboys',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 1,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'giants',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 2,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'eagles',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 3,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'commanders',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 4,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // NFC North
  {
    teamId: 'bears',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 5,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'lions',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 6,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'packers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 7,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'vikings',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 8,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // NFC South
  {
    teamId: 'falcons',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 9,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'panthers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 10,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: 'saints',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 11,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'buccaneers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 12,
    divisionRank: 4,
    playoffOdds: 0.50,
  },

  // NFC West
  {
    teamId: 'cardinals',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 13,
    divisionRank: 1,
    playoffOdds: 0.50,
  },
  {
    teamId: 'rams',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 14,
    divisionRank: 2,
    playoffOdds: 0.50,
  },
  {
    teamId: '49ers',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 15,
    divisionRank: 3,
    playoffOdds: 0.50,
  },
  {
    teamId: 'seahawks',
    wins: 0,
    losses: 0,
    ties: 0,
    winPercentage: 0.000,
    pointsFor: 0,
    pointsAgainst: 0,
    conferenceRank: 16,
    divisionRank: 4,
    playoffOdds: 0.50,
  },
];

export async function getStandings(conference?: 'AFC' | 'NFC', division?: string): Promise<Standings[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = mockStandings;
  
  if (conference) {
    // Filter by conference
    filtered = filtered.filter(standing => {
      const team = mockTeams.find(t => t.id === standing.teamId);
      return team && team.conference === conference;
    });
  }
  
  if (division) {
    // Filter by division
    filtered = filtered.filter(standing => {
      const team = mockTeams.find(t => t.id === standing.teamId);
      return team && team.division === division;
    });
  }
  
  return filtered.sort((a, b) => {
    // Sort by conference, division, then alphabetical by team name
    const teamA = mockTeams.find(t => t.id === a.teamId);
    const teamB = mockTeams.find(t => t.id === b.teamId);
    
    if (!teamA || !teamB) return 0;
    
    if (teamA.conference !== teamB.conference) {
      return teamA.conference.localeCompare(teamB.conference);
    }
    
    if (teamA.division !== teamB.division) {
      return teamA.division.localeCompare(teamB.division);
    }
    
    return teamA.city.localeCompare(teamB.city);
  });
}

export async function getPlayoffOdds(): Promise<{ teamId: string; odds: number }[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockStandings.map(team => ({
    teamId: team.teamId,
    odds: team.playoffOdds,
  }));
}

// Helper function to get team info for standings
const mockTeams = [
  { id: 'bills', city: 'Buffalo', conference: 'AFC', division: 'East' },
  { id: 'dolphins', city: 'Miami', conference: 'AFC', division: 'East' },
  { id: 'jets', city: 'New York', conference: 'AFC', division: 'East' },
  { id: 'patriots', city: 'New England', conference: 'AFC', division: 'East' },
  { id: 'ravens', city: 'Baltimore', conference: 'AFC', division: 'North' },
  { id: 'bengals', city: 'Cincinnati', conference: 'AFC', division: 'North' },
  { id: 'browns', city: 'Cleveland', conference: 'AFC', division: 'North' },
  { id: 'steelers', city: 'Pittsburgh', conference: 'AFC', division: 'North' },
  { id: 'texans', city: 'Houston', conference: 'AFC', division: 'South' },
  { id: 'colts', city: 'Indianapolis', conference: 'AFC', division: 'South' },
  { id: 'jaguars', city: 'Jacksonville', conference: 'AFC', division: 'South' },
  { id: 'titans', city: 'Tennessee', conference: 'AFC', division: 'South' },
  { id: 'broncos', city: 'Denver', conference: 'AFC', division: 'West' },
  { id: 'chiefs', city: 'Kansas City', conference: 'AFC', division: 'West' },
  { id: 'raiders', city: 'Las Vegas', conference: 'AFC', division: 'West' },
  { id: 'chargers', city: 'Los Angeles', conference: 'AFC', division: 'West' },
  { id: 'cowboys', city: 'Dallas', conference: 'NFC', division: 'East' },
  { id: 'giants', city: 'New York', conference: 'NFC', division: 'East' },
  { id: 'eagles', city: 'Philadelphia', conference: 'NFC', division: 'East' },
  { id: 'commanders', city: 'Washington', conference: 'NFC', division: 'East' },
  { id: 'bears', city: 'Chicago', conference: 'NFC', division: 'North' },
  { id: 'lions', city: 'Detroit', conference: 'NFC', division: 'North' },
  { id: 'packers', city: 'Green Bay', conference: 'NFC', division: 'North' },
  { id: 'vikings', city: 'Minnesota', conference: 'NFC', division: 'North' },
  { id: 'falcons', city: 'Atlanta', conference: 'NFC', division: 'South' },
  { id: 'panthers', city: 'Carolina', conference: 'NFC', division: 'South' },
  { id: 'saints', city: 'New Orleans', conference: 'NFC', division: 'South' },
  { id: 'buccaneers', city: 'Tampa Bay', conference: 'NFC', division: 'South' },
  { id: 'cardinals', city: 'Arizona', conference: 'NFC', division: 'West' },
  { id: 'rams', city: 'Los Angeles', conference: 'NFC', division: 'West' },
  { id: '49ers', city: 'San Francisco', conference: 'NFC', division: 'West' },
  { id: 'seahawks', city: 'Seattle', conference: 'NFC', division: 'West' },
];
