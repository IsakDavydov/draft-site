'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import { TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';

interface PickSection {
  pickNum: string;
  teamName: string;
  heading: string;
  body: string;
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
    picks.push({ pickNum, teamName, heading, body });
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

      <div className="space-y-6">
        {picks.map((pick) => {
          const teamColor = TEAM_COLORS_BY_NAME[pick.teamName] || '#1f2937';
          return (
            <div
              key={pick.heading}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-1 ring-gray-900/5 overflow-hidden"
              style={{ borderLeftWidth: '4px', borderLeftColor: teamColor }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg px-2.5 text-sm font-bold text-white"
                  style={{ backgroundColor: teamColor }}
                >
                  {pick.pickNum}
                </span>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {pick.heading}
                </h2>
              </div>
              <div className="text-base leading-relaxed text-gray-800 sm:text-lg [&_strong]:text-gray-900">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {pick.body}
                </ReactMarkdown>
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
