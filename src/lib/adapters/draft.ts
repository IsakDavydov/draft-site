import { Prospect, MockDraft, MockDraftFromFile } from '@/types';

// File-based mock draft (loaded from data/mock-drafts/)
import postSuperBowlMock2026 from '../../../data/mock-drafts/post-super-bowl-mock-draft-2026.json';

// 2026 NFL Draft top 50 prospects
const mockProspects: Prospect[] = [
  { id: '1', name: 'Fernando Mendoza', position: 'QB', school: 'Indiana', class: 'Junior', height: '6\'5"', weight: 225, ras: 9.2, bigBoardRank: 1, mockDraftRound: 1, mockDraftPick: 1, team: 'Las Vegas Raiders' },
  { id: '2', name: 'Jeremiyah Love', position: 'RB', school: 'Notre Dame', class: 'Junior', height: '6\'0"', weight: 214, ras: 9.4, bigBoardRank: 2, mockDraftRound: 1, mockDraftPick: 9, team: 'Kansas City Chiefs' },
  { id: '3', name: 'Rueben Bain Jr.', position: 'DL', school: 'Miami', class: 'Junior', height: '6\'3"', weight: 275, ras: 9.0, bigBoardRank: 6, mockDraftRound: 1, mockDraftPick: 4, team: 'Tennessee Titans' },
  { id: '4', name: 'Caleb Downs', position: 'S', school: 'Ohio State', class: 'Junior', height: '6\'0"', weight: 205, ras: 9.3, bigBoardRank: 3, mockDraftRound: 1, mockDraftPick: 5, team: 'New York Giants' },
  { id: '5', name: 'Sonny Styles', position: 'LB', school: 'Ohio State', class: 'Senior', height: '6\'4"', weight: 243, ras: 9.1, bigBoardRank: 4, mockDraftRound: 1, mockDraftPick: 10, team: 'Cincinnati Bengals' },
  { id: '6', name: 'Jordyn Tyson', position: 'WR', school: 'Arizona State', class: 'Junior', height: '6\'2"', weight: 200, ras: 9.2, bigBoardRank: 5, mockDraftRound: 1, mockDraftPick: 8, team: 'New Orleans Saints' },
  { id: '7', name: 'David Bailey', position: 'DL', school: 'Texas Tech', class: 'Senior', height: '6\'3"', weight: 250, ras: 8.9, bigBoardRank: 7, mockDraftRound: 1, mockDraftPick: 7, team: 'Washington Commanders' },
  { id: '8', name: 'Arvell Reese Jr.', position: 'LB', school: 'Ohio State', class: 'Junior', height: '6\'4"', weight: 243, ras: 9.5, bigBoardRank: 8, mockDraftRound: 1, mockDraftPick: 2, team: 'New York Jets' },
  { id: '9', name: 'Makai Lemon', position: 'WR', school: 'USC', class: 'Junior', height: '5\'11"', weight: 195, ras: 8.8, bigBoardRank: 9, mockDraftRound: 1, mockDraftPick: 13, team: 'Los Angeles Rams' },
  { id: '10', name: 'Francis Mauigoa', position: 'OL', school: 'Miami', class: 'Junior', height: '6\'6"', weight: 315, ras: 9.1, bigBoardRank: 10, mockDraftRound: 1, mockDraftPick: 3, team: 'Arizona Cardinals' },
  { id: '11', name: 'Jermod McCoy', position: 'CB', school: 'Tennessee', class: 'Junior', height: '6\'0"', weight: 193, ras: 8.7, bigBoardRank: 11, mockDraftRound: 1, mockDraftPick: 11, team: 'Miami Dolphins' },
  { id: '12', name: 'Carnell Tate', position: 'WR', school: 'Ohio State', class: 'Junior', height: '6\'3"', weight: 195, ras: 8.9, bigBoardRank: 12, mockDraftRound: 1, mockDraftPick: 16, team: 'New York Jets' },
  { id: '13', name: 'Olaivavega Ioane', position: 'OL', school: 'Penn State', class: 'Junior', height: '6\'4"', weight: 328, ras: 8.5, bigBoardRank: 13, mockDraftRound: 1, mockDraftPick: 14, team: 'Baltimore Ravens' },
  { id: '14', name: 'Mansoor Delane', position: 'CB', school: 'LSU', class: 'Senior', height: '6\'1"', weight: 185, ras: 8.4, bigBoardRank: 14, mockDraftRound: 1, mockDraftPick: 12, team: 'Dallas Cowboys' },
  { id: '15', name: 'Spencer Fano', position: 'OL', school: 'Utah', class: 'Junior', height: '6\'5"', weight: 305, ras: 8.8, bigBoardRank: 15, mockDraftRound: 1, mockDraftPick: 6, team: 'Cleveland Browns' },
  { id: '16', name: 'Kayden McDonald', position: 'DL', school: 'Ohio State', class: 'Junior', height: '6\'3"', weight: 326, ras: 8.7, bigBoardRank: 16, mockDraftRound: 1, mockDraftPick: 20, team: 'Dallas Cowboys' },
  { id: '17', name: 'Peter Woods', position: 'DL', school: 'Clemson', class: 'Junior', height: '6\'3"', weight: 310, ras: 8.8, bigBoardRank: 17, mockDraftRound: 1, mockDraftPick: 17, team: 'Detroit Lions' },
  { id: '18', name: 'Avieon Terrell', position: 'CB', school: 'Clemson', class: 'Junior', height: '5\'11"', weight: 180, ras: 8.5, bigBoardRank: 18, mockDraftRound: 1, mockDraftPick: 29, team: 'Los Angeles Rams' },
  { id: '19', name: 'Caleb Banks', position: 'DL', school: 'Florida', class: 'Senior', height: '6\'6"', weight: 325, ras: 8.6, bigBoardRank: 19 },
  { id: '20', name: 'Monroe Freeling', position: 'OL', school: 'Georgia', class: 'Junior', height: '6\'7"', weight: 315, ras: 8.4, bigBoardRank: 20, mockDraftRound: 1, mockDraftPick: 23, team: 'Philadelphia Eagles' },
  { id: '21', name: 'Lee Hunter', position: 'DL', school: 'Texas Tech', class: 'Senior', height: '6\'4"', weight: 330, ras: 8.2, bigBoardRank: 21, mockDraftRound: 1, mockDraftPick: 32, team: 'Seattle Seahawks' },
  { id: '22', name: 'Emmanuel McNeil-Warren', position: 'S', school: 'Toledo', class: 'Senior', height: '6\'3"', weight: 209, ras: 8.5, bigBoardRank: 22, mockDraftRound: 1, mockDraftPick: 18, team: 'Minnesota Vikings' },
  { id: '23', name: 'CJ Allen', position: 'LB', school: 'Georgia', class: 'Junior', height: '6\'1"', weight: 235, ras: 8.9, bigBoardRank: 23, mockDraftRound: 1, mockDraftPick: 19, team: 'Carolina Panthers' },
  { id: '24', name: 'Kadyn Proctor', position: 'OL', school: 'Alabama', class: 'Junior', height: '6\'7"', weight: 366, ras: 8.7, bigBoardRank: 24, mockDraftRound: 1, mockDraftPick: 28, team: 'Houston Texans' },
  { id: '25', name: 'T.J. Parker', position: 'DL', school: 'Clemson', class: 'Junior', height: '6\'3"', weight: 260, ras: 8.4, bigBoardRank: 25, mockDraftRound: 1, mockDraftPick: 25, team: 'Chicago Bears' },
  { id: '26', name: 'Keldric Faulk', position: 'DL', school: 'Auburn', class: 'Junior', height: '6\'6"', weight: 285, ras: 8.3, bigBoardRank: 26, mockDraftRound: 1, mockDraftPick: 22, team: 'Los Angeles Chargers' },
  { id: '27', name: 'Kenyon Sadiq', position: 'TE', school: 'Oregon', class: 'Junior', height: '6\'3"', weight: 245, ras: 8.2, bigBoardRank: 27, mockDraftRound: 1, mockDraftPick: 30, team: 'Denver Broncos' },
  { id: '28', name: 'KC Concepcion', position: 'WR', school: 'Texas A&M', class: 'Junior', height: '5\'11"', weight: 190, ras: 8.6, bigBoardRank: 28, mockDraftRound: 1, mockDraftPick: 24, team: 'Cleveland Browns' },
  { id: '29', name: 'Caleb Lomu', position: 'OL', school: 'Utah', class: 'Junior', height: '6\'6"', weight: 308, ras: 8.5, bigBoardRank: 29, mockDraftRound: 1, mockDraftPick: 31, team: 'New England Patriots' },
  { id: '30', name: 'Denzel Boston', position: 'WR', school: 'Washington', class: 'Junior', height: '6\'4"', weight: 210, ras: 8.4, bigBoardRank: 30, mockDraftRound: 1, mockDraftPick: 26, team: 'Buffalo Bills' },
  { id: '31', name: 'Omar Cooper Jr.', position: 'WR', school: 'Indiana', class: 'Junior', height: '6\'0"', weight: 204, ras: 8.3, bigBoardRank: 31 },
  { id: '32', name: 'Ty Simpson', position: 'QB', school: 'Alabama', class: 'Junior', height: '6\'2"', weight: 208, ras: 8.5, bigBoardRank: 32, mockDraftRound: 1, mockDraftPick: 21, team: 'Pittsburgh Steelers' },
  { id: '33', name: 'Emmanuel Pregnon', position: 'OL', school: 'Oregon', class: 'Senior', height: '6\'5"', weight: 318, ras: 8.4, bigBoardRank: 33, mockDraftRound: 1, mockDraftPick: 27, team: 'San Francisco 49ers' },
  { id: '34', name: 'Cashius Howell', position: 'DL', school: 'Texas A&M', class: 'Senior', height: '6\'2"', weight: 248, ras: 8.8, bigBoardRank: 34, mockDraftRound: 1, mockDraftPick: 15, team: 'Tampa Bay Buccaneers' },
  { id: '35', name: 'Akheem Mesidor', position: 'DL', school: 'Miami', class: 'Senior', height: '6\'3"', weight: 265, ras: 8.3, bigBoardRank: 35 },
  { id: '36', name: 'Christen Miller', position: 'DL', school: 'Georgia', class: 'Junior', height: '6\'4"', weight: 310, ras: 8.2, bigBoardRank: 36 },
  { id: '37', name: 'Brandon Cisse', position: 'CB', school: 'South Carolina', class: 'Junior', height: '6\'0"', weight: 190, ras: 8.3, bigBoardRank: 37 },
  { id: '38', name: 'Zachariah Branch', position: 'WR', school: 'USC', class: 'Sophomore', height: '5\'10"', weight: 175, ras: 8.5, bigBoardRank: 38 },
  { id: '39', name: 'Blake Miller', position: 'OL', school: 'Clemson', class: 'Senior', height: '6\'6"', weight: 310, ras: 8.1, bigBoardRank: 39 },
  { id: '40', name: 'Colton Hood', position: 'CB', school: 'Tennessee', class: 'Senior', height: '6\'0"', weight: 193, ras: 8.2, bigBoardRank: 40 },
  { id: '41', name: 'Keith Abney II', position: 'CB', school: 'Arizona State', class: 'Junior', height: '6\'0"', weight: 190, ras: 8.2, bigBoardRank: 41 },
  { id: '42', name: 'R Mason Thomas', position: 'DL', school: 'Oklahoma', class: 'Junior', height: '6\'2"', weight: 249, ras: 8.4, bigBoardRank: 42 },
  { id: '43', name: 'Dillon Thieneman', position: 'S', school: 'Oregon', class: 'Junior', height: '6\'1"', weight: 210, ras: 8.5, bigBoardRank: 43 },
  { id: '44', name: 'Max Iheanachor', position: 'OL', school: 'Arizona State', class: 'Senior', height: '6\'6"', weight: 330, ras: 8.0, bigBoardRank: 44 },
  { id: '45', name: 'Chris Brazzell II', position: 'WR', school: 'Tennessee', class: 'Junior', height: '6\'5"', weight: 200, ras: 8.2, bigBoardRank: 45 },
  { id: '46', name: 'Zion Young', position: 'DL', school: 'Missouri', class: 'Senior', height: '6\'5"', weight: 258, ras: 8.1, bigBoardRank: 46 },
  { id: '47', name: 'Eli Stowers', position: 'TE', school: 'Vanderbilt', class: 'Senior', height: '6\'4"', weight: 234, ras: 8.0, bigBoardRank: 47 },
  { id: '48', name: 'Jadarian Price', position: 'RB', school: 'Notre Dame', class: 'Junior', height: '5\'11"', weight: 210, ras: 8.3, bigBoardRank: 48 },
  { id: '49', name: 'D\'Angelo Ponds', position: 'CB', school: 'Indiana', class: 'Junior', height: '5\'9"', weight: 172, ras: 8.2, bigBoardRank: 49 },
  { id: '50', name: 'Jake Golday', position: 'LB', school: 'Cincinnati', class: 'Senior', height: '6\'4"', weight: 240, ras: 8.1, bigBoardRank: 50 },
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

export async function getProspectById(id: string): Promise<Prospect | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockProspects.find((p) => p.id === id) || null;
}

export function getMockDraftNotesForProspect(playerName: string): string | null {
  const picks = (postSuperBowlMock2026 as { picks: { player: string; notes: string }[] }).picks;
  const match = picks.find((p) => p.player === playerName);
  return match?.notes ?? null;
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
