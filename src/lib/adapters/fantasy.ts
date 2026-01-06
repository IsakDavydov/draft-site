import { FantasyRankings, FantasyPlayer } from '@/types';

// Mock data for fantasy rankings
const mockFantasyRankings: FantasyRankings[] = [
  {
    id: '1',
    week: 1,
    season: 2024,
    position: 'QB',
    scoring: 'standard',
    tiers: [
      {
        tier: 1,
        players: [
          {
            id: '1',
            name: 'Josh Allen',
            teamId: 'bills',
            position: 'QB',
            rank: 1,
            tier: 1,
            ecr: 2,
            notes: 'High floor, high ceiling with rushing upside',
          },
          {
            id: '2',
            name: 'Patrick Mahomes',
            teamId: 'chiefs',
            position: 'QB',
            rank: 2,
            tier: 1,
            ecr: 1,
            notes: 'Consistent production, great weapons',
          },
        ],
      },
      {
        tier: 2,
        players: [
          {
            id: '3',
            name: 'Jalen Hurts',
            teamId: 'eagles',
            position: 'QB',
            rank: 3,
            tier: 2,
            ecr: 3,
            notes: 'Dual-threat QB with rushing TDs',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    week: 1,
    season: 2024,
    position: 'RB',
    scoring: 'standard',
    tiers: [
      {
        tier: 1,
        players: [
          {
            id: '4',
            name: 'Christian McCaffrey',
            teamId: '49ers',
            position: 'RB',
            rank: 1,
            tier: 1,
            ecr: 1,
            notes: 'Elite RB1, great offense',
          },
        ],
      },
    ],
  },
];

export async function getFantasyRanks(
  week: number,
  scoring: 'standard' | 'half-ppr' | 'full-ppr' = 'standard',
  position?: string
): Promise<FantasyRankings[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = mockFantasyRankings.filter(
    rank => rank.week === week && rank.scoring === scoring
  );
  
  if (position) {
    filtered = filtered.filter(rank => rank.position === position);
  }
  
  return filtered;
}

export async function getPositionRanks(
  position: string,
  week: number,
  scoring: 'standard' | 'half-ppr' | 'full-ppr' = 'standard'
): Promise<FantasyRankings | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return (
    mockFantasyRankings.find(
      rank => rank.position === position && rank.week === week && rank.scoring === scoring
    ) || null
  );
}

export async function getPlayerRank(
  playerId: string,
  week: number,
  scoring: 'standard' | 'half-ppr' | 'full-ppr' = 'standard'
): Promise<FantasyPlayer | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  for (const ranking of mockFantasyRankings) {
    if (ranking.week === week && ranking.scoring === scoring) {
      for (const tier of ranking.tiers) {
        const player = tier.players.find(p => p.id === playerId);
        if (player) return player;
      }
    }
  }
  
  return null;
}
