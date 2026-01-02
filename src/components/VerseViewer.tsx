import { cn } from '@/lib/utils';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Palette, Download, WifiOff, Bookmark, Sparkles, ChevronRight, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';
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
  onVerseBookmark?: (verseNumber: number) => void;
  bookmarkedVerses?: number[];
}

const highlightColorClasses: Record<HighlightColor, string> = {
  yellow: 'bg-gradient-to-r from-yellow-100/80 to-yellow-50/60 dark:from-yellow-900/40 dark:to-yellow-800/20 border-l-3 border-yellow-400',
  green: 'bg-gradient-to-r from-green-100/80 to-green-50/60 dark:from-green-900/40 dark:to-green-800/20 border-l-3 border-green-400',
  blue: 'bg-gradient-to-r from-blue-100/80 to-blue-50/60 dark:from-blue-900/40 dark:to-blue-800/20 border-l-3 border-blue-400',
  pink: 'bg-gradient-to-r from-pink-100/80 to-pink-50/60 dark:from-pink-900/40 dark:to-pink-800/20 border-l-3 border-pink-400',
  purple: 'bg-gradient-to-r from-purple-100/80 to-purple-50/60 dark:from-purple-900/40 dark:to-purple-800/20 border-l-3 border-purple-400',
};

const fontSizeClasses = {
  xs: 'text-xs leading-relaxed',
  sm: 'text-sm leading-relaxed',
  base: 'text-base leading-relaxed',
  lg: 'text-lg leading-relaxed',
  xl: 'text-xl leading-relaxed',
  '2xl': 'text-2xl leading-relaxed',
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
  onVerseBookmark,
  bookmarkedVerses = [],
}: VerseViewerProps) {
  const { fontSize } = useFontSize();
  const { uiLanguage, t } = useLanguage();
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getHighlightForVerse = (verseNum: number) => highlights.find(h => h.verse === verseNum);
  const getNoteForVerse = (verseNum: number) => notes.find(n => n.verse === verseNum);
  const isBookmarked = (verseNum: number) => bookmarkedVerses.includes(verseNum);

  // Scroll vers le verset sélectionné
  useEffect(() => {
    if (selectedVerse && containerRef.current) {
      const verseElement = containerRef.current.querySelector(`[data-verse="${selectedVerse}"]`);
      if (verseElement) {
        verseElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest' 
        });
      }
    }
  }, [selectedVerse]);

  // Si pas de versets
  if (verses.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative inline-block">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto">
              <WifiOff className="h-10 w-10 text-muted-foreground/60" />
            </div>
            <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight">{t.offline}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.noDataAvailable} {t.downloadForOffline}
            </p>
          </div>
          {onDownloadOffline && (
            <Button
              onClick={onDownloadOffline}
              variant="default"
              size="lg"
              className="gap-2 px-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Download className="h-5 w-5" />
              <span className="font-medium">{t.downloadForOffline}</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  const handleVerseClick = (verseNum: number) => {
    setActiveVerse(verseNum === activeVerse ? null : verseNum);
    onVerseClick?.(verseNum);
  };

  const handleVerseHoverStart = (verseNum: number) => {
    if (!selectedVerse) {
      setActiveVerse(verseNum);
    }
  };

  const handleVerseHoverEnd = () => {
    if (!selectedVerse) {
      setActiveVerse(null);
    }
  };

  return (
    <TooltipProvider>
      <div ref={containerRef} className="space-y-1 py-4 px-1 md:px-3">
        {showOfflinePrompt && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-sm backdrop-blur-sm animate-pulse-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Download className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.downloadForOffline}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t.downloadingData}
                  </p>
                </div>
              </div>
              {onDownloadOffline && (
                <Button
                  onClick={onDownloadOffline}
                  variant="default"
                  size="sm"
                  className="gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="text-xs font-medium">{t.apply}</span>
                </Button>
              )}
            </div>
          </div>
        )}
        
        {verses.map((verse, index) => {
          const highlight = getHighlightForVerse(verse.verse);
          const note = getNoteForVerse(verse.verse);
          const isVerseBookmarked = isBookmarked(verse.verse);
          
          return (
            <div
              key={verse.verse}
              data-verse={verse.verse}
              onClick={() => handleVerseClick(verse.verse)}
              onMouseEnter={() => handleVerseHoverStart(verse.verse)}
              onMouseLeave={handleVerseHoverEnd}
              onTouchStart={(e) => {
                handleVerseHoverStart(verse.verse);
                const timer = setTimeout(() => onVerseLongPress?.(verse.verse), 500);
                const clearTimer = () => clearTimeout(timer);
                e.currentTarget.addEventListener('touchend', clearTimer, { once: true });
                e.currentTarget.addEventListener('touchmove', clearTimer, { once: true });
              }}
              className={cn(
                "verse-card group relative p-4 rounded-xl transition-all duration-300 cursor-pointer",
                "hover:shadow-md hover:scale-[1.005] active:scale-[0.998]",
                "border border-transparent hover:border-border/50",
                selectedVerse === verse.verse && "bg-gradient-to-r from-primary/8 to-primary/3 shadow-sm scale-[1.01]",
                activeVerse === verse.verse && selectedVerse !== verse.verse && "bg-secondary/20",
                highlightedVerses.includes(verse.verse) && "bg-accent/5",
                highlight && highlightColorClasses[highlight.color]
              )}
              style={{
                animation: `fadeInUp 0.4s ease-out ${index * 30}ms both`,
              }}
            >
              <div className="flex gap-4 items-start">
                {/* Verse Number */}
                <div className="relative flex-shrink-0">
                  <div className={cn(
                    "verse-number h-8 w-8 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    "bg-secondary/60 group-hover:bg-secondary/80",
                    selectedVerse === verse.verse && "bg-primary text-primary-foreground scale-110 shadow-sm",
                    activeVerse === verse.verse && "scale-105"
                  )}>
                    {verse.verse}
                  </div>
                  
                  {/* Bookmark Button */}
                  {onVerseBookmark && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onVerseBookmark(verse.verse);
                      }}
                      className={cn(
                        "absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center",
                        "opacity-0 group-hover:opacity-100 transition-all duration-300",
                        "hover:scale-125 active:scale-95",
                        isVerseBookmarked && "opacity-100"
                      )}
                    >
                      <Bookmark className={cn(
                        "h-3 w-3",
                        isVerseBookmarked 
                          ? "fill-primary text-primary" 
                          : "text-muted-foreground/50 hover:text-primary"
                      )} />
                    </button>
                  )}
                </div>

                {/* Verse Text */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "verse-text leading-relaxed transition-all duration-300",
                    fontSizeClasses[fontSize],
                    uiLanguage === 'ko' && "font-korean",
                    selectedVerse === verse.verse && "font-medium"
                  )}>
                    {verse.text}
                  </p>
                  
                  {/* Note Preview */}
                  {note && (
                    <div className="mt-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-3.5 w-3.5 text-primary" />
                        <span className="text-xs font-medium text-muted-foreground">Note</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className={cn(
                  "flex flex-col gap-1 items-end transition-all duration-300",
                  "opacity-0 group-hover:opacity-100",
                  (highlight || note) && "opacity-100"
                )}>
                  <div className="flex items-center gap-1.5">
                    {highlight && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border">
                            <Palette className="h-3 w-3 text-primary" />
                            <span className="text-xs font-medium capitalize">{highlight.color}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Highlighted in {highlight.color}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    
                    {note && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="h-3 w-3 text-primary" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{note.content}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onVerseLongPress?.(verse.verse);
                      }}
                      className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              {selectedVerse === verse.verse && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full animate-pulse" />
              )}
            </div>
          );
        })}

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-pulse-subtle {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
}