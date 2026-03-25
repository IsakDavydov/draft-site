import Link from 'next/link';
import { DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Contest Rules',
  description: 'Official rules for the 2026 NFL Draft Prediction Challenge on SAKFootball — including the $10,000 Grand Prize.',
};

export default function ContestRulesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          <div className="border-b border-gray-100 px-8 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nfl-blue mb-2">Legal</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">2026 Draft Prediction Challenge</h1>
            <p className="mt-1 text-base text-gray-500">Official Contest Rules</p>
            <p className="mt-1 text-sm text-gray-400">Last updated: March 25, 2026</p>
          </div>

          {/* Grand Prize callout */}
          <div id="grand-prize" className="mx-8 my-8 sm:mx-10 rounded-2xl bg-gradient-to-br from-nfl-red via-[#012252] to-[#001530] p-px">
            <div className="rounded-2xl bg-[#011a3a] px-7 py-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-nfl-blue/20 border border-nfl-blue/30">
                  <DollarSign className="h-6 w-6 text-nfl-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-nfl-blue mb-1">Grand Prize</p>
                  <h2 className="text-2xl font-black text-white">$10,000 Cash Award</h2>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">
                    Any participant who achieves a <strong className="text-white">perfect score of 480 out of 480 points</strong> —
                    meaning all 32 first-round prospects predicted at their exact pick number — will be awarded a $10,000 cash prize.
                    No purchase necessary. Full eligibility requirements in Section 6A below.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8 sm:px-10 space-y-8 text-gray-600 text-[15px] leading-relaxed">

            <p>
              These Official Contest Rules (&quot;Rules&quot;) govern participation in the SAKFootball 2026 NFL Draft
              Prediction Challenge (&quot;Contest&quot;). By submitting an entry, you agree to these Rules and our{' '}
              <Link href="/terms" className="text-nfl-blue hover:underline">Terms of Service</Link> and{' '}
              <Link href="/privacy" className="text-nfl-blue hover:underline">Privacy Policy</Link>.
            </p>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. Eligibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The Contest is open to individuals 18 years of age or older (21+ where required by applicable law).</li>
                <li>One entry per person. Only one account per individual is permitted.</li>
                <li>Participants must have a valid, active SAKFootball account with a verified email address.</li>
                <li>Employees, contractors, and agents of SAKFootball, and their immediate family members or household members, are not eligible to win prizes.</li>
                <li>Void where prohibited by law. Participants are responsible for complying with all applicable local, state, and federal laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. Contest Period & Deadlines</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>The Contest begins when SAKFootball opens prediction submissions and ends at the official start of the 2026 NFL Draft.</li>
                <li>Entries must be submitted and marked as your leaderboard entry <strong>before the 2026 NFL Draft begins</strong>. Late entries will not be scored.</li>
                <li>SAKFootball is not responsible for late or lost entries due to technical failures or network issues.</li>
                <li>SAKFootball reserves the right to extend or shorten the Contest period with notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. How to Enter</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Create a free account at sakfootball.com.</li>
                <li>Navigate to the Predict page and select one prospect for each of the 32 first-round draft picks.</li>
                <li>Submit your predictions before the Contest deadline. You may update your picks until the deadline.</li>
                <li>Only your designated leaderboard entry counts. You may save multiple drafts but only one may be submitted for scoring.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. Scoring</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>15 points</strong> — the correct prospect is predicted at the exact pick number (team does not affect scoring).</li>
                <li><strong>5 points</strong> — the correct prospect is predicted within one slot of the actual pick (e.g., predicted pick 3, actual pick 4).</li>
                <li><strong>0 points</strong> — all other outcomes.</li>
                <li>Maximum possible score: <strong>480 points</strong> (32 picks × 15 points).</li>
                <li>A <strong>perfect score of 480</strong> requires all 32 prospects to be predicted at their exact pick numbers.</li>
                <li>Scores update in real time as each pick is officially announced on draft night. The leaderboard reflects current scores after every pick.</li>
                <li>Final standings are confirmed once all 32 first-round picks are complete.</li>
                <li>SAKFootball&apos;s scoring decisions are final.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. Fair Play</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All predictions must be your own. Do not share your specific picks with other participants before the draft.</li>
                <li>You may use expert mock drafts and analysis for research, but your submitted entry must be your independent prediction.</li>
                <li>No bots, scripts, automated tools, or any other means of programmatically submitting or altering predictions.</li>
                <li>No collusion with other participants to manipulate standings.</li>
                <li>SAKFootball reserves the right to disqualify any entry that it determines, in its sole discretion, to be fraudulent, in violation of these Rules, or otherwise unfair.</li>
              </ul>
            </section>

            <section id="prizes">
              <h2 className="text-base font-bold text-gray-900 mb-3">6. Prizes</h2>

              <h3 className="text-sm font-bold text-gray-800 mb-2 mt-4">6A. Grand Prize — $10,000 Cash</h3>
              <p className="mb-3">
                A cash prize of <strong>$10,000 USD</strong> will be awarded to any eligible participant who achieves
                a <strong>perfect score of 480 out of 480 points</strong> — meaning all 32 first-round prospects
                correctly predicted at their exact pick number. No purchase is necessary to enter or win.
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>The Grand Prize is available for the 2026 NFL Draft prediction contest.</li>
                <li>A perfect score requires all 32 first-round prospects to be selected at their exact pick number. Team assignment does not affect scoring.</li>
                <li>Grand Prize winners must be at least 18 years of age (21+ where required by law) and a legal resident of the United States.</li>
                <li>Grand Prize winners must not be an employee, contractor, or immediate family member of SAKFootball.</li>
                <li>Grand Prize winners must have a verified email address and a valid, active SAKFootball account in good standing.</li>
                <li>Grand Prize winners must provide government-issued photo identification and sign a notarized Affidavit of Eligibility and Liability/Publicity Release before receiving the prize.</li>
                <li>Grand Prize winners will be notified by email within 5 business days of the draft&apos;s conclusion. Winners must respond and complete verification within <strong>14 calendar days</strong>. Failure to respond forfeits the prize.</li>
                <li>The $10,000 Grand Prize will be awarded as a single payment via check, wire transfer, or ACH at SAKFootball&apos;s discretion.</li>
                <li><strong>Taxes:</strong> The Grand Prize winner is solely responsible for all applicable federal, state, and local taxes. SAKFootball will issue IRS Form 1099-MISC to winners as required by law. SAKFootball may withhold amounts required by federal law (currently 24% backup withholding for prizes exceeding $5,000 where applicable).</li>
              </ul>

              <h3 className="text-sm font-bold text-gray-800 mb-2 mt-5">6B. Multiple Winners</h3>
              <p className="mb-3">
                If more than one eligible participant achieves a perfect score of 480 points, the Grand Prize of
                $10,000 will be split equally among all verified perfect-score winners. SAKFootball&apos;s determination
                of winners is final.
              </p>

              <h3 className="text-sm font-bold text-gray-800 mb-2 mt-5">6C. No Perfect Score</h3>
              <p className="mb-3">
                If no participant achieves a perfect score of 480 points, the $10,000 Grand Prize will go unclaimed
                for the 2026 contest. SAKFootball may award discretionary prizes to top finishers at its sole
                discretion. Such discretionary prizes, if any, will be announced separately.
              </p>

              <h3 className="text-sm font-bold text-gray-800 mb-2 mt-5">6D. General Prize Rules</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>No purchase is necessary to enter or win any prize.</li>
                <li>All prizes are non-transferable and may not be substituted or exchanged for cash (except the Grand Prize, which is already cash).</li>
                <li>SAKFootball reserves the right to substitute a prize of equal or greater value if the stated prize becomes unavailable.</li>
                <li>SAKFootball may require proof of identity and eligibility before awarding any prize.</li>
                <li>Acceptance of a prize constitutes permission for SAKFootball to use the winner&apos;s display name and score for promotional purposes, unless prohibited by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. Tiebreakers</h2>
              <p>
                In the event of a tie in total score, SAKFootball may use tiebreaker criteria at its discretion,
                such as timestamp of submission, number of correctly predicted teams, or a secondary scoring metric.
                SAKFootball&apos;s tiebreaker decisions are final.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. Disqualification</h2>
              <p>
                SAKFootball reserves the right to disqualify any participant who, in its sole judgment: violates these
                Rules or the Terms of Service; provides false information; creates multiple accounts; uses any form of
                cheating, hacking, or manipulation; or engages in conduct that is harmful to the Contest or other
                participants.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">9. Publicity</h2>
              <p>
                By participating, you grant SAKFootball the right to use your display name and contest score for
                promotional purposes (e.g., leaderboard display, social media posts) without additional compensation,
                unless prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
              <p>
                SAKFootball is not responsible for: technical failures; incorrect or incomplete entries;
                lost, late, or misdirected entries; any error in scoring; unauthorized access to entries;
                or any injury or damage resulting from participation. To the extent permitted by law,
                SAKFootball&apos;s liability is limited to the value of the prize awarded.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">11. Modifications to Rules</h2>
              <p>
                SAKFootball reserves the right to modify, suspend, or cancel the Contest or these Rules at any time.
                Changes will be effective when posted to this page. Continued participation after changes constitutes
                acceptance of the updated Rules.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">12. Governing Law</h2>
              <p>
                These Rules are governed by the laws of the United States. Any disputes will be resolved as set forth
                in the Terms of Service.
              </p>
            </section>

          </div>

          <div className="border-t border-gray-100 px-8 py-5 sm:px-10">
            <p className="text-sm text-gray-500 mb-4">
              Questions? Contact us at{' '}
              <a href="mailto:contact@sakfootball.com" className="text-nfl-blue hover:underline font-medium">
                contact@sakfootball.com
              </a>
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
              <Link href="/responsible-gaming" className="hover:text-gray-700 transition-colors">Responsible Gaming</Link>
              <Link href="/predict" className="hover:text-gray-700 transition-colors">← Enter the Contest</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
