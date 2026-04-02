import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { MockDraftArticleContent } from '@/components/articles/MockDraftArticleContent';

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
    <div className="bg-sak-darker">
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:px-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-brand-red mb-8 transition-colors"
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
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
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

        {article.format === 'mock-draft' ? (
          <MockDraftArticleContent content={article.content} title={article.title} />
        ) : (
          <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-brand-red prose-code:bg-sak-dark prose-code:px-1 prose-code:py-0.5 prose-code:rounded [&_p]:text-gray-300 [&_li]:text-gray-300">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>
        )}
      </article>
    </div>
  );
}

