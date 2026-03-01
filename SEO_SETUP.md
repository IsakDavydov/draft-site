# SEO Setup for SAK Football

This guide explains what's in place and what you need to do to rank for "SAK Football" and "mock draft sites" on Google.

## What's Already Done

1. **Metadata** – Title and description updated with "SAK Football", "mock draft", and "mock draft site"
2. **Keywords** – Meta keywords added for NFL mock draft, draft predictions, etc.
3. **Open Graph & Twitter** – Social sharing tags for links and previews
4. **Sitemap** – `/sitemap.xml` auto-generated with main pages and articles
5. **robots.txt** – Generated at `/robots.txt` so search engines can crawl and use the sitemap
6. **JSON-LD** – Organization and WebSite structured data for rich results

## What You Need To Do

### 1. Google Search Console

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://sakfootball.com`
3. Verify ownership:
   - **HTML tag**: Get your verification code, then update `src/app/layout.tsx` – replace `'your-google-verification-code'` with your actual code in the `verification.google` field
   - Or use DNS verification if you prefer
4. Submit your sitemap: `https://sakfootball.com/sitemap.xml`
5. Use “URL Inspection” to request indexing of your homepage and main pages

### 2. Content Tips

- Add more articles with "mock draft" in the title (e.g. "2026 NFL Mock Draft: Pre-Combine")
- Use "SAK Football" and "mock draft" where it fits in body text and headings
- Keep publishing draft-related content – more pages give Google more signals

### 3. Links

- Try to get backlinks from NFL/draft-related sites, blogs, or forums
- Share links on social media and anywhere draft content is discussed

### 4. Be Patient

- Indexing and ranking take time (often weeks to months)
- Check Search Console for crawl stats and any issues
