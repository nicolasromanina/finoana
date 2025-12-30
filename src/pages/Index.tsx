import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ChapterNavigation } from '@/components/ChapterNavigation';
import { VerseViewer } from '@/components/VerseViewer';
import { ParallelVerseViewer } from '@/components/ParallelVerseViewer';
import { VerseOfDay } from '@/components/VerseOfDay';
import { FloatingActions } from '@/components/FloatingActions';
import { ReadingProgressCard } from '@/components/ReadingProgressCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SearchDialog } from '@/components/SearchDialog';
import { BookmarksDialog } from '@/components/BookmarksDialog';
import { ReadingPlansDialog } from '@/components/ReadingPlansDialog';
import { ReadingStatsDialog } from '@/components/ReadingStatsDialog';
import { ReadingStatsWidget } from '@/components/ReadingStatsWidget';
import { BadgesDialog } from '@/components/BadgesDialog';
import { VerseActionsDialog } from '@/components/VerseActionsDialog';
import { SettingsDialog } from '@/components/SettingsDialog';
import { OnboardingDialog } from '@/components/OnboardingDialog';
import { AudioPlayer } from '@/components/AudioPlayer';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { useBibleData } from '@/hooks/useBibleData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearch } from '@/hooks/useSearch';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useParallelReading } from '@/hooks/useParallelReading';
import { useReadingPlans } from '@/hooks/useReadingPlans';
import { useHighlightsNotes } from '@/hooks/useHighlightsNotes';
import { useReadingStats } from '@/hooks/useReadingStats';
import { useBadges } from '@/hooks/useBadges';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, BookOpen } from 'lucide-react';
import type { BookMetadata, Bookmark, ReadingProgress, HighlightColor } from '@/types/bible';

