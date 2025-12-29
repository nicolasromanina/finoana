import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Badge, BadgesState, BADGE_DEFINITIONS } from '../types/badges';
import { ReadingStats } from './useReadingStats';

const INITIAL_BADGES: Badge[] = BADGE_DEFINITIONS.map(def => ({
  ...def,
  unlocked: false,
}));

const DEFAULT_STATE: BadgesState = {
  badges: INITIAL_BADGES,
  totalPoints: 0,
  level: 1,
};

const POINTS_PER_BADGE = 10;
const POINTS_PER_LEVEL = 50;

export function useBadges() {
  const [state, setState] = useLocalStorage<BadgesState>('userBadges', DEFAULT_STATE);

  const checkAndUnlockBadges = useCallback((stats: ReadingStats) => {
    const now = Date.now();
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    
    setState(prev => {
      let newBadges = [...prev.badges];
      let pointsEarned = 0;
      const newlyUnlocked: string[] = [];

      newBadges = newBadges.map(badge => {
        if (badge.unlocked) return badge;

        let shouldUnlock = false;

        switch (badge.category) {
          case 'reading':
            shouldUnlock = stats.totalChaptersRead >= badge.requirement;
            break;
          case 'streak':
            shouldUnlock = stats.longestStreak >= badge.requirement;
            break;
          case 'milestone':
            shouldUnlock = stats.totalReadingTime >= badge.requirement;
            break;
          case 'special':
            if (badge.id === 'early_bird') {
              shouldUnlock = currentHour < 6 && stats.totalChaptersRead > 0;
            } else if (badge.id === 'night_owl') {
              shouldUnlock = currentHour >= 22 && stats.totalChaptersRead > 0;
            } else if (badge.id === 'weekend_warrior') {
              const sessions = stats.sessionsPerDay;
              const today = new Date();
              const thisWeekSat = new Date(today);
              thisWeekSat.setDate(today.getDate() - today.getDay() + 6);
              const thisWeekSun = new Date(today);
              thisWeekSun.setDate(today.getDate() - today.getDay());
              
              const satStr = thisWeekSat.toISOString().split('T')[0];
              const sunStr = thisWeekSun.toISOString().split('T')[0];
              
              shouldUnlock = !!(sessions[satStr]?.length && sessions[sunStr]?.length);
            }
            break;
        }

        if (shouldUnlock) {
          pointsEarned += POINTS_PER_BADGE;
          newlyUnlocked.push(badge.id);
          return { ...badge, unlocked: true, unlockedAt: now };
        }

        return badge;
      });

      if (pointsEarned === 0) return prev;

      const newTotalPoints = prev.totalPoints + pointsEarned;
      const newLevel = Math.floor(newTotalPoints / POINTS_PER_LEVEL) + 1;

      return {
        badges: newBadges,
        totalPoints: newTotalPoints,
        level: newLevel,
      };
    });
  }, [setState]);

  const unlockedBadges = useMemo(() => 
    state.badges.filter(b => b.unlocked),
    [state.badges]
  );

  const lockedBadges = useMemo(() => 
    state.badges.filter(b => !b.unlocked),
    [state.badges]
  );

  const getProgress = useCallback((stats: ReadingStats) => {
    return state.badges.map(badge => {
      if (badge.unlocked) return { ...badge, progress: 100 };

      let current = 0;
      switch (badge.category) {
        case 'reading':
          current = stats.totalChaptersRead;
          break;
        case 'streak':
          current = stats.longestStreak;
          break;
        case 'milestone':
          current = stats.totalReadingTime;
          break;
        default:
          current = 0;
      }

      const progress = Math.min((current / badge.requirement) * 100, 100);
      return { ...badge, progress };
    });
  }, [state.badges]);

  const resetBadges = useCallback(() => {
    setState(DEFAULT_STATE);
  }, [setState]);

  return {
    badges: state.badges,
    unlockedBadges,
    lockedBadges,
    totalPoints: state.totalPoints,
    level: state.level,
    checkAndUnlockBadges,
    getProgress,
    resetBadges,
  };
}
