import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/predict';

  if (code) {
    try {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        new URL(`/auth/error?message=${encodeURIComponent('Email confirmation failed. Please try signing up again.')}`, requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
