'use client';

import { useEffect, useState } from 'react';

interface ImpactMeterProps {
  label: string;
  value: number;
  max?: number;
  /** impact/potential: higher=green, mid=yellow, low=red. risk: ≤5=green, ≥6=red */
  variant?: 'impact' | 'potential' | 'risk';
}

function getBarColor(variant: string, value: number): string {
  if (variant === 'risk') {
    return value <= 5 ? 'bg-green-500' : 'bg-red-500';
  }
  if (value >= 8) return 'bg-green-500';
  if (value >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function ImpactMeter({ label, value, max = 10, variant = 'impact' }: ImpactMeterProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const barColor = getBarColor(variant, value);

  useEffect(() => {
    const id = setTimeout(() => setAnimatedPercent(percent), 50);
    return () => clearTimeout(id);
  }, [percent]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-600">{label}</span>
        <span className="font-semibold tabular-nums text-gray-900">
          {value}/{max}
        </span>
      </div>
      <div className="h-3.5 w-full overflow-hidden rounded-xl bg-gray-100">
        <div
          className={`h-full rounded-xl ${barColor} shadow-sm transition-[width] duration-700 ease-out`}
          style={{ width: `${animatedPercent}%` }}
        />
      </div>
    </div>
  );
}
