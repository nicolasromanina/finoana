import { cn } from '@/lib/utils';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Palette, Download, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Verse, VerseHighlight, VerseNote, HighlightColor } from '@/types/bible';

interface VerseViewerProps {
  verses: Verse[];
  selectedVerse?: number | null;
  onVerseClick?: (verseNumber: number) => void;
  onVerseLongPress?: (verseNumber: number) => void;
  highlightedVerses?: number[];
  highlights?: VerseHighlight[];
  notes?: VerseNote[];
  showOfflinePrompt?: boolean;
  onDownloadOffline?: () => void;
}

const highlightColorClasses: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-200/50 dark:bg-yellow-900/30',
  green: 'bg-green-200/50 dark:bg-green-900/30',
  blue: 'bg-blue-200/50 dark:bg-blue-900/30',
  pink: 'bg-pink-200/50 dark:bg-pink-900/30',
  purple: 'bg-purple-200/50 dark:bg-purple-900/30',
};

export function VerseViewer({ 
  verses, 
  selectedVerse, 
  onVerseClick,
  onVerseLongPress,
  highlightedVerses = [],
  highlights = [],
  notes = [],
  showOfflinePrompt = false,
  onDownloadOffline,
}: VerseViewerProps) {
  const { fontSize } = useFontSize();
  const { uiLanguage, t } = useLanguage();

  const getHighlightForVerse = (verseNum: number) => highlights.find(h => h.verse === verseNum);
  const hasNote = (verseNum: number) => notes.some(n => n.verse === verseNum);

  // Si pas de versets (erreur de chargement)
  if (verses.length === 0) {
    return (
      <div className="py-8 px-4 text-center space-y-4">
        <div className="flex flex-col items-center gap-3">
          <WifiOff className="h-12 w-12 text-muted-foreground/40" />
          <div className="space-y-2">
            <h3 className="font-medium">{t.offline}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {t.noDataAvailable} {t.downloadForOffline}
            </p>
          </div>
          {onDownloadOffline && (
            <Button
              onClick={onDownloadOffline}
              variant="default"
              size="sm"
              className="gap-2 mt-2"
            >
              <Download className="h-4 w-4" />
              {t.downloadForOffline}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 py-4">
      {showOfflinePrompt && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary border border-primary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WifiOff className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{t.downloadForOffline}</p>
                <p className="text-xs text-muted-foreground">
                  {t.downloadingData}
                </p>
              </div>
            </div>
            {onDownloadOffline && (
              <Button
                onClick={onDownloadOffline}
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="text-xs">{t.apply}</span>
              </Button>
            )}
          </div>
        </div>
      )}
      
      {verses.map((verse, index) => {
        const highlight = getHighlightForVerse(verse.verse);
        const hasNoteIndicator = hasNote(verse.verse);
        
        return (
          <div
            key={verse.verse}
            onClick={() => onVerseClick?.(verse.verse)}
            onContextMenu={(e) => {
              e.preventDefault();
              onVerseLongPress?.(verse.verse);
            }}
            onTouchStart={(e) => {
              const timer = setTimeout(() => onVerseLongPress?.(verse.verse), 500);
              const clearTimer = () => clearTimeout(timer);
              e.currentTarget.addEventListener('touchend', clearTimer, { once: true });
              e.currentTarget.addEventListener('touchmove', clearTimer, { once: true });
            }}
            className={cn(
              "verse-card fade-in relative p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer",
              selectedVerse === verse.verse && "bg-primary/5 border-l-2 border-primary",
              highlightedVerses.includes(verse.verse) && "bg-accent/10 border-l-accent",
              highlight && highlightColorClasses[highlight.color]
            )}
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <div className="flex gap-3">
              <span className="verse-number h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium flex-shrink-0">
                {verse.verse}
              </span>
              <span className={cn(
                "verse-text flex-1 leading-relaxed",
                `verse-text-${fontSize}`,
                uiLanguage === 'ko' && "font-korean"
              )}>
                {verse.text}
              </span>
            </div>
            {/* Indicators */}
            {(highlight || hasNoteIndicator) && (
              <div className="absolute top-2 right-2 flex gap-1">
                {highlight && <Palette className="h-3 w-3 text-primary/60" />}
                {hasNoteIndicator && <MessageSquare className="h-3 w-3 text-primary/60" />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}