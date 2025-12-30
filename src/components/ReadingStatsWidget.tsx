import { Clock, Flame, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ReadingStatsWidgetProps {
  readingTimeThisWeek: number;
  chaptersThisWeek: number;
  currentStreak: number;
  longestStreak: number;
  formatTime: (seconds: number) => string;
  onOpenStats: () => void;
}

export function ReadingStatsWidget({
  readingTimeThisWeek,
  chaptersThisWeek,
  currentStreak,
  longestStreak,
  formatTime,
  onOpenStats,
}: ReadingStatsWidgetProps) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const weeklyProgress = Math.min((chaptersThisWeek / 7) * 100, 100);
  const isStreakRecord = currentStreak > 0 && currentStreak >= longestStreak;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="relative overflow-hidden border-border/40 bg-gradient-to-br from-background via-background to-secondary/5 hover:to-secondary/10 cursor-pointer transition-all duration-300 group"
        onClick={onOpenStats}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: isHovered ? 10 : 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TrendingUp className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-foreground/80">{t.readingStatistics}</span>
            </div>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Time Card */}
            <motion.div 
              className="relative p-3 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 group/time"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-primary rounded-full opacity-0 group-hover/time:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="text-lg font-bold">{formatTime(readingTimeThisWeek)}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.thisWeek}</div>
              </div>
            </motion.div>
            
            {/* Chapters Card */}
            <motion.div 
              className="relative p-3 rounded-xl bg-secondary/40 border border-border/40 group/chapters"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover/chapters:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <div className="p-1.5 rounded-lg bg-blue-500/10">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  {chaptersThisWeek > 0 && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold">{chaptersThisWeek}</span>
                  <span className="text-xs text-muted-foreground">/7</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.chapter}</div>
              </div>
            </motion.div>
            
            {/* Streak Card */}
            <motion.div 
              className="relative p-3 rounded-xl bg-gradient-to-br from-orange-500/5 to-amber-500/10 border border-orange-500/20 group/streak"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-orange-500 rounded-full opacity-0 group-hover/streak:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{ scale: currentStreak > 0 ? [1, 1.1, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="p-1.5 rounded-lg bg-orange-500/10"
                >
                  <Flame className={`h-4 w-4 ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                </motion.div>
                <div className="text-lg font-bold">{currentStreak}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{t.streaks}</div>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{t.weeklyGoal}</span>
              <span className="font-medium">{weeklyProgress.toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${weeklyProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full",
                  weeklyProgress >= 100 ? "bg-emerald-500" 
                    : weeklyProgress >= 70 ? "bg-primary"
                    : "bg-amber-500"
                )}
              />
            </div>
          </div>

          {/* Streak Indicator */}
          {isStreakRecord && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 right-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-orange-500/30"
                />
                <div className="relative flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20">
                  <Flame className="h-3 w-3 text-orange-500" />
                  <span className="text-xs font-semibold text-orange-500">{t.record}</span>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Ajoutez ces nouvelles traductions dans votre fichier de langue :
const translations = {
  overview: "Aperçu",
  analytics: "Analytiques",
  insights: "Insights",
  productivityScore: "Score productivité",
  weeklyPerformance: "Performance hebdomadaire",
  excellent: "Excellent",
  good: "Bon",
  fair: "Moyen",
  needsImprovement: "À améliorer",
  minPerDay: "min/jour",
  streakAnalytics: "Analytiques série",
  newRecord: "Nouveau record!",
  daysToBeat: "jours à battre",
  readingPatterns: "Patterns lecture",
  averageSession: "Session moyenne",
  peakHours: "Heures de pointe",
  consistency: "Consistance",
  lifetimeStats: "Statistiques globales",
  booksCompleted: "Livres complétés",
  consistencyRate: "Taux régularité",
  goalAchieved: "Objectif atteint!",
  progress: "Progression",
  chaptersLeft: "chapitres restants",
  chapters: "Chapitres",
  streak: "Série",
  record: "Record",
};
