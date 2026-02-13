import { Prospect, MockDraft, MockDraftFromFile } from '@/types';

// File-based mock draft (loaded from data/mock-drafts/)
import postSuperBowlMock2026 from '../../../data/mock-drafts/post-super-bowl-mock-draft-2026.json';

// 2026 NFL Draft top prospects
const mockProspects: Prospect[] = [
  {
    id: '1',
    name: 'Fernando Mendoza',
    position: 'QB',
    school: 'Indiana',
    class: 'Junior',
    height: '6\'5"',
    weight: 225,
    ras: 9.2,
    measurables: {
      fortyYardDash: 4.65,
      verticalJump: 32.0,
      broadJump: 9.5,
      threeCone: 7.10,
      shuttleRun: 4.35,
    },
    bigBoardRank: 1,
    mockDraftRound: 1,
    mockDraftPick: 1,
  },
  {
    id: '2',
    name: 'Jeremiyah Love',
    position: 'RB',
    school: 'Notre Dame',
    class: 'Junior',
    height: '6\'0"',
    weight: 214,
    ras: 9.4,
    measurables: {
      fortyYardDash: 4.42,
      verticalJump: 37.0,
      broadJump: 10.2,
      threeCone: 6.90,
      shuttleRun: 4.25,
    },
    bigBoardRank: 2,
    mockDraftRound: 1,
    mockDraftPick: 2,
  },
  {
    id: '3',
    name: 'Arvell Reese Jr.',
    position: 'LB',
    school: 'Ohio State',
    class: 'Junior',
    height: '6\'4"',
    weight: 243,
    ras: 9.5,
    measurables: {
      fortyYardDash: 4.52,
      verticalJump: 36.0,
      broadJump: 10.4,
      threeCone: 6.95,
      shuttleRun: 4.30,
    },
    bigBoardRank: 3,
    mockDraftRound: 1,
    mockDraftPick: 3,
  },
  {
    id: '4',
    name: 'Francis Mauigoa',
    position: 'OL',
    school: 'Miami',
    class: 'Junior',
    height: '6\'6"',
    weight: 315,
    ras: 9.1,
    measurables: {
      fortyYardDash: 5.30,
      verticalJump: 30.5,
      broadJump: 9.0,
      threeCone: 7.55,
      shuttleRun: 4.65,
    },
    bigBoardRank: 4,
    mockDraftRound: 1,
    mockDraftPick: 4,
  },
  {
    id: '5',
    name: 'Rueben Bain Jr.',
    position: 'DL',
    school: 'Miami',
    class: 'Junior',
    height: '6\'3"',
    weight: 275,
    ras: 9.0,
    measurables: {
      fortyYardDash: 4.75,
      verticalJump: 33.0,
      broadJump: 9.5,
      threeCone: 7.20,
      shuttleRun: 4.45,
    },
    bigBoardRank: 5,
    mockDraftRound: 1,
    mockDraftPick: 5,
  },
  {
    id: '6',
    name: 'Caleb Downs',
    position: 'S',
    school: 'Ohio State',
    class: 'Junior',
    height: '6\'0"',
    weight: 205,
    ras: 9.3,
    measurables: {
      fortyYardDash: 4.48,
      verticalJump: 38.0,
      broadJump: 10.5,
      threeCone: 6.88,
      shuttleRun: 4.20,
    },
    bigBoardRank: 6,
    mockDraftRound: 1,
    mockDraftPick: 6,
  },
  {
    id: '7',
    name: 'Jordyn Tyson',
    position: 'WR',
    school: 'Arizona State',
    class: 'Junior',
    height: '6\'2"',
    weight: 200,
    ras: 9.2,
    measurables: {
      fortyYardDash: 4.45,
      verticalJump: 36.5,
      broadJump: 10.2,
      threeCone: 6.92,
      shuttleRun: 4.22,
    },
    bigBoardRank: 7,
    mockDraftRound: 1,
    mockDraftPick: 7,
  },
  {
    id: '8',
    name: 'Spencer Fano',
    position: 'OL',
    school: 'Utah',
    class: 'Junior',
    height: '6\'5"',
    weight: 305,
    ras: 8.8,
    measurables: {
      fortyYardDash: 5.25,
      verticalJump: 29.0,
      broadJump: 8.8,
      threeCone: 7.60,
      shuttleRun: 4.70,
    },
    bigBoardRank: 8,
    mockDraftRound: 1,
    mockDraftPick: 8,
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

// Load mock draft from JSON file (data/mock-drafts/)
export async function getMockDraftFromFile(filename: string): Promise<MockDraftFromFile | null> {
  await new Promise(resolve => setTimeout(resolve, 100));

  if (filename === 'post-super-bowl-mock-draft-2026.json') {
    return postSuperBowlMock2026 as MockDraftFromFile;
  }
  return null;
}
