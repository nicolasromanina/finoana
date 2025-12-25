import { cn } from '@/lib/utils';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Palette } from 'lucide-react';
import type { Verse, VerseHighlight, VerseNote, HighlightColor } from '@/types/bible';

interface VerseViewerProps {
  verses: Verse[];
  selectedVerse?: number | null;
  onVerseClick?: (verseNumber: number) => void;
  onVerseLongPress?: (verseNumber: number) => void;
  highlightedVerses?: number[];
  highlights?: VerseHighlight[];
  notes?: VerseNote[];
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
}: VerseViewerProps) {
  const { fontSize } = useFontSize();
  const { uiLanguage } = useLanguage();

  const getHighlightForVerse = (verseNum: number) => highlights.find(h => h.verse === verseNum);
  const hasNote = (verseNum: number) => notes.some(n => n.verse === verseNum);

  return (
    <div className="space-y-2 py-4">
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
              "verse-card fade-in relative",
              selectedVerse === verse.verse && "selected",
              highlightedVerses.includes(verse.verse) && "bg-accent/10 border-l-accent",
              highlight && highlightColorClasses[highlight.color]
            )}
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <span className="verse-number">{verse.verse}</span>
            <span className={cn(
              "verse-text", 
              `verse-text-${fontSize}`,
              uiLanguage === 'ko' && "font-korean"
            )}>
              {verse.text}
            </span>
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
