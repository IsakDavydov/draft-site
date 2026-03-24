import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
  format?: string;
  /** When false, article is hidden from listings, sitemap, and returns 404 in production (still viewable in `next dev`). */
  published: boolean;
  content: string;
}

const articlesDirectory = path.join(process.cwd(), 'data/articles');

export function getAllArticles(): Article[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames
      .filter((name) => name.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          excerpt: data.excerpt || '',
          author: data.author || 'SAKFootball',
          category: data.category || 'General',
          format: data.format || undefined,
          published: data.published !== false,
          content,
        };
      })
      .filter((a) => a.published);

    return allArticlesData.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch {
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const article: Article = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      author: data.author || 'SAKFootball',
      category: data.category || 'General',
      format: data.format || undefined,
      published: data.published !== false,
      content,
    };

    if (!article.published && process.env.NODE_ENV === 'production') {
      return null;
    }

    return article;
  } catch (error) {
    return null;
  }
}

export function getLatestArticles(count: number = 5): Article[] {
  const allArticles = getAllArticles();
  return allArticles.slice(0, count);
}

