import { NextResponse } from 'next/server';

const VALID_SLUGS = new Set([
  'buf', 'mia', 'nyj', 'ne', 'bal', 'cin', 'cle', 'pit', 'hou', 'ind', 'jax', 'ten',
  'den', 'kc', 'lv', 'lac', 'dal', 'nyg', 'phi', 'was', 'chi', 'det', 'gb', 'min',
  'atl', 'car', 'no', 'tb', 'ari', 'lar', 'sf', 'sea',
]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug || !VALID_SLUGS.has(slug.toLowerCase())) {
    return new NextResponse('Not found', { status: 404 });
  }

  try {
    const res = await fetch(`https://a.espncdn.com/i/teamlogos/nfl/500/${slug.toLowerCase()}.png`, {
      headers: { 'User-Agent': 'SAKFootball/1.0' },
    });
    if (!res.ok) {
      return new NextResponse('Upstream error', { status: 502 });
    }
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    console.error('Team logo fetch error:', err);
    return new NextResponse('Error', { status: 500 });
  }
}
