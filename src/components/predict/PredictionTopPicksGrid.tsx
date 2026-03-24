'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CollegeLogo } from '@/components/shared/CollegeLogo';
import { TeamLogo } from '@/components/shared/TeamLogo';

export type TopPickRow = {
  pick_number: number;
  team: string;
  prospectName: string;
  position: string;
  school: string;
};

function PickCard({ pick, showNflTeamLogo }: { pick: TopPickRow; showNflTeamLogo: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/90 px-3 py-2.5 shadow-sm">
      <div className="flex gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nfl-blue/10 text-xs font-bold text-nfl-blue"
          aria-label={`Pick ${pick.pick_number}`}
        >
          {pick.pick_number}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start gap-2">
            <CollegeLogo school={pick.school} size={32} className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-tight text-gray-900">{pick.prospectName}</div>
              <div className="mt-0.5 text-xs text-gray-600">
                {pick.position}
                {pick.school ? ` · ${pick.school}` : ''}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pl-0.5">
            {showNflTeamLogo && (
              <TeamLogo teamName={pick.team} size={22} className="ring-1 ring-gray-200/80" />
            )}
            <span className="text-xs text-gray-600">
              <span className="text-gray-400">To </span>
              <span className="font-medium text-gray-800">{pick.team}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TopPicksGridContent({
  picks,
  showNflTeamLogo,
}: {
  picks: TopPickRow[];
  showNflTeamLogo: boolean;
}) {
  const sorted = [...picks].sort((a, b) => a.pick_number - b.pick_number);
  const left = sorted.filter((p) => p.pick_number <= 5);
  const right = sorted.filter((p) => p.pick_number > 5);

  if (sorted.length === 0) {
    return <p className="mt-6 text-gray-600">No picks saved for picks 1–10 yet.</p>;
  }

  const twoCols = left.length > 0 && right.length > 0;

  return (
    <div
      className={`mt-6 grid gap-6 sm:gap-5 ${twoCols ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 max-w-xl'}`}
    >
      {left.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Picks 1–5</h2>
          <div className="space-y-3">
            {left.map((pick) => (
              <PickCard key={pick.pick_number} pick={pick} showNflTeamLogo={showNflTeamLogo} />
            ))}
          </div>
        </div>
      )}
      {right.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Picks 6–10</h2>
          <div className="space-y-3">
            {right.map((pick) => (
              <PickCard key={pick.pick_number} pick={pick} showNflTeamLogo={showNflTeamLogo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Hide NFL team logos when `?ref=leaderboard` is in the URL (leaderboard / home top scorers links)
 * or when the server detected that ref. Client reads the URL so hydration matches the address bar.
 */
function TopPicksGridWithUrl({
  picks,
  serverSaysLeaderboard,
}: {
  picks: TopPickRow[];
  serverSaysLeaderboard: boolean;
}) {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const urlSaysLeaderboard = ref === 'leaderboard';
  const hideTeamLogos = serverSaysLeaderboard || urlSaysLeaderboard;
  const showNflTeamLogo = !hideTeamLogos;

  return <TopPicksGridContent picks={picks} showNflTeamLogo={showNflTeamLogo} />;
}

export function PredictionTopPicksGrid({
  picks,
  serverSaysLeaderboard,
}: {
  picks: TopPickRow[];
  /** From server-side `searchParams` (may be empty on some SSR paths; client URL is the tie-breaker). */
  serverSaysLeaderboard: boolean;
}) {
  const fallbackShowLogos = !serverSaysLeaderboard;

  return (
    <Suspense
      fallback={<TopPicksGridContent picks={picks} showNflTeamLogo={fallbackShowLogos} />}
    >
      <TopPicksGridWithUrl picks={picks} serverSaysLeaderboard={serverSaysLeaderboard} />
    </Suspense>
  );
}
