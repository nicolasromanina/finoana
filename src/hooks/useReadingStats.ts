import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Référence pour accéder à la session actuelle dans les callbacks
  const currentSessionRef = useRef(currentSession);

  // Mettre à jour la référence quand currentSession change
  useEffect(() => {
    currentSessionRef.current = currentSession;
  }, [currentSession]);

  // Start tracking a reading session
  const startSession = useCallback((book: string, chapter: number) => {
    const newSession = {
      startTime: Date.now(),
      book,
      chapter,
    };
    setCurrentSession(newSession);
    currentSessionRef.current = newSession;
    
    console.log('Session started:', { book, chapter, time: new Date().toISOString() });
  }, []);

  // End the current session and save stats
  const endSession = useCallback(() => {
    const session = currentSessionRef.current;
    if (!session) {
      console.log('No active session to end');
      return;
    }

    const duration = Math.floor((Date.now() - session.startTime) / 1000);
    
    console.log('Session ending:', {
      book: session.book,
      chapter: session.chapter,
      duration,
      startTime: new Date(session.startTime).toISOString(),
      endTime: new Date().toISOString()
    });
    
    // Only count sessions longer than 30 seconds (ajusté de 5 à 30 secondes)
    if (duration < 30) {
      console.log('Session too short, discarding:', duration, 'seconds');
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
        s => s.book === session.book && s.chapter === session.chapter
      );
      
      newSessionsPerDay[today].push({
        date: today,
        book: session.book,
        chapter: session.chapter,
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
          console.log('Continuing streak:', currentStreak);
        } else if (prev.lastReadDate !== today) {
          currentStreak = 1;
          console.log('Starting new streak');
        }
        
        longestStreak = Math.max(longestStreak, currentStreak);
      }

      const newStats = {
        totalReadingTime: prev.totalReadingTime + duration,
        totalChaptersRead: prev.totalChaptersRead + (alreadyRead ? 0 : 1),
        totalVersesRead: prev.totalVersesRead, // Updated when verses are viewed
        sessionsPerDay: newSessionsPerDay,
        currentStreak,
        longestStreak,
        lastReadDate: today,
      };
      
      console.log('Stats updated:', {
        totalReadingTime: newStats.totalReadingTime,
        totalChaptersRead: newStats.totalChaptersRead,
        durationAdded: duration,
        currentStreak: newStats.currentStreak,
        longestStreak: newStats.longestStreak
      });
      
      return newStats;
    });

    setCurrentSession(null);
    currentSessionRef.current = null;
  }, [setStats]);

  // Get chapters read this week
  const getChaptersThisWeek = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
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
    
    console.log('Chapters this week calculation:', {
      count,
      chaptersSet: Array.from(chaptersSet),
      statsKeys: Object.keys(stats.sessionsPerDay)
    });
    
    return count;
  }, [stats]);

  // Get reading time this week (in seconds)
  const getReadingTimeThisWeek = useCallback(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    let totalSeconds = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const daySessions = stats.sessionsPerDay[dateStr] || [];
      const dayTotal = daySessions.reduce((sum, s) => sum + s.duration, 0);
      totalSeconds += dayTotal;
      
      if (dayTotal > 0) {
        console.log(`Day ${dateStr}: ${dayTotal} seconds (${daySessions.length} sessions)`);
      }
    }
    
    console.log('Total reading time this week:', {
      totalSeconds,
      formatted: formatTime(totalSeconds),
      daysWithData: Object.keys(stats.sessionsPerDay).filter(date => {
        const daySessions = stats.sessionsPerDay[date] || [];
        return daySessions.length > 0;
      })
    });
    
    return totalSeconds;
  }, [stats]);

  // Get daily reading data for the past 7 days
  const getDailyData = useCallback(() => {
    const data: { day: string; minutes: number; chapters: number }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('fr', { weekday: 'short' });
      
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
    
    console.log('Daily data:', data);
    return data;
  }, [stats]);

  // Format seconds to readable time
  const formatTime = useCallback((seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    }
    return `${secs}s`;
  }, []);

  // Reset all stats
  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    setCurrentSession(null);
    currentSessionRef.current = null;
  }, [setStats]);

  // Fonction pour forcer la fin d'une session (pour le débogage)
  const forceEndSession = useCallback(() => {
    console.log('Force ending session:', currentSessionRef.current);
    endSession();
  }, [endSession]);

  // Fonction pour afficher l'état actuel
  const debugStats = useCallback(() => {
    console.log('=== DEBUG READING STATS ===');
    console.log('Current session:', currentSessionRef.current);
    console.log('Stats:', {
      ...stats,
      sessionsPerDay: Object.keys(stats.sessionsPerDay).reduce((acc, date) => {
        acc[date] = stats.sessionsPerDay[date].map(s => ({
          ...s,
          duration: `${s.duration}s`,
          time: new Date(s.timestamp).toLocaleTimeString()
        }));
        return acc;
      }, {} as any)
    });
    console.log('Reading time this week:', getReadingTimeThisWeek(), 'seconds');
    console.log('Chapters this week:', getChaptersThisWeek());
    console.log('Daily data:', getDailyData());
    console.log('==========================');
  }, [stats, getReadingTimeThisWeek, getChaptersThisWeek, getDailyData]);

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
    forceEndSession,
    debugStats, // Ajouté pour le débogage
  };
}