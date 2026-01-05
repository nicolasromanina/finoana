// QuickActions.tsx - Minimal Design
import { BookOpen, HelpCircle, Zap, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionsProps {
  mode: string;
  onAction: (action: string) => void;
}

const QUICK_ACTIONS_FR = [
  {
    id: 'sola-scriptura',
    title: 'Sola Scriptura',
    description: 'L\'autorité exclusive de l\'Écriture',
    icon: BookOpen,
    color: 'primary',
  },
  {
    id: 'tulip',
    title: 'TULIP Calviniste',
    description: 'Cinq points du Calvinisme',
    icon: Zap,
    color: 'purple',
  },
  {
    id: 'predestination',
    title: 'Prédestination',
    description: 'Élection souveraine de Dieu',
    icon: HelpCircle,
    color: 'emerald',
  },
  {
    id: 'soteriology',
    title: 'Sotériologie',
    description: 'Doctrine du salut',
    icon: Sparkles,
    color: 'amber',
  },
];

const QUICK_ACTIONS_MG = [
  {
    id: 'sola-scriptura',
    title: 'Sola Scriptura',
    description: 'Fahefana ihana ny Soratra',
    icon: BookOpen,
    color: 'primary',
  },
  {
    id: 'tulip',
    title: 'TULIP Kalvinista',
    description: 'Points telona sy roa Kalvinisma',
    icon: Zap,
    color: 'purple',
  },
  {
    id: 'predestination',
    title: 'Predestination',
    description: 'Fisafidiana izy Andriamanitra',
    icon: HelpCircle,
    color: 'emerald',
  },
  {
    id: 'soteriology',
    title: 'Soteriôlôjia',
    description: 'Fampianarana momba ny famonjena',
    icon: Sparkles,
    color: 'amber',
  },
];

export function QuickActions({ mode, onAction }: QuickActionsProps) {
  const actions = mode.includes('fr') ? QUICK_ACTIONS_FR : QUICK_ACTIONS_MG;

  if (!mode.includes('teaching')) return null;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
      {actions.map((action) => {
        const Icon = action.icon;
        const colorClasses = {
          primary: "bg-primary/10 text-primary border-primary/20",
          purple: "bg-purple-500/10 text-purple-700 border-purple-500/20",
          emerald: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          amber: "bg-amber-500/10 text-amber-700 border-amber-500/20",
        }[action.color];

        return (
          <button
            key={action.id}
            onClick={() => onAction(action.title)}
            className={cn(
              "group text-left p-3 rounded-lg border transition-all hover:scale-[1.02] active:scale-[0.98]",
              colorClasses
            )}
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 rounded-md bg-background/50">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">
                  {action.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}