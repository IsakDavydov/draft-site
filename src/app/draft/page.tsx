import { Suspense } from 'react';
import Link from 'next/link';
import { ProspectDirectory } from '@/components/draft/ProspectDirectory';
import { BigBoard } from '@/components/draft/BigBoard';
import { FileText, Zap, Target } from 'lucide-react';

export default function DraftPage() {
  return (
    <div className="bg-sak-darker min-h-screen">

      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sak-dark via-sak-darker to-sak-dark">
        <div className="absolute inset-0 hero-lines pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
                <Target className="h-3 w-3" />
                2026 NFL Draft
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Prospect Big Board
              </h1>
              <p className="mt-2 text-base leading-relaxed text-gray-300/90">
                75 top prospects ranked and profiled. Browse by position, stats, and draft fits.
              </p>
              <div className="mt-3">
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Use these in your mock draft →
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/articles/pre-combine-mock-draft-2026"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <FileText className="h-4 w-4 text-white" />
                Pre-Combine Mock Draft
              </Link>
              <Link
                href="/articles/post-super-bowl-mock-draft-2026"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:bg-white/10 transition-colors"
              >
                <FileText className="h-4 w-4 text-gray-400" />
                Post-Super Bowl Mock Draft
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* Prospect Directory */}
          <div className="rounded-2xl border border-white/[0.06] bg-sak-card shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10">
                <Target className="h-4 w-4 text-brand-red" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Prospect Directory</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="text-sm text-gray-400 py-8 text-center">Loading prospects...</div>}>
                <ProspectDirectory />
              </Suspense>
            </div>
          </div>

          {/* Big Board */}
          <div className="rounded-2xl border border-white/[0.06] bg-sak-card shadow-card overflow-hidden">
            <div className="px-6 py-5 border-b border-white/[0.06] flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10">
                <Zap className="h-4 w-4 text-brand-red" />
              </div>
              <h2 className="font-display text-lg font-bold text-white">Big Board Rankings</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="text-sm text-gray-400 py-8 text-center">Loading big board...</div>}>
                <BigBoard />
              </Suspense>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
