'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { User, LogOut } from 'lucide-react';

interface AuthButtonProps {
  /** Set to true when rendered on a dark background (e.g. the site header) */
  dark?: boolean;
}

export function AuthButton({ dark = false }: AuthButtonProps) {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const baseText = dark
    ? 'text-gray-500 hover:text-gray-700 transition-colors'
    : 'text-gray-700 hover:text-rose-500 transition-colors';

  useEffect(() => {
    let sub: { unsubscribe: () => void } | undefined;
    try {
      const supabase = createClient();
      supabase.auth
        .getUser()
        .then(({ data: { user } }) => {
          setUser(user ? { email: user.email || '' } : null);
        })
        .catch(() => setUser(null));
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ? { email: session.user.email || '' } : null);
      });
      sub = subscription;
    } catch {
      setUser(null);
    }
    return () => sub?.unsubscribe();
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/predict"
          className={`text-sm font-semibold leading-6 ${baseText}`}
        >
          My Picks
        </Link>
        <form action="/auth/signout" method="post" className="inline">
          <button
            type="submit"
            className={`text-sm font-semibold leading-6 flex items-center gap-1 ${baseText}`}
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
      className={`text-sm font-semibold leading-6 flex items-center gap-1 ${baseText}`}
    >
      <User className="h-5 w-5" />
      Sign in
    </Link>
  );
}
