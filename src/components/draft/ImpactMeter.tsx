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
  // impact & potential: higher is better. 8-10 green, 5-7 yellow, 1-4 red
  if (value >= 8) return 'bg-green-500';
  if (value >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function ImpactMeter({ label, value, max = 10, variant = 'impact' }: ImpactMeterProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  const barColor = getBarColor(variant, value);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">
          {value}/{max}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
