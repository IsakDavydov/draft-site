export const metadata = {
  title: 'Responsible Gaming | SAKFootball',
  description: 'SAKFootball promotes responsible gaming. Resources and help for gambling problems.',
};

export default function ResponsibleGamingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Responsible Gaming</h1>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>SAKFootball promotes responsible gaming and gambling practices. Our site provides analysis, picks, and draft predictions for entertainment purposes only. We encourage all users to gamble responsibly and within their means.</p>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">If you have a gambling problem</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-4">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Call 1-800-GAMBLER</h3>
              <p className="text-red-800 mb-2">Help is available 24/7. The National Problem Gambling Helpline connects you with confidential support and resources.</p>
              <p className="text-red-800 text-sm">Visit <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="underline">ncpgambling.org</a> for additional resources.</p>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mt-8">21+ only</h2>
            <p>Content related to picks and betting analysis is intended for adults 21 years of age or older, where legal. Please comply with the laws of your jurisdiction.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
