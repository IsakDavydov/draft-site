import type { Prospect } from '@/types';

interface SeasonStatsProps {
  prospect: Prospect;
}

function StatCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-xs font-medium text-gray-400 uppercase">{label}</span>
      <span className="text-xs font-semibold text-gray-900 tabular-nums">{value}</span>
    </div>
  );
}

export function SeasonStats({ prospect }: SeasonStatsProps) {
  const stats = prospect.lastSeasonStats;
  if (!stats) {
    return (
      <p className="text-sm text-gray-400 italic">
        Stats not yet available. Add data from{' '}
        <a
          href="https://cfbstats.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-500 hover:underline"
        >
          cfbstats.com
        </a>{' '}
        or{' '}
        <a
          href="https://www.sports-reference.com/cfb/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-500 hover:underline"
        >
          Sports Reference
        </a>
        .
      </p>
    );
  }

  const pos = prospect.position;
  const isQB = pos === 'QB';
  const isRB = pos === 'RB';
  const isWR = pos === 'WR' || pos === 'TE';
  const isDefense = ['EDGE', 'DT', 'DL', 'LB', 'CB', 'S'].includes(pos);

  const rows: { label: string; value: string | number }[] = [];

  if (stats.games) rows.push({ label: 'Games', value: stats.games });

  if (isQB) {
    if (stats.compPct != null) rows.push({ label: 'Comp%', value: `${stats.compPct}%` });
    if (stats.passYds != null) rows.push({ label: 'Yards', value: stats.passYds.toLocaleString() });
    if (stats.passTd != null) rows.push({ label: 'TD', value: stats.passTd });
    if (stats.passInt != null) rows.push({ label: 'INT', value: stats.passInt });
    if (stats.passerRating != null) rows.push({ label: 'Rating', value: stats.passerRating.toFixed(1) });
    if (stats.rushYds != null && stats.rushYds > 0) {
      rows.push({ label: 'Rush Yds', value: stats.rushYds.toLocaleString() });
      if (stats.rushTd != null) rows.push({ label: 'Rush TD', value: stats.rushTd });
    }
  }

  if (isRB) {
    if (stats.rushAtt != null) rows.push({ label: 'Carries', value: stats.rushAtt });
    if (stats.rushYds != null) rows.push({ label: 'Yards', value: stats.rushYds.toLocaleString() });
    if (stats.rushAvg != null) rows.push({ label: 'YPC', value: stats.rushAvg.toFixed(1) });
    if (stats.rushTd != null) rows.push({ label: 'TD', value: stats.rushTd });
    if (stats.receptions != null && stats.receptions > 0) {
      rows.push({ label: 'Rec', value: stats.receptions });
      if (stats.recYds != null) rows.push({ label: 'Rec Yds', value: stats.recYds.toLocaleString() });
      if (stats.recTd != null) rows.push({ label: 'Rec TD', value: stats.recTd });
    }
  }

  if (isWR) {
    if (stats.receptions != null) rows.push({ label: 'Rec', value: stats.receptions });
    if (stats.recYds != null) rows.push({ label: 'Yards', value: stats.recYds.toLocaleString() });
    if (stats.recAvg != null) rows.push({ label: 'Avg', value: stats.recAvg.toFixed(1) });
    if (stats.recTd != null) rows.push({ label: 'TD', value: stats.recTd });
    if (stats.rushAtt != null && stats.rushAtt > 0) {
      rows.push({ label: 'Rush', value: `${stats.rushAtt} att, ${(stats.rushYds ?? 0).toLocaleString()} yds` });
    }
  }

  if (isDefense) {
    if (stats.tackles != null) rows.push({ label: 'Tackles', value: stats.tackles });
    if (stats.tfl != null) rows.push({ label: 'TFL', value: stats.tfl });
    if (stats.sacks != null) rows.push({ label: 'Sacks', value: stats.sacks });
    if (stats.qbHits != null) rows.push({ label: 'QB Hurries', value: stats.qbHits });
    if (stats.int != null) rows.push({ label: 'INT', value: stats.int });
    if (stats.pd != null) rows.push({ label: 'PD', value: stats.pd });
    if (stats.ff != null) rows.push({ label: 'FF', value: stats.ff });
  }

  if (rows.length === 0) {
    return <p className="text-sm text-gray-400 italic">2025 stats not yet added for this position.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
        {rows.map(({ label, value }) => (
          <StatCell key={label} label={label} value={value} />
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Source:{' '}
        <a
          href="https://cfbstats.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-500 hover:underline"
        >
          cfbstats.com
        </a>
      </p>
    </div>
  );
}
