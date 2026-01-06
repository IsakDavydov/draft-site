'use client';

import { useState, useEffect } from 'react';
import { getBigBoard } from '@/lib/adapters';
import { Prospect } from '@/types';

export function BigBoard() {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBigBoard();
  }, []);

  async function loadBigBoard() {
    try {
      setLoading(true);
      const data = await getBigBoard();
      setProspects(data);
    } catch (error) {
      console.error('Error loading big board:', error);
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mock Draft
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prospects.map((prospect, index) => (
              <tr key={prospect.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{prospect.name}</div>
                  <div className="text-sm text-gray-500">{prospect.height}, {prospect.weight} lbs</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {prospect.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {prospect.school}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {prospect.ras ? `${prospect.ras}/10` : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {prospect.mockDraftRound && prospect.mockDraftPick ? (
                    <span>
                      Round {prospect.mockDraftRound}, Pick {prospect.mockDraftPick}
                    </span>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
