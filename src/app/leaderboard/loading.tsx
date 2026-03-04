import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/predict"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-nfl-red transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Predictions
          </Link>
          <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 animate-pulse rounded bg-amber-200" />
              <div className="space-y-2">
                <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-48 animate-pulse rounded bg-gray-100" />
              </div>
            </div>
            <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 w-full max-w-md animate-pulse rounded bg-gray-100" />
        </div>

        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(8)].map((_, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="ml-auto h-4 w-12 animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
