import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nfl-blue mb-3">
              NFL Draft Analysis
            </p>
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Articles
            </h1>
            <p className="mt-4 text-base leading-7 text-gray-500">
              Expert analysis, insights, and breaking news from around the NFL.
            </p>
            <div className="mt-6 mx-auto h-px w-16 bg-gradient-to-r from-nfl-red to-nfl-blue opacity-40" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {articles.length === 0 ? (
          <div className="mt-8 text-center py-20">
            <p className="text-gray-400 text-sm">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group relative flex flex-col bg-white rounded-2xl shadow-sm border-l-4 border-l-nfl-red hover:border-l-nfl-blue hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Category badge */}
                <div className="px-6 pt-5">
                  <span className="inline-block rounded-full bg-nfl-blue/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-nfl-blue">
                    {article.category}
                  </span>
                </div>

                {/* Title + excerpt */}
                <div className="flex-1 px-6 pt-3 pb-4">
                  <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-nfl-red transition-colors">
                    <Link href={`/articles/${article.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {article.title}
                    </Link>
                  </h3>
                  {article.excerpt && (
                    <p className="mt-2 text-sm leading-6 text-gray-500 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 pb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(article.date)}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </span>
                  </div>
                  <span className="relative text-xs font-semibold text-nfl-blue opacity-0 group-hover:opacity-100 transition-opacity">
                    Read →
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
