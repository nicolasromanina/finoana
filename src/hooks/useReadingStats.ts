import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface ReadingSession {
  date: string; // YYYY-MM-DD
  book: string;
  chapter: number;
  duration: number; // seconds
  timestamp: number;
}

export interface ReadingStats {
  totalReadingTime: number; // total seconds
  totalChaptersRead: number;
  totalVersesRead: number;
  sessionsPerDay: Record<string, ReadingSession[]>;
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string | null;
}

const DEFAULT_STATS: ReadingStats = {
  totalReadingTime: 0,
  totalChaptersRead: 0,
  totalVersesRead: 0,
  sessionsPerDay: {},
  currentStreak: 0,
  longestStreak: 0,
  lastReadDate: null,
};

export function useReadingStats() {
  const [stats, setStats] = useLocalStorage<ReadingStats>('readingStats', DEFAULT_STATS);
  const [currentSession, setCurrentSession] = useState<{
    startTime: number;
    book: string;
    chapter: number;
  } | null>(null);

  // Start tracking a reading session
  const startSession = useCallback((book: string, chapter: number) => {
    setCurrentSession({
      startTime: Date.now(),
      book,
      chapter,
    });
  }, []);

  // End the current session and save stats
  const endSession = useCallback(() => {
    if (!currentSession) return;

    const duration = Math.floor((Date.now() - currentSession.startTime) / 1000);
    
    // Only count sessions longer than 5 seconds
    if (duration < 5) {
      setCurrentSession(null);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    
    setStats(prev => {
      const newSessionsPerDay = { ...prev.sessionsPerDay };
      if (!newSessionsPerDay[today]) {
        newSessionsPerDay[today] = [];
      }
      
      // Check if this chapter was already read today
      const alreadyRead = newSessionsPerDay[today].some(
        s => s.book === currentSession.book && s.chapter === currentSession.chapter
      );
      
      newSessionsPerDay[today].push({
        date: today,
        book: currentSession.book,
        chapter: currentSession.chapter,
        duration,
        timestamp: Date.now(),
      });

      // Calculate streak
      let currentStreak = prev.currentStreak;
      let longestStreak = prev.longestStreak;
      
      if (prev.lastReadDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        if (prev.lastReadDate === yesterdayStr) {
          currentStreak = prev.currentStreak + 1;
        } else if (prev.lastReadDate !== today) {
          currentStreak = 1;
        }
        
        longestStreak = Math.max(longestStreak, currentStreak);
      }

      return {
        totalReadingTime: prev.totalReadingTime + duration,
        totalChaptersRead: prev.totalChaptersRead + (alreadyRead ? 0 : 1),
        totalVersesRead: prev.totalVersesRead, // Updated when verses are viewed
        sessionsPerDay: newSessionsPerDay,
        currentStreak,
        longestStreak,
        lastReadDate: today,
      };
    });

    setCurrentSession(null);
  }, [currentSession, setStats]);

  // Get chapters read this week
  const getChaptersThisWeek = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    let count = 0;
    const chaptersSet = new Set<string>();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySessions = stats.sessionsPerDay[dateStr] || [];
      daySessions.forEach(session => {
        const key = `${session.book}-${session.chapter}`;
        if (!chaptersSet.has(key)) {
          chaptersSet.add(key);
          count++;
        }
      });
    }
    
    return count;
  }, [stats]);

  // Get reading time this week (in seconds)
  const getReadingTimeThisWeek = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    let totalSeconds = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySessions = stats.sessionsPerDay[dateStr] || [];
      totalSeconds += daySessions.reduce((sum, s) => sum + s.duration, 0);
    }
    
    return totalSeconds;
  }, [stats]);

  // Get daily reading data for the past 7 days
  const getDailyData = useCallback(() => {
    const data: { day: string; minutes: number; chapters: number }[] = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
      
      const daySessions = stats.sessionsPerDay[dateStr] || [];
      const totalSeconds = daySessions.reduce((sum, s) => sum + s.duration, 0);
      
      const chaptersSet = new Set<string>();
      daySessions.forEach(s => chaptersSet.add(`${s.book}-${s.chapter}`));
      
      data.push({
        day: dayName,
        minutes: Math.round(totalSeconds / 60),
        chapters: chaptersSet.size,
      });
    }
    
    return data;
  }, [stats]);

  // Format seconds to readable time
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, []);

  // Reset all stats
  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
  }, [setStats]);

  return {
    stats,
    currentSession,
    startSession,
    endSession,
    getChaptersThisWeek,
    getReadingTimeThisWeek,
    getDailyData,
    formatTime,
    resetStats,
  };
}
