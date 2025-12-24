import { useState, useCallback } from 'react';
import { BibleApiService } from '@/services/bibleApi';
import { IndexedDbService } from '@/services/indexedDbService';
import type { BookMetadata, Verse } from '@/types/bible';

export interface SearchResult {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: Verse;
  matchIndices: [number, number][];
}

interface UseSearchProps {
  dbService: IndexedDbService | null;
  books: BookMetadata[];
  language: string;
}

export function useSearch({ dbService, books, language }: UseSearchProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const search = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim() || query.length < 2 || !dbService) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const searchResults: SearchResult[] = [];
    const apiService = new BibleApiService();
    const normalizedQuery = query.toLowerCase();

    try {
      for (const book of books) {
        let bookData = await dbService.getBook(language, book.file);
        
        if (!bookData) {
          try {
            bookData = await apiService.fetchBook(language, book.file);
            await dbService.saveBook(language, book.file, bookData);
          } catch {
            continue;
          }
        }

        for (const chapter of bookData.chapters) {
          for (const verse of chapter.verses) {
            const text = verse.text.toLowerCase();
            const matchIndices: [number, number][] = [];
            let startIndex = 0;

            while (true) {
              const index = text.indexOf(normalizedQuery, startIndex);
              if (index === -1) break;
              matchIndices.push([index, index + normalizedQuery.length]);
              startIndex = index + 1;
            }

            if (matchIndices.length > 0) {
              searchResults.push({
                bookId: book.id,
                bookName: bookData.book,
                chapter: chapter.chapter,
                verse,
                matchIndices,
              });
            }

            if (searchResults.length >= 100) break;
          }
          if (searchResults.length >= 100) break;
        }
        if (searchResults.length >= 100) break;
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
      setResults(searchResults);
    }
  }, [dbService, books, language]);

  const clearSearch = useCallback(() => {
    setResults([]);
    setSearchQuery('');
  }, []);

  return {
    results,
    isSearching,
    searchQuery,
    search,
    clearSearch,
  };
}
