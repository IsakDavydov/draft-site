import Link from 'next/link';
import { ArrowRight, TrendingUp, Users, Target, Trophy, BookOpen } from 'lucide-react';
import { getLatestArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const latestArticles = getLatestArticles(3);
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-nfl-red via-nfl-blue to-nfl-purple">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold leading-6 text-white ring-1 ring-inset ring-white/20">
                  NFL 2026 Season
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-white">
                  <span>Live coverage</span>
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Your Ultimate NFL
              <span className="block text-nfl-gold">Command Center</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Comprehensive coverage of the NFL season, fantasy insights, draft analysis, and expert picks. 
              Everything you need to dominate your fantasy league and stay ahead of the game.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/season"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Standings
              </Link>
              <Link
                href="/fantasy"
                className="text-sm font-semibold leading-6 text-white"
              >
                Fantasy Rankings <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              </div>
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
              Prospect database, big board rankings, and weekly mock drafts. Stay ahead of the draft season.
            </p>
            <div className="mt-6">
              <Link
                href="/draft"
                className="text-sm font-semibold leading-6 text-nfl-blue group-hover:text-nfl-red transition-colors"
              >
                View Draft <span aria-hidden="true">→</span>
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
