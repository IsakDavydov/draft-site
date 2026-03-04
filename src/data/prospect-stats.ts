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
  '22': { season: 2025, games: 13, tackles: 88, tfl: 8, sacks: 3.5, pd: 3, qbHits: 1, ff: 2 },
  '9': { season: 2025, games: 12, receptions: 79, recYds: 1156, recAvg: 14.6, recTd: 11 },
  '12': { season: 2025, games: 11, receptions: 51, recYds: 875, recAvg: 17.2, recTd: 9 },
  '16': { season: 2025, games: 14, tackles: 65, tfl: 9, sacks: 3, pd: 1, qbHits: 2, ff: 2 },
  '27': { season: 2025, games: 14, receptions: 51, recYds: 560, recAvg: 11.0, recTd: 8, rushAtt: 3, rushYds: 6 },
  '28': { season: 2025, games: 13, receptions: 61, recYds: 919, recAvg: 15.1, recTd: 9, rushAtt: 10, rushYds: 75, rushTd: 1 },
  '30': { season: 2025, games: 12, receptions: 62, recYds: 881, recAvg: 14.2, recTd: 11 },
  '31': { season: 2025, games: 16, receptions: 69, recYds: 937, recAvg: 13.58, recTd: 13, rushAtt: 3, rushYds: 74, rushTd: 1 },
  '32': { season: 2025, games: 15, passComp: 305, passAtt: 473, passYds: 3567, passTd: 28, passInt: 5, compPct: 64.5, passerRating: 145.3, rushAtt: 90, rushYds: 93, rushTd: 2 },
  '42': { season: 2025, games: 10, tackles: 26, tfl: 9.5, sacks: 6.5, pd: 1, qbHits: 3, ff: 2 },
  '43': { season: 2025, games: 15, tackles: 96, tfl: 3.5, sacks: 1, int: 2, pd: 5, qbHits: 1 },
  '44': { season: 2025, games: 13 },
  '45': { season: 2025, games: 12, receptions: 60, recYds: 1017, recAvg: 17, recTd: 9 },
  '46': { season: 2025, games: 12, tackles: 42, sacks: 6.5, ff: 2 },
  '48': { season: 2025, games: 12, rushAtt: 113, rushYds: 674, rushAvg: 6.0, rushTd: 11, receptions: 6, recYds: 87, recAvg: 14.5, recTd: 2 },
  '51': { season: 2025, games: 14, tackles: 128, tfl: 11, sacks: 1, int: 4, pd: 6, qbHits: 1, ff: 7 },
  '52': { season: 2025, games: 12 },
  '53': { season: 2025, games: 10, tackles: 69, tfl: 7, sacks: 4, int: 2, pd: 1, qbHits: 5, ff: 3 },
  '54': { season: 2025, games: 14, tackles: 38, tfl: 11.5, sacks: 10, pd: 1, qbHits: 13, ff: 2 },
  '55': { season: 2025, games: 14, tackles: 64, tfl: 13, sacks: 5, int: 2, pd: 5, qbHits: 8, ff: 2 },
  '56': { season: 2025, games: 11, receptions: 72, recYds: 917, recAvg: 12.7, recTd: 6 },
  '57': { season: 2025, games: 12, tackles: 84, tfl: 13, sacks: 2, pd: 1, qbHits: 7 },
  '58': { season: 2025, games: 12 },
  '59': { season: 2025, games: 13, receptions: 57, recYds: 620, recAvg: 10.9, recTd: 4 },
  '60': { season: 2025, games: 11, tackles: 30, sacks: 10, pd: 3, ff: 2 },
  '61': { season: 2025, games: 12, tackles: 43, tfl: 13.5, sacks: 11, pd: 1, qbHits: 6, ff: 3 },
  '62': { season: 2025, games: 12, tackles: 74, tfl: 2, int: 1, pd: 1, qbHits: 3 },
  '63': { season: 2025, games: 12, tackles: 29, int: 2, pd: 2 },
  '64': { season: 2025, games: 14, receptions: 64, recYds: 862, recAvg: 13.5, recTd: 7, rushAtt: 18, rushYds: 101, rushTd: 2 },
  '65': { season: 2025, games: 11, tackles: 49, tfl: 3, sacks: 1, int: 4, pd: 9, qbHits: 2, ff: 1 },
  '66': { season: 2025, games: 11, receptions: 49, recYds: 745, recAvg: 15.2, recTd: 4 },
  '67': { season: 2025, games: 12, tackles: 24 },
  '68': { season: 2025, games: 12, rushAtt: 167, rushYds: 1070, rushAvg: 6.4, rushTd: 8, receptions: 15, recYds: 226, recAvg: 15.1, recTd: 1 },
  '69': { season: 2025, games: 13, receptions: 72, recYds: 1190, recAvg: 16.5, recTd: 10 },
  '70': { season: 2025, games: 14, tackles: 53, tfl: 0.5, int: 2, pd: 8 },
  '71': { season: 2025, games: 14, receptions: 43, recYds: 448, recAvg: 10.4, recTd: 2 },
  '72': { season: 2025, games: 12 },
  '73': { season: 2025, games: 14, tackles: 86, int: 3, ff: 1 },
  '74': { season: 2025, games: 13, tackles: 33, tfl: 7, sacks: 3.5, pd: 2, qbHits: 7, ff: 1 },
  '75': { season: 2025, games: 14, receptions: 65, recYds: 830, recAvg: 12.8, recTd: 15 },
};

export function getProspectStats(prospectId: string): ProspectSeasonStats | null {
  return STATS_2025[prospectId] ?? null;
}
