'use client';

import { useState, useEffect } from 'react';
import { getMockDraftFromFile } from '@/lib/adapters';
import { MockDraftFromFile } from '@/types';

export function WeeklyMock() {
  const [mockDraft, setMockDraft] = useState<MockDraftFromFile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getMockDraftFromFile('post-super-bowl-mock-draft-2026.json');
        setMockDraft(data);
      } catch (error) {
        console.error('Error loading mock draft:', error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!mockDraft) {
    return (
      <div className="text-center py-12 text-gray-500">
        No mock draft available.
      </div>
    );
  }

  return (
    <div>
      {/* Mock Draft Header */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{mockDraft.title}</h3>
          <p className="text-sm text-gray-600">
            {mockDraft.author} · {mockDraft.date}
          </p>
        </div>
      </div>

      {/* Picks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDraft.picks.map((pick) => (
          <div
            key={pick.pick}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-nfl-blue/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-nfl-blue text-white rounded-lg flex items-center justify-center font-bold text-lg">
                {pick.pick}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-600">{pick.team}</div>
                <div className="text-lg font-semibold text-gray-900 mt-0.5">
                  {pick.player || '—'}
                </div>
                <div className="flex flex-wrap gap-x-2 gap-y-1 mt-2 text-sm text-gray-500">
                  {pick.position && <span>{pick.position}</span>}
                  {pick.school && <span>· {pick.school}</span>}
                  {pick.height && pick.weight && (
                    <span>· {pick.height}, {pick.weight} lbs</span>
                  )}
                </div>
                {pick.notes && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{pick.notes}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
