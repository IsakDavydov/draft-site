/**
 * ESPN NCAA team ID mapping for college logos.
 * Logo URL format: https://a.espncdn.com/i/teamlogos/ncaa/500/{id}.png
 * IDs from ESPN's college football API (site.api.espn.com).
 */
const SCHOOL_TO_ESPN_ID: Record<string, string> = {
  Alabama: '333',
  Arizona: '12',
  'Arizona State': '9',
  Arkansas: '8',
  Auburn: '2',
  Cincinnati: '2132',
  Clemson: '228',
  Florida: '57',
  Georgia: '61',
  Illinois: '356',
  Indiana: '84',
  Louisville: '97',
  LSU: '99',
  Miami: '2390',
  Michigan: '130',
  Missouri: '142',
  'Notre Dame': '87',
  Northwestern: '77',
  Oklahoma: '201',
  Oregon: '2483',
  'Ohio State': '194',
  'Penn State': '213',
  'San Diego State': '21',
  'South Carolina': '2579',
  TCU: '2628',
  Tennessee: '2633',
  Texas: '251',
  'Texas A&M': '245',
  'Texas Tech': '2641',
  Toledo: '2649',
  USC: '30',
  Utah: '254',
  Vanderbilt: '238',
  Washington: '264',
};

export function getCollegeLogoUrl(school: string): string | null {
  const teamId = SCHOOL_TO_ESPN_ID[school];
  if (!teamId) return null;
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${teamId}.png`;
}

/** Primary brand color (hex) for each school. Used for header accents. */
const SCHOOL_PRIMARY_COLORS: Record<string, string> = {
  Alabama: '#9E1B32',
  Arizona: '#003366',
  'Arizona State': '#8C1D40',
  Arkansas: '#9D2235',
  Auburn: '#0C2340',
  Cincinnati: '#E00122',
  Clemson: '#F56600',
  Florida: '#FA4616',
  Georgia: '#BA0C2F',
  Illinois: '#13294B',
  Indiana: '#990000',
  Louisville: '#AD0000',
  LSU: '#461D7C',
  Miami: '#005030',
  Michigan: '#00274C',
  Missouri: '#F1B82D',
  'Notre Dame': '#0C2340',
  Northwestern: '#4E2A84',
  Oklahoma: '#841617',
  Oregon: '#154733',
  'Ohio State': '#BB0000',
  'Penn State': '#041E42',
  'San Diego State': '#A6192E',
  'South Carolina': '#73000A',
  TCU: '#4D1979',
  Tennessee: '#FF8200',
  Texas: '#BF5700',
  'Texas A&M': '#500000',
  'Texas Tech': '#CC0000',
  Toledo: '#003366',
  USC: '#990000',
  Utah: '#CC0000',
  Vanderbilt: '#866D4B',
  Washington: '#4B2E83',
};

export function getSchoolPrimaryColor(school: string): string {
  return SCHOOL_PRIMARY_COLORS[school] ?? '#64748b'; // slate-500 fallback
}
