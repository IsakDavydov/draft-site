/**
 * ESPN NCAA team ID mapping for college logos.
 * Logo URL format: https://a.espncdn.com/i/teamlogos/ncaa/500/{id}.png
 * IDs from ESPN's college football API (site.api.espn.com).
 */
const SCHOOL_TO_ESPN_ID: Record<string, string> = {
  Alabama: '333',
  Arizona: '12',
  'Arizona State': '9',
  Auburn: '2',
  Cincinnati: '2132',
  Clemson: '228',
  Florida: '57',
  Georgia: '61',
  Indiana: '84',
  LSU: '99',
  Miami: '2390',
  Missouri: '142',
  'Notre Dame': '87',
  Oklahoma: '201',
  Oregon: '2483',
  'Ohio State': '194',
  'Penn State': '213',
  'South Carolina': '2579',
  Tennessee: '2633',
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
