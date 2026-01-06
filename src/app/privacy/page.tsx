export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-4">Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
