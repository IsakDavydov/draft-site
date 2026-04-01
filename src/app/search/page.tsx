'use client';

import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-sak-darker min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Search SAKFootball</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for teams, players, prospects, articles..."
                className="w-full px-4 py-3 pl-12 border border-sak-border rounded-lg text-lg bg-sak-hover text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500" />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-brand-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-red/90 transition-colors"
            >
              Search
            </button>
          </form>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mx-auto"></div>
              <p className="mt-4 text-gray-400">Searching...</p>
            </div>
          )}

          {results.length === 0 && !loading && query && (
            <div className="text-center py-12 text-gray-500">
              No results found for &quot;{query}&quot;
            </div>
          )}

          {!query && (
            <div className="text-center py-12 text-gray-500">
              Enter a search term to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
