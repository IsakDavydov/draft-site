export const metadata = {
  title: 'Terms of Service | SAKFootball',
  description: 'SAKFootball terms of service. Usage rules for our NFL analysis and draft prediction platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p className="text-sm text-gray-500">Last updated: February 12, 2026</p>
            <p>Welcome to SAKFootball. By using our website and services, you agree to these Terms. If you do not agree, do not use the Service.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Acceptance</h2>
            <p>You must be at least 18 and agree to these Terms, our Privacy Policy, and Contest Rules when participating.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Service</h2>
            <p>SAKFootball provides NFL analysis, draft predictions, and fantasy rankings for entertainment. Our content is opinions only, not financial or legal advice.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Conduct</h2>
            <p>You are responsible for your account. Do not use the Service for unlawful purposes, fraud, or harassment. We may suspend or terminate violating accounts.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Disclaimer</h2>
            <p>THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES. Our content is for entertainment only.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
            <p>Questions? Email <a href="mailto:contact@sakfootball.com" className="text-nfl-red hover:underline">contact@sakfootball.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
