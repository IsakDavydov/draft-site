import { Team, Player } from '@/types';

// All 32 NFL teams with 0-0 records for the 2025 season
const mockTeams: Team[] = [
  // AFC East
  {
    id: 'bills',
    name: 'Buffalo Bills',
    slug: 'bills',
    city: 'Buffalo',
    nickname: 'Bills',
    conference: 'AFC',
    division: 'East',
    colors: {
      primary: '#00338D',
      secondary: '#C60C30',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'dolphins',
    name: 'Miami Dolphins',
    slug: 'dolphins',
    city: 'Miami',
    nickname: 'Dolphins',
    conference: 'AFC',
    division: 'East',
    colors: {
      primary: '#008E97',
      secondary: '#FC4C02',
      accent: '#005778',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'jets',
    name: 'New York Jets',
    slug: 'jets',
    city: 'New York',
    nickname: 'Jets',
    conference: 'AFC',
    division: 'East',
    colors: {
      primary: '#125740',
      secondary: '#FFFFFF',
      accent: '#000000',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'patriots',
    name: 'New England Patriots',
    slug: 'patriots',
    city: 'New England',
    nickname: 'Patriots',
    conference: 'AFC',
    division: 'East',
    colors: {
      primary: '#002244',
      secondary: '#C60C30',
      accent: '#B0B7BC',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // AFC North
  {
    id: 'ravens',
    name: 'Baltimore Ravens',
    slug: 'ravens',
    city: 'Baltimore',
    nickname: 'Ravens',
    conference: 'AFC',
    division: 'North',
    colors: {
      primary: '#241773',
      secondary: '#000000',
      accent: '#9E7C0C',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'bengals',
    name: 'Cincinnati Bengals',
    slug: 'bengals',
    city: 'Cincinnati',
    nickname: 'Bengals',
    conference: 'AFC',
    division: 'North',
    colors: {
      primary: '#FB4F14',
      secondary: '#000000',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'browns',
    name: 'Cleveland Browns',
    slug: 'browns',
    city: 'Cleveland',
    nickname: 'Browns',
    conference: 'AFC',
    division: 'North',
    colors: {
      primary: '#311D00',
      secondary: '#FF3C00',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'steelers',
    name: 'Pittsburgh Steelers',
    slug: 'steelers',
    city: 'Pittsburgh',
    nickname: 'Steelers',
    conference: 'AFC',
    division: 'North',
    colors: {
      primary: '#000000',
      secondary: '#FFB612',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // AFC South
  {
    id: 'texans',
    name: 'Houston Texans',
    slug: 'texans',
    city: 'Houston',
    nickname: 'Texans',
    conference: 'AFC',
    division: 'South',
    colors: {
      primary: '#03202F',
      secondary: '#A71930',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'colts',
    name: 'Indianapolis Colts',
    slug: 'colts',
    city: 'Indianapolis',
    nickname: 'Colts',
    conference: 'AFC',
    division: 'South',
    colors: {
      primary: '#002C5F',
      secondary: '#FFFFFF',
      accent: '#000000',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'jaguars',
    name: 'Jacksonville Jaguars',
    slug: 'jaguars',
    city: 'Jacksonville',
    nickname: 'Jaguars',
    conference: 'AFC',
    division: 'South',
    colors: {
      primary: '#006778',
      secondary: '#D7A22A',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'titans',
    name: 'Tennessee Titans',
    slug: 'titans',
    city: 'Tennessee',
    nickname: 'Titans',
    conference: 'AFC',
    division: 'South',
    colors: {
      primary: '#0C2340',
      secondary: '#4B92DB',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // AFC West
  {
    id: 'broncos',
    name: 'Denver Broncos',
    slug: 'broncos',
    city: 'Denver',
    nickname: 'Broncos',
    conference: 'AFC',
    division: 'West',
    colors: {
      primary: '#FB4F14',
      secondary: '#002244',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'chiefs',
    name: 'Kansas City Chiefs',
    slug: 'chiefs',
    city: 'Kansas City',
    nickname: 'Chiefs',
    conference: 'AFC',
    division: 'West',
    colors: {
      primary: '#E31837',
      secondary: '#FFB81C',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'raiders',
    name: 'Las Vegas Raiders',
    slug: 'raiders',
    city: 'Las Vegas',
    nickname: 'Raiders',
    conference: 'AFC',
    division: 'West',
    colors: {
      primary: '#000000',
      secondary: '#A5ACAF',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'chargers',
    name: 'Los Angeles Chargers',
    slug: 'chargers',
    city: 'Los Angeles',
    nickname: 'Chargers',
    conference: 'AFC',
    division: 'West',
    colors: {
      primary: '#0080C6',
      secondary: '#FFC20E',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // NFC East
  {
    id: 'cowboys',
    name: 'Dallas Cowboys',
    slug: 'cowboys',
    city: 'Dallas',
    nickname: 'Cowboys',
    conference: 'NFC',
    division: 'East',
    colors: {
      primary: '#003594',
      secondary: '#041E42',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'giants',
    name: 'New York Giants',
    slug: 'giants',
    city: 'New York',
    nickname: 'Giants',
    conference: 'NFC',
    division: 'East',
    colors: {
      primary: '#0B2265',
      secondary: '#A71930',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'eagles',
    name: 'Philadelphia Eagles',
    slug: 'eagles',
    city: 'Philadelphia',
    nickname: 'Eagles',
    conference: 'NFC',
    division: 'East',
    colors: {
      primary: '#004C54',
      secondary: '#000000',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'commanders',
    name: 'Washington Commanders',
    slug: 'commanders',
    city: 'Washington',
    nickname: 'Commanders',
    conference: 'NFC',
    division: 'East',
    colors: {
      primary: '#5A1414',
      secondary: '#FFB612',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // NFC North
  {
    id: 'bears',
    name: 'Chicago Bears',
    slug: 'bears',
    city: 'Chicago',
    nickname: 'Bears',
    conference: 'NFC',
    division: 'North',
    colors: {
      primary: '#0B162A',
      secondary: '#C83803',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'lions',
    name: 'Detroit Lions',
    slug: 'lions',
    city: 'Detroit',
    nickname: 'Lions',
    conference: 'NFC',
    division: 'North',
    colors: {
      primary: '#0076B6',
      secondary: '#B0B7BC',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'packers',
    name: 'Green Bay Packers',
    slug: 'packers',
    city: 'Green Bay',
    nickname: 'Packers',
    conference: 'NFC',
    division: 'North',
    colors: {
      primary: '#203731',
      secondary: '#FFB612',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'vikings',
    name: 'Minnesota Vikings',
    slug: 'vikings',
    city: 'Minnesota',
    nickname: 'Vikings',
    conference: 'NFC',
    division: 'North',
    colors: {
      primary: '#4F2683',
      secondary: '#FFC62F',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // NFC South
  {
    id: 'falcons',
    name: 'Atlanta Falcons',
    slug: 'falcons',
    city: 'Atlanta',
    nickname: 'Falcons',
    conference: 'NFC',
    division: 'South',
    colors: {
      primary: '#A71930',
      secondary: '#000000',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'panthers',
    name: 'Carolina Panthers',
    slug: 'panthers',
    city: 'Carolina',
    nickname: 'Panthers',
    conference: 'NFC',
    division: 'South',
    colors: {
      primary: '#0085CA',
      secondary: '#101820',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'saints',
    name: 'New Orleans Saints',
    slug: 'saints',
    city: 'New Orleans',
    nickname: 'Saints',
    conference: 'NFC',
    division: 'South',
    colors: {
      primary: '#D3BC8D',
      secondary: '#000000',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'buccaneers',
    name: 'Tampa Bay Buccaneers',
    slug: 'buccaneers',
    city: 'Tampa Bay',
    nickname: 'Buccaneers',
    conference: 'NFC',
    division: 'South',
    colors: {
      primary: '#D50A0A',
      secondary: '#FF7900',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },

  // NFC West
  {
    id: 'cardinals',
    name: 'Arizona Cardinals',
    slug: 'cardinals',
    city: 'Arizona',
    nickname: 'Cardinals',
    conference: 'NFC',
    division: 'West',
    colors: {
      primary: '#97233F',
      secondary: '#000000',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'rams',
    name: 'Los Angeles Rams',
    slug: 'rams',
    city: 'Los Angeles',
    nickname: 'Rams',
    conference: 'NFC',
    division: 'West',
    colors: {
      primary: '#003594',
      secondary: '#FFA300',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: '49ers',
    name: 'San Francisco 49ers',
    slug: '49ers',
    city: 'San Francisco',
    nickname: '49ers',
    conference: 'NFC',
    division: 'West',
    colors: {
      primary: '#AA0000',
      secondary: '#B3995D',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
  {
    id: 'seahawks',
    name: 'Seattle Seahawks',
    slug: 'seahawks',
    city: 'Seattle',
    nickname: 'Seahawks',
    conference: 'NFC',
    division: 'West',
    colors: {
      primary: '#002244',
      secondary: '#69BE28',
      accent: '#FFFFFF',
    },
    record: {
      wins: 0,
      losses: 0,
      ties: 0,
    },
  },
];

// Mock data for players (keeping existing data)
const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'Josh Allen',
    position: 'QB',
    teamId: 'bills',
    jerseyNumber: 17,
    height: '6\'5"',
    weight: 237,
    college: 'Wyoming',
    experience: 6,
    stats: {
      passingYards: 4306,
      touchdowns: 35,
      interceptions: 14,
      rushingYards: 762,
    },
  },
  {
    id: '2',
    name: 'Tyreek Hill',
    position: 'WR',
    teamId: 'dolphins',
    jerseyNumber: 10,
    height: '5\'10"',
    weight: 185,
    college: 'West Alabama',
    experience: 8,
    stats: {
      receivingYards: 1799,
      touchdowns: 13,
    },
  },
];

// Map of team full name -> primary hex color (for use in UI accents)
export const TEAM_COLORS_BY_NAME: Record<string, string> = Object.fromEntries(
  mockTeams.map((t) => [t.name, t.colors.primary])
);

export async function getTeams(): Promise<Team[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTeams;
}

export async function getTeam(teamId: string): Promise<Team | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockTeams.find(team => team.id === teamId) || null;
}

export async function getTeamPlayers(teamId: string): Promise<Player[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPlayers.filter(player => player.id === teamId);
}

export async function getPlayer(playerId: string): Promise<Player | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPlayers.find(player => player.id === playerId) || null;
}
