'use client';

import Image from 'next/image';
import { useState } from 'react';
import { getCollegeLogoUrl } from '@/lib/adapters/colleges';

interface CollegeLogoProps {
  school: string;
  size?: number;
  className?: string;
}

export function CollegeLogo({ school, size = 32, className = '' }: CollegeLogoProps) {
  const [fallback, setFallback] = useState(false);
  const logoUrl = getCollegeLogoUrl(school);
  const initial = school.split(' ').pop()?.slice(0, 1) || '?';

  if (fallback || !logoUrl) {
    return (
      <div
        className={`flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold bg-slate-500 ${className}`}
        style={{
          width: size,
          height: size,
          fontSize: size * 0.45,
        }}
        title={school}
      >
        {initial}
      </div>
    );
  }

  return (
    <span
      className={`relative flex-shrink-0 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center ${className}`}
      style={{ width: size, height: size, padding: Math.max(2, size * 0.08) }}
      title={school}
    >
      <Image
        src={logoUrl}
        alt={school}
        fill
        className="object-contain"
        unoptimized
        onError={() => setFallback(true)}
      />
    </span>
  );
}
