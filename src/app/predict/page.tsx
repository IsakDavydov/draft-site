import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getBigBoard, getDraftOrder2026, getMockDraftFromFile } from '@/lib/adapters';
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
  let mockDraftTemplate: Awaited<ReturnType<typeof getMockDraftFromFile>> = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;

    [prospects, draftOrder, mockDraftTemplate] = await Promise.all([
      getBigBoard(),
      Promise.resolve(getDraftOrder2026()),
      getMockDraftFromFile('post-super-bowl-mock-draft-2026.json'),
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

        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/leaderboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-nfl-red hover:underline"
          >
            View leaderboard →
          </Link>
          <Link
            href="/groups"
            className="inline-flex items-center gap-2 text-sm font-medium text-nfl-blue hover:underline"
          >
            Compete with friends →
          </Link>
        </div>

        <PredictionForm
          prospects={prospects}
          draftOrder={draftOrder}
          userId={user.id}
          mockDraftTemplate={mockDraftTemplate}
        />
      </div>
    </div>
  );
}
