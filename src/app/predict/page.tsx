import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getBigBoard, getDraftOrder2026 } from '@/lib/adapters';
import { PredictionForm } from '@/components/predict/PredictionForm';

export const metadata = {
  title: 'Draft Predictions',
  description: 'Predict the first round of the 2026 NFL Draft. Create an account to submit your picks.',
};

export const dynamic = 'force-dynamic';

export default async function PredictPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.'
    );
  }

  let user: { id: string } | null = null;
  let prospects: Awaited<ReturnType<typeof getBigBoard>>;
  let draftOrder: ReturnType<typeof getDraftOrder2026>;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    [prospects, draftOrder] = await Promise.all([
      getBigBoard(),
      Promise.resolve(getDraftOrder2026()),
    ]);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Predict page: ${msg}`);
  }

  if (!user) {
    redirect('/auth/signin?next=/predict');
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          2026 NFL Draft Predictions
        </h1>
        <p className="text-gray-600 mb-6">
          Predict all 32 first-round picks. Your entry will be locked when the draft begins. Compare with everyone after!
        </p>

        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-nfl-red hover:underline mb-8 block"
        >
          View leaderboard →
        </Link>

        <PredictionForm
          prospects={prospects}
          draftOrder={draftOrder}
          userId={user.id}
        />
      </div>
    </div>
  );
}
