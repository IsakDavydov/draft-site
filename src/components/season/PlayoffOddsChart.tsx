'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getPlayoffOdds, getTeams } from '@/lib/adapters';

interface PlayoffOddsData {
  teamId: string;
  odds: number;
  teamName: string;
  teamColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export function PlayoffOddsChart() {
  const [data, setData] = useState<PlayoffOddsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [oddsData, teamsData] = await Promise.all([
          getPlayoffOdds(),
          getTeams(),
        ]);
        
        const chartData = oddsData.map(odds => {
          const team = teamsData.find(t => t.id === odds.teamId);
          return {
            teamId: odds.teamId,
            odds: odds.odds * 100, // Convert to percentage
            teamName: team ? `${team.city} ${team.nickname}` : odds.teamId,
            teamColors: team ? team.colors : { primary: '#6B7280', secondary: '#9CA3AF', accent: '#FFFFFF' },
          };
        });
        
        setData(chartData.sort((a, b) => b.odds - a.odds));
      } catch (error) {
        console.error('Error loading playoff odds:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading playoff odds...</div>
      </div>
    );
  }

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="teamName"
            angle={-45}
            textAnchor="end"
            height={100}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            tickFormatter={(value) => `${value.toFixed(0)}%`}
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Playoff Odds']}
            labelFormatter={(label) => label}
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', color: '#111827' }}
          />
          <Bar
            dataKey="odds"
            fill="#E8372C"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
