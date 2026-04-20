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
        <div className={`inline-flex flex-col gap-1.5 ${className}`}>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
            <Clock className="h-3 w-3" />
            Draft Countdown
          </div>
          <div className="flex items-center gap-2">
            {(['D', 'H', 'M', 'S'] as const).map((unit, i) => (
              <div key={unit} className="flex items-center gap-1">
                {i > 0 && <span className="mx-1 text-gray-400 font-bold">:</span>}
                <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-2 text-center">
                  <p className="text-lg font-bold text-gray-300 tabular-nums">--</p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-widest text-gray-400">{unit}</p>
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
        <div className={`${className}`}>
          <div
            className={`flex items-center gap-2 font-semibold uppercase tracking-wider ${
              isHero ? 'text-sm text-rose-500 mb-4' : 'text-xs text-rose-500 mb-3'
            }`}
          >
            <Clock className={isHero ? 'h-4 w-4' : 'h-3.5 w-3.5'} />
            Draft countdown
          </div>
          <div
            className={`flex items-center gap-1.5 sm:gap-3 ${
              isHero ? '' : 'gap-3 sm:gap-4'
            }`}
          >
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && (
                  <span className={`font-bold ${isHero ? 'text-gray-400 text-lg sm:text-2xl' : 'text-gray-600 text-xl'}`}>:</span>
                )}
                <div
                  className={`rounded-xl text-center ${
                    isHero
                      ? 'bg-white shadow-sm ring-1 ring-gray-200 p-2.5 sm:p-4 lg:p-5'
                      : 'bg-white shadow-sm ring-1 ring-gray-200 p-3'
                  }`}
                >
                  <p
                    className={`font-display font-black tabular-nums ${
                      isHero
                        ? 'text-gray-300 text-2xl sm:text-3xl lg:text-4xl'
                        : 'text-gray-300 text-2xl sm:text-3xl'
                    }`}
                  >
                    --
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={`h-px bg-gradient-to-r from-transparent to-transparent ${isHero ? 'mt-4 via-rose-300/60' : 'mt-3 via-brand-red/40'}`} />
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

  /* ── compact — broadcast-style ticker cells ── */
  if (variant === 'compact') {
    return (
      <div className={`inline-flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-500">
          <Clock className="h-3 w-3" />
          Draft Countdown
        </div>
        <div className="flex items-center gap-2">
          {[
            { value: timeLeft.days, label: 'D' },
            { value: timeLeft.hours, label: 'H' },
            { value: timeLeft.minutes, label: 'M' },
            { value: timeLeft.seconds, label: 'S' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-400 font-bold text-xl px-1">:</span>}
              <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-2 text-center">
                <p className="text-lg font-bold text-gray-900 tabular-nums">
                  {String(value).padStart(2, '0')}
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── hero — large broadcast-style cells ── */
  if (variant === 'hero') {
    return (
      <div className={`${className}`}>
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-rose-500 mb-4">
          <Clock className="h-4 w-4" />
          Draft countdown
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1.5 sm:gap-3 justify-start">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' },
            ].map(({ value, label }, i) => (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && <span className="text-gray-400 font-bold text-lg sm:text-2xl">:</span>}
                <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-2.5 sm:p-4 lg:p-5 text-center">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-gray-900 tabular-nums">
                    {String(value).padStart(2, '0')}
                  </p>
                  <p className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── full (default) — broadcast-style ticker with cells ── */
  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-rose-500 mb-3">
        <Clock className="h-3.5 w-3.5" />
        Draft countdown
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Minutes' },
          { value: timeLeft.seconds, label: 'Seconds' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <span className="text-gray-400 font-bold text-xl">:</span>}
            <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl p-3 text-center">
              <p className="text-2xl sm:text-3xl font-display font-black text-gray-900 tabular-nums">
                {String(value).padStart(2, '0')}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 h-px bg-gradient-to-r from-transparent via-brand-red/40 to-transparent" />
    </div>
  );
}
