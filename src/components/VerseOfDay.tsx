import { useEffect, useState } from 'react';
import { Sparkles, ChevronRight, RefreshCw, BookOpen, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BibleApiService } from '@/services/bibleApi';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Verse, BookMetadata } from '@/types/bible';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface VerseOfDayProps {
  onNavigate?: (book: BookMetadata, chapter: number, verse: number) => void;
  books: BookMetadata[];
  language: string;
}

export function VerseOfDay({ onNavigate, books, language }: VerseOfDayProps) {
  const { t, uiLanguage } = useLanguage();
  const [verseData, setVerseData] = useState<{
    book: string;
    bookMeta: BookMetadata;
    chapter: number;
    verse: Verse;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const loadVerseOfDay = async (forceRefresh = false) => {
    if (books.length === 0) {
      setVerseData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    if (forceRefresh) setRefreshing(true);
    
    try {
      const api = new BibleApiService();
      const today = new Date();
      
      // Use stable seed based on date for consistency
      const seed = forceRefresh ? Date.now() : 
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      
      // Simple deterministic random based on seed
      const hash = seed.toString().split('').reduce((acc, char) => 
        acc + char.charCodeAt(0), 0
      );
      
      const bookIndex = (hash + (forceRefresh ? Math.random() : 0)) % books.length;
      const selectedBookMeta = books[Math.floor(bookIndex)];

      const bookData = await api.fetchBook(language, selectedBookMeta.file);
      const chapters = bookData?.chapters ?? [];
      if (chapters.length === 0) {
        setVerseData(null);
        return;
      }

      const chapterIndex = today.getDate() % chapters.length;
      const chapter = chapters[chapterIndex];
      const verses = chapter?.verses ?? [];
      if (verses.length === 0) {
        setVerseData(null);
        return;
      }

      const verseIndex = (today.getDate() + today.getMonth()) % verses.length;
      const verse = verses[verseIndex];
      if (!verse) {
        setVerseData(null);
        return;
      }

      setVerseData({
        book: bookData.book,
        bookMeta: selectedBookMeta,
        chapter: chapter.chapter,
        verse,
      });
    } catch (error) {
      console.error('Error loading verse of day:', error);
      setVerseData(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVerseOfDay();
  }, [books, language]);

  const handleCopy = () => {
    if (!verseData) return;
    
    const text = `"${verseData.verse.text}" — ${verseData.book} ${verseData.chapter}:${verseData.verse.verse}`;
    navigator.clipboard.writeText(text);
    
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2000);
  };

  const handleShare = async () => {
    if (!verseData) return;
    
    const text = `"${verseData.verse.text}" — ${verseData.book} ${verseData.chapter}:${verseData.verse.verse}\n\n#VerseOfTheDay`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.verseOfTheDay,
          text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  if (loading) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-3 w-24 bg-muted/50 rounded" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-5 w-full bg-muted rounded" />
            <div className="h-5 w-4/5 bg-muted rounded" />
            <div className="h-5 w-3/5 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!verseData) return null;

  const isLongVerse = verseData.verse.text.length > 150;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 rounded-2xl p-6 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30">
        {/* Animated gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-30" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-xl opacity-20" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur-sm opacity-20" />
                <div className="relative p-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
              <div>
                <h3 className="font-semibold text-primary">{t.verseOfTheDay}</h3>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString(uiLanguage, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => loadVerseOfDay(true)}
                disabled={refreshing}
                className="p-2 rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn(
                  "w-4 h-4 text-muted-foreground",
                  refreshing && "animate-spin"
                )} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>
          </div>

          {/* Verse Content */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={`${verseData.book}-${verseData.chapter}-${verseData.verse.verse}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "font-serif leading-relaxed text-foreground mb-6 relative",
                isLongVerse ? "text-lg" : "text-xl md:text-2xl",
                uiLanguage === 'ko' ? "font-korean" : "",
                uiLanguage === 'mg' ? "font-malagasy" : ""
              )}
            >
              {/* Opening quote */}
              <span className="absolute -left-3 -top-2 text-4xl text-primary/20 font-serif">
                "
              </span>
              
              {verseData.verse.text}
              
              {/* Closing quote */}
              <span className="text-4xl text-primary/20 font-serif align-super">
                "
              </span>
            </motion.blockquote>
          </AnimatePresence>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <cite className="text-sm font-medium not-italic text-foreground">
                  {verseData.book} {verseData.chapter}:{verseData.verse.verse}
                </cite>
              </div>
              
              <AnimatePresence>
                {showCopyFeedback && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-xs font-medium text-emerald-500 px-2 py-1 bg-emerald-500/10 rounded-full"
                  >
                    {t.copied}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {onNavigate && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate(verseData.bookMeta, verseData.chapter, verseData.verse.verse)}
                  className="gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 group/button"
                >
                  <span className="text-primary">{t.readMore}</span>
                  <ChevronRight className="w-4 h-4 text-primary transition-transform group-hover/button:translate-x-1" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Progress indicator for the day */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>{t.progress}</span>
              <span>{Math.round((new Date().getHours() / 24) * 100)}%</span>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(new Date().getHours() / 24) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inspiration message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-center"
      >
        <p className="text-xs text-muted-foreground">
          {getInspirationMessage(new Date().getHours())}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Helper function for time-based inspiration messages
function getInspirationMessage(hour: number): string {
  if (hour < 6) return "Start your day with inspiration";
  if (hour < 12) return "Morning blessings for you";
  if (hour < 18) return "Afternoon encouragement";
  if (hour < 22) return "Evening reflection";
  return "Night comfort and peace";
}