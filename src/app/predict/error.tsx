'use client';

import Link from 'next/link';

export default function PredictError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isConfigError =
    error.message?.includes('Supabase') ||
    error.message?.includes('NEXT_PUBLIC_SUPABASE');

  return (
    <div className="min-h-screen bg-cream-deep flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-900 font-display mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-4">
          {isConfigError ? (
            <>Supabase environment variables may not be configured. Check your Vercel project settings.</>
          ) : (
            <>We couldn&apos;t load the predictions page. Please try again.</>
          )}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-500/90"
          >
            Try again
          </button>
          <Link
            href="/auth/signin?next=/predict"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
