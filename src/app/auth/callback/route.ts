import type { EmailOtpType } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') ?? '/predict';

  const supabase = await createClient();

  // PKCE flow: OAuth or magic link with code
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Auth callback error:', error);
      return NextResponse.redirect(
        new URL(`/auth/error?message=${encodeURIComponent('Email confirmation failed. Please try signing up again.')}`, requestUrl.origin)
      );
    }
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  // Password reset flow: token_hash + type=recovery (requires custom email template in Supabase)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (error) {
      console.error('Password reset verification error:', error);
      return NextResponse.redirect(
        new URL(`/auth/error?message=${encodeURIComponent('Password reset link invalid or expired. Please request a new one.')}`, requestUrl.origin)
      );
    }
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
