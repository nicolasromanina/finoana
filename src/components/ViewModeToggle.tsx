import { Layers, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ViewModeToggleProps {
  isParallelMode: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function ViewModeToggle({ isParallelMode, onToggle, disabled }: ViewModeToggleProps) {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => !isParallelMode && onToggle()}
        disabled={disabled}
        className={cn(
          "gap-2 h-8 px-3 transition-all",
          !isParallelMode && "bg-background shadow-sm"
        )}
      >
        <LayoutList className="h-4 w-4" />
        <span className="hidden sm:inline">{t.singleView}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => isParallelMode && onToggle()}
        disabled={disabled}
        className={cn(
          "gap-2 h-8 px-3 transition-all",
          isParallelMode && "bg-background shadow-sm"
        )}
      >
        <Layers className="h-4 w-4" />
        <span className="hidden sm:inline">{t.parallelView}</span>
      </Button>
    </div>
  );
}
