import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-x-2 text-sm text-gray-500 mb-4">
            <span className="inline-flex items-center gap-1">
              <Tag className="h-4 w-4" />
              {article.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-x-6 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="h-4 w-4" />
              {article.author}
            </span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-nfl-red prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-nfl-red prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

