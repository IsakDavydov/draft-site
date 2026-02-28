import { Prospect, MockDraft, MockDraftFromFile } from '@/types';

// File-based mock draft (loaded from data/mock-drafts/)
import postSuperBowlMock2026 from '../../../data/mock-drafts/post-super-bowl-mock-draft-2026.json';
import preCombineMock2026 from '../../../data/mock-drafts/pre-combine-mock-draft-2026.json';
import teamNeeds2026 from '../../../data/team-needs-2026.json';

// 2026 NFL Draft top 50 prospects
const mockProspects: Prospect[] = [
  { id: '1', name: 'Fernando Mendoza', position: 'QB', school: 'Indiana', class: 'Junior', height: '6\'5"', weight: 225, ras: 9.2, bigBoardRank: 1, mockDraftRound: 1, mockDraftPick: 1, team: 'Las Vegas Raiders' },
  { id: '2', name: 'Jeremiyah Love', position: 'RB', school: 'Notre Dame', class: 'Junior', height: '6\'0"', weight: 214, ras: 9.4, bigBoardRank: 2, mockDraftRound: 1, mockDraftPick: 9, team: 'Kansas City Chiefs' },
  { id: '3', name: 'Rueben Bain Jr.', position: 'EDGE', school: 'Miami', class: 'Junior', height: '6\'3"', weight: 275, ras: 9.0, bigBoardRank: 6, mockDraftRound: 1, mockDraftPick: 4, team: 'Tennessee Titans' },
  { id: '4', name: 'Caleb Downs', position: 'S', school: 'Ohio State', class: 'Junior', height: '6\'0"', weight: 205, ras: 9.3, bigBoardRank: 3, mockDraftRound: 1, mockDraftPick: 5, team: 'New York Giants' },
  { id: '5', name: 'Sonny Styles', position: 'LB', school: 'Ohio State', class: 'Senior', height: '6\'4"', weight: 243, ras: 9.1, bigBoardRank: 4, mockDraftRound: 1, mockDraftPick: 10, team: 'Cincinnati Bengals' },
  { id: '6', name: 'Jordyn Tyson', position: 'WR', school: 'Arizona State', class: 'Junior', height: '6\'2"', weight: 200, ras: 9.2, bigBoardRank: 5, mockDraftRound: 1, mockDraftPick: 8, team: 'New Orleans Saints' },
  { id: '7', name: 'David Bailey', position: 'EDGE', school: 'Texas Tech', class: 'Senior', height: '6\'3"', weight: 250, ras: 8.9, bigBoardRank: 7, mockDraftRound: 1, mockDraftPick: 7, team: 'Washington Commanders' },
  { id: '8', name: 'Arvell Reese Jr.', position: 'LB', school: 'Ohio State', class: 'Junior', height: '6\'4"', weight: 243, ras: 9.5, bigBoardRank: 12, mockDraftRound: 1, mockDraftPick: 2, team: 'New York Jets' },
  { id: '9', name: 'Makai Lemon', position: 'WR', school: 'USC', class: 'Junior', height: '5\'11"', weight: 195, ras: 8.8, bigBoardRank: 9, mockDraftRound: 1, mockDraftPick: 13, team: 'Los Angeles Rams' },
  { id: '10', name: 'Francis Mauigoa', position: 'OT', school: 'Miami', class: 'Junior', height: '6\'6"', weight: 315, ras: 9.1, bigBoardRank: 10, mockDraftRound: 1, mockDraftPick: 3, team: 'Arizona Cardinals' },
  { id: '11', name: 'Jermod McCoy', position: 'CB', school: 'Tennessee', class: 'Junior', height: '6\'0"', weight: 193, ras: 8.7, bigBoardRank: 11, mockDraftRound: 1, mockDraftPick: 11, team: 'Miami Dolphins' },
  { id: '12', name: 'Carnell Tate', position: 'WR', school: 'Ohio State', class: 'Junior', height: '6\'3"', weight: 195, ras: 8.9, bigBoardRank: 8, mockDraftRound: 1, mockDraftPick: 16, team: 'New York Jets' },
  { id: '13', name: 'Olaivavega Ioane', position: 'IOL', school: 'Penn State', class: 'Junior', height: '6\'4"', weight: 328, ras: 8.5, bigBoardRank: 13, mockDraftRound: 1, mockDraftPick: 14, team: 'Baltimore Ravens' },
  { id: '14', name: 'Mansoor Delane', position: 'CB', school: 'LSU', class: 'Senior', height: '6\'1"', weight: 185, ras: 8.4, bigBoardRank: 14, mockDraftRound: 1, mockDraftPick: 12, team: 'Dallas Cowboys' },
  { id: '15', name: 'Spencer Fano', position: 'OT', school: 'Utah', class: 'Junior', height: '6\'5"', weight: 305, ras: 8.8, bigBoardRank: 15, mockDraftRound: 1, mockDraftPick: 6, team: 'Cleveland Browns' },
  { id: '16', name: 'Kayden McDonald', position: 'DT', school: 'Ohio State', class: 'Junior', height: '6\'3"', weight: 326, ras: 8.7, bigBoardRank: 18, mockDraftRound: 1, mockDraftPick: 20, team: 'Dallas Cowboys' },
  { id: '17', name: 'Peter Woods', position: 'DT', school: 'Clemson', class: 'Junior', height: '6\'3"', weight: 310, ras: 8.8, bigBoardRank: 19, mockDraftRound: 1, mockDraftPick: 17, team: 'Detroit Lions' },
  { id: '18', name: 'Avieon Terrell', position: 'CB', school: 'Clemson', class: 'Junior', height: '5\'11"', weight: 180, ras: 8.5, bigBoardRank: 20, mockDraftRound: 1, mockDraftPick: 29, team: 'Los Angeles Rams' },
  { id: '19', name: 'Caleb Banks', position: 'DT', school: 'Florida', class: 'Senior', height: '6\'6"', weight: 325, ras: 8.6, bigBoardRank: 16 },
  { id: '20', name: 'Monroe Freeling', position: 'OT', school: 'Georgia', class: 'Junior', height: '6\'7"', weight: 315, ras: 8.4, bigBoardRank: 17, mockDraftRound: 1, mockDraftPick: 23, team: 'Philadelphia Eagles' },
  { id: '21', name: 'Emmanuel McNeil-Warren', position: 'S', school: 'Toledo', class: 'Senior', height: '6\'3"', weight: 209, ras: 8.5, bigBoardRank: 21, mockDraftRound: 1, mockDraftPick: 18, team: 'Minnesota Vikings' },
  { id: '22', name: 'CJ Allen', position: 'LB', school: 'Georgia', class: 'Junior', height: '6\'1"', weight: 235, ras: 8.9, bigBoardRank: 22, mockDraftRound: 1, mockDraftPick: 19, team: 'Carolina Panthers' },
  { id: '23', name: 'Kadyn Proctor', position: 'OT', school: 'Alabama', class: 'Junior', height: '6\'7"', weight: 366, ras: 8.7, bigBoardRank: 23, mockDraftRound: 1, mockDraftPick: 28, team: 'Houston Texans' },
  { id: '24', name: 'Lee Hunter', position: 'DT', school: 'Texas Tech', class: 'Senior', height: '6\'4"', weight: 330, ras: 8.2, bigBoardRank: 24, mockDraftRound: 1, mockDraftPick: 32, team: 'Seattle Seahawks' },
  { id: '25', name: 'T.J. Parker', position: 'EDGE', school: 'Clemson', class: 'Junior', height: '6\'3"', weight: 260, ras: 8.4, bigBoardRank: 25, mockDraftRound: 1, mockDraftPick: 25, team: 'Chicago Bears' },
  { id: '26', name: 'Keldric Faulk', position: 'EDGE', school: 'Auburn', class: 'Junior', height: '6\'6"', weight: 285, ras: 8.3, bigBoardRank: 26, mockDraftRound: 1, mockDraftPick: 22, team: 'Los Angeles Chargers' },
  { id: '27', name: 'Kenyon Sadiq', position: 'TE', school: 'Oregon', class: 'Junior', height: '6\'3"', weight: 245, ras: 8.2, bigBoardRank: 27, mockDraftRound: 1, mockDraftPick: 30, team: 'Denver Broncos' },
  { id: '28', name: 'KC Concepcion', position: 'WR', school: 'Texas A&M', class: 'Junior', height: '5\'11"', weight: 190, ras: 8.6, bigBoardRank: 28, mockDraftRound: 1, mockDraftPick: 24, team: 'Cleveland Browns' },
  { id: '29', name: 'Caleb Lomu', position: 'OT', school: 'Utah', class: 'Junior', height: '6\'6"', weight: 308, ras: 8.5, bigBoardRank: 29, mockDraftRound: 1, mockDraftPick: 31, team: 'New England Patriots' },
  { id: '30', name: 'Denzel Boston', position: 'WR', school: 'Washington', class: 'Junior', height: '6\'4"', weight: 210, ras: 8.4, bigBoardRank: 30, mockDraftRound: 1, mockDraftPick: 26, team: 'Buffalo Bills' },
  { id: '31', name: 'Omar Cooper Jr.', position: 'WR', school: 'Indiana', class: 'Junior', height: '6\'0"', weight: 204, ras: 8.3, bigBoardRank: 31 },
  { id: '32', name: 'Ty Simpson', position: 'QB', school: 'Alabama', class: 'Junior', height: '6\'2"', weight: 208, ras: 8.5, bigBoardRank: 33, mockDraftRound: 1, mockDraftPick: 21, team: 'Pittsburgh Steelers' },
  { id: '33', name: 'Emmanuel Pregnon', position: 'IOL', school: 'Oregon', class: 'Senior', height: '6\'5"', weight: 318, ras: 8.4, bigBoardRank: 34, mockDraftRound: 1, mockDraftPick: 27, team: 'San Francisco 49ers' },
  { id: '34', name: 'Cashius Howell', position: 'EDGE', school: 'Texas A&M', class: 'Senior', height: '6\'2"', weight: 248, ras: 8.8, bigBoardRank: 35, mockDraftRound: 1, mockDraftPick: 15, team: 'Tampa Bay Buccaneers' },
  { id: '35', name: 'Akheem Mesidor', position: 'EDGE', school: 'Miami', class: 'Senior', height: '6\'3"', weight: 265, ras: 8.3, bigBoardRank: 32 },
  { id: '36', name: 'Christen Miller', position: 'DT', school: 'Georgia', class: 'Junior', height: '6\'4"', weight: 310, ras: 8.2, bigBoardRank: 36 },
  { id: '37', name: 'Brandon Cisse', position: 'CB', school: 'South Carolina', class: 'Junior', height: '6\'0"', weight: 190, ras: 8.3, bigBoardRank: 37 },
  { id: '38', name: 'Zachariah Branch', position: 'WR', school: 'USC', class: 'Sophomore', height: '5\'10"', weight: 175, ras: 8.5, bigBoardRank: 38 },
  { id: '39', name: 'Blake Miller', position: 'OT', school: 'Clemson', class: 'Senior', height: '6\'6"', weight: 310, ras: 8.1, bigBoardRank: 39 },
  { id: '40', name: 'Colton Hood', position: 'CB', school: 'Tennessee', class: 'Senior', height: '6\'0"', weight: 193, ras: 8.2, bigBoardRank: 40 },
  { id: '41', name: 'Keith Abney II', position: 'CB', school: 'Arizona State', class: 'Junior', height: '6\'0"', weight: 190, ras: 8.2, bigBoardRank: 41 },
  { id: '42', name: 'R Mason Thomas', position: 'EDGE', school: 'Oklahoma', class: 'Junior', height: '6\'2"', weight: 249, ras: 8.4, bigBoardRank: 42 },
  { id: '43', name: 'Dillon Thieneman', position: 'S', school: 'Oregon', class: 'Junior', height: '6\'1"', weight: 210, ras: 8.5, bigBoardRank: 43 },
  { id: '44', name: 'Max Iheanachor', position: 'IOL', school: 'Arizona State', class: 'Senior', height: '6\'6"', weight: 330, ras: 8.0, bigBoardRank: 44 },
  { id: '45', name: 'Chris Brazzell II', position: 'WR', school: 'Tennessee', class: 'Junior', height: '6\'5"', weight: 200, ras: 8.2, bigBoardRank: 45 },
  { id: '46', name: 'Zion Young', position: 'EDGE', school: 'Missouri', class: 'Senior', height: '6\'5"', weight: 258, ras: 8.1, bigBoardRank: 46 },
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
  
  return filtered
    .map(enrichProspectWithMock)
    .sort((a, b) => (a.bigBoardRank || 999) - (b.bigBoardRank || 999));
}

