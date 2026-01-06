import { Prospect, MockDraft } from '@/types';

// Mock data for prospects
const mockProspects: Prospect[] = [
  {
    id: '1',
    name: 'Caleb Williams',
    position: 'QB',
    school: 'USC',
    class: 'Junior',
    height: '6\'1"',
    weight: 215,
    ras: 9.8,
    measurables: {
      fortyYardDash: 4.52,
      verticalJump: 36.5,
      broadJump: 10.2,
      threeCone: 6.95,
      shuttleRun: 4.25,
    },
    bigBoardRank: 1,
    mockDraftRound: 1,
    mockDraftPick: 1,
  },
  {
    id: '2',
    name: 'Marvin Harrison Jr.',
    position: 'WR',
    school: 'Ohio State',
    class: 'Junior',
    height: '6\'4"',
    weight: 205,
    ras: 9.9,
    measurables: {
      fortyYardDash: 4.38,
      verticalJump: 39.0,
      broadJump: 10.8,
      threeCone: 6.85,
      shuttleRun: 4.15,
    },
    bigBoardRank: 2,
    mockDraftRound: 1,
    mockDraftPick: 2,
  },
  {
    id: '3',
    name: 'Drake Maye',
    position: 'QB',
    school: 'North Carolina',
    class: 'Junior',
    height: '6\'4"',
    weight: 230,
    ras: 9.6,
    measurables: {
      fortyYardDash: 4.68,
      verticalJump: 32.0,
      broadJump: 9.8,
      threeCone: 7.12,
      shuttleRun: 4.45,
    },
    bigBoardRank: 3,
    mockDraftRound: 1,
    mockDraftPick: 3,
  },
];

// Mock data for mock drafts
const mockMockDrafts: MockDraft[] = [
  {
    id: '1',
    week: 1,
    season: 2024,
    version: '1.0',
    picks: [
      {
        pick: 1,
        teamId: 'bears',
        prospectId: '1',
      },
      {
        pick: 2,
        teamId: 'commanders',
        prospectId: '2',
      },
      {
        pick: 3,
        teamId: 'patriots',
        prospectId: '3',
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
];

export async function getProspects(
  position?: string,
  school?: string,
  classYear?: string
): Promise<Prospect[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  let filtered = mockProspects;
  
  if (position) {
    filtered = filtered.filter(prospect => prospect.position === position);
  }
  
  if (school) {
    filtered = filtered.filter(prospect => prospect.school === school);
  }
  
  if (classYear) {
    filtered = filtered.filter(prospect => prospect.class === classYear);
  }
  
  return filtered.sort((a, b) => (a.bigBoardRank || 999) - (b.bigBoardRank || 999));
}

export async function getBigBoard(): Promise<Prospect[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProspects.sort((a, b) => (a.bigBoardRank || 999) - (b.bigBoardRank || 999));
}

export async function getMockDraft(week: number, season: number = 2024): Promise<MockDraft | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockMockDrafts.find(draft => draft.week === week && draft.season === season) || null;
}

export async function getMockDrafts(season: number = 2024): Promise<MockDraft[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockMockDrafts.filter(draft => draft.season === season);
}
