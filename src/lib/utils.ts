import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

export function formatRecord(wins: number, losses: number, ties: number = 0): string {
  if (ties > 0) {
    return `${wins}-${losses}-${ties}`;
  }
  return `${wins}-${losses}`;
}

export function calculateWinPercentage(wins: number, losses: number, ties: number = 0): number {
  const total = wins + losses + ties;
  if (total === 0) return 0;
  return (wins + (ties * 0.5)) / total;
}

export function formatOdds(odds: number): string {
  if (odds > 0) {
    return `+${odds}`;
  }
  return odds.toString();
}

export function calculateROI(wins: number, losses: number, units: number): number {
  if (units === 0) return 0;
  return ((wins - losses) / units) * 100;
}

export function getTeamColors(teamSlug: string): { primary: string; secondary: string; accent: string } {
  const teamColors: Record<string, { primary: string; secondary: string; accent: string }> = {
    chiefs: { primary: '#E31837', secondary: '#FFB81C', accent: '#000000' },
    raiders: { primary: '#000000', secondary: '#A5ACAF', accent: '#C4C4C4' },
    chargers: { primary: '#0080C6', secondary: '#FFC20E', accent: '#000000' },
    broncos: { primary: '#FB4F14', secondary: '#002244', accent: '#FFFFFF' },
    patriots: { primary: '#002244', secondary: '#C60C30', accent: '#B0B7BC' },
    bills: { primary: '#00338D', secondary: '#C60C30', accent: '#FFFFFF' },
    dolphins: { primary: '#008E97', secondary: '#FC4C02', accent: '#005778' },
    jets: { primary: '#125740', secondary: '#FFFFFF', accent: '#000000' },
    steelers: { primary: '#FFB612', secondary: '#000000', accent: '#C60C30' },
    browns: { primary: '#311D00', secondary: '#FF3C00', accent: '#FFFFFF' },
    bengals: { primary: '#FB4F14', secondary: '#000000', accent: '#FFFFFF' },
    ravens: { primary: '#241773', secondary: '#000000', accent: '#9E7C0C' },
    texans: { primary: '#03202F', secondary: '#A71930', accent: '#FFFFFF' },
    colts: { primary: '#002C5F', secondary: '#FFFFFF', accent: '#A2AAAD' },
    jaguars: { primary: '#101820', secondary: '#D7A22A', accent: '#006778' },
    titans: { primary: '#0C2340', secondary: '#4B92DB', accent: '#C8102E' },
    cowboys: { primary: '#003594', secondary: '#041E42', accent: '#FFFFFF' },
    eagles: { primary: '#004C54', secondary: '#000000', accent: '#A5ACAF' },
    giants: { primary: '#0B2265', secondary: '#A71930', accent: '#FFFFFF' },
    commanders: { primary: '#5A1414', secondary: '#FFB612', accent: '#FFFFFF' },
    packers: { primary: '#203731', secondary: '#FFB612', accent: '#FFFFFF' },
    vikings: { primary: '#4F2683', secondary: '#FFC62F', accent: '#FFFFFF' },
    bears: { primary: '#0B162A', secondary: '#C83803', accent: '#FFFFFF' },
    lions: { primary: '#0076B6', secondary: '#B0B7BC', accent: '#FFFFFF' },
    falcons: { primary: '#A71930', secondary: '#000000', accent: '#FFFFFF' },
    panthers: { primary: '#0085CA', secondary: '#000000', accent: '#FFFFFF' },
    saints: { primary: '#D3BC8D', secondary: '#000000', accent: '#FFFFFF' },
    buccaneers: { primary: '#D50A0A', secondary: '#FF7900', accent: '#0A0A0A' },
    seahawks: { primary: '#002244', secondary: '#69BE28', accent: '#FFFFFF' },
    rams: { primary: '#003594', secondary: '#FFA300', accent: '#FFFFFF' },
    cardinals: { primary: '#97233F', secondary: '#000000', accent: '#FFFFFF' },
    '49ers': { primary: '#AA0000', secondary: '#B3995D', accent: '#FFFFFF' },
  };

  return teamColors[teamSlug] || { primary: '#6B7280', secondary: '#9CA3AF', accent: '#FFFFFF' };
}

export function getPositionAbbreviation(position: string): string {
  const abbreviations: Record<string, string> = {
    'Quarterback': 'QB',
    'Running Back': 'RB',
    'Wide Receiver': 'WR',
    'Tight End': 'TE',
    'Offensive Line': 'OL',
    'Defensive Line': 'DL',
    'Linebacker': 'LB',
    'Cornerback': 'CB',
    'Safety': 'S',
    'Kicker': 'K',
    'Punter': 'P',
  };

  return abbreviations[position] || position;
}

export function getScoringLabel(scoring: string): string {
  const labels: Record<string, string> = {
    'standard': 'Standard',
    'half-ppr': 'Half PPR',
    'full-ppr': 'Full PPR',
  };

  return labels[scoring] || scoring;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
