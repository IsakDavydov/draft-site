/**
 * Prospect stats for the 2025 college season.
 * Data from cfbstats.com (https://cfbstats.com/2025/).
 *
 * To add stats for more prospects:
 * 1. Visit https://cfbstats.com/2025/ → Teams → find school → Roster
 * 2. Click the player name to view their 2025 stats
 * 3. Add an entry keyed by prospect id (matches draft adapter mockProspects)
 * Alternative: https://www.sports-reference.com/cfb/
 */

export interface ProspectSeasonStats {
  season: number;
  games?: number;
  // Passing (QB)
  passComp?: number;
  passAtt?: number;
  passYds?: number;
  passTd?: number;
  passInt?: number;
  compPct?: number;
  passerRating?: number;
  // Rushing (RB, QB)
  rushAtt?: number;
  rushYds?: number;
  rushAvg?: number;
  rushTd?: number;
  // Receiving (WR, TE, RB)
  receptions?: number;
  recYds?: number;
  recAvg?: number;
  recTd?: number;
  // Defense
  tackles?: number;
  tfl?: number;
  sacks?: number;
  qbHits?: number;
  int?: number;
  pd?: number;
  ff?: number;
}

const STATS_2025: Record<string, ProspectSeasonStats> = {
  '1': { season: 2025, games: 16, passComp: 273, passAtt: 379, passYds: 3535, passTd: 41, passInt: 6, compPct: 72, passerRating: 182.9 },
  '2': { season: 2025, games: 12, rushAtt: 199, rushYds: 1372, rushAvg: 6.9, rushTd: 18, receptions: 27, recYds: 280, recTd: 3 },
  '3': { season: 2025, games: 16, tackles: 54, tfl: 15.5, sacks: 9.5, int: 1, pd: 1, qbHits: 5, ff: 1 },
  '4': { season: 2025, games: 14, tackles: 68, tfl: 5, sacks: 1, int: 2, pd: 2, ff: 2 },
  '5': { season: 2025, games: 14, tackles: 82, tfl: 6.5, sacks: 1, int: 1, pd: 3, qbHits: 4, ff: 1 },
  '6': { season: 2025, games: 9, receptions: 61, recYds: 711, recAvg: 11.7, recTd: 8 },
  '7': { season: 2025, games: 14, tackles: 52, tfl: 19.5, sacks: 14.5, pd: 3, qbHits: 13, ff: 3 },
  '8': { season: 2025, games: 14, tackles: 69, tfl: 10, sacks: 6.5, pd: 2, qbHits: 5 },
  '9': { season: 2025, games: 12, receptions: 79, recYds: 1156, recAvg: 14.6, recTd: 11 },
  '12': { season: 2025, games: 11, receptions: 51, recYds: 875, recAvg: 17.2, recTd: 9 },
  '28': { season: 2025, games: 13, receptions: 61, recYds: 919, recAvg: 15.1, recTd: 9, rushAtt: 10, rushYds: 75, rushTd: 1 },
  '30': { season: 2025, games: 12, receptions: 62, recYds: 881, recAvg: 14.2, recTd: 11 },
  '32': { season: 2025, games: 15, passComp: 305, passAtt: 473, passYds: 3567, passTd: 28, passInt: 5, compPct: 64.5, passerRating: 145.3, rushAtt: 90, rushYds: 93, rushTd: 2 },
};

export function getProspectStats(prospectId: string): ProspectSeasonStats | null {
  return STATS_2025[prospectId] ?? null;
}
