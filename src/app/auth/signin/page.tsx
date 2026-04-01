'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/predict';

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const timeoutMs = 15000;
      const timeoutPromise = new Promise<{ error: { message: string } }>((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out. Check your connection and try again.')), timeoutMs)
      );

      const authPromise = supabase.auth.signInWithPassword({ email, password });
      const { error } = await Promise.race([authPromise, timeoutPromise]);

      if (error) {
        setMessage({ type: 'error', text: error.message });
        setLoading(false);
        return;
      }

      // Full page navigation so the server receives cookies on the next request
      window.location.href = next;
    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Sign-in failed. Please try again.',
      });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sak-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-sak-card border border-white/[0.06] rounded-2xl shadow-card p-8">
          <h1 className="text-2xl font-bold text-white font-display mb-2">Sign in</h1>
          <p className="text-gray-200 mb-6">
            Sign in to submit your draft predictions.
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-sak-border rounded-lg bg-sak-hover text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-brand-red focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-medium text-brand-red hover:text-brand-red/80">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-4 py-2 border border-sak-border rounded-lg bg-sak-hover text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-brand-red focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {message.text}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-brand-red text-white font-semibold rounded-lg hover:bg-brand-red/90 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-medium text-brand-red hover:text-brand-red/80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sak-darker flex items-center justify-center text-gray-200">Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
}
