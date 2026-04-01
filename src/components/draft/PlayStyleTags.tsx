import {
  Zap,
  Target,
  Brain,
  Flame,
  Move,
  Trophy,
  Layers,
  Activity,
  Shield,
  Crown,
  Dumbbell,
  Hand,
  TrendingUp,
  Gem,
  Route,
  Hammer,
  Award,
  AlertCircle,
  CheckCircle,
  Ruler,
  Maximize2,
  Minimize2,
  FileText,
  Puzzle,
  Clock,
  Sprout,
  LucideIcon,
} from 'lucide-react';

interface PlayStyleTagsProps {
  tags: string[];
}

const TAG_ICONS: Record<string, LucideIcon> = {
  Polished: Award,
  'Pocket passer': Target,
  'Arm talent': Zap,
  'Decision maker': Brain,
  Explosive: Flame,
  'Receiving back': Hand,
  Elusive: Move,
  'Big play': Trophy,
  Versatile: Layers,
  'High motor': Activity,
  'Pass rush': Zap,
  'Run stopper': Shield,
  'Box safety': Shield,
  Leader: Crown,
  Tackler: Target,
  'Former safety': Target,
  Coverage: Shield,
  Physical: Dumbbell,
  Electric: Zap,
  YAC: Move,
  'Contested catches': Hand,
  'Contested catch': Hand,
  Burst: Zap,
  Production: TrendingUp,
  Upside: TrendingUp,
  Athletic: Activity,
  Raw: Gem,
  'Route runner': Route,
  Separation: Move,
  Mauler: Hammer,
  'Pass pro': Shield,
  'Run blocker': Shield,
  OT1: Award,
  'Man coverage': Shield,
  'Man corner': Shield,
  'Ball skills': Target,
  'Injury concern': AlertCircle,
  Complete: CheckCircle,
  'Pro ready': Award,
  Interior: Shield,
  'Day one starter': Award,
  Technique: Ruler,
  'Guard-tackle': Layers,
  Size: Maximize2,
  'Run defense': Shield,
  Undersized: Minimize2,
  'Limited sample': FileText,
  Tackle: Shield,
  Leadership: Crown,
  'Scheme fit': Puzzle,
  'Every down': Clock,
  Developing: Sprout,
};

function getIconForTag(tag: string): LucideIcon {
  return TAG_ICONS[tag] ?? Target;
}

export function PlayStyleTags({ tags }: PlayStyleTagsProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const Icon = getIconForTag(tag);
        return (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red/10 px-3 py-1.5 text-xs font-medium text-brand-red ring-1 ring-inset ring-brand-red/20 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
          >
            <Icon className="h-3.5 w-3.5 flex-shrink-0 opacity-80" />
            {tag}
          </span>
        );
      })}
    </div>
  );
}
