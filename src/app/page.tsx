import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Target, Trophy, BookOpen, GraduationCap, Zap } from 'lucide-react';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { WeeklyTopBanner } from '@/components/shared/WeeklyTopBanner';
import { getLatestArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const latestArticles = getLatestArticles(3);
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-visible bg-gradient-to-br from-nfl-red via-nfl-blue to-nfl-purple">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 xl:flex xl:px-8 xl:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 xl:mx-0 xl:max-w-xl xl:pt-8">
            <div className="mt-24 sm:mt-32 xl:mt-16">
              <Link
                href="/predict"
                className="inline-flex items-center gap-2 rounded-full bg-nfl-gold/20 px-4 py-2 text-sm font-semibold leading-6 text-white ring-2 ring-inset ring-nfl-gold hover:bg-nfl-gold/30 transition-colors"
              >
                <Zap className="h-4 w-4" />
                2026 Draft Prediction Challenge — Submit your picks
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Predict the
              <span className="block text-nfl-gold">2026 NFL Draft</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Submit your first-round picks and compete on the leaderboard. Create groups with friends and see how your predictions hold up when draft day arrives. Plus season analysis, fantasy rankings, and expert picks.
            </p>
            <div className="mt-6">
              <DraftCountdown variant="full" />
            </div>
            <div className="mt-10">
              <Link
                href="/predict"
                className="inline-flex items-center gap-2 rounded-lg bg-nfl-gold px-5 py-3 text-base font-bold text-gray-900 shadow-lg hover:bg-nfl-gold/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                Submit Your Picks →
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 min-w-0 flex max-w-2xl sm:mt-24 xl:ml-10 xl:mr-0 xl:mt-0 xl:max-w-xl xl:flex-none xl:self-start">
            <div className="w-full min-w-0 max-w-3xl sm:max-w-5xl xl:max-w-none">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-nfl-gold rounded-full flex items-center justify-center mb-4">
                      <Trophy className="h-6 w-6 text-nfl-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Season Analysis</h3>
                    <p className="text-gray-300 text-sm">Standings, playoff odds, and team insights</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-nfl-gold rounded-full flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-nfl-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Expert Picks</h3>
                    <p className="text-gray-300 text-sm">Weekly picks with confidence ratings</p>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-nfl-gold rounded-full flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-nfl-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Fantasy Rankings</h3>
                    <p className="text-gray-300 text-sm">Position-by-position rankings and tiers</p>
                  </div>
                </div>
                <Link
                  href="/predict"
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-nfl-gold rounded-full flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-nfl-red" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Draft</h3>
                    <p className="text-gray-300 text-sm">Predict the first round, prospects, and mock drafts</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draft Prediction Challenge Promo */}
      <div className="relative overflow-hidden bg-gradient-to-r from-nfl-blue via-nfl-red/90 to-nfl-blue">
        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="mb-8">
            <WeeklyTopBanner variant="dark" />
          </div>
          <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:text-left lg:gap-16">
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-wider text-nfl-gold">Free to play</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to predict the first round?
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-white/95 leading-relaxed">
                Pick all 32 first-round selections for the 2026 NFL Draft. Compete on the global leaderboard, create private groups with friends, and see how your predictions stack up when draft day arrives.
              </p>
            </div>
            <div className="mt-8 flex-shrink-0 lg:mt-0">
              <Link
                href="/predict"
                className="inline-flex items-center gap-2 rounded-xl bg-nfl-gold px-8 py-4 text-lg font-bold text-gray-900 shadow-xl hover:bg-nfl-gold/90 transition-all hover:scale-105"
              >
                Submit Your Picks
                <ArrowRight className="h-6 w-6" />
              </Link>
              <p className="mt-3 text-sm text-white/80">Sign in with email — it&apos;s quick</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sections Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need for NFL Success
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            From season analysis to fantasy domination, we&apos;ve got you covered with expert insights and data-driven analysis.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Season Section */}
          <div className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nfl-red">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Season</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Standings, playoff odds, and team analysis. Track your favorite teams throughout the season.
            </p>
            <div className="mt-6">
              <Link
                href="/season"
                className="text-sm font-semibold leading-6 text-nfl-red group-hover:text-nfl-blue transition-colors"
              >
                View Season <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Draft Section */}
          <div className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nfl-blue">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Draft</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Prospect database, big board rankings, and weekly mock drafts. Predict the first round and compete on the leaderboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/predict"
                className="text-sm font-semibold leading-6 text-nfl-red group-hover:text-nfl-blue transition-colors"
              >
                Predict the Draft →
              </Link>
              <Link
                href="/draft"
                className="text-sm font-semibold leading-6 text-nfl-blue group-hover:text-nfl-red transition-colors"
              >
                View Prospects →
              </Link>
            </div>
          </div>

          {/* Picks Section */}
          <div className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nfl-green">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Picks</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Weekly picks with confidence ratings, unit tracking, and ROI analysis. Expert analysis for informed decisions.
            </p>
            <div className="mt-6">
              <Link
                href="/picks"
                className="text-sm font-semibold leading-6 text-nfl-green group-hover:text-nfl-blue transition-colors"
              >
                View Picks <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Fantasy Section */}
          <div className="group relative bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-nfl-purple">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold leading-6 text-gray-900">Fantasy</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-600">
              Position rankings, tier lists, and scoring system toggles. Dominate your fantasy league with expert insights.
            </p>
            <div className="mt-6">
              <Link
                href="/fantasy"
                className="text-sm font-semibold leading-6 text-nfl-purple group-hover:text-nfl-red transition-colors"
              >
                View Fantasy <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      {latestArticles.length > 0 && (
        <div className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Latest Articles
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Expert analysis, insights, and breaking news from around the NFL.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {latestArticles.map((article) => (
                <article
                  key={article.slug}
                  className="flex flex-col justify-between bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4">
                      <BookOpen className="h-4 w-4" />
                      <span>{article.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-3">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="hover:text-nfl-red transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    {article.excerpt && (
                      <p className="mt-2 text-sm leading-6 text-gray-600 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatDate(article.date)}
                    </span>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-sm font-semibold text-nfl-red hover:text-nfl-blue transition-colors"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 rounded-md bg-nfl-red px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-nfl-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nfl-red transition-colors"
              >
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Live Callouts Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Live Updates & Breaking News
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stay informed with real-time updates, injury reports, and breaking news from around the NFL.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
              <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <div className="h-2 w-2 rounded-full bg-red-600"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Live Games</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Real-time scores, stats, and game updates as they happen.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
              <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                  <div className="h-2 w-2 rounded-full bg-yellow-600"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Injury Updates</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Latest injury reports and player status updates.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8">
              <div className="flex items-center gap-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Trade Rumors</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">
                Breaking news on trades, signings, and roster moves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
