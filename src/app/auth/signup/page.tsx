'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/predict`,
      },
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({
      type: 'success',
      text: 'Check your email for the confirmation link.',
    });
    setLoading(false);
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
          <p className="text-gray-600 mb-6">
            Sign up to submit your 2026 NFL Draft predictions.
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-nfl-blue focus:border-transparent"
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
              className="w-full py-2.5 px-4 bg-nfl-red text-white font-semibold rounded-lg hover:bg-nfl-red/90 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/signin" className="font-medium text-nfl-red hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
