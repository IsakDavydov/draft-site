export const metadata = {
  title: 'Privacy Policy | SAKFootball',
  description: 'SAKFootball privacy policy. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p className="text-sm text-gray-500">Last updated: February 12, 2026</p>
            <p>SAKFootball (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Information We Collect</h2>
            <p>We collect account info (email, password), profile info (display name), predictions you create, and communications you send. We also collect technical data (IP, browser, pages visited) to improve the service.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Third-Party Advertising and Cookies</h2>
            <p>We may use Google AdSense and other ad services. These use cookies for relevant ads and measurement. Learn more at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-nfl-red hover:underline">Google ad policies</a>. Opt out via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-nfl-red hover:underline">Google Ads Settings</a>.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">How We Use and Share</h2>
            <p>We use your info to provide the service, show leaderboards, and respond to you. We may share with service providers like Supabase. We do not sell your data. Display names and scores are public by design.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact</h2>
            <p>Questions? Email <a href="mailto:contact@sakfootball.com" className="text-nfl-red hover:underline">contact@sakfootball.com</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
