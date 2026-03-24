import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PredictionNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-16 text-center">
      <h1 className="text-xl font-bold text-gray-900">Mock draft not available</h1>
      <p className="mt-2 text-sm text-gray-600">
        This preview isn&apos;t public or you don&apos;t have access (join a group with this player, or they need a leaderboard entry).
      </p>
      <Link
        href="/leaderboard"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-nfl-red hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to leaderboard
      </Link>
    </div>
  );
}
