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

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-nfl-red via-[#012252] to-[#001530]">
        {/* Yard-line pattern overlay */}
        <div className="absolute inset-0 hero-lines pointer-events-none" />
        {/* Radial glow top-right */}
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-nfl-blue/5 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-12 sm:pb-36 xl:flex xl:items-center xl:gap-16 xl:px-8 xl:py-20">

          {/* Left: headline, countdown, CTAs */}
          <div className="mx-auto max-w-2xl flex-shrink-0 xl:mx-0 xl:max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
              <Zap className="h-3 w-3" />
              2026 Draft Prediction Challenge
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl xl:text-7xl">
              Predict the
              <span className="block text-nfl-blue">2026 NFL Draft</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-300/90">
              Pick all 32 first-round selections before draft night. Compete on the
              global leaderboard, create private groups with friends, and find out
              who really knows the draft.
            </p>

            <div className="mt-6">
              <DraftCountdown variant="hero" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/predict"
                className="inline-flex items-center gap-2 rounded-lg bg-nfl-blue px-6 py-3 text-base font-bold text-white shadow-lg shadow-nfl-blue/25 hover:bg-nfl-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nfl-blue transition-all hover:scale-[1.03]"
              >
                <Zap className="h-5 w-5" />
                Submit Your Picks
              </Link>
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <Trophy className="h-4 w-4 text-white/60" />
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Right: How It Works card */}
          <div className="mx-auto mt-16 w-full max-w-lg flex-1 xl:mt-0 xl:max-w-none">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-md sm:p-9 shadow-2xl">
              <div className="flex items-center gap-2 mb-7">
                <div className="h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  How it works
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-white/30 to-transparent" />
              </div>

              <div className="space-y-7">
                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-nfl-blue text-sm font-extrabold text-white font-display">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-white">Build your mock draft</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      Choose one prospect for each of the 32 first-round picks from
                      our pool of 75 top prospects. Start from an expert template or
                      build from scratch.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-nfl-blue text-sm font-extrabold text-white font-display">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-white">Scores revealed on draft night</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      Exact pick = 15 pts. Off by one slot = 5 pts. The closer you are
                      to the real draft order, the better your score. Maximum 480 pts.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-nfl-blue text-sm font-extrabold text-white font-display">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-white">Compete &amp; compare</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      Climb the global leaderboard or create a private group to challenge
                      your friends, fantasy league, or office — one invite code, that&apos;s it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-7">
                <Link
                  href="/predict"
                  className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-lg bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-nfl-blue/90 transition-all hover:scale-[1.02]"
                >
                  <Zap className="h-4 w-4" />
                  Start My Mock Draft
                </Link>
                <Link
                  href="/draft"
                  className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <Target className="h-4 w-4" />
                  Browse Prospects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Leaderboard Preview ───────────────────────────────────────────── */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mb-10 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-nfl-blue">
                Pre-Draft Leaderboard
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                See who&apos;s leading the challenge
              </h2>
              <p className="mt-3 max-w-2xl text-base text-gray-500">
                Scores update daily based on how well your picks match expert rankings
                and team needs. Final standings lock in the moment the real draft starts.
              </p>
            </div>
            <Link
              href="/leaderboard"
              className="mt-6 lg:mt-0 inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition-colors"
            >
              Full Leaderboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <LeaderboardPreviewSection />
        </div>
      </div>

      {/* ─── Challenge Your Friends ────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-nfl-red">
        {/* Yard-line pattern — matches hero headers */}
        <div className="absolute inset-0 hero-lines pointer-events-none opacity-40" />
        {/* Thin red accent stripe at top */}
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-nfl-blue/0 via-nfl-blue to-nfl-blue/0" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">

            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20 mb-5">
                <Users className="h-3 w-3" />
                Private Groups
              </div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Challenge your friends
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Create a private group, share the invite code, and see who really
                knows the draft. Perfect for friend groups, office pools, or fantasy leagues.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Free to create — no limit on group size',
                  'Private leaderboard visible only to your group',
                  'One invite code — no extra setup needed',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 text-nfl-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: action card */}
            <div className="mt-10 lg:mt-0">
              <div className="rounded-2xl bg-white/[0.07] border border-white/10 overflow-hidden">

                {/* Steps */}
                <div className="p-7 space-y-0 divide-y divide-white/10">
                  <div className="flex gap-4 pb-5">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-nfl-blue text-sm font-extrabold text-white font-display">
                      1
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-white">Submit your mock draft</p>
                      <p className="mt-1 text-sm text-white/60">
                        Pick a prospect for all 32 first-round slots. Takes about 5 minutes.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-5">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 text-sm font-extrabold text-white font-display">
                      2
                    </span>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold text-white">Create a group &amp; invite your crew</p>
                      <p className="mt-1 text-sm text-white/60">
                        Share one invite code — anyone who joins sees the same private leaderboard.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="px-7 py-5 bg-black/20 border-t border-white/10 flex flex-wrap gap-3">
                  <Link
                    href="/groups"
                    className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-xl bg-nfl-blue px-5 py-2.5 text-sm font-bold text-white hover:bg-nfl-blue/90 transition-all hover:scale-[1.02] shadow-md"
                  >
                    <Users className="h-4 w-4" />
                    Create a Group
                  </Link>
                  <Link
                    href="/groups"
                    className="flex-1 min-w-[9rem] inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                  >
                    Join with a Code
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── Draft Tools ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            More Draft Tools
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to predict the draft
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Prospect Big Board */}
          <Link
            href="/draft"
            className="group flex flex-col bg-white rounded-2xl shadow-card ring-1 ring-gray-900/5 p-7 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-nfl-blue"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nfl-blue/10">
                <Target className="h-5 w-5 text-nfl-blue" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">Prospect Big Board</h3>
            </div>
            <p className="text-sm leading-6 text-gray-500 flex-1">
              75 top prospects ranked and profiled. Filter by position, browse stats,
              and see where each player fits in the draft order.
            </p>
            <span className="mt-5 text-sm font-semibold text-nfl-blue group-hover:text-nfl-red transition-colors">
              Browse prospects →
            </span>
          </Link>

          {/* Expert Mock Drafts */}
          <Link
            href="/draft"
            className="group flex flex-col bg-white rounded-2xl shadow-card ring-1 ring-gray-900/5 p-7 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-nfl-red"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nfl-red/10">
                <BookOpen className="h-5 w-5 text-nfl-red" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">Expert Mock Drafts</h3>
            </div>
            <p className="text-sm leading-6 text-gray-500 flex-1">
              Updated post-combine and post-free agency mock drafts to help you
              calibrate your picks against expert consensus.
            </p>
            <span className="mt-5 text-sm font-semibold text-nfl-red group-hover:text-nfl-blue transition-colors">
              View mock drafts →
            </span>
          </Link>

          {/* Groups & Leaderboard */}
          <Link
            href="/leaderboard"
            className="group flex flex-col bg-white rounded-2xl shadow-card ring-1 ring-gray-900/5 p-7 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-nfl-red"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-nfl-red/10">
                <Trophy className="h-5 w-5 text-nfl-red" />
              </div>
              <h3 className="font-display text-base font-bold text-gray-900">Leaderboard & Groups</h3>
            </div>
            <p className="text-sm leading-6 text-gray-500 flex-1">
              See where you stand globally or head-to-head in a private group.
              Scores update live before the draft, then lock in on draft night.
            </p>
            <span className="mt-5 text-sm font-semibold text-nfl-red group-hover:text-nfl-blue transition-colors">
              View standings →
            </span>
          </Link>
        </div>
      </div>

    </div>
  );
}
