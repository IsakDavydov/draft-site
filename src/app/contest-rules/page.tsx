import Link from 'next/link';

export const metadata = {
  title: 'Contest Rules',
  description: 'Official rules for the 2026 NFL Draft Prediction Challenge. Eligibility, deadlines, fair play, and prize claim terms.',
};

export default function ContestRulesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-900/5 p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">2026 Draft Prediction Challenge</h1>
          <p className="text-gray-500 text-sm mb-8">Official Contest Rules</p>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Eligibility</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>One entry per person. Only one account per person is permitted.</li>
                <li>Participants must be 18 years of age or older (or 21+ where required by law).</li>
                <li>Employees of SAKFootball and their immediate family members are not eligible to participate or win.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Deadlines</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Your account must be created before the official start of the 2026 NFL Draft.</li>
                <li>Predictions must be submitted and locked before the NFL Draft begins. Entries submitted after the draft has started will not be eligible for prizes.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Fair Play</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Predictions must be your own. Do not share your picks with others before the draft.</li>
                <li>Do not copy predictions from experts, mock drafts, or other participants.</li>
                <li>No use of bots, scripts, or other automation to submit or view predictions.</li>
                <li>SAKFootball reserves the right to disqualify any entry that violates these rules or that we determine to be fraudulent or unfair.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Verification</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>You must provide a valid, verifiable email address. The winner must respond within 7 days of notification to claim the prize.</li>
                <li>SAKFootball may require proof of identity and eligibility before awarding the prize.</li>
                <li>Invalid or fraudulent contact information may result in disqualification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Prize Claim</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>If the winner does not respond within the required time or is disqualified, the prize may be awarded to the next eligible participant.</li>
                <li>Prizes are non-transferable and may not be exchanged for cash unless otherwise stated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Modifications to Rules</h2>
              <p className="text-gray-600">
                SAKFootball reserves the right to modify these rules at any time. Changes will be effective when posted. Continued participation in the contest after any rule change constitutes acceptance of the updated rules. We encourage you to review these rules periodically.
              </p>
            </section>
          </div>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Questions? Contact us at{' '}
              <a href="mailto:contact@sakfootball.com" className="text-nfl-red hover:underline">
                contact@sakfootball.com
              </a>
            </p>
            <Link href="/predict" className="inline-block mt-4 text-sm font-medium text-nfl-red hover:underline">
              ← Back to Draft Predictions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
