'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    async function hasUser(): Promise<boolean> {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) return true;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return !!user;
    }

    async function resolveAuth() {
      // After email link → /auth/callback → redirect, cookies can take a beat to be visible to the browser client.
      if (await hasUser()) {
        if (!cancelled) setCheckingAuth(false);
        return;
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (cancelled) return;
        if (session?.user && (event === 'INITIAL_SESSION' || event === 'SIGNED_IN')) {
          setCheckingAuth(false);
          subscription.unsubscribe();
        }
      });

      for (let i = 0; i < 12; i++) {
        await new Promise((r) => setTimeout(r, 150));
        if (cancelled) break;
        if (await hasUser()) {
          if (!cancelled) setCheckingAuth(false);
          subscription.unsubscribe();
          return;
        }
      }

      subscription.unsubscribe();
      if (!cancelled) {
        // Stay on loading until navigation; avoid flashing the form before redirect.
        router.replace('/auth/signin?next=/auth/update-password');
      }
    }

    void resolveAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({
      type: 'success',
      text: 'Password updated. Redirecting...',
    });
    setLoading(false);
    setTimeout(() => {
      window.location.href = '/predict';
    }, 1500);
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Set new password</h1>
          <p className="text-gray-600 mb-6">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-rose-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Min 6 characters"
              />
            </div>
            {message && (
              <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {message.text}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            <Link href="/auth/signin" className="font-medium text-rose-500 hover:text-rose-600">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
