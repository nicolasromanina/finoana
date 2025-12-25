import { Download, Share, Check, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { cn } from '@/lib/utils';

interface InstallButtonProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function InstallButton({ variant = 'default', className }: InstallButtonProps) {
  const { t } = useLanguage();
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();

  // Don't show if already installed
  if (isInstalled) {
    return variant === 'default' ? (
      <div className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
        <Check className="h-4 w-4 text-green-500" />
        {t.appInstalled}
      </div>
    ) : null;
  }

  // Show iOS instructions
  if (isIOS) {
    return (
      <div className={cn("space-y-2", className)}>
        <p className="text-sm font-medium flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          {t.installInstructions}
        </p>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li className="flex items-center gap-2">
            <Share className="h-4 w-4 inline" />
            {t.iosInstallStep1}
          </li>
          <li>{t.iosInstallStep2}</li>
        </ol>
      </div>
    );
  }

  // Show install button for Android/Desktop
  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      onClick={promptInstall}
      variant={variant === 'compact' ? 'ghost' : 'default'}
      size={variant === 'compact' ? 'sm' : 'default'}
      className={cn("gap-2", className)}
    >
      <Download className="h-4 w-4" />
      {t.installApp}
    </Button>
  );
}