export async function getBigBoard(): Promise<Prospect[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProspects.map(enrichProspectWithMock).sort((a, b) => (a.bigBoardRank || 999) - (b.bigBoardRank || 999));
}

export async function getProspectById(id: string): Promise<Prospect | null> {
  await new Promise(resolve => setTimeout(resolve, 50));
  const prospect = mockProspects.find((p) => p.id === id) || null;
  return prospect ? enrichProspectWithMock(prospect) : null;
}

export function getMockDraftNotesForProspect(playerName: string): string | null {
  const picks = (preCombineMock2026 as { picks: { player: string; notes?: string }[] }).picks;
  const match = picks.find((p) => p.player.trim().toLowerCase() === playerName.trim().toLowerCase());
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

// Draft order: pick number -> team (for 2026 first round, from pre-combine mock)
export function getDraftOrder2026(): { pick: number; team: string }[] {
  const picks = (preCombineMock2026 as { picks: { pick: number; team: string }[] }).picks;
  return picks.map((p) => ({ pick: p.pick, team: p.team }));
}

// Resolve effective draft order: custom_draft_order overrides default when present
export function getEffectiveDraftOrder(
  defaultOrder: { pick: number; team: string }[],
  customOrder: Record<string, string> | null | undefined
): { pick: number; team: string }[] {
  if (!customOrder || typeof customOrder !== 'object') {
    return defaultOrder;
  }
  return defaultOrder.map(({ pick }) => ({
    pick,
    team: (customOrder[String(pick)] as string) ?? defaultOrder.find((d) => d.pick === pick)?.team ?? '',
  }));
}

// Apply a pick swap to an order: swap teams at pick A and pick B
export function applyPickSwap(
  order: { pick: number; team: string }[],
  pickA: number,
  pickB: number
): { pick: number; team: string }[] {
  const teamA = order.find((d) => d.pick === pickA)?.team;
  const teamB = order.find((d) => d.pick === pickB)?.team;
  if (!teamA || !teamB) return order;
  return order.map((d) => {
    if (d.pick === pickA) return { ...d, team: teamB };
    if (d.pick === pickB) return { ...d, team: teamA };
    return d;
  });
}

// Assign a team to a pick (for trade-into-first-round: team with no R1 pick acquires one)
export function applyTeamToPick(
  order: { pick: number; team: string }[],
  pickNum: number,
  newTeam: string
): { pick: number; team: string }[] {
  return order.map((d) => (d.pick === pickNum ? { ...d, team: newTeam } : d));
}

// Serialize draft order to custom_draft_order format (pick -> team)
export function serializeDraftOrder(order: { pick: number; team: string }[]): Record<string, string> {
  return Object.fromEntries(order.map((d) => [String(d.pick), d.team]));
}

// Team needs by pick number for 2026 first round (from NFL.com)
const TEAM_NEEDS_2026: Record<number, string[]> = (teamNeeds2026 as { needsByPick: Record<string, string[]> }).needsByPick
  ? Object.fromEntries(
      Object.entries((teamNeeds2026 as { needsByPick: Record<string, string[]> }).needsByPick).map(([k, v]) => [
        parseInt(k, 10),
        v,
      ])
    )
  : {};

export function getTeamNeeds2026(): Record<number, string[]> {
  return TEAM_NEEDS_2026;
}

// Prospect position -> team need mapping (OT/IOL = OL needs; DT/EDGE = DL/Edge needs)
function prospectPositionMatchesNeed(prospectPos: string, need: string): boolean {
  if (prospectPos === need) return true;
  if ((prospectPos === 'OT' || prospectPos === 'IOL') && need === 'OL') return true;
  if ((prospectPos === 'DT' || prospectPos === 'EDGE') && need === 'DL') return true;
  if (prospectPos === 'EDGE' && need === 'Edge') return true;
  return false;
}

export function prospectFillsTeamNeed(prospect: { position: string }, needs: string[]): boolean {
  return needs.some((need) => prospectPositionMatchesNeed(prospect.position, need));
}

// Prospect lookup for scoring: id -> { bigBoardRank, position }
const prospectLookup = new Map(
  mockProspects.map((p) => [p.id, { bigBoardRank: p.bigBoardRank ?? 50, position: p.position }])
);

const NEEDS_BY_PICK = (teamNeeds2026 as { needsByPick: Record<string, string[]> }).needsByPick;

// Team needs by team name (derived from default order + needsByPick) for scoring with trades
const DEFAULT_ORDER_2026 = getDraftOrder2026();
const NEEDS_BY_TEAM: Record<string, string[]> = Object.fromEntries(
  DEFAULT_ORDER_2026.map(({ pick, team }) => [team, (NEEDS_BY_PICK?.[String(pick)] ?? [])])
);

/**
 * Calculate pre-draft score (0-100) for a mock draft.
 * Uses team from each pick for need-matching (works with default order and trades).
 */
export function calculatePreDraftScore(
  picks: Array<{ pick_number: number; prospect_id: string; team: string }>
): number {
  if (picks.length === 0) return 0;

  const DEFAULT_RANK = 50;

  let rawValue = 0;
  let top10Matches = 0;
  let fitCount = 0;

  for (const pick of picks) {
    const prospect = prospectLookup.get(pick.prospect_id);
    const rank = prospect?.bigBoardRank ?? DEFAULT_RANK;
    const position = prospect?.position ?? '';

    rawValue += pick.pick_number - rank;
    if (pick.pick_number <= 10 && rank >= 1 && rank <= 10) {
      top10Matches += 1;
    }

    const needs = NEEDS_BY_TEAM[pick.team] ?? NEEDS_BY_PICK?.[String(pick.pick_number)];
    if (needs && prospectFillsTeamNeed({ position }, needs)) {
      fitCount += 1;
    }
  }

  const valueScore = Math.max(0, Math.min(65, 50 + rawValue / 5));
  const fitScore = (fitCount / Math.max(picks.length, 1)) * 35;

  // Bonus 8-12 pts: how many of their top 10 picks are in our top 10 rankings
  const top10Bonus =
    top10Matches >= 10 ? 12 :
    top10Matches >= 8 ? 11 :
    top10Matches >= 5 ? 10 :
    top10Matches >= 3 ? 9 : 8;

  const totalScore = valueScore + fitScore + top10Bonus;

  return Math.round(Math.max(0, Math.min(100, totalScore)));
}

// Pre-combine mock: map player name -> { pick, team } for enriching prospects
const preCombineMockByPlayer: Map<string, { pick: number; team: string }> = new Map(
  (preCombineMock2026 as { picks: { player: string; pick: number; team: string }[] }).picks.map(
    (p) => [p.player.trim().toLowerCase(), { pick: p.pick, team: p.team }]
  )
);

function enrichProspectWithMock(prospect: Prospect): Prospect {
  const match = preCombineMockByPlayer.get(prospect.name.trim().toLowerCase());
  if (!match) {
    const { mockDraftRound, mockDraftPick, team, ...rest } = prospect;
    return { ...rest };
  }
  return {
    ...prospect,
    mockDraftRound: 1,
    mockDraftPick: match.pick,
    team: match.team,
  };
}

// Load mock draft from JSON file (data/mock-drafts/)
export async function getMockDraftFromFile(filename: string): Promise<MockDraftFromFile | null> {
  await new Promise(resolve => setTimeout(resolve, 100));

  if (filename === 'post-super-bowl-mock-draft-2026.json') {
    return postSuperBowlMock2026 as MockDraftFromFile;
  }
  if (filename === 'pre-combine-mock-draft-2026.json') {
    return preCombineMock2026 as MockDraftFromFile;
  }
  return null;
}
