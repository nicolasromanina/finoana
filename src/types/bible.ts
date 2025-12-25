export interface BookMetadata {
  id: string;
  name: string;
  file: string;
  testament: 'old' | 'new';
  chapters: number;
}

export interface Book {
  book: string;
  chapters: Chapter[];
}

export interface Chapter {
  chapter: number;
  verses: Verse[];
}

export interface Verse {
  verse: number;
  text: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  booksCount: number;
}

export interface Bookmark {
  language: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  timestamp: number;
}

export interface ReadingProgress {
  language: string;
  book: string;
  chapter: number;
  verse: number;
  timestamp: number;
}

export type UILanguage = 'mg' | 'en' | 'ko';

export interface ParallelVerse {
  language: string;
  languageName: string;
  text: string;
}

// Reading Plans
export interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // days
  readings: DailyReading[];
}

export interface DailyReading {
  day: number;
  readings: {
    book: string;
    chapter: number;
  }[];
}

export interface UserReadingPlan {
  planId: string;
  startDate: number;
  completedDays: number[];
  currentDay: number;
  notificationsEnabled: boolean;
  notificationTime: string; // HH:mm
}

// Highlights & Notes
export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'purple';

export interface VerseHighlight {
  id: string;
  language: string;
  book: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
  timestamp: number;
}

export interface VerseNote {
  id: string;
  language: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  timestamp: number;
  updatedAt: number;
}
