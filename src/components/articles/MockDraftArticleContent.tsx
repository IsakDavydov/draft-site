'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
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

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(31, 41, 55, ${alpha})`;
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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

export function MockDraftArticleContent({ content }: { content: string }) {
  const { intro, picks, footer } = parseMockDraftContent(content);

  return (
    <div className="text-gray-900">
      <div className="relative -mx-6 -mt-6 mb-10 overflow-hidden rounded-2xl sm:-mx-8 sm:-mt-8 lg:rounded-3xl">
        <Image
          src="/draft-header.png"
          alt="NFL Draft 2026"
          width={1200}
          height={300}
          className="h-40 w-full object-cover object-center sm:h-52"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {intro && (
        <div className="mb-10">
          <p className="text-lg leading-relaxed text-gray-800">
            {intro}
          </p>
        </div>
      )}

      <div className="space-y-5">
        {picks.map((pick) => {
          const teamColor = TEAM_COLORS_BY_NAME[pick.teamName] || '#1f2937';
          const details = pick.playerName && pick.school ? pick : null;
          return (
            <div
              key={pick.heading}
              className="relative rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm"
              style={{
                borderLeftWidth: '5px',
                borderLeftColor: teamColor,
                background: `linear-gradient(135deg, ${hexToRgba(teamColor, 0.06)} 0%, ${hexToRgba(teamColor, 0.02)} 40%, transparent 100%)`,
              }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold text-white shadow-sm"
                      style={{ backgroundColor: teamColor }}
                    >
                      {pick.pickNum}
                    </span>
                    <TeamLogo teamName={pick.teamName} size={40} />
                  </div>
                  <div className="min-w-0 flex-1">
                    {details ? (
                      <>
                        <p
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: teamColor }}
                        >
                          {pick.teamName}
                        </p>
                        <h2 className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl tracking-tight">
                          {pick.playerName}
                        </h2>
                        <p className="mt-2 text-sm font-medium text-gray-500">
                          {pick.school}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {pick.position}
                        </p>
                      </>
                    ) : (
                      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {pick.heading}
                      </h2>
                    )}
                  </div>
                </div>
                {pick.body && (
                  <div className="mt-5 pt-5 border-t border-gray-200/60 text-base leading-relaxed text-gray-700 sm:text-lg [&_strong]:text-gray-900 [&_p]:mt-2 [&_p:first-child]:mt-0">
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
        <p className="mt-10 text-base italic text-gray-700">
          {footer}
        </p>
      )}
    </div>
  );
}
