'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { getBrowserSiteUrl } from '@/lib/site-url';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createClient();

    const siteUrl = getBrowserSiteUrl();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      const hint =
        /redirect/i.test(error.message) || /url/i.test(error.message)
          ? ' If this persists, confirm Supabase Auth → URL Configuration includes this site and /auth/callback (see SUPABASE_SETUP.md).'
          : '';
      setMessage({ type: 'error', text: `${error.message}${hint}` });
      setLoading(false);
      return;
    }

    setMessage({
      type: 'success',
      text: 'Check your email for a link to reset your password.',
    });
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-sak-darker flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-sak-card border border-white/[0.06] rounded-2xl shadow-card p-8">
          <h1 className="text-2xl font-bold text-white font-display mb-2">Forgot password</h1>
          <p className="text-gray-200 mb-6">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            <Link href="/auth/signin" className="font-medium text-brand-red hover:text-brand-red/80">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
