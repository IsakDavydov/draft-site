import Link from 'next/link';
import {
  ArrowRight,
  Users,
  Target,
  Trophy,
  BookOpen,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { LeaderboardPreviewSection } from '@/components/shared/LeaderboardPreviewSection';
import { PrizeBanner } from '@/components/shared/PrizeBanner';

export default function HomePage() {
  return (
    <div className="bg-cream">

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative isolate overflow-hidden bg-cream">
        {/* Horizontal line texture */}
        <div className="absolute inset-0 hero-lines-light pointer-events-none opacity-60" />
        {/* Single subtle rose glow — top right only */}
        <div className="absolute -top-40 -right-20 h-[480px] w-[480px] rounded-full bg-rose-100/50 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-12 sm:pb-32 xl:flex xl:items-center xl:gap-16 xl:px-8 xl:py-20">

          {/* Left: headline, countdown, CTAs */}
          <div className="mx-auto max-w-2xl flex-shrink-0 xl:mx-0 xl:max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-rose-500 ring-1 ring-inset ring-rose-200">
              <Zap className="h-3 w-3" />
              2026 Draft Prediction Challenge
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl">
              Predict the
              <span className="block text-rose-500">2026 NFL Draft</span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              Pick all 32 first-round selections before draft night. Compete on the
              global leaderboard, create private groups with friends, and find out
              who really knows the draft.
            </p>

            <div className="mt-7">
              <DraftCountdown variant="hero" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/predict"
                className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 transition-all hover:scale-[1.02]"
              >
                <Zap className="h-5 w-5" />
                Submit Your Picks
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <Trophy className="h-4 w-4 text-gray-400" />
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Right: How It Works */}
          <div className="mx-auto mt-16 w-full max-w-lg flex-1 xl:mt-0 xl:max-w-none">
            <div className="rounded-2xl bg-white border border-gray-200 p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  How it works
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-gray-200 to-transparent" />
              </div>

              <div className="space-y-7">
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Build your mock draft</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      Choose one prospect for each of the 32 first-round picks from
                      our pool of 75 top prospects. Start from an expert template or
                      build from scratch.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Live scoring on draft night</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      Scores update with every pick. Exact pick = 15 pts, off by one slot = 5 pts.
                      Watch the leaderboard shift in real time. Maximum 480 pts — a perfect score wins $10,000.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Compete &amp; compare</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                      Climb the global leaderboard or create a private group to challenge
                      your friends, fantasy league, or office — one invite code, that&apos;s it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-7">
                <Link
                  href="/predict"
                  className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-rose-600 transition-all hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4" />
                  Start My Mock Draft
                </Link>
                <Link
                  href="/draft"
                  className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Target className="h-4 w-4 text-gray-400" />
                  Browse Prospects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Prize Banner ──────────────────────────────────────────────────── */}
      <div className="relative border-t border-gray-100 bg-cream-deep">
        <div className="absolute inset-0 hero-lines-light pointer-events-none opacity-50" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
              Grand Prize
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Win $10,000 for a perfect draft
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-500">
              Predict all 32 first-round picks at their exact slot. No purchase necessary — free to enter.
            </p>
          </div>
          <PrizeBanner variant="card" />
        </div>
      </div>

      {/* ─── Leaderboard Preview ───────────────────────────────────────────── */}
      <div className="relative bg-cream border-t border-gray-100">
        <div className="absolute inset-0 hero-lines-light pointer-events-none opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mb-10 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
                Pre-Draft Leaderboard
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                See who&apos;s leading the challenge
              </h2>
              <p className="mt-3 max-w-2xl text-base text-gray-500">
                Pre-draft scores update daily based on pick quality and team fit. On draft night,
                real scores go live with the very first pick and update after every selection.
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="mt-6 lg:mt-0 inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Full Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <LeaderboardPreviewSection />
        </div>
      </div>

      {/* ─── Challenge Your Friends ────────────────────────────────────────── */}
      <div className="relative bg-cream-deep border-t border-gray-100">
        <div className="absolute inset-0 hero-lines-light pointer-events-none opacity-50" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">

            {/* Left: copy */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
                Private Groups
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Challenge your friends
              </h2>
              <p className="mt-4 text-base leading-relaxed text-gray-500">
                Create a private group, share the invite code, and see who really
                knows the draft. Perfect for friend groups, office pools, or fantasy leagues.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Free to create — no limit on group size',
                  'Private leaderboard visible only to your group',
                  'One invite code — no extra setup needed',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/groups"
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-rose-600 transition-all hover:scale-[1.02]"
                >
                  <Users className="h-4 w-4" />
                  Create a Group
                </Link>
                <Link
                  href="/groups"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  Join with a Code
                </Link>
              </div>
            </div>

            {/* Right: steps card */}
            <div className="mt-12 lg:mt-0">
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="divide-y divide-gray-100">
                  <div className="flex gap-4 p-7">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                      1
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-gray-900">Submit your mock draft</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                        Pick a prospect for all 32 first-round slots. Takes about 5 minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-7">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                      2
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-gray-900">Create a group &amp; invite your crew</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                        Share one invite code — anyone who joins sees the same private leaderboard.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-7">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm font-extrabold text-rose-500 font-display">
                      3
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-gray-900">Watch scores update live</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                        On draft night, every pick updates the leaderboard in real time. See who nailed it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Draft Tools ───────────────────────────────────────────────────── */}
      <div className="relative bg-cream border-t border-gray-100">
        <div className="absolute inset-0 hero-lines-light pointer-events-none opacity-40" />
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-2">
              Draft Tools
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to predict the draft
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Prospect Big Board */}
            <Link
              href="/draft"
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-7 hover:border-rose-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 flex-shrink-0">
                  <Target className="h-5 w-5 text-rose-500" />
                </div>
                <h3 className="font-display text-base font-bold text-gray-900">Prospect Big Board</h3>
              </div>
              <p className="text-sm leading-6 text-gray-500 flex-1">
                75 top prospects ranked and profiled. Filter by position, browse stats,
                and see where each player fits in the draft order.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-500 group-hover:text-rose-600 transition-colors">
                Browse prospects <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Expert Mock Drafts */}
            <Link
              href="/articles"
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-7 hover:border-rose-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-rose-500" />
                </div>
                <h3 className="font-display text-base font-bold text-gray-900">Expert Mock Drafts</h3>
              </div>
              <p className="text-sm leading-6 text-gray-500 flex-1">
                Updated post-combine and post-free agency mock drafts to help you
                calibrate your picks against expert consensus.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-500 group-hover:text-rose-600 transition-colors">
                View mock drafts <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            {/* Leaderboard */}
            <Link
              href="/leaderboard"
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-7 hover:border-rose-200 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 flex-shrink-0">
                  <Trophy className="h-5 w-5 text-rose-500" />
                </div>
                <h3 className="font-display text-base font-bold text-gray-900">Leaderboard &amp; Groups</h3>
              </div>
              <p className="text-sm leading-6 text-gray-500 flex-1">
                See where you stand globally or head-to-head in a private group.
                Scores update live — pre-draft based on pick quality, then pick-by-pick on draft night.
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-500 group-hover:text-rose-600 transition-colors">
                View standings <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
