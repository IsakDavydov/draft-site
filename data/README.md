# Data Directory

This directory contains all the content for your football site. You can easily update content by editing these files.

## Articles

Articles are stored in `data/articles/` as Markdown files (`.md`). Each article should have frontmatter at the top:

```markdown
---
title: "Your Article Title"
date: "2024-12-12"
excerpt: "A brief description of the article"
author: "Your Name"
category: "Analysis"
---

Your article content goes here in Markdown format.
```

### Adding a New Article

1. Create a new `.md` file in `data/articles/`
2. Use the filename as the URL slug (e.g., `my-article.md` becomes `/articles/my-article`)
3. Add the frontmatter with all required fields
4. Write your content in Markdown below the frontmatter
5. Save and push to Git - the site will automatically update!

## Standings

Standings are stored in `data/standings/current.json`. Update this file with the latest NFL standings.

The structure includes:
- Conference (AFC/NFC)
- Divisions (East, North, South, West)
- Teams with wins, losses, ties, win percentage, and points

## Mock Drafts

Mock drafts are stored in `data/mock-drafts/` as JSON files. Name them descriptively (e.g., `week-15-2024.json`).

Each mock draft includes:
- Title and date
- Author
- Number of rounds
- List of picks with player, position, school, and notes

## Rankings

Rankings are stored in `data/rankings/` as JSON files. You can create different ranking files:
- `qb-rankings.json` - Quarterback rankings
- `team-rankings.json` - Team power rankings
- `rb-rankings.json` - Running back rankings
- etc.

Each ranking file includes:
- Title and last updated date
- Category
- List of ranked items with rank, name, tier, and notes

## Updating Content

1. Edit the appropriate file in this directory
2. Commit and push to Git
3. Vercel will automatically rebuild and deploy your site!

No database needed - everything is file-based for easy updates.

