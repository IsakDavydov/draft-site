import Link from 'next/link';
import { DollarSign, ArrowRight } from 'lucide-react';

interface PrizeBannerProps {
  variant?: 'hero' | 'strip' | 'card';
}

export function PrizeBanner({ variant = 'card' }: PrizeBannerProps) {
  if (variant === 'strip') {
    return (
      <Link
        href="/contest-rules#grand-prize"
        className="group flex items-center justify-center gap-3 bg-gradient-to-r from-nfl-red via-[#012252] to-nfl-red px-4 py-2.5 hover:opacity-90 transition-opacity"
      >
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-nfl-blue text-white">
          <DollarSign className="h-3 w-3" />
        </span>
        <span className="text-sm font-bold text-white">
          $10,000 Grand Prize — predict every first-round pick perfectly
        </span>
        <span className="hidden sm:inline text-xs font-semibold text-white/60 group-hover:text-white/80 transition-colors">
          Rules &amp; eligibility →
        </span>
      </Link>
    );
  }

  if (variant === 'hero') {
    return (
      <Link
        href="/contest-rules#grand-prize"
        className="group inline-flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/20 px-4 py-3 hover:bg-white/15 transition-colors backdrop-blur-sm"
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-nfl-blue text-white">
          <DollarSign className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-sm font-black text-white leading-none">$10,000 Grand Prize</p>
          <p className="text-xs text-white/60 mt-0.5">Predict every pick perfectly to win</p>
        </div>
        <ArrowRight className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors ml-1" />
      </Link>
    );
  }

  // card variant — full standalone card
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-nfl-red via-[#012252] to-[#001530] p-px">
      <div className="relative rounded-2xl bg-gradient-to-br from-[#011a3a] to-[#000d1f] px-7 py-7 sm:px-9 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 hero-lines pointer-events-none opacity-30" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-nfl-blue/20 border border-nfl-blue/30">
            <DollarSign className="h-8 w-8 text-nfl-blue" />
          </div>

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nfl-blue mb-1">Grand Prize</p>
            <h3 className="text-3xl font-black text-white tracking-tight sm:text-4xl">$10,000 Cash</h3>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              Predict all 32 first-round picks at their exact pick number — win $10,000.
              No purchase required. Free to enter.
            </p>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Link
              href="/contest-rules#grand-prize"
              className="inline-flex items-center gap-2 rounded-xl bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-nfl-blue/90 transition-all hover:scale-[1.02] shadow-lg shadow-nfl-blue/20"
            >
              Prize rules
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom fine print */}
        <p className="relative mt-5 text-xs text-white/30 border-t border-white/10 pt-4">
          Perfect score (480/480 pts) required. 18+ only, void where prohibited. See{' '}
          <Link href="/contest-rules#grand-prize" className="underline hover:text-white/50">
            full eligibility rules
          </Link>
          . Winner responsible for taxes. No purchase necessary to win.
        </p>
      </div>
    </div>
  );
}
