import { NextRequest } from 'next/server';
import { getSchedules, getUpcomingGames, getTodaysGames } from '@/lib/adapters';

export const dynamic = 'force-dynamic';

/** Server-side schedule API - keeps ODDS_API_KEY secret, caches to save credits */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('mode') ?? 'weekly';
  const week = searchParams.get('week');
  const season = parseInt(searchParams.get('season') ?? '2026', 10);

  try {
    let games;
    switch (mode) {
      case 'upcoming':
        games = await getUpcomingGames(20);
        break;
      case 'today':
        games = await getTodaysGames();
        break;
      default:
        games = await getSchedules(week ? parseInt(week, 10) : undefined, season);
    }
    return Response.json(games, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('Schedule API error:', err);
    return Response.json({ error: 'Failed to load schedule' }, { status: 500 });
  }
}