function BibleApp() {
  const { t } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<string>('mg');
  const [selectedBook, setSelectedBook] = useState<BookMetadata | null>(null);
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>('bookmarks', []);
  const [readingProgress, setReadingProgress] = useLocalStorage<ReadingProgress | null>('readingProgress', null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [readingPlansOpen, setReadingPlansOpen] = useState(false);
  const [verseActionsOpen, setVerseActionsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [badgesOpen, setBadgesOpen] = useState(false);
  const [actionVerse, setActionVerse] = useState<number | null>(null);

  const { dbService, isInitialized } = useIndexedDB();

  // Check for first launch onboarding
  useEffect(() => {
    const hasOnboarded = localStorage.getItem('hasCompletedOnboarding');
    if (!hasOnboarded) {
      setOnboardingOpen(true);
    }
  }, []);
  
  const { languages, books, bookData, loading, error } = useBibleData({
    dbService,
    language: selectedLanguage,
    selectedBook
  });

  const { results, isSearching, searchQuery, search, clearSearch } = useSearch({
    dbService,
    books,
    language: selectedLanguage,
  });

  const tts = useTextToSpeech({ language: selectedLanguage });

  const {
    selectedLanguages,
    availableLanguages,
    parallelData,
    isLoading: parallelLoading,
    isParallelMode,
    addLanguage,
    removeLanguage,
    toggleParallelMode,
    languageNames,
  } = useParallelReading({
    dbService,
    selectedBook,
    currentChapter,
    primaryLanguage: selectedLanguage,
  });

  const {
    availablePlans,
    userPlans,
    startPlan,
    markDayComplete,
    toggleNotifications,
    deletePlan,
    getTodaysReading,
    getPlanProgress,
    getPlanById,
  } = useReadingPlans({ dbService });

  const {
    highlights,
    notes,
    addHighlight,
    removeHighlight,
    addOrUpdateNote,
    deleteNote,
    getHighlightForVerse,
    getNoteForVerse,
  } = useHighlightsNotes({
    dbService,
    language: selectedLanguage,
    book: selectedBook?.id || '',
    chapter: currentChapter,
  });

  const {
    stats,
    startSession,
    endSession,
    getChaptersThisWeek,
    getReadingTimeThisWeek,
    getDailyData,
    formatTime,
  } = useReadingStats();

  const {
    badges,
    level,
    totalPoints,
    checkAndUnlockBadges,
    getProgress,
  } = useBadges();

  // Check badges whenever stats update
  useEffect(() => {
    checkAndUnlockBadges(stats);
  }, [stats, checkAndUnlockBadges]);

  useEffect(() => {
    tts.stop();
  }, [selectedBook, currentChapter]);

  useEffect(() => {
    if (selectedBook && currentChapter) {
      setReadingProgress({
        language: selectedLanguage,
        book: selectedBook.id,
        chapter: currentChapter,
        verse: selectedVerse || 1,
        timestamp: Date.now()
      });
    }
  }, [selectedBook, currentChapter, selectedVerse, selectedLanguage]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setSelectedBook(null);
    setCurrentChapter(1);
    setSelectedVerse(null);
    tts.stop();
  };

  const handleBookChange = (book: BookMetadata) => {
    // End previous session if exists
    endSession();
    setSelectedBook(book);
    setCurrentChapter(1);
    setSelectedVerse(null);
  };

  const handleChapterChange = (chapter: number) => {
    // End previous session and start new one
    endSession();
    setCurrentChapter(chapter);
    setSelectedVerse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start reading session when viewing a chapter
  useEffect(() => {
    if (selectedBook && currentChapter && bookData) {
      startSession(selectedBook.id, currentChapter);
    }
    return () => {
      // Cleanup handled by handleChapterChange/handleBookChange
    };
  }, [selectedBook?.id, currentChapter, bookData]);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(prev => prev === verseNumber ? null : verseNumber);
  };

  const handleVerseLongPress = (verseNumber: number) => {
    setActionVerse(verseNumber);
    setVerseActionsOpen(true);
  };

  const handleVerseOfDayNavigate = (book: BookMetadata, chapter: number, verse: number) => {
    setSelectedBook(book);
    setCurrentChapter(chapter);
    setSelectedVerse(verse);
  };

  const handleContinueReading = (book: BookMetadata, chapter: number) => {
    setSelectedBook(book);
    setCurrentChapter(chapter);
  };

  const handleSearchResultClick = useCallback((bookId: string, chapter: number, verse: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentChapter(chapter);
      setSelectedVerse(verse);
    }
  }, [books]);

  const handleBookmarkNavigate = useCallback((bookId: string, chapter: number, verse: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentChapter(chapter);
      setSelectedVerse(verse);
    }
  }, [books]);

  const handleDeleteBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks(prev => prev.filter(b => !(
      b.language === bookmark.language && 
      b.book === bookmark.book && 
      b.chapter === bookmark.chapter && 
      b.verse === bookmark.verse
    )));
  }, [setBookmarks]);

  const handleReadingPlanNavigate = useCallback((bookId: string, chapter: number) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setSelectedBook(book);
      setCurrentChapter(chapter);
    }
  }, [books]);

  const toggleBookmark = () => {
    if (!selectedBook || !selectedVerse || !bookData) return;
    
    const chapterData = bookData.chapters.find(c => c.chapter === currentChapter);
    const verseData = chapterData?.verses.find(v => v.verse === selectedVerse);
    
    if (!verseData) return;

    const newBookmark: Bookmark = {
      language: selectedLanguage,
      book: selectedBook.id,
      chapter: currentChapter,
      verse: selectedVerse,
      text: verseData.text,
      timestamp: Date.now()
    };

    const exists = bookmarks.some(b => 
      b.language === newBookmark.language && 
      b.book === newBookmark.book && 
      b.chapter === newBookmark.chapter && 
      b.verse === newBookmark.verse
    );

    if (exists) {
      setBookmarks(bookmarks.filter(b => !(
        b.language === newBookmark.language && 
        b.book === newBookmark.book && 
        b.chapter === newBookmark.chapter && 
        b.verse === newBookmark.verse
      )));
    } else {
      setBookmarks([...bookmarks, newBookmark]);
    }
  };

  const handlePlayChapter = useCallback(() => {
    if (!bookData || !currentChapterData) return;
    const texts = currentChapterData.verses.map(v => `${t.verse} ${v.verse}. ${v.text}`);
    tts.speak(texts);
  }, [bookData, currentChapter, tts, t]);

  const handleOpenCompare = () => {
    if (selectedVerse) {
      setCompareModalOpen(true);
    }
  };

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  const currentChapterData = bookData?.chapters.find(c => c.chapter === currentChapter);
  
  const isBookmarked = selectedBook && selectedVerse ? bookmarks.some(b => 
    b.language === selectedLanguage && 
    b.book === selectedBook.id && 
    b.chapter === currentChapter && 
    b.verse === selectedVerse
  ) : false;

  const selectedVerseData = currentChapterData?.verses.find(v => v.verse === selectedVerse);
  const verseReference = selectedBook && selectedVerse 
    ? `${bookData?.book || selectedBook.name} ${currentChapter}:${selectedVerse}`
    : undefined;

  const actionVerseData = actionVerse ? currentChapterData?.verses.find(v => v.verse === actionVerse) : null;
  const actionVerseReference = selectedBook && actionVerse 
    ? `${bookData?.book || selectedBook.name} ${currentChapter}:${actionVerse}`
    : '';

  const sidebarContent = (
    <Sidebar books={books} selectedBook={selectedBook} onBookChange={handleBookChange} />
  );

  return (
    <div className="min-h-screen bg-background">
      <OfflineIndicator />
      <Header
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenReadingPlans={() => setReadingPlansOpen(true)}
        onOpenStats={() => setStatsOpen(true)}
        onOpenBadges={() => setBadgesOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        bookmarksCount={bookmarks.length}
        sidebarContent={sidebarContent}
      />

      <div className="flex">
        <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 border-r border-border">
          {sidebarContent}
        </aside>

        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="container max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
            {!selectedBook && (
              <div className="space-y-4 sm:space-y-6 fade-in">
                <VerseOfDay books={books} language={selectedLanguage} onNavigate={handleVerseOfDayNavigate} />
                <ReadingStatsWidget
                  readingTimeThisWeek={getReadingTimeThisWeek()}
                  chaptersThisWeek={getChaptersThisWeek()}
                  currentStreak={stats.currentStreak}
                  longestStreak={stats.longestStreak}
                  formatTime={formatTime}
                  onOpenStats={() => setStatsOpen(true)}
                />
                <ReadingProgressCard progress={readingProgress} books={books} onContinue={handleContinueReading} />
                <div className="text-center py-8 sm:py-12">
                  <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary mb-4">
                    <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  
                  {/* Bouton "Commencer à lire" */}
                   <button
                      onClick={() => {
                        // Naviguer vers le premier livre (Genèse par exemple)
                        const firstBook = books.find(book => book.order === 1) || books[0];
                        if (firstBook) {
                          setSelectedBook(firstBook);
                          setCurrentChapter(1);
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground rounded-xl hover:rounded-lg transition-all duration-300 font-semibold text-lg sm:text-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-4 focus:ring-offset-background transform hover:scale-[1.02] active:scale-[0.98] mb-4 w-full max-w-xs mx-auto"
                    >
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                      {t.startReading}
                    </button>
                  
                  <p className="text-sm sm:text-base text-muted-foreground max-w-sm mx-auto">{t.selectBookHint}</p>
                </div>
              </div>
            )}

            {selectedBook && (
              <div className="fade-in">
                {error && (
                  <div className="flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-4 text-sm">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center justify-center py-20">
                    <div className="loading-spinner" />
                  </div>
                )}

                {!loading && bookData && currentChapterData && (
                  <>
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-6">{bookData.book}</h1>
                    <ChapterNavigation currentChapter={currentChapter} totalChapters={selectedBook.chapters || bookData.chapters.length} onChapterChange={handleChapterChange} />
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-4">
                      <AudioPlayer isPlaying={tts.isPlaying} isPaused={tts.isPaused} isSupported={tts.isSupported} currentIndex={tts.currentIndex} verses={currentChapterData.verses} onPlay={handlePlayChapter} onPause={tts.pause} onResume={tts.resume} onStop={tts.stop} />
                      <ViewModeToggle isParallelMode={isParallelMode} onToggle={toggleParallelMode} />
                    </div>

                    {isParallelMode ? (
                      <ParallelVerseViewer
                        parallelData={parallelData}
                        selectedVerse={selectedVerse}
                        onVerseClick={handleVerseClick}
                        selectedLanguages={selectedLanguages}
                        availableLanguages={availableLanguages}
                        onAddLanguage={addLanguage}
                        onRemoveLanguage={removeLanguage}
                        languageNames={languageNames}
                      />
                    ) : (
                      <VerseViewer 
                        verses={currentChapterData.verses} 
                        selectedVerse={selectedVerse} 
                        onVerseClick={handleVerseClick}
                        onVerseLongPress={handleVerseLongPress}
                        highlightedVerses={tts.isPlaying && tts.currentIndex >= 0 ? [currentChapterData.verses[tts.currentIndex]?.verse] : []}
                        highlights={highlights}
                        notes={notes}
                      />
                    )}

                    <div className="mt-6 pb-24">
                      <ChapterNavigation currentChapter={currentChapter} totalChapters={selectedBook.chapters || bookData.chapters.length} onChapterChange={handleChapterChange} />
                    </div>
                  </>
                )}

                {!loading && !bookData && (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground">{t.noDataAvailable} {selectedBook.name}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingActions 
        isVisible={!!selectedVerse} 
        isBookmarked={isBookmarked} 
        onToggleBookmark={toggleBookmark} 
        selectedVerseText={selectedVerseData?.text} 
        verseReference={verseReference}
      />
      
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} results={results} isSearching={isSearching} searchQuery={searchQuery} onSearch={search} onResultClick={handleSearchResultClick} onClear={clearSearch} />
      <BookmarksDialog open={bookmarksOpen} onOpenChange={setBookmarksOpen} bookmarks={bookmarks} books={books} onDeleteBookmark={handleDeleteBookmark} onNavigate={handleBookmarkNavigate} />
      
      <ReadingPlansDialog
        open={readingPlansOpen}
        onOpenChange={setReadingPlansOpen}
        availablePlans={availablePlans}
        userPlans={userPlans}
        books={books}
        onStartPlan={startPlan}
        onMarkDayComplete={markDayComplete}
        onToggleNotifications={toggleNotifications}
        onDeletePlan={deletePlan}
        onNavigateToReading={handleReadingPlanNavigate}
        getPlanProgress={getPlanProgress}
        getTodaysReading={getTodaysReading}
        getPlanById={getPlanById}
      />

      <ReadingStatsDialog
        open={statsOpen}
        onOpenChange={setStatsOpen}
        stats={stats}
        chaptersThisWeek={getChaptersThisWeek()}
        readingTimeThisWeek={getReadingTimeThisWeek()}
        dailyData={getDailyData()}
        formatTime={formatTime}
      />

      <BadgesDialog
        open={badgesOpen}
        onOpenChange={setBadgesOpen}
        badges={badges}
        level={level}
        totalPoints={totalPoints}
        stats={stats}
        getProgress={getProgress}
      />

      {actionVerse && actionVerseData && (
        <VerseActionsDialog
          open={verseActionsOpen}
          onOpenChange={setVerseActionsOpen}
          verseNumber={actionVerse}
          verseText={actionVerseData.text}
          verseReference={actionVerseReference}
          currentHighlight={getHighlightForVerse(actionVerse)}
          currentNote={getNoteForVerse(actionVerse)}
          onAddHighlight={(color: HighlightColor) => addHighlight(actionVerse, color)}
          onRemoveHighlight={() => removeHighlight(actionVerse)}
          onSaveNote={(text: string) => addOrUpdateNote(actionVerse, text)}
          onDeleteNote={() => deleteNote(actionVerse)}
        />
      )}

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        dbService={dbService}
        languages={languages}
        books={books}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      <OnboardingDialog
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        onComplete={() => setOnboardingOpen(false)}
      />

      {/* Compare modal temporarily disabled - needs component update */}
    </div>
  );
}

export default function Index() {
  return <BibleApp />;
}