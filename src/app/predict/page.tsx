import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Zap, Trophy } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { DraftCountdown } from '@/components/shared/DraftCountdown';
import { getBigBoard, getDraftOrder2026, getMockDraftFromFile } from '@/lib/adapters';
import { PredictionForm } from '@/components/predict/PredictionForm';
import { PrizeBanner } from '@/components/shared/PrizeBanner';

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
      getMockDraftFromFile('pre-combine-mock-draft-2026.json'),
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

      {/* ─── Hero Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-nfl-red via-[#012252] to-[#001530]">
        <div className="absolute inset-0 hero-lines pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white ring-1 ring-inset ring-white/20">
                <Zap className="h-3 w-3" />
                2026 Draft Challenge
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Build Your Mock Draft
              </h1>
              <p className="mt-2 text-base leading-relaxed text-gray-300/90">
                Pick all 32 first-round selections. Lock in before draft night and compete on the leaderboard.
              </p>
              <div className="mt-4">
                <PrizeBanner variant="hero" />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <Link
                  href="/leaderboard"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  <Trophy className="h-3.5 w-3.5" />
                  View leaderboard
                </Link>
                <Link
                  href="/groups"
                  className="text-xs font-semibold text-white hover:text-white/80 transition-colors"
                >
                  Compete with friends →
                </Link>
                <Link
                  href="/contest-rules"
                  className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                >
                  Contest Rules
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <DraftCountdown variant="compact" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Form Body ───────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
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
