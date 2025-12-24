import { useState, useEffect, useCallback } from 'react';
import { BibleApiService } from '../services/bibleApi';
import { IndexedDbService } from '../services/indexedDbService';
import type { Book, BookMetadata, ParallelVerse, Verse } from '../types/bible';

interface UseParallelReadingProps {
  dbService: IndexedDbService | null;
  selectedBook: BookMetadata | null;
  currentChapter: number;
  primaryLanguage: string;
}

interface ParallelData {
  verseNumber: number;
  translations: ParallelVerse[];
}

const languageNames: Record<string, string> = {
  mg: 'Malagasy',
  en: 'English',
  ko: '한국어',
};

export function useParallelReading({
  dbService,
  selectedBook,
  currentChapter,
  primaryLanguage,
}: UseParallelReadingProps) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([primaryLanguage]);
  const [parallelData, setParallelData] = useState<ParallelData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isParallelMode, setIsParallelMode] = useState(false);

  const availableLanguages = ['mg', 'en', 'ko'];
  
  const addLanguage = useCallback((lang: string) => {
    if (!selectedLanguages.includes(lang) && selectedLanguages.length < 4) {
      setSelectedLanguages(prev => [...prev, lang]);
    }
  }, [selectedLanguages]);

  const removeLanguage = useCallback((lang: string) => {
    if (selectedLanguages.length > 1) {
      setSelectedLanguages(prev => prev.filter(l => l !== lang));
    }
  }, [selectedLanguages]);

  const toggleParallelMode = useCallback(() => {
    setIsParallelMode(prev => !prev);
  }, []);

  // Load parallel data when languages or chapter changes
  useEffect(() => {
    const loadParallelData = async () => {
      if (!dbService || !selectedBook || !isParallelMode || selectedLanguages.length < 2) {
        setParallelData([]);
        return;
      }

      setIsLoading(true);
      const apiService = new BibleApiService();
      
      try {
        const booksData: Record<string, Book> = {};
        
        // Fetch book data for each selected language
        for (const lang of selectedLanguages) {
          let bookData = await dbService.getBook(lang, selectedBook.file);
          
          if (!bookData) {
            try {
              bookData = await apiService.fetchBook(lang, selectedBook.file);
              await dbService.saveBook(lang, selectedBook.file, bookData);
            } catch {
              console.warn(`Failed to fetch book for language: ${lang}`);
              continue;
            }
          }
          
          if (bookData) {
            booksData[lang] = bookData;
          }
        }

        // Find the chapter data for each language
        const chapterDataByLang: Record<string, Verse[]> = {};
        let maxVerses = 0;

        for (const [lang, book] of Object.entries(booksData)) {
          const chapter = book.chapters.find(c => c.chapter === currentChapter);
          if (chapter) {
            chapterDataByLang[lang] = chapter.verses;
            maxVerses = Math.max(maxVerses, chapter.verses.length);
          }
        }

        // Build parallel data
        const parallel: ParallelData[] = [];
        
        for (let i = 1; i <= maxVerses; i++) {
          const translations: ParallelVerse[] = [];
          
          for (const lang of selectedLanguages) {
            const verses = chapterDataByLang[lang];
            const verse = verses?.find(v => v.verse === i);
            
            if (verse) {
              translations.push({
                language: lang,
                languageName: languageNames[lang] || lang,
                text: verse.text,
              });
            }
          }
          
          if (translations.length > 0) {
            parallel.push({
              verseNumber: i,
              translations,
            });
          }
        }

        setParallelData(parallel);
      } catch (error) {
        console.error('Error loading parallel data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadParallelData();
  }, [dbService, selectedBook, currentChapter, selectedLanguages, isParallelMode]);

  // Ensure primary language is always included
  useEffect(() => {
    if (!selectedLanguages.includes(primaryLanguage)) {
      setSelectedLanguages(prev => [primaryLanguage, ...prev.slice(0, 3)]);
    }
  }, [primaryLanguage]);

  return {
    selectedLanguages,
    availableLanguages,
    parallelData,
    isLoading,
    isParallelMode,
    addLanguage,
    removeLanguage,
    toggleParallelMode,
    languageNames,
  };
}
