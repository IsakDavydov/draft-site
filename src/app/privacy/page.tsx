import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy',
  description: 'SAKFootball privacy policy. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 px-8 py-8 sm:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-500 mb-2">Legal</p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
            <p className="mt-2 text-sm text-gray-500">Last updated: February 12, 2026</p>
          </div>

          <div className="px-8 py-8 sm:px-10 space-y-8 text-gray-700 text-[15px] leading-relaxed">

            <p>
              SAKFootball (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you visit{' '}
              <strong>sakfootball.com</strong> and use our services. Please read this policy carefully. By using the
              Service, you agree to the terms described here.
            </p>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly and information collected automatically:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Account information:</strong> email address and password when you register.</li>
                <li><strong>Profile information:</strong> display name you choose for the leaderboard.</li>
                <li><strong>Prediction data:</strong> draft picks and mock drafts you submit.</li>
                <li><strong>Communications:</strong> messages you send us (e.g., support emails).</li>
                <li><strong>Usage data:</strong> IP address, browser type, pages visited, referring URLs, and device identifiers — collected automatically via cookies and similar technologies.</li>
                <li><strong>Advertising data:</strong> interaction data collected by third-party ad networks (see Section 3).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To create and manage your account and authenticate you.</li>
                <li>To operate the draft prediction contest, calculate scores, and display leaderboards.</li>
                <li>To send transactional emails (e.g., password reset, contest notifications).</li>
                <li>To improve and personalize the Service.</li>
                <li>To detect and prevent fraud, abuse, and violations of our Terms.</li>
                <li>To comply with legal obligations.</li>
              </ul>
              <p className="mt-3">
                <strong>Public information:</strong> Your display name and contest scores are visible to other users on
                the leaderboard by design. Choose your display name accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">3. Third-Party Advertising & Cookies</h2>
              <p className="mb-3">
                We use Google AdSense and may use other third-party advertising services. These services use cookies,
                web beacons, and similar technologies to serve ads based on your browsing activity on this and other
                sites. This does <strong>not</strong> include your name, email, or account credentials.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You can review Google&apos;s ad policies at{' '}<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">policies.google.com/technologies/ads</a>.</li>
                <li>Opt out of personalized Google ads via{' '}<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">Google Ads Settings</a>.</li>
                <li>Opt out of third-party ad networks via the{' '}<a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:underline">NAI opt-out tool</a>.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">4. Data Sharing & Disclosure</h2>
              <p className="mb-3">We do not sell your personal information. We may share it with:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Service providers:</strong> Supabase (database hosting), Vercel (hosting), and other infrastructure providers who process data on our behalf under confidentiality obligations.</li>
                <li><strong>Advertising partners:</strong> anonymized or aggregated data for ad measurement purposes.</li>
                <li><strong>Law enforcement:</strong> when required by law, court order, or to protect rights and safety.</li>
                <li><strong>Business transfers:</strong> if SAKFootball is acquired or merges with another entity, your data may be transferred as part of that transaction.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">5. Data Retention</h2>
              <p>
                We retain your account and prediction data for as long as your account is active or as needed to provide
                the Service. You may request deletion of your account and associated data by contacting us. We may retain
                certain data as required by law or for legitimate business purposes (e.g., fraud prevention).
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">6. Security</h2>
              <p>
                We implement industry-standard security measures including encrypted connections (HTTPS), secure password
                hashing, and access controls. No method of transmission over the Internet is 100% secure — we cannot
                guarantee absolute security but take reasonable steps to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">7. Children&apos;s Privacy</h2>
              <p>
                The Service is not directed to children under 18. We do not knowingly collect personal information from
                minors. If we learn that we have collected data from a child under 18, we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">8. Your Rights</h2>
              <p className="mb-3">
                Depending on your jurisdiction, you may have rights regarding your personal data, including the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>Correct inaccurate data.</li>
                <li>Request deletion of your data.</li>
                <li>Object to or restrict certain processing.</li>
                <li>Data portability (where applicable).</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:contact@sakfootball.com" className="text-rose-500 hover:underline">contact@sakfootball.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will post the new policy on this page with an
                updated date. Continued use of the Service after changes constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-gray-900 mb-3">10. Contact</h2>
              <p>
                Questions or concerns about this Privacy Policy? Contact us at{' '}
                <a href="mailto:contact@sakfootball.com" className="text-rose-500 hover:underline font-medium">
                  contact@sakfootball.com
                </a>.
              </p>
            </section>
          </div>

          <div className="border-t border-gray-200 px-8 py-5 sm:px-10 flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="/contest-rules" className="hover:text-gray-700 transition-colors">Contest Rules</Link>
            <Link href="/responsible-gaming" className="hover:text-gray-700 transition-colors">Responsible Gaming</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
