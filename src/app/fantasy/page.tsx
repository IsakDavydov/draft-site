import { SectionHeader } from '@/components/shared/SectionHeader';

export default function FantasyPage() {
  return (
    <div className="bg-sak-darker min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          title="Fantasy Rankings"
          description="Position-by-position rankings with tier lists and scoring system toggles"
        />

        <div className="bg-sak-card rounded-2xl border border-white/[0.06] shadow-card">
          <div className="p-12 text-center">
            <p className="text-gray-400 max-w-lg mx-auto">
              Fantasy rankings will be available as we get closer to the 2026 NFL season.
              Check back for position rankings, tier lists, and weekly updates once the season approaches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
