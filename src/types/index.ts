// Core types for the football site

export interface Team {
  id: string;
  name: string;
  slug: string;
  city: string;
  nickname: string;
  conference: 'AFC' | 'NFC';
  division: 'North' | 'South' | 'East' | 'West';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logo?: string;
  record?: {
    wins: number;
    losses: number;
    ties: number;
  };
}

export interface Player {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'K' | 'DEF';
  teamId: string;
  jerseyNumber?: number;
  height?: string;
  weight?: number;
  college?: string;
  experience?: number;
  stats?: PlayerStats;
}

export interface PlayerStats {
  passingYards?: number;
  rushingYards?: number;
  receivingYards?: number;
  touchdowns?: number;
  interceptions?: number;
  fumbles?: number;
}

export interface Game {
  id: string;
  week: number;
  season: number;
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'final';
  date: string;
  time?: string;
  network?: string;
  odds?: GameOdds;
}

export interface GameOdds {
  homeLine?: number;
  awayLine?: number;
  total?: number;
  homeMoneyline?: number;
  awayMoneyline?: number;
}

export interface Standings {
  teamId: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
  pointsFor: number;
  pointsAgainst: number;
  conferenceRank: number;
  divisionRank: number;
  playoffOdds: number;
}

export interface Prospect {
  id: string;
  name: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'OT' | 'IOL' | 'OL' | 'DT' | 'EDGE' | 'DL' | 'LB' | 'CB' | 'S' | 'K' | 'P';
  school: string;
  class: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  height: string;
  weight: number;
  ras?: number; // Relative Athletic Score
  measurables?: {
    fortyYardDash?: number;
    benchPress?: number;
    verticalJump?: number;
    broadJump?: number;
    threeCone?: number;
    shuttleRun?: number;
  };
  bigBoardRank?: number;
  mockDraftRound?: number;
  mockDraftPick?: number;
  team?: string;
  /** Profile data: impact meters, tags, analysis (from prospect-profiles) */
  profile?: {
    immediateImpact: number;
    potential: number;
    riskLevel: number;
    playStyleTags: string[];
    analysis: string;
  };
  /** 2025 college season stats (from cfbstats.com) */
  lastSeasonStats?: {
    season: number;
    games?: number;
    passComp?: number;
    passAtt?: number;
    passYds?: number;
    passTd?: number;
    passInt?: number;
    compPct?: number;
    passerRating?: number;
    rushAtt?: number;
    rushYds?: number;
    rushAvg?: number;
    rushTd?: number;
    receptions?: number;
    recYds?: number;
    recAvg?: number;
    recTd?: number;
    tackles?: number;
    tfl?: number;
    sacks?: number;
    qbHits?: number;
    int?: number;
    pd?: number;
    ff?: number;
  };
}

export interface MockDraft {
  id: string;
  week: number;
  season: number;
  version: string;
  picks: MockDraftPick[];
  createdAt: string;
  updatedAt: string;
}

export interface MockDraftPick {
  pick: number;
  teamId: string;
  prospectId: string;
  trade?: {
    fromTeamId: string;
    toTeamId: string;
    compensation: string;
  };
}

// File-based mock draft format (from data/mock-drafts/*.json)
export interface MockDraftPickFromFile {
  pick: number;
  team: string;
  player: string;
  position: string;
  school: string;
  height: string;
  weight: string;
  notes: string;
}

export interface MockDraftFromFile {
  title: string;
  date: string;
  author: string;
  rounds: number;
  picks: MockDraftPickFromFile[];
}

export interface WeeklyPicks {
  id: string;
  week: number;
  season: number;
  picks: Pick[];
  record: {
    wins: number;
    losses: number;
    pushes: number;
  };
  units: number;
  roi: number;
}

export interface Pick {
  id: string;
  gameId: string;
  type: 'spread' | 'moneyline' | 'total';
  selection: 'home' | 'away' | 'over' | 'under';
  confidence: 1 | 2 | 3 | 4 | 5;
  units: number;
  odds?: number;
  result?: 'win' | 'loss' | 'push' | 'pending';
}

export interface FantasyRankings {
  id: string;
  week: number;
  season: number;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'DEF' | 'K';
  scoring: 'standard' | 'half-ppr' | 'full-ppr';
  tiers: FantasyTier[];
}

export interface FantasyTier {
  tier: number;
  players: FantasyPlayer[];
}

export interface FantasyPlayer {
  id: string;
  name: string;
  teamId: string;
  position: 'QB' | 'RB' | 'WR' | 'TE' | 'DEF' | 'K';
  rank: number;
  tier: number;
  ecr?: number; // Expert Consensus Rank
  notes?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Record<string, unknown>; // Sanity Portable Text
  author: {
    name: string;
    image?: string;
  };
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  tags: string[];
  category: 'news' | 'analysis' | 'mock-draft' | 'fantasy' | 'picks';
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  favorites: string[];
  pickHistory: Pick[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp: string;
}
