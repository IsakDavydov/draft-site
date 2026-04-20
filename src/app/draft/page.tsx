import { Suspense } from 'react';
import Link from 'next/link';
import { ProspectDirectory } from '@/components/draft/ProspectDirectory';
import { BigBoard } from '@/components/draft/BigBoard';
import { FileText, Zap, Target } from 'lucide-react';

export default function DraftPage() {
  return (
    <div className="bg-cream-deep min-h-screen">

      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-rose-500 ring-1 ring-inset ring-rose-200">
                <Target className="h-3 w-3" />
                2026 NFL Draft
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Prospect Big Board
              </h1>
              <p className="mt-2 text-base leading-relaxed text-gray-600">
                75 top prospects ranked and profiled. Browse by position, stats, and draft fits.
              </p>
              <div className="mt-3">
                <Link
                  href="/predict"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Use these in your mock draft →
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                href="/articles/mock-draft-3-0"
                className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <FileText className="h-4 w-4 text-gray-500" />
                Mock Draft 3.0
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">

          {/* Prospect Directory */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
                <Target className="h-4 w-4 text-rose-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-gray-900">Prospect Directory</h2>
            </div>
            <div className="p-6">
              <Suspense fallback={<div className="text-sm text-gray-400 py-8 text-center">Loading prospects...</div>}>
                <ProspectDirectory />
              </Suspense>
            </div>
          </div>

          {/* Big Board */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50">
                <Zap className="h-4 w-4 text-rose-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-gray-900">Big Board Rankings</h2>
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
