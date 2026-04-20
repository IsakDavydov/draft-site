import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/predict"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-rose-500 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Predictions
          </Link>
          <div className="h-5 w-32 animate-pulse rounded-lg bg-gray-50" />
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-pulse rounded-2xl bg-rose-100" />
              <div className="space-y-2">
                <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-50" />
                <div className="h-4 w-48 animate-pulse rounded-lg bg-gray-50/70" />
              </div>
            </div>
            <div className="h-10 w-40 animate-pulse rounded-xl bg-gray-50" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 w-full max-w-md animate-pulse rounded-lg bg-gray-50/70" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left">
                    <div className="h-3 w-6 animate-pulse rounded bg-gray-50" />
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-50" />
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="ml-auto h-3 w-12 animate-pulse rounded bg-gray-50" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[...Array(8)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-50" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-50" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="ml-auto h-4 w-12 animate-pulse rounded-lg bg-gray-50/70" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
