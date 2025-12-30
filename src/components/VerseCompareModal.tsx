import { X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFontSize } from '@/contexts/FontSizeContext';
import { cn } from '@/lib/utils';
import type { ParallelVerse } from '@/types/bible';

interface VerseCompareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verseNumber: number;
  verseReference: string;
  translations: ParallelVerse[];
  isLoading?: boolean;
}

const languageFlags: Record<string, string> = {
  mg: '🇲🇬',
  en: '🇬🇧',
  ko: '🇰🇷',
  sw: 'TZ',
};

export function VerseCompareModal({
  open,
  onOpenChange,
  verseNumber,
  verseReference,
  translations,
  isLoading,
}: VerseCompareModalProps) {
  const { t } = useLanguage();
  const { fontSize } = useFontSize();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{t.compareTranslations}</span>
            <span className="text-sm font-normal text-muted-foreground">{verseReference}</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : translations.length > 0 ? (
              translations.map((translation) => (
                <div
                  key={translation.language}
                  className="p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{languageFlags[translation.language]}</span>
                    <span className="font-medium text-sm">{translation.languageName}</span>
                  </div>
                  <p className={cn(
                    "font-serif leading-relaxed",
                    `verse-text-${fontSize}`,
                    translation.language === 'ko' && "font-korean"
                  )}>
                    <span className="text-primary font-semibold mr-2">{verseNumber}</span>
                    {translation.text}
                  </p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                {t.noDataAvailable}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
