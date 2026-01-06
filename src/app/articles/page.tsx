import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import { Calendar, User, Tag } from 'lucide-react';

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Articles
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Expert analysis, insights, and breaking news from around the NFL.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-gray-500">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="flex flex-col justify-between bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 p-8 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {article.category}
                    </span>
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
                <div className="mt-6 flex items-center gap-x-4 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(article.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {article.author}
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

