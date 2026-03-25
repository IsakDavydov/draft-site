import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service',
  description: 'SAKFootball terms of service. Usage rules for our NFL analysis and draft prediction platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
          <div className="border-b border-gray-100 px-8 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-nfl-blue mb-2">Legal</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Terms of Service</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: February 12, 2026</p>
          </div>

          <div className="px-8 py-8 sm:px-10 space-y-8 text-gray-600 text-[15px] leading-relaxed">

            <p>
              Welcome to SAKFootball. By accessing or using <strong>sakfootball.com</strong> and any related services
              (collectively, the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not
              agree, do not use the Service.
            </p>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. Eligibility & Account</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 18 years old (or 21+ where required by applicable law) to use the Service.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>You may not create more than one account per person. Multiple accounts are grounds for disqualification from contests.</li>
                <li>You are responsible for all activity that occurs under your account.</li>
                <li>You must provide accurate information when creating an account.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. The Service</h2>
              <p className="mb-3">
                SAKFootball provides NFL draft analysis, prospect profiles, a mock draft prediction contest, group
                competitions, fantasy rankings, and related editorial content. All content is provided for{' '}
                <strong>entertainment and informational purposes only</strong>. Nothing on the Service constitutes
                financial, legal, or betting advice.
              </p>
              <p>
                We reserve the right to modify, suspend, or discontinue any part of the Service at any time without
                notice. We are not liable to you or any third party for any such modification, suspension, or
                discontinuation.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. Acceptable Use</h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
                <li>Create multiple accounts, use bots, or use automation to interact with the Service.</li>
                <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
                <li>Harass, threaten, or harm other users.</li>
                <li>Scrape, crawl, or systematically extract data from the Service without written permission.</li>
                <li>Impersonate any person or entity or misrepresent your affiliation.</li>
                <li>Upload or transmit malicious code, viruses, or any harmful software.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. Draft Prediction Contest</h2>
              <p>
                Participation in the draft prediction contest is subject to our{' '}
                <Link href="/contest-rules" className="text-nfl-blue hover:underline">Contest Rules</Link>, which are
                incorporated into these Terms by reference. In the event of a conflict between these Terms and the
                Contest Rules, the Contest Rules govern with respect to the contest.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Service — including text, graphics, logos, images, and
                software — are the exclusive property of SAKFootball or its licensors and are protected by applicable
                intellectual property laws. You may not reproduce, distribute, or create derivative works without our
                express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. User Content</h2>
              <p>
                By submitting display names, draft predictions, or any other content to the Service, you grant
                SAKFootball a non-exclusive, royalty-free, worldwide license to use, display, and distribute that
                content in connection with operating the Service (e.g., displaying your name on the leaderboard).
                You retain ownership of your content.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. Third-Party Links & Services</h2>
              <p>
                The Service may contain links to third-party websites. We are not responsible for the content or
                practices of any third-party sites. Links do not constitute endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. Disclaimers</h2>
              <p className="mb-3">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                AND NON-INFRINGEMENT.
              </p>
              <p>
                We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other
                harmful components. All editorial content, picks, and analysis are opinions only and may be inaccurate.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SAKFOOTBALL SHALL NOT BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER
                INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES,
                RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold SAKFootball and its affiliates, officers, employees, and agents
                harmless from any claims, damages, losses, liabilities, and expenses (including attorneys&apos; fees)
                arising out of or related to your use of the Service, your violation of these Terms, or your violation
                of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">11. Termination</h2>
              <p>
                We reserve the right to suspend or terminate your account and access to the Service at any time, with
                or without cause, with or without notice. Provisions of these Terms that by their nature should survive
                termination will survive, including ownership provisions, warranty disclaimers, and limitations of
                liability.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">12. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the United States, without
                regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be
                resolved through binding arbitration or in courts of competent jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">13. Changes to Terms</h2>
              <p>
                We may revise these Terms at any time. We will post the updated Terms on this page with a revised date.
                Continued use of the Service after any changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">14. Contact</h2>
              <p>
                Questions about these Terms? Contact us at{' '}
                <a href="mailto:contact@sakfootball.com" className="text-nfl-blue hover:underline font-medium">
                  contact@sakfootball.com
                </a>.
              </p>
            </section>
          </div>

          <div className="border-t border-gray-100 px-8 py-5 sm:px-10 flex flex-wrap gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="/contest-rules" className="hover:text-gray-700 transition-colors">Contest Rules</Link>
            <Link href="/responsible-gaming" className="hover:text-gray-700 transition-colors">Responsible Gaming</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
