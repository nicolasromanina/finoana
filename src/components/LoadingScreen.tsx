import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function LoadingScreen() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-muted-foreground">{t.loading}</p>
      </div>
    </div>
  );
}
