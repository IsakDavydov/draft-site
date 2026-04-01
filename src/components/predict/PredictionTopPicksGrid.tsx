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

/** Picks 1–5 / 6–10 map to rows 1–5 in each column (md+). */
const MD_ROW_START: Record<number, string> = {
  1: 'md:row-start-1',
  2: 'md:row-start-2',
  3: 'md:row-start-3',
  4: 'md:row-start-4',
  5: 'md:row-start-5',
};

function PickCard({ pick }: { pick: TopPickRow }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.06] px-3 py-2.5 shadow-card">
      <div className="flex gap-2.5">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-xs font-bold text-brand-red"
          aria-label={`Pick ${pick.pick_number}`}
        >
          {pick.pick_number}
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex items-start gap-2">
            <CollegeLogo school={pick.school} size={32} className="mt-0.5" />
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-tight text-white">{pick.prospectName}</div>
              <div className="mt-0.5 text-xs text-gray-400">
                {pick.position}
                {pick.school ? ` · ${pick.school}` : ''}
              </div>
            </div>
          </div>
          <p className="pl-0.5 text-xs text-gray-400">
            <span className="text-gray-500">To </span>
            <span className="font-medium text-gray-200">{pick.team}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function TopPicksGridContent({ picks }: { picks: TopPickRow[] }) {
  const sorted = [...picks].sort((a, b) => a.pick_number - b.pick_number);
  const left = sorted.filter((p) => p.pick_number <= 5);
  const right = sorted.filter((p) => p.pick_number > 5);

  if (sorted.length === 0) {
    return <p className="mt-6 text-gray-400">No picks saved for picks 1–10 yet.</p>;
  }

  const canSplitForWideLayout = left.length > 0 && right.length > 0;

  if (!canSplitForWideLayout) {
    return (
      <div className="mt-6 max-w-xl space-y-3">
        {sorted.map((pick) => (
          <PickCard key={pick.pick_number} pick={pick} />
        ))}
      </div>
    );
  }

  /* Phone: one column, picks 1→10. md+: two columns (1–5 | 6–10), no section headings. */
  return (
    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-x-6 md:gap-y-3">
      {sorted.map((pick) => {
        const row = pick.pick_number <= 5 ? pick.pick_number : pick.pick_number - 5;
        const rowCls = MD_ROW_START[row] ?? 'md:row-start-1';
        return (
          <div
            key={pick.pick_number}
            className={cn(
              pick.pick_number <= 5 ? 'md:col-start-1' : 'md:col-start-2',
              rowCls,
            )}
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
