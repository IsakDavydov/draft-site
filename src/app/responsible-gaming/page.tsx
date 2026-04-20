import Link from 'next/link';

export const metadata = {
  title: 'Responsible Gaming',
  description: 'SAKFootball promotes responsible gaming. Resources and help if you or someone you know has a gambling problem.',
};

export default function ResponsibleGamingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-2">Legal</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Responsible Gaming</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: February 12, 2026</p>
          </div>

          <div className="px-8 py-8 sm:px-10 space-y-8 text-gray-700 text-[15px] leading-relaxed">

            {/* Emergency callout */}
            <div className="rounded-xl bg-red-50 border border-red-200 p-6">
              <p className="text-sm font-bold uppercase tracking-wider text-red-600 mb-1">Need help now?</p>
              <p className="text-2xl font-black text-red-700 mb-2">Call 1-800-GAMBLER</p>
              <p className="text-red-700 text-sm mb-3">
                The National Problem Gambling Helpline is available 24/7, free and confidential.
                Trained counselors are standing by to help you or someone you care about.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <a
                  href="https://www.ncpgambling.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-600 hover:text-red-700 underline underline-offset-2"
                >
                  ncpgambling.org →
                </a>
                <a
                  href="https://www.gamblingtherapy.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-red-600 hover:text-red-700 underline underline-offset-2"
                >
                  gamblingtherapy.org →
                </a>
              </div>
            </div>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">About SAKFootball</h2>
              <p>
                SAKFootball provides NFL draft analysis, prospect profiles, and a free-to-play draft prediction
                contest for <strong>entertainment purposes only</strong>. We do not operate any real-money gambling
                or wagering services. No purchase is ever required to participate in any contest on SAKFootball.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Age Requirement</h2>
              <p>
                SAKFootball is intended for users 18 years of age or older. Content related to picks, analysis,
                and predictions is not appropriate for minors. Where local laws require a higher minimum age
                (e.g., 21+), those laws take precedence. If you are under the required age, please do not use
                this Service.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Responsible Gambling Principles</h2>
              <p className="mb-3">
                If you use our content to inform sports betting or other gambling activities, we encourage you to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Only gamble with money you can afford to lose.</li>
                <li>Set a budget and stick to it — never chase losses.</li>
                <li>Take regular breaks and set time limits on gambling sessions.</li>
                <li>Never gamble under the influence of alcohol or other substances.</li>
                <li>Don&apos;t borrow money to gamble.</li>
                <li>Keep gambling as entertainment, not a source of income.</li>
                <li>Be aware of the odds — the house always has an edge over the long run.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Warning Signs of Problem Gambling</h2>
              <p className="mb-3">You may have a gambling problem if you:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Feel the need to gamble with increasing amounts of money to get the same excitement.</li>
                <li>Are restless or irritable when trying to cut down or stop gambling.</li>
                <li>Gamble as a way to escape problems or relieve feelings of helplessness, guilt, or depression.</li>
                <li>Lie to family members or others to conceal how much you gamble.</li>
                <li>Have jeopardized or lost a significant relationship, job, or opportunity because of gambling.</li>
                <li>Rely on others for money to relieve desperate financial situations caused by gambling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Resources & Support</h2>
              <div className="space-y-3">
                {[
                  { name: 'National Council on Problem Gambling', url: 'https://www.ncpgambling.org', note: '1-800-GAMBLER · 24/7 helpline' },
                  { name: 'Gamblers Anonymous', url: 'https://www.gamblersanonymous.org', note: 'Free peer support meetings' },
                  { name: 'Gambling Therapy', url: 'https://www.gamblingtherapy.org', note: 'Free online support' },
                  { name: 'National Alliance on Mental Illness (NAMI)', url: 'https://www.nami.org', note: '1-800-950-6264' },
                ].map(({ name, url, note }) => (
                  <div key={name} className="flex items-start gap-3 rounded-xl bg-cream-deep border border-gray-200 px-4 py-3">
                    <div className="min-w-0">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-rose-500 hover:underline"
                      >
                        {name}
                      </a>
                      <p className="text-xs text-gray-500 mt-0.5">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Self-Exclusion</h2>
              <p>
                If you believe your use of gambling sites is becoming problematic, most regulated gambling operators
                offer self-exclusion tools that allow you to restrict or close your accounts. Contact your state&apos;s
                gambling regulatory body for information on self-exclusion programs in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">Disclaimer</h2>
              <p>
                SAKFootball&apos;s picks, analysis, and predictions are opinions for entertainment only. They are not
                guaranteed to be accurate and should not be relied upon as the sole basis for any financial decision,
                including sports betting. Past performance of any analysis does not guarantee future results.
                Please gamble responsibly and within the laws of your jurisdiction.
              </p>
            </section>

          </div>

          <div className="border-t border-gray-200 px-8 py-5 sm:px-10 flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="/contest-rules" className="hover:text-gray-700 transition-colors">Contest Rules</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
