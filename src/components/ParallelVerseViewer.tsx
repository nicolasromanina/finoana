import { cn } from '@/lib/utils';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layers, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ParallelVerse } from '@/types/bible';

interface ParallelVerseViewerProps {
  parallelData: {
    verseNumber: number;
    translations: ParallelVerse[];
  }[];
  selectedVerse?: number | null;
  onVerseClick?: (verseNumber: number) => void;
  selectedLanguages: string[];
  availableLanguages: string[];
  onAddLanguage: (lang: string) => void;
  onRemoveLanguage: (lang: string) => void;
  languageNames: Record<string, string>;
}

const languageFlags: Record<string, string> = {
  mg: '🇲🇬',
  en: '🇬🇧',
  ko: '🇰🇷',
};

export function ParallelVerseViewer({ 
  parallelData, 
  selectedVerse, 
  onVerseClick,
  selectedLanguages,
  availableLanguages,
  onAddLanguage,
  onRemoveLanguage,
  languageNames,
}: ParallelVerseViewerProps) {
  const { fontSize } = useFontSize();
  const { t } = useLanguage();
  
  const unusedLanguages = availableLanguages.filter(l => !selectedLanguages.includes(l));

  return (
    <div className="space-y-4 py-4">
      {/* Language selection bar */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border">
        <Layers className="h-4 w-4 text-primary shrink-0" />
        <span className="text-sm font-medium text-muted-foreground mr-2">
          {t.selectTranslations}:
        </span>
        
        {selectedLanguages.map((lang) => (
          <div
            key={lang}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-sm"
          >
            <span>{languageFlags[lang]}</span>
            <span className="font-medium">{languageNames[lang]}</span>
            {selectedLanguages.length > 1 && (
              <button
                onClick={() => onRemoveLanguage(lang)}
                className="ml-1 p-0.5 hover:bg-primary/20 rounded-full transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        
        {unusedLanguages.length > 0 && selectedLanguages.length < 4 && (
          <div className="flex gap-1">
            {unusedLanguages.map((lang) => (
              <Button
                key={lang}
                variant="ghost"
                size="sm"
                onClick={() => onAddLanguage(lang)}
                className="h-7 px-2 gap-1"
              >
                <Plus className="h-3 w-3" />
                <span>{languageFlags[lang]}</span>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Parallel verses */}
      {parallelData.map((group, index) => (
        <div
          key={group.verseNumber}
          onClick={() => onVerseClick?.(group.verseNumber)}
          className={cn(
            "parallel-verse-group cursor-pointer fade-in",
            selectedVerse === group.verseNumber && "ring-2 ring-primary"
          )}
          style={{ animationDelay: `${index * 30}ms` }}
        >
          {/* Verse number header */}
          <div className="parallel-verse-header">
            <span className="w-7 h-7 rounded-lg bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
              {group.verseNumber}
            </span>
            <span className="text-xs text-muted-foreground">
              {t.verse} {group.verseNumber}
            </span>
          </div>
          
          {/* Translations stacked vertically */}
          <div className="parallel-verse-content">
            {group.translations.map((translation) => (
              <div key={translation.language} className="parallel-translation">
                <div className="parallel-translation-label">
                  <span>{languageFlags[translation.language]}</span>
                  <span>{translation.languageName}</span>
                </div>
                <p className={cn(
                  "font-serif leading-relaxed",
                  `verse-text-${fontSize}`,
                  translation.language === 'ko' && "font-korean"
                )}>
                  {translation.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
