'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User, LogOut } from 'lucide-react';

export function AuthButton() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user ? { email: user.email || '' } : null);
      }).catch(() => setUser(null));
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ? { email: session.user.email || '' } : null);
      });
      return () => subscription.unsubscribe();
    } catch {
      setUser(null);
    }
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/predict"
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-nfl-red transition-colors"
        >
          My Picks
        </Link>
        <form action="/auth/signout" method="post" className="inline">
          <button
            type="submit"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-nfl-red transition-colors flex items-center gap-1"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <Link
      href="/auth/signin"
      className="text-sm font-semibold leading-6 text-gray-900 hover:text-nfl-red transition-colors flex items-center gap-1"
    >
      <User className="h-5 w-5" />
      Sign in
    </Link>
  );
}
