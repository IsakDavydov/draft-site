import { GameOdds, Game } from '@/types';

// Mock data for odds
const mockOdds: Record<string, GameOdds> = {
  '1': {
    homeLine: -2.5,
    awayLine: 2.5,
    total: 46.5,
    homeMoneyline: -140,
    awayMoneyline: +120,
  },
  '2': {
    homeLine: -3.5,
    awayLine: 3.5,
    total: 44.5,
    homeMoneyline: -180,
    awayMoneyline: +155,
  },
  '3': {
    homeLine: -1.5,
    awayLine: 1.5,
    total: 48.5,
    homeMoneyline: -110,
    awayMoneyline: -110,
  },
};

export async function getOdds(week?: number): Promise<Record<string, GameOdds>> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (week) {
    // In a real implementation, you'd filter by week
    // For now, return all mock odds
  }
  
  return mockOdds;
}

export async function getGameOdds(gameId: string): Promise<GameOdds | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockOdds[gameId] || null;
}

export async function getWeeklyLines(week: number): Promise<Record<string, GameOdds>> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // In a real implementation, you'd fetch lines for a specific week
  // For now, return all mock odds
  return mockOdds;
}
