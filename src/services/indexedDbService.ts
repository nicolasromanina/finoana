import type { Book, Language, VerseHighlight, VerseNote, UserReadingPlan } from '../types/bible';

const DB_NAME = 'BibleAppDB';
const DB_VERSION = 4;
const BOOKS_STORE = 'books';
const LANGUAGES_STORE = 'languages';
const HIGHLIGHTS_STORE = 'highlights';
const NOTES_STORE = 'notes';
const READING_PLANS_STORE = 'readingPlans';

export class IndexedDbService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        
        // Books store
        if (!this.db.objectStoreNames.contains(BOOKS_STORE)) {
          const booksStore = this.db.createObjectStore(BOOKS_STORE, { keyPath: 'id' });
          booksStore.createIndex('language', 'language', { unique: false });
          booksStore.createIndex('file', 'file', { unique: false });
        }
        
        // Languages store
        if (!this.db.objectStoreNames.contains(LANGUAGES_STORE)) {
          this.db.createObjectStore(LANGUAGES_STORE, { keyPath: 'code' });
        }

        // Highlights store
        if (!this.db.objectStoreNames.contains(HIGHLIGHTS_STORE)) {
          const highlightsStore = this.db.createObjectStore(HIGHLIGHTS_STORE, { keyPath: 'id' });
          highlightsStore.createIndex('verseKey', ['language', 'book', 'chapter', 'verse'], { unique: false });
        }

        // Notes store
        if (!this.db.objectStoreNames.contains(NOTES_STORE)) {
          const notesStore = this.db.createObjectStore(NOTES_STORE, { keyPath: 'id' });
          notesStore.createIndex('verseKey', ['language', 'book', 'chapter', 'verse'], { unique: false });
        }

        // Reading plans store
        if (!this.db.objectStoreNames.contains(READING_PLANS_STORE)) {
          this.db.createObjectStore(READING_PLANS_STORE, { keyPath: 'planId' });
        }
      };
    });
  }

  // Books
  async saveBook(language: string, fileName: string, book: Book): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([BOOKS_STORE], 'readwrite');
      const store = transaction.objectStore(BOOKS_STORE);
      
      store.put({
        id: `${language}:${fileName}`,
        language,
        file: fileName,
        data: book,
        timestamp: Date.now()
      });
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async getBook(language: string, fileName: string): Promise<Book | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([BOOKS_STORE], 'readonly');
      const store = transaction.objectStore(BOOKS_STORE);
      const request = store.get(`${language}:${fileName}`);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result?.data || null);
    });
  }

  async saveLanguages(languages: Language[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([LANGUAGES_STORE], 'readwrite');
      const store = transaction.objectStore(LANGUAGES_STORE);
      
      languages.forEach(lang => store.put(lang));
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async getLanguages(): Promise<Language[] | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([LANGUAGES_STORE], 'readonly');
      const store = transaction.objectStore(LANGUAGES_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result.length > 0 ? request.result : null);
    });
  }

  // Highlights
  async saveHighlight(highlight: VerseHighlight): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([HIGHLIGHTS_STORE], 'readwrite');
      const store = transaction.objectStore(HIGHLIGHTS_STORE);
      store.put(highlight);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async deleteHighlight(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([HIGHLIGHTS_STORE], 'readwrite');
      const store = transaction.objectStore(HIGHLIGHTS_STORE);
      store.delete(id);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async getHighlightsForChapter(language: string, book: string, chapter: number): Promise<VerseHighlight[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([HIGHLIGHTS_STORE], 'readonly');
      const store = transaction.objectStore(HIGHLIGHTS_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result.filter(
          (h: VerseHighlight) => h.language === language && h.book === book && h.chapter === chapter
        );
        resolve(results);
      };
    });
  }

  async getAllHighlights(): Promise<VerseHighlight[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([HIGHLIGHTS_STORE], 'readonly');
      const store = transaction.objectStore(HIGHLIGHTS_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Notes
  async saveNote(note: VerseNote): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([NOTES_STORE], 'readwrite');
      const store = transaction.objectStore(NOTES_STORE);
      store.put(note);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async deleteNote(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([NOTES_STORE], 'readwrite');
      const store = transaction.objectStore(NOTES_STORE);
      store.delete(id);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async getNotesForChapter(language: string, book: string, chapter: number): Promise<VerseNote[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([NOTES_STORE], 'readonly');
      const store = transaction.objectStore(NOTES_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const results = request.result.filter(
          (n: VerseNote) => n.language === language && n.book === book && n.chapter === chapter
        );
        resolve(results);
      };
    });
  }

  async getAllNotes(): Promise<VerseNote[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([NOTES_STORE], 'readonly');
      const store = transaction.objectStore(NOTES_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  // Reading Plans
  async saveUserReadingPlan(plan: UserReadingPlan): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([READING_PLANS_STORE], 'readwrite');
      const store = transaction.objectStore(READING_PLANS_STORE);
      store.put(plan);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  async getUserReadingPlan(planId: string): Promise<UserReadingPlan | null> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([READING_PLANS_STORE], 'readonly');
      const store = transaction.objectStore(READING_PLANS_STORE);
      const request = store.get(planId);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllUserReadingPlans(): Promise<UserReadingPlan[]> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([READING_PLANS_STORE], 'readonly');
      const store = transaction.objectStore(READING_PLANS_STORE);
      const request = store.getAll();
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async deleteUserReadingPlan(planId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([READING_PLANS_STORE], 'readwrite');
      const store = transaction.objectStore(READING_PLANS_STORE);
      store.delete(planId);
      
      transaction.onerror = () => reject(transaction.error);
      transaction.oncomplete = () => resolve();
    });
  }

  // Clear all data for cache reset
  async clearAllData(): Promise<void> {
    // Clear IndexedDB stores
    if (this.db) {
      const stores = [BOOKS_STORE, LANGUAGES_STORE, HIGHLIGHTS_STORE, NOTES_STORE, READING_PLANS_STORE];
      
      for (const storeName of stores) {
        await new Promise<void>((resolve, reject) => {
          const transaction = this.db!.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.clear();
          
          request.onerror = () => reject(request.error);
          request.onsuccess = () => resolve();
        });
      }
    }

    // Clear Service Worker caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
    }

    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(r => r.unregister()));
    }
  }

  // Get storage estimate
  async getStorageEstimate(): Promise<{ used: number; quota: number } | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      const estimate = await navigator.storage.estimate();
      return {
        used: estimate.usage || 0,
        quota: estimate.quota || 0
      };
    }
    return null;
  }
}
