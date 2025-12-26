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
import { AudioPlayer } from '@/components/AudioPlayer';
import { ViewModeToggle } from '@/components/ViewModeToggle';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { useBibleData } from '@/hooks/useBibleData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useSearch } from '@/hooks/useSearch';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { useParallelReading } from '@/hooks/useParallelReading';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FontSizeProvider } from '@/contexts/FontSizeContext';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AlertCircle, BookOpen } from 'lucide-react';
import type { BookMetadata, Bookmark, ReadingProgress } from '@/types/bible';

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

  const { dbService, isInitialized } = useIndexedDB();
  
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
    setSelectedBook(book);
    setCurrentChapter(1);
    setSelectedVerse(null);
  };

  const handleChapterChange = (chapter: number) => {
    setCurrentChapter(chapter);
    setSelectedVerse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(prev => prev === verseNumber ? null : verseNumber);
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
        bookmarksCount={bookmarks.length}
        sidebarContent={sidebarContent}
      />

      <div className="flex">
        <aside className="hidden lg:block w-72 h-[calc(100vh-4rem)] sticky top-16 border-r border-border">
          {sidebarContent}
        </aside>

        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="container max-w-3xl mx-auto px-4 py-6">
            {!selectedBook && (
              <div className="space-y-6 fade-in">
                <VerseOfDay books={books} language={selectedLanguage} onNavigate={handleVerseOfDayNavigate} />
                <ReadingProgressCard progress={readingProgress} books={books} onContinue={handleContinueReading} />
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-4">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{t.startReading}</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">{t.selectBookHint}</p>
                </div>
              </div>
            )}

            {selectedBook && (
              <div className="fade-in">
                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive mb-4">
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
                    <h1 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-6">{bookData.book}</h1>
                    <ChapterNavigation currentChapter={currentChapter} totalChapters={selectedBook.chapters || bookData.chapters.length} onChapterChange={handleChapterChange} />
                    
                    <div className="flex items-center justify-between gap-4 my-4">
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
                      <VerseViewer verses={currentChapterData.verses} selectedVerse={selectedVerse} onVerseClick={handleVerseClick} highlightedVerses={tts.isPlaying && tts.currentIndex >= 0 ? [currentChapterData.verses[tts.currentIndex]?.verse] : []} />
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

      <FloatingActions isVisible={!!selectedVerse} isBookmarked={isBookmarked} onToggleBookmark={toggleBookmark} selectedVerseText={selectedVerseData?.text} verseReference={verseReference} />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} results={results} isSearching={isSearching} searchQuery={searchQuery} onSearch={search} onResultClick={handleSearchResultClick} onClear={clearSearch} />
      <BookmarksDialog open={bookmarksOpen} onOpenChange={setBookmarksOpen} bookmarks={bookmarks} books={books} onDeleteBookmark={handleDeleteBookmark} onNavigate={handleBookmarkNavigate} />
    </div>
  );
}

export default function Index() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <LanguageProvider>
          <BibleApp />
        </LanguageProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}
