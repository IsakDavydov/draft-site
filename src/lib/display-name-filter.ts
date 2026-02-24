/**
 * Display name filter for leaderboards.
 * Returns "*****" if the name contains inappropriate content.
 */

const BLOCKLIST = [
  'asshole',
  'bastard',
  'bitch',
  'bullshit',
  'crap',
  'damn',
  'dick',
  'fuck',
  'shit',
  'slut',
  'whore',
  'fag',
  'faggot',
  'retard',
  'retarded',
  'tranny',
  'nigga',
  'nigger',
  'niggas',
  'niggers',
];

// Common obfuscations (leetspeak, etc.)
const OBFUSCATIONS = [
  'fuk',
  'fck',
  'fucc',
  'sh1t',
  'sht',
  'shyt',
  'b1tch',
  'btch',
  'a55',
  'a$$',
  'n1gg',
  'n1gger',
  'n1gga',
];

const WORD_BOUNDARY_REGEX = new RegExp(
  `\\b(${BLOCKLIST.map(escapeRegex).join('|')})\\b`,
  'i'
);

// Substring match for concatenated forms (e.g. "TestFuck") - only words that never appear in legit names
const SUBSTRING_WORDS = [
  'fuck', 'shit', 'bitch', 'whore', 'slut', 'fag', 'faggot', 'nigger', 'nigga',
  'niggas', 'niggers', ...OBFUSCATIONS,
];
const SUBSTRING_REGEX = new RegExp(
  `(${SUBSTRING_WORDS.map(escapeRegex).join('|')})`,
  'i'
);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function sanitizeDisplayName(name: string | null | undefined): string {
  if (!name || typeof name !== 'string') return '*****';
  const trimmed = name.trim();
  if (trimmed.length === 0) return '*****';
  if (WORD_BOUNDARY_REGEX.test(trimmed)) return '*****';
  if (SUBSTRING_REGEX.test(trimmed)) return '*****';
  return trimmed;
}
