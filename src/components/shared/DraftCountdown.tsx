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
  /** `hero` — larger type/padding for the home hero. */
  variant?: 'compact' | 'full' | 'minimal' | 'hero';
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

  /* ── SSR placeholders ── */
  if (!mounted) {
    if (variant === 'compact') {
      return (
        <div className={`inline-flex flex-col gap-1 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm ring-1 ring-white/20 ${className}`}>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
            <Clock className="h-3 w-3" />
            Draft Countdown
          </div>
          <div className="flex items-end">
            {(['D', 'H', 'M', 'S'] as const).map((unit, i) => (
              <div key={unit} className="flex items-end">
                {i > 0 && <span className="mx-2 mb-1 text-sm font-light text-white/20">·</span>}
                <div className="text-center">
                  <p className="text-xl font-black tabular-nums leading-none text-white/30">--</p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/30">{unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (variant === 'full' || variant === 'hero') {
      const isHero = variant === 'hero';
      return (
        <div
          className={`rounded-xl bg-black/20 backdrop-blur-sm ${
            isHero ? 'px-5 py-4 sm:px-7 sm:py-5' : 'px-4 py-3'
          } ${className}`}
        >
          <div
            className={`flex items-center gap-2 font-medium uppercase tracking-wider text-white/50 ${
              isHero ? 'text-sm' : 'text-xs'
            }`}
          >
            <Clock className={isHero ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
            Draft countdown
          </div>
          <div
            className={`flex flex-wrap font-bold text-white/30 ${
              isHero
                ? 'mt-2 gap-3 text-xl sm:gap-5 sm:text-2xl xl:text-3xl'
                : 'mt-1 gap-4 text-lg sm:gap-6 sm:text-xl'
            }`}
          >
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
  }

  /* ── Draft ended ── */
  if (timeLeft.ended) {
    return (
      <div className={`flex items-center gap-2 text-white ${className}`}>
        <Clock className="h-4 w-4 shrink-0" />
        <span className="font-semibold">Draft day is here!</span>
      </div>
    );
  }

  /* ── minimal ── */
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

  /* ── compact — dark glass pill, lives inside gradient hero headers ── */
  if (variant === 'compact') {
    return (
      <div className={`inline-flex flex-col gap-1 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur-sm ring-1 ring-white/20 ${className}`}>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-nfl-blue">
          <Clock className="h-3 w-3" />
          Draft Countdown
        </div>
        <div className="flex items-end">
          {[
            { value: timeLeft.days, label: 'D' },
            { value: timeLeft.hours, label: 'H' },
            { value: timeLeft.minutes, label: 'M' },
            { value: timeLeft.seconds, label: 'S' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-end">
              {i > 0 && <span className="mx-2 mb-1 text-sm font-light text-white/30">·</span>}
              <div className="text-center">
                <p className="text-xl font-black tabular-nums leading-none text-white">
                  {String(value).padStart(2, '0')}
                </p>
                <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── hero ── */
  if (variant === 'hero') {
    return (
      <div className={`rounded-2xl bg-black/25 px-5 py-4 backdrop-blur-md ring-1 ring-white/10 sm:px-7 sm:py-5 ${className}`}>
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/60">
          <Clock className="h-4 w-4" />
          Draft countdown
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-2xl font-bold tabular-nums sm:gap-x-6 sm:text-3xl xl:text-4xl">
          <div>
            <span className="text-white">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="ml-1 text-sm font-medium text-white/60 sm:text-base">days</span>
          </div>
          <div>
            <span className="text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="ml-1 text-sm font-medium text-white/60 sm:text-base">hrs</span>
          </div>
          <div>
            <span className="text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="ml-1 text-sm font-medium text-white/60 sm:text-base">min</span>
          </div>
          <div>
            <span className="text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="ml-1 text-sm font-medium text-white/60 sm:text-base">sec</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── full (default) ── */
  return (
    <div className={`rounded-xl bg-black/20 px-4 py-3 backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60">
        <Clock className="h-3.5 w-3.5" />
        Draft countdown
      </div>
      <div className="mt-1 flex gap-4 text-lg font-bold text-white sm:gap-6 sm:text-xl">
        <div>
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/60">days</span>
        </div>
        <div>
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/60">hrs</span>
        </div>
        <div>
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/60">min</span>
        </div>
        <div>
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="ml-0.5 text-sm font-medium text-white/60">sec</span>
        </div>
      </div>
    </div>
  );
}
