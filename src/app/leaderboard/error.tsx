'use client';

import Link from 'next/link';

export default function LeaderboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-cream-deep min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard unavailable</h1>
        <p className="text-gray-500 mb-4">
          We couldn&apos;t load the leaderboard. This might be temporary—try again in a moment.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 shadow-sm"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
