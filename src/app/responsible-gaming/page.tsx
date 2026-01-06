export default function ResponsibleGamingPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Responsible Gaming</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>FootballSite promotes responsible gaming and gambling practices.</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">If you have a gambling problem, call 1-800-GAMBLER</h3>
              <p className="text-red-800">Help is available 24/7. Please gamble responsibly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
