export type BadgeCategory = 'reading' | 'streak' | 'milestone' | 'special';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  requirement: number;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface BadgesState {
  badges: Badge[];
  totalPoints: number;
  level: number;
}

export const BADGE_DEFINITIONS: Omit<Badge, 'unlocked' | 'unlockedAt'>[] = [
  // Reading badges
  { id: 'first_chapter', name: 'First Steps', description: 'Read your first chapter', icon: '📖', category: 'reading', requirement: 1 },
  { id: 'reader_10', name: 'Dedicated Reader', description: 'Read 10 chapters', icon: '📚', category: 'reading', requirement: 10 },
  { id: 'reader_50', name: 'Bookworm', description: 'Read 50 chapters', icon: '🐛', category: 'reading', requirement: 50 },
  { id: 'reader_100', name: 'Scholar', description: 'Read 100 chapters', icon: '🎓', category: 'reading', requirement: 100 },
  { id: 'reader_250', name: 'Bible Expert', description: 'Read 250 chapters', icon: '🏆', category: 'reading', requirement: 250 },
  { id: 'reader_500', name: 'Master Reader', description: 'Read 500 chapters', icon: '👑', category: 'reading', requirement: 500 },
  
  // Streak badges
  { id: 'streak_3', name: 'Getting Started', description: '3-day reading streak', icon: '🔥', category: 'streak', requirement: 3 },
  { id: 'streak_7', name: 'Week Warrior', description: '7-day reading streak', icon: '⚡', category: 'streak', requirement: 7 },
  { id: 'streak_14', name: 'Fortnight Fighter', description: '14-day reading streak', icon: '💪', category: 'streak', requirement: 14 },
  { id: 'streak_30', name: 'Monthly Master', description: '30-day reading streak', icon: '🌟', category: 'streak', requirement: 30 },
  { id: 'streak_90', name: 'Quarterly Champion', description: '90-day reading streak', icon: '💎', category: 'streak', requirement: 90 },
  { id: 'streak_365', name: 'Year of Faith', description: '365-day reading streak', icon: '🏅', category: 'streak', requirement: 365 },
  
  // Time milestones
  { id: 'time_1h', name: 'Hour of Study', description: 'Read for 1 hour total', icon: '⏱️', category: 'milestone', requirement: 3600 },
  { id: 'time_5h', name: 'Deep Diver', description: 'Read for 5 hours total', icon: '🕐', category: 'milestone', requirement: 18000 },
  { id: 'time_24h', name: 'Full Day', description: 'Read for 24 hours total', icon: '📅', category: 'milestone', requirement: 86400 },
  { id: 'time_100h', name: 'Century Reader', description: 'Read for 100 hours total', icon: '💯', category: 'milestone', requirement: 360000 },
  
  // Special badges
  { id: 'early_bird', name: 'Early Bird', description: 'Read before 6 AM', icon: '🌅', category: 'special', requirement: 1 },
  { id: 'night_owl', name: 'Night Owl', description: 'Read after 10 PM', icon: '🦉', category: 'special', requirement: 1 },
  { id: 'weekend_warrior', name: 'Weekend Warrior', description: 'Read on both Saturday and Sunday', icon: '🎉', category: 'special', requirement: 1 },
];
