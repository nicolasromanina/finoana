import { Download, Share, Check, Smartphone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { cn } from '@/lib/utils';

interface InstallButtonProps {
  variant?: 'default' | 'compact';
  className?: string;
  showIOSInstructions?: boolean;
}

export function InstallButton({ variant = 'default', className, showIOSInstructions = true }: InstallButtonProps) {
  const { t } = useLanguage();
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();

  // Already installed - show confirmation
  if (isInstalled) {
    if (variant === 'compact') return null;
    
    return (
      <div className={cn("flex items-center gap-2 text-sm text-green-600 dark:text-green-400", className)}>
        <Check className="h-4 w-4" />
        {t.appInstalled}
      </div>
    );
  }

  // iOS device - show instructions
  if (isIOS && showIOSInstructions) {
    if (variant === 'compact') {
      return (
        <div className={cn("text-sm text-muted-foreground", className)}>
          <p className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            {t.installInstructions}
          </p>
        </div>
      );
    }

    return (
      <div className={cn("space-y-3 p-4 rounded-xl bg-secondary", className)}>
        <p className="text-sm font-medium flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          {t.installInstructions}
        </p>
        <ol className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-start gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
            <span className="flex items-center gap-1.5">
              <Share className="h-4 w-4 shrink-0" />
              {t.iosInstallStep1}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">2</span>
            <span className="flex items-center gap-1.5">
              <Plus className="h-4 w-4 shrink-0" />
              {t.iosInstallStep2}
            </span>
          </li>
        </ol>
      </div>
    );
  }

  // Can install on Android/Desktop
  if (isInstallable) {
    return (
      <Button
        onClick={promptInstall}
        variant={variant === 'compact' ? 'secondary' : 'default'}
        size={variant === 'compact' ? 'sm' : 'default'}
        className={cn("gap-2", className)}
      >
        <Download className="h-4 w-4" />
        {t.installApp}
      </Button>
    );
  }

  // Not installable and not iOS - could be already opened in app mode or unsupported browser
  return null;
}
