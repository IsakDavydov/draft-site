export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About SAKFootball</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              SAKFootball is your comprehensive destination for NFL analysis, fantasy insights, draft coverage, and expert picks. 
              Our mission is to provide football fans with the tools and information they need to make informed decisions and 
              dominate their fantasy leagues.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">What We Offer</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Season Analysis</h3>
                <p className="text-gray-600">
                  Comprehensive coverage of the NFL season including standings, playoff odds, schedules, and team analysis.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fantasy Rankings</h3>
                <p className="text-gray-600">
                  Expert fantasy rankings with tier lists, scoring system toggles, and weekly updates.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Draft Coverage</h3>
                <p className="text-gray-600">
                  Prospect database, big board rankings, and weekly mock drafts to keep you ahead of the curve.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Expert Picks</h3>
                <p className="text-gray-600">
                  Weekly picks with confidence ratings, unit tracking, and ROI analysis for informed decision making.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our team consists of football analysts, fantasy experts, and data scientists who are passionate about 
              providing accurate, timely, and actionable insights to our users.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Have questions, suggestions, or feedback? We&apos;d love to hear from you. Reach out to us at 
              <a href="mailto:contact@sakfootball.com" className="text-nfl-red hover:text-nfl-blue ml-1">
                contact@sakfootball.com
              </a>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Disclaimer</h3>
              <p className="text-blue-800 text-sm">
                SAKFootball provides analysis and information for entertainment purposes only. Our picks and analysis 
                are not financial advice, and we encourage responsible gambling. Please ensure you comply with all 
                applicable laws and regulations in your jurisdiction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
