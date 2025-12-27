import { useState, useCallback } from 'react';
import type { IndexedDbService } from '@/services/indexedDbService';
import type { BookMetadata, Language } from '@/types/bible';

interface UseOfflineDownloadProps {
  dbService: IndexedDbService | null;
  books: BookMetadata[];
  languages: Language[];
}

interface DownloadProgress {
  current: number;
  total: number;
  currentBook: string;
}

export function useOfflineDownload({ dbService, books, languages }: UseOfflineDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState<DownloadProgress>({ current: 0, total: 0, currentBook: '' });
  const [error, setError] = useState<string | null>(null);

  const downloadAllBooks = useCallback(async (languageCode: string): Promise<boolean> => {
    if (!dbService || isDownloading) return false;

    setIsDownloading(true);
    setError(null);
    setProgress({ current: 0, total: books.length, currentBook: '' });

    try {
      const language = languages.find(l => l.code === languageCode);
      if (!language) {
        throw new Error('Language not found');
      }

      for (let i = 0; i < books.length; i++) {
        const book = books[i];
        setProgress({ current: i, total: books.length, currentBook: book.name });

        // Check if book is already cached
        const cached = await dbService.getBook(languageCode, book.file);
        if (cached) continue;

        // Fetch and cache the book
        try {
          const baseUrl = `https://baiboly.vercel.app/${languageCode}`;
          const response = await fetch(`${baseUrl}/${book.file}`);
          
          if (!response.ok) {
            console.warn(`Failed to fetch ${book.name}, skipping...`);
            continue;
          }

          const bookData = await response.json();
          await dbService.saveBook(languageCode, book.file, bookData);
        } catch (fetchError) {
          console.warn(`Error fetching ${book.name}:`, fetchError);
          continue;
        }

        // Small delay to prevent overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setProgress({ current: books.length, total: books.length, currentBook: '' });
      setIsDownloading(false);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
      setIsDownloading(false);
      return false;
    }
  }, [dbService, books, languages, isDownloading]);

  const getStorageEstimate = useCallback(async (): Promise<{ used: number; quota: number } | null> => {
    if (!dbService) return null;
    return dbService.getStorageEstimate();
  }, [dbService]);

  const formatBytes = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  const progressPercent = progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100) 
    : 0;

  return {
    isDownloading,
    progress,
    progressPercent,
    error,
    downloadAllBooks,
    getStorageEstimate,
    formatBytes
  };
}
