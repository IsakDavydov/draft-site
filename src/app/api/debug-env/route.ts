import { NextResponse } from 'next/server';

/**
 * Debug endpoint to verify Supabase env vars are available.
 * Visit /api/debug-env to check. Remove this file after troubleshooting.
 */
export async function GET() {
  const supabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const allSet = supabaseUrl && supabaseKey;

  return NextResponse.json({
    supabaseUrl: supabaseUrl ? 'set' : 'NOT SET',
    supabaseKey: supabaseKey ? 'set' : 'NOT SET',
    ready: allSet,
    note: 'NEXT_PUBLIC_ vars must be in Vercel env and present at build time.',
  });
}
