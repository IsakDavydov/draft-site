import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leaderboard',
  description: '2026 NFL Draft prediction leaderboard. See who got the most picks right.',
};

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: leaderboard, error } = await supabase.rpc('get_leaderboard', {
    p_year: 2026,
  });

  const { count } = await supabase
    .from('draft_results')
    .select('*', { count: 'exact', head: true })
    .eq('draft_year', 2026);

  const hasResults = (count ?? 0) > 0;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/predict"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Predictions
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-8 w-8 text-amber-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              2026 Draft Leaderboard
            </h1>
            <p className="text-gray-600 mt-1">
              Correct first-round picks
            </p>
          </div>
        </div>

        {!hasResults ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-gray-600">
              The leaderboard will be available after the 2026 NFL Draft when results are tallied.
            </p>
            <Link
              href="/predict"
              className="inline-block mt-4 text-nfl-red font-medium hover:underline"
            >
              Submit your predictions →
            </Link>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-red-600">Unable to load leaderboard. Please try again later.</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm ring-1 ring-gray-900/5">
            <p className="text-gray-600">No predictions yet. Be the first!</p>
            <Link
              href="/predict"
              className="inline-block mt-4 text-nfl-red font-medium hover:underline"
            >
              Submit your predictions →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((row: { display_name: string; score: number; rank: number }, i: number) => (
                  <tr key={row.display_name + i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          row.rank === 1
                            ? 'bg-amber-400 text-amber-900'
                            : row.rank === 2
                            ? 'bg-gray-300 text-gray-700'
                            : row.rank === 3
                            ? 'bg-amber-700 text-amber-100'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {row.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.display_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-right font-semibold">
                      {row.score} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 text-sm text-gray-500">
          15 pts = correct player at correct pick. 5 pts = player went 1 pick before or after. Max 480 pts.
        </p>
      </div>
    </div>
  );
}
