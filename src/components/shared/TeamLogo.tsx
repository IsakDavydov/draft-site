'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getTeamLogoUrl, TEAM_COLORS_BY_NAME } from '@/lib/adapters/teams';

interface TeamLogoProps {
  teamName: string;
  size?: number;
  className?: string;
}

export function TeamLogo({ teamName, size = 32, className = '' }: TeamLogoProps) {
  const [fallback, setFallback] = useState(false);
  const logoUrl = getTeamLogoUrl(teamName);
  const initial = teamName.split(' ').pop()?.slice(0, 1) || '?';
  const teamColor = TEAM_COLORS_BY_NAME[teamName] || '#64748b';

  if (fallback || !logoUrl) {
    return (
      <div
        className={`flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: teamColor,
          fontSize: size * 0.45,
        }}
        title={teamName}
      >
        {initial}
      </div>
    );
  }

  return (
    <span
      className={`relative flex-shrink-0 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center ${className}`}
      style={{ width: size, height: size, padding: Math.max(2, size * 0.08) }}
      title={teamName}
    >
      <Image
        src={logoUrl}
        alt={teamName}
        fill
        className="object-contain"
        unoptimized
        onError={() => setFallback(true)}
      />
    </span>
  );
}
