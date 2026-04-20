import Link from 'next/link';
import { Target, Trophy, BookOpen, Users } from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'About SAKFootball — your destination for NFL draft analysis, prospect profiles, and the 2026 Draft Prediction Challenge.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Header */}
          <div className="border-b border-gray-200 px-8 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-2">About Us</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">SAKFootball</h1>
            <p className="mt-3 text-base text-gray-600 leading-relaxed">
              Your destination for NFL draft analysis, prospect scouting, and the 2026 Draft Prediction Challenge —
              built for fans who follow the draft as closely as the season.
            </p>
          </div>

          <div className="px-8 py-8 sm:px-10 space-y-10 text-gray-700 text-[15px] leading-relaxed">

            {/* Mission */}
            <section>
              <h2 className="text-base font-bold text-gray-900 font-display mb-3">Our Mission</h2>
              <p>
                SAKFootball was built to give NFL fans a serious place to engage with the draft — not just consume
                content, but put their knowledge to the test. We provide in-depth prospect profiles, expert mock
                drafts, and an interactive prediction contest where you compete against others to see who really
                knows where players will land.
              </p>
            </section>

            {/* What We Offer */}
            <section>
              <h2 className="text-base font-bold text-gray-900 font-display mb-5">What We Offer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: Target,
                    title: 'Prospect Big Board',
                    desc: '75 top prospects ranked and profiled with scouting reports, measurables, impact meters, and 2025 season stats.',
                  },
                  {
                    icon: BookOpen,
                    title: 'Expert Mock Drafts',
                    desc: 'Updated mock drafts post-combine and post-free agency to help calibrate your picks against expert consensus.',
                  },
                  {
                    icon: Trophy,
                    title: 'Draft Prediction Contest',
                    desc: 'Predict all 32 first-round picks before draft night. Score up to 480 points — a perfect score wins $10,000 cash. Compete on the global leaderboard.',
                  },
                  {
                    icon: Users,
                    title: 'Private Groups',
                    desc: 'Create a private group with one invite code. Head-to-head leaderboards for friend groups, offices, and fantasy leagues.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="rounded-xl bg-cream-deep border border-gray-200 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 border border-rose-100">
                        <Icon className="h-4 w-4 text-rose-500" />
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 font-display">{title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Content disclaimer */}
            <section>
              <h2 className="text-base font-bold text-gray-900 font-display mb-3">Content Disclaimer</h2>
              <p>
                All analysis, picks, rankings, and predictions on SAKFootball are <strong>opinions for entertainment
                purposes only</strong>. They are not financial, legal, or betting advice. SAKFootball does not
                operate any real-money gambling or wagering services. No purchase is ever required to participate
                in any contest on SAKFootball.
              </p>
              <p className="mt-3">
                We encourage responsible use of any gambling-related activities. If you or someone you know has
                a gambling problem, help is available at{' '}
                <Link href="/responsible-gaming" className="text-rose-500 hover:text-rose-600">
                  our Responsible Gaming page
                </Link>.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-base font-bold text-gray-900 font-display mb-3">Contact</h2>
              <p>
                Have questions, feedback, or want to report an issue? We&apos;d love to hear from you.
              </p>
              <p className="mt-2">
                <a href="mailto:contact@sakfootball.com" className="text-rose-500 hover:text-rose-600 font-medium">
                  contact@sakfootball.com
                </a>
              </p>
            </section>

          </div>

          <div className="border-t border-gray-200 px-8 py-5 sm:px-10 flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="/contest-rules" className="hover:text-gray-700 transition-colors">Contest Rules</Link>
            <Link href="/responsible-gaming" className="hover:text-gray-700 transition-colors">Responsible Gaming</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
