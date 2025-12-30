import { cn } from '@/lib/utils';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layers, X, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ParallelVerse } from '@/types/bible';
import { motion, AnimatePresence } from 'framer-motion';

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
  sw: '🇹🇿',
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
    <div className="space-y-6">
      {/* Minimal language selector */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 border border-border/50">
        <Layers className="h-4 w-4 text-primary" />
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedLanguages.map((lang) => (
            <motion.button
              key={lang}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onRemoveLanguage(lang)}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-sm",
                "bg-primary/5 border border-primary/10",
                "hover:bg-primary/10 hover:border-primary/20 transition-all"
              )}
            >
              <span className="text-sm">{languageFlags[lang]}</span>
              <span className="font-medium">{languageNames[lang]}</span>
              {selectedLanguages.length > 1 && (
                <X className="h-3 w-3 text-muted-foreground" />
              )}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence>
          {unusedLanguages.length > 0 && selectedLanguages.length < 4 && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-1 border-l border-border/50 pl-2">
                {unusedLanguages.map((lang) => (
                  <Button
                    key={lang}
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddLanguage(lang)}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                  >
                    <span className="text-sm">{languageFlags[lang]}</span>
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Parallel verses - minimal stacked layout */}
      <div className="space-y-3">
        {parallelData.map((group, index) => (
          <motion.div
            key={group.verseNumber}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onVerseClick?.(group.verseNumber)}
            className={cn(
              "relative p-3 rounded-lg border transition-all cursor-pointer",
              selectedVerse === group.verseNumber
                ? "border-primary bg-primary/5"
                : "border-border/50 hover:border-border hover:bg-secondary/30"
            )}
          >
            {/* Verse number - subtle indicator */}
            <div className="absolute -top-2 left-3">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {group.verseNumber}
              </span>
            </div>

            {/* Translations stacked */}
            <div className="space-y-4 pt-1">
              {group.translations.map((translation, transIndex) => (
                <motion.div
                  key={`${group.verseNumber}-${translation.language}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + transIndex * 0.03 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{languageFlags[translation.language]}</span>
                    <span className="font-medium">{translation.languageName}</span>
                  </div>
                  
                  <p className={cn(
                    "leading-relaxed",
                    `verse-text-${fontSize}`,
                    translation.language === 'ko' && "font-korean",
                    translation.language === 'mg' && "font-malagasy"
                  )}>
                    {translation.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}