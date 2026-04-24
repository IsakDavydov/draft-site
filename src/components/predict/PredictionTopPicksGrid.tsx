'use client';

import { cn } from '@/lib/utils';
import { CollegeLogo } from '@/components/shared/CollegeLogo';

export type TopPickRow = {
  pick_number: number;
  team: string;
  prospectName: string;
  position: string;
  school: string;
};

const HALF = 16;

function PickCard({ pick }: { pick: TopPickRow }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm">
      <div className="flex gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-xs font-bold text-rose-500"
          aria-label={`Pick ${pick.pick_number}`}
        >
          {pick.pick_number}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start gap-2">
            <CollegeLogo school={pick.school} size={32} className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-tight text-gray-900">{pick.prospectName}</div>
              <div className="mt-0.5 text-xs text-gray-400">
                {pick.position}
                {pick.school ? ` · ${pick.school}` : ''}
              </div>
            </div>
          </div>
          <p className="pl-0.5 text-xs text-gray-400">
            <span className="text-gray-400">To </span>
            <span className="font-medium text-gray-700">{pick.team}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TopPicksGridContent({ picks }: { picks: TopPickRow[] }) {
  const sorted = [...picks].sort((a, b) => a.pick_number - b.pick_number);
  const left = sorted.filter((p) => p.pick_number <= HALF);
  const right = sorted.filter((p) => p.pick_number > HALF);

  if (sorted.length === 0) {
    return <p className="mt-6 text-gray-400">No picks saved yet.</p>;
  }

  if (left.length === 0 || right.length === 0) {
    return (
      <div className="mt-6 max-w-xl space-y-3">
        {sorted.map((pick) => (
          <PickCard key={pick.pick_number} pick={pick} />
        ))}
      </div>
    );
  }

  /* Phone: one column. md+: two columns (picks 1–16 | 17–32). */
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
      {sorted.map((pick) => {
        const isLeft = pick.pick_number <= HALF;
        const row = isLeft ? pick.pick_number : pick.pick_number - HALF;
        return (
          <div
            key={pick.pick_number}
            className={cn(isLeft ? 'md:col-start-1' : 'md:col-start-2')}
            style={{ gridRow: row }}
          >
            <PickCard pick={pick} />
          </div>
        );
      })}
    </div>
  );
}

export function PredictionTopPicksGrid({ picks }: { picks: TopPickRow[] }) {
  return <TopPicksGridContent picks={picks} />;
}
