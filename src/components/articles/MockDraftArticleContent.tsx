'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';
import { TeamLogo } from '@/components/shared/TeamLogo';

interface PickSection {
  pickNum: string;
  teamName: string;
  heading: string;
  body: string;
  playerName?: string;
  position?: string;
  school?: string;
}

function parsePickDetails(heading: string): { playerName: string; position: string; school: string } | null {
  const match = heading.match(/^[\d]+\.\s+.+?\s+—\s+(.+)$/);
  if (!match) return null;
  const parts = match[1].split(',').map((p) => p.trim());
  if (parts.length < 3) return null;
  const school = parts[parts.length - 1];
  const position = parts[parts.length - 2];
  const playerName = parts.slice(0, -2).join(', ');
  return { playerName, position, school };
}

function parseMockDraftContent(content: string): { intro: string; picks: PickSection[]; footer?: string } {
  const sections = content.split(/^## /m);
  const introBlock = sections[0] || '';
  const intro = introBlock.split(/\n\n---\s*\n+/)[0].trim();

  const picks: PickSection[] = [];
  let footer: string | undefined;

  for (let i = 1; i < sections.length; i++) {
    let section = sections[i];
    const footerMatch = section.match(/\n\n---\s*\n\n\*([\s\S]+)\*$/);
    if (footerMatch) {
      footer = footerMatch[1];
      section = section.replace(/\n\n---\s*\n\n\*[\s\S]+\*$/, '');
    }

    const firstNewline = section.indexOf('\n');
    const heading = firstNewline > 0 ? section.slice(0, firstNewline).trim() : section.trim();
    const body = firstNewline > 0 ? section.slice(firstNewline).trim() : '';
    const match = heading.match(/^(\d+)\.\s+(.+?)\s+—\s+/);
    const pickNum = match ? match[1] : '';
    const teamName = match ? match[2] : '';
    const details = parsePickDetails(heading);
    picks.push({ pickNum, teamName, heading, body, ...details });
  }

  return { intro, picks, footer };
}

export function MockDraftArticleContent({ content, title }: { content: string; title: string }) {
  const { intro, picks, footer } = parseMockDraftContent(content);

  return (
    <div className="text-gray-700">
      {/* Hero banner */}
      <div className="relative -mx-6 -mt-6 mb-10 overflow-hidden rounded-2xl sm:-mx-8 sm:-mt-8 lg:rounded-3xl h-40 sm:h-52 flex items-center justify-center bg-cream-deep border border-gray-200">
        <div className="absolute inset-0 hero-lines pointer-events-none opacity-30" />
        <div className="relative text-center px-6">
          <p className="text-xs font-bold text-rose-500 uppercase tracking-[0.2em] mb-2">
            First Round · {picks.length} Picks
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Intro blurb */}
      {intro && (
        <div className="mb-10 border-l-2 border-rose-300 pl-4">
          <p className="text-lg leading-relaxed text-gray-700">
            {intro}
          </p>
        </div>
      )}

      {/* Pick cards */}
      <div className="space-y-4">
        {picks.map((pick) => {
          const teamColor = TEAM_COLORS_BY_NAME[pick.teamName] || '#6B7280';
          const details = pick.playerName && pick.school ? pick : null;
          return (
            <div
              key={pick.heading}
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm"
              style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
            >
              <div className="p-5 sm:p-6">
                {/* Top row: pick number + logo + player info */}
                <div className="flex items-center gap-4">
                  {/* Pick number badge */}
                  <span
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-sm font-extrabold text-white shadow-sm"
                    style={{ backgroundColor: teamColor }}
                  >
                    {pick.pickNum}
                  </span>

                  {/* Team logo on solid white background */}
                  <div className="flex-shrink-0 rounded-xl bg-white p-1.5 shadow-sm">
                    <TeamLogo teamName={pick.teamName} size={36} />
                  </div>

                  {/* Player / team details */}
                  <div className="min-w-0 flex-1">
                    {details ? (
                      <>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">
                          {pick.teamName}
                        </p>
                        <h2 className="mt-0.5 text-lg font-bold text-gray-900 sm:text-xl tracking-tight leading-tight">
                          {pick.playerName}
                        </h2>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-sm text-gray-600">{pick.school}</span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                            {pick.position}
                          </span>
                        </div>
                      </>
                    ) : (
                      <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {pick.heading}
                      </h2>
                    )}
                  </div>
                </div>

                {/* Analysis body */}
                {pick.body && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-base leading-relaxed text-gray-700 [&_strong]:text-gray-900 [&_p]:mt-2 [&_p:first-child]:mt-0">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {pick.body}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {footer && (
        <p className="mt-10 text-base italic text-gray-500">
          {footer}
        </p>
      )}
    </div>
  );
}
