'use client';

import Image from 'next/image';
import { useState } from 'react';

interface LogoImageProps {
  width?: number;
  height?: number;
  className?: string;
  lightBg?: boolean;
}

export function LogoImage({ width = 50, height = 50, className = '', lightBg = true }: LogoImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-full flex-shrink-0 ${className}`}
        style={{
          width,
          height,
          backgroundColor: lightBg ? '#013369' : '#013369',
        }}
      >
        <span
          className="font-bold text-white"
          style={{ fontSize: Math.min(width, height) * 0.45 }}
        >
          S
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/LOGO.png"
      alt="SAKFootball"
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  );
}
