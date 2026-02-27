'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { DRAFT_DATE_2026 } from '@/lib/constants';

function getTimeLeft() {
  const now = new Date();
  const diff = DRAFT_DATE_2026.getTime() - now.getTime();
  if (diff <= 0) {
    return { ended: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { ended: false, days, hours, minutes, seconds };
}

interface DraftCountdownProps {
  variant?: 'compact' | 'full' | 'minimal';
  className?: string;
}

export function DraftCountdown({ variant = 'full', className = '' }: DraftCountdownProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => ({ ended: false, days: 0, hours: 0, minutes: 0, seconds: 0 }));

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) {
    if (variant === 'full') {
      return (
        <div className={`rounded-xl bg-black/20 px-4 py-3 backdrop-blur-sm ${className}`}>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-nfl-gold/90">
            <Clock className="h-3.5 w-3.5" />
            Draft countdown
          </div>
          <div className="mt-1 flex gap-4 text-lg font-bold text-white/70 sm:gap-6 sm:text-xl">
            <span>--</span>
            <span>--</span>
            <span>--</span>
            <span>--</span>
          </div>
        </div>
      );
    }
    if (variant === 'minimal') {
      return (
        <div className={`flex items-center gap-2 text-sm text-gray-400 ${className}`}>
          <Clock className="h-3.5 w-3.5 shrink-0 animate-pulse" />
          <span>--d --h --m</span>
        </div>
      );
    }
    return (
      <div className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm ${className}`}>
        <Clock className="h-4 w-4 shrink-0 text-gray-400 animate-pulse" />
        <div className="flex gap-3 text-sm font-semibold text-gray-400">
          <span>--d</span>
          <span>--h</span>
          <span>--m</span>
          <span>--s</span>
        </div>
      </div>
    );
  }

  if (timeLeft.ended) {
    return (
      <div className={`flex items-center gap-2 text-nfl-gold ${className}`}>
        <Clock className="h-4 w-4 shrink-0" />
        <span className="font-semibold">Draft day is here!</span>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Clock className="h-3.5 w-3.5 shrink-0 text-gray-500" />
        <span className="font-medium text-gray-700">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm ${className}`}>
        <Clock className="h-4 w-4 shrink-0 text-nfl-red" />
        <div className="flex gap-3 text-sm font-semibold text-gray-900">
          <span><span className="text-nfl-red">{String(timeLeft.days).padStart(2, '0')}</span>d</span>
          <span><span className="text-nfl-red">{String(timeLeft.hours).padStart(2, '0')}</span>h</span>
          <span><span className="text-nfl-red">{String(timeLeft.minutes).padStart(2, '0')}</span>m</span>
          <span><span className="text-nfl-red">{String(timeLeft.seconds).padStart(2, '0')}</span>s</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl bg-black/20 px-4 py-3 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-nfl-gold/90">
        <Clock className="h-3.5 w-3.5" />
        Draft countdown
      </div>
      <div className="mt-1 flex gap-4 text-lg font-bold text-white sm:gap-6 sm:text-xl">
        <div>
          <span className="text-nfl-gold">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/80">days</span>
        </div>
        <div>
          <span className="text-nfl-gold">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/80">hrs</span>
        </div>
        <div>
          <span className="text-nfl-gold">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/80">min</span>
        </div>
        <div>
          <span className="text-nfl-gold">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/80">sec</span>
        </div>
      </div>
    </div>
  );
}
