import { WeeklyPicks, Pick } from '@/types';

// Mock data for 2026 season picks - starting with 0 picks since season hasn't started
const mockWeeklyPicks: WeeklyPicks[] = [
  // Week 1 - 2026 Season (no picks yet)
  {
    id: '1',
    week: 1,
    season: 2026,
    picks: [], // No picks yet
    record: {
      wins: 0,
      losses: 0,
      pushes: 0,
    },
    units: 0,
    roi: 0,
  },
  // Week 2 - 2026 Season (no picks yet)
  {
    id: '2',
    week: 2,
    season: 2026,
    picks: [], // No picks yet
    record: {
      wins: 0,
      losses: 0,
      pushes: 0,
    },
    units: 0,
    roi: 0,
  },
  // Week 3 - 2026 Season (no picks yet)
  {
    id: '3',
    week: 3,
    season: 2026,
    picks: [], // No picks yet
    record: {
      wins: 0,
      losses: 0,
      pushes: 0,
    },
    units: 0,
    roi: 0,
  },
];

export async function getWeeklyPicks(week: number, season: number = 2026): Promise<WeeklyPicks | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockWeeklyPicks.find(picks => picks.week === week && picks.season === season) || null;
}

export async function getPicksHistory(season: number = 2026): Promise<WeeklyPicks[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockWeeklyPicks.filter(picks => picks.season === season);
}

export async function getPickRecord(week: number, season: number = 2026): Promise<{
  wins: number;
  losses: number;
  pushes: number;
  units: number;
  roi: number;
} | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const weeklyPicks = mockWeeklyPicks.find(picks => picks.week === week && picks.season === season);
  
  if (!weeklyPicks) return null;
  
  return {
    wins: weeklyPicks.record.wins,
    losses: weeklyPicks.record.losses,
    pushes: weeklyPicks.record.pushes,
    units: weeklyPicks.units,
    roi: weeklyPicks.roi,
  };
}

export async function getSeasonRecord(season: number = 2026): Promise<{
  totalWins: number;
  totalLosses: number;
  totalPushes: number;
  totalUnits: number;
  totalRoi: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // For 2026 season, return 0 stats since no picks have been made yet
  if (season === 2026) {
    return {
      totalWins: 0,
      totalLosses: 0,
      totalPushes: 0,
      totalUnits: 0,
      totalRoi: 0,
    };
  }
  
  // For any other season, return 0 stats
  return {
    totalWins: 0,
    totalLosses: 0,
    totalPushes: 0,
    totalUnits: 0,
    totalRoi: 0,
  };
}
