import type { Prospect } from '@/types';

interface SeasonStatsProps {
  prospect: Prospect;
}

function StatChip({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="text-sm">
      <span className="text-gray-500">{label}:</span>{' '}
      <span className="font-semibold text-gray-900">{value}</span>
    </span>
  );
}

export function SeasonStats({ prospect }: SeasonStatsProps) {
  const stats = prospect.lastSeasonStats;
  if (!stats) {
    return (
      <p className="text-sm text-gray-500 italic">
        Stats not yet available. Add data from{' '}
        <a
          href="https://cfbstats.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nfl-blue hover:underline"
        >
          cfbstats.com
        </a>{' '}
        or{' '}
        <a
          href="https://www.sports-reference.com/cfb/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nfl-blue hover:underline"
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
    if (stats.passComp != null && stats.passAtt != null) {
      rows.push({ label: 'Comp/Att', value: `${stats.passComp}/${stats.passAtt}` });
    }
    if (stats.passYds != null) rows.push({ label: 'Pass Yds', value: stats.passYds.toLocaleString() });
    if (stats.passTd != null) rows.push({ label: 'Pass TD', value: stats.passTd });
    if (stats.passInt != null) rows.push({ label: 'INT', value: stats.passInt });
    if (stats.compPct != null) rows.push({ label: 'Comp %', value: `${stats.compPct}%` });
    if (stats.passerRating != null) rows.push({ label: 'Rating', value: stats.passerRating.toFixed(1) });
    if (stats.rushYds != null && stats.rushYds > 0) {
      rows.push({ label: 'Rush Yds', value: stats.rushYds });
      if (stats.rushTd != null) rows.push({ label: 'Rush TD', value: stats.rushTd });
    }
  }

  if (isRB) {
    if (stats.rushAtt != null) rows.push({ label: 'Carries', value: stats.rushAtt });
    if (stats.rushYds != null) rows.push({ label: 'Rush Yds', value: stats.rushYds.toLocaleString() });
    if (stats.rushAvg != null) rows.push({ label: 'YPC', value: stats.rushAvg.toFixed(1) });
    if (stats.rushTd != null) rows.push({ label: 'Rush TD', value: stats.rushTd });
    if (stats.receptions != null && stats.receptions > 0) {
      rows.push({ label: 'Receptions', value: stats.receptions });
      if (stats.recYds != null) rows.push({ label: 'Rec Yds', value: stats.recYds });
      if (stats.recTd != null) rows.push({ label: 'Rec TD', value: stats.recTd });
    }
  }

  if (isWR) {
    if (stats.receptions != null) rows.push({ label: 'Receptions', value: stats.receptions });
    if (stats.recYds != null) rows.push({ label: 'Rec Yds', value: stats.recYds.toLocaleString() });
    if (stats.recAvg != null) rows.push({ label: 'YPC', value: stats.recAvg.toFixed(1) });
    if (stats.recTd != null) rows.push({ label: 'Rec TD', value: stats.recTd });
    if (stats.rushAtt != null && stats.rushAtt > 0) {
      rows.push({ label: 'Rush', value: `${stats.rushAtt} att, ${stats.rushYds ?? 0} yds` });
    }
  }

  if (isDefense) {
    if (stats.tackles != null) rows.push({ label: 'Tackles', value: stats.tackles });
    if (stats.tfl != null) rows.push({ label: 'TFL', value: stats.tfl });
    if (stats.sacks != null) rows.push({ label: 'Sacks', value: stats.sacks });
    if (stats.qbHits != null) rows.push({ label: 'QB Hurries', value: stats.qbHits });
    if (stats.int != null) rows.push({ label: 'Interceptions', value: stats.int });
    if (stats.pd != null) rows.push({ label: 'Pass Breakups', value: stats.pd });
    if (stats.ff != null) rows.push({ label: 'Forced Fumbles', value: stats.ff });
  }

  if (rows.length === 0) {
    return <p className="text-sm text-gray-500 italic">2025 stats not yet added for this position.</p>;
  }

  return (
    <div>
      <p className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {rows.map(({ label, value }, i) => (
          <span key={label}>
            {i > 0 && <span className="mx-1.5 text-gray-300">•</span>}
            <StatChip label={label} value={value} />
          </span>
        ))}
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Source:{' '}
        <a
          href="https://cfbstats.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-nfl-blue hover:underline"
        >
          cfbstats.com
        </a>{' '}
        2025 season
      </p>
    </div>
  );
}
