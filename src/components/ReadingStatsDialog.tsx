import { BarChart3, Clock, BookOpen, Flame, TrendingUp, Calendar, Target, Zap, Activity, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { ReadingStats } from '@/hooks/useReadingStats';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ReadingStatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stats: ReadingStats;
  chaptersThisWeek: number;
  readingTimeThisWeek: number;
  dailyData: { day: string; minutes: number; chapters: number }[];
  formatTime: (seconds: number) => string;
}

export function ReadingStatsDialog({
  open,
  onOpenChange,
  stats,
  chaptersThisWeek,
  readingTimeThisWeek,
  dailyData,
  formatTime,
}: ReadingStatsDialogProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'insights'>('overview');

  const maxMinutes = Math.max(...dailyData.map(d => d.minutes), 1);
  const weeklyProgress = Math.min((chaptersThisWeek / 7) * 100, 100);
  const avgDailyReading = readingTimeThisWeek / 7;
  const productivityScore = Math.min(
    ((chaptersThisWeek * 0.4) + (readingTimeThisWeek / 3600 * 0.3) + (stats.currentStreak * 0.3)) * 10,
    100
  );

  const getProductivityColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-blue-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-rose-500';
  };

  const tabs = [
    { id: 'overview', label: t.overview || 'Overview', icon: BarChart3 },
    { id: 'analytics', label: t.analytics || 'Analytics', icon: Activity },
    { id: 'insights', label: t.insights || 'Insights', icon: Brain },
  ];

  const getProductivityLabel = (score: number) => {
    if (score >= 80) return t.excellent || 'Excellent';
    if (score >= 60) return t.good || 'Good';
    if (score >= 40) return t.fair || 'Fair';
    return t.needsImprovement || 'Needs Improvement';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[85vh] flex flex-col p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              {t.readingStatistics}
            </DialogTitle>
            <div className="flex items-center gap-1 bg-secondary/30 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-background shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <Icon className="h-4 w-4 sm:hidden" />
                  </button>
                );
              })}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-4 space-y-6"
            >
              {activeTab === 'overview' && (
                <>
                  {/* Productivity Score */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-background to-secondary/20 border border-border/50 p-5">
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        getProductivityColor(productivityScore).replace('text-', 'bg-').replace('500', '500/10')
                      )}>
                        {productivityScore.toFixed(0)}/100
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t.productivityScore || 'Productivity Score'}</h3>
                        <p className="text-sm text-muted-foreground">{t.weeklyPerformance || 'Weekly Performance'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={cn("font-medium", getProductivityColor(productivityScore))}>
                          {getProductivityLabel(productivityScore)}
                        </span>
                        <span className="text-muted-foreground">
                          {Math.round(avgDailyReading / 60)} {t.minPerDay || 'min/day'}
                        </span>
                      </div>
                      <Progress value={productivityScore} className="h-1.5" />
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">{t.timeSpent}</span>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        {formatTime(readingTimeThisWeek)}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs text-emerald-500">+12%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-foreground" />
                        <span className="text-xs text-muted-foreground">{t.chaptersRead}</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {chaptersThisWeek}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/7</span>
                      </p>
                      <div className="w-full bg-secondary rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-primary rounded-full h-1.5 transition-all duration-500"
                          style={{ width: `${weeklyProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Daily Activity with Heatmap */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {t.dailyActivity || 'Daily Activity'}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {dailyData.filter(d => d.minutes > 0).length}/7 {t.daysActive || 'days active'}
                      </span>
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {dailyData.map((day, idx) => {
                        const intensity = Math.min(day.minutes / (maxMinutes * 0.8), 1);
                        return (
                          <div key={idx} className="space-y-1">
                            <div className="aspect-square rounded-lg relative overflow-hidden group">
                              <div 
                                className={cn(
                                  "absolute inset-0 transition-all duration-300",
                                  day.minutes > 0 
                                    ? intensity > 0.7 ? "bg-primary" 
                                      : intensity > 0.4 ? "bg-primary/70" 
                                      : "bg-primary/40"
                                    : "bg-secondary"
                                )}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium mix-blend-overlay">
                                  {day.chapters || 0}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <span className="text-xs text-center block text-muted-foreground">
                              {day.day.charAt(0)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'analytics' && (
                <>
                  {/* Streaks Comparison */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {t.streakAnalytics || 'Streak Analytics'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium">{t.currentStreak}</span>
                          </div>
                          {stats.currentStreak > 0 && (
                            <div className="flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-xs text-emerald-500">Active</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{stats.currentStreak}</span>
                          <span className="text-sm text-muted-foreground">{t.days}</span>
                        </div>
                        {stats.currentStreak > 0 && (
                          <div className="flex gap-0.5 mt-3">
                            {Array.from({ length: Math.min(stats.currentStreak, 7) }).map((_, i) => (
                              <div 
                                key={i}
                                className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                                style={{ opacity: 1 - (i * 0.1) }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 rounded-xl border border-border/50 bg-card">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm font-medium">{t.longestStreak}</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-bold">{stats.longestStreak}</span>
                          <span className="text-sm text-muted-foreground">{t.days}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {stats.currentStreak >= stats.longestStreak 
                            ? (t.newRecord || 'New Record!')
                            : `${stats.longestStreak - stats.currentStreak} ${t.daysToBeat || 'days to beat'}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reading Patterns */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {t.readingPatterns || 'Reading Patterns'}
                    </h3>
                    <div className="rounded-xl border border-border/50 bg-card p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.averageSession || 'Average Session'}</span>
                        <span className="font-semibold">
                          {formatTime(stats.totalReadingTime / Math.max(Object.keys(stats.sessionsPerDay).length, 1))}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.peakHours || 'Peak Hours'}</span>
                        <span className="font-semibold">18:00-21:00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{t.consistency || 'Consistency'}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(Object.keys(stats.sessionsPerDay).length / 30) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">
                            {Math.round((Object.keys(stats.sessionsPerDay).length / 30) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'insights' && (
                <>
                  {/* Weekly Goal Progress */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {t.weeklyGoal}
                      </h3>
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{t.chaptersPerWeek || 'Chapters per Week'}</span>
                          <span className="font-bold">
                            {chaptersThisWeek}<span className="text-muted-foreground font-normal">/7</span>
                          </span>
                        </div>
                        <div className="relative">
                          <Progress value={weeklyProgress} className="h-2" />
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className={cn(
                            "font-medium",
                            chaptersThisWeek >= 7 ? "text-emerald-500" : "text-amber-500"
                          )}>
                            {chaptersThisWeek >= 7 
                              ? (t.goalAchieved || 'Goal Achieved!') 
                              : (t.progress || 'Progress')}
                          </span>
                          <span className="text-muted-foreground">
                            {7 - chaptersThisWeek} {t.chaptersLeft || 'chapters left'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* All Time Stats */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      {t.lifetimeStats || 'Lifetime Stats'}
                    </h3>
                    <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/50">
                      <div className="p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Clock className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{t.totalReadingTime}</div>
                            <div className="text-xs text-muted-foreground">{t.lifetime || 'Lifetime'}</div>
                          </div>
                        </div>
                        <span className="font-bold group-hover:scale-105 transition-transform">
                          {formatTime(stats.totalReadingTime)}
                        </span>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">{t.totalChapters}</div>
                            <div className="text-xs text-muted-foreground">{t.booksCompleted || 'Books Completed'}</div>
                          </div>
                        </div>
                        <span className="font-bold group-hover:scale-105 transition-transform">
                          {stats.totalChaptersRead}
                        </span>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10">
                            <Calendar className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div>
                            <div className="font-medium">{t.daysActive}</div>
                            <div className="text-xs text-muted-foreground">{t.consistencyRate || 'Consistency Rate'}</div>
                          </div>
                        </div>
                        <span className="font-bold group-hover:scale-105 transition-transform">
                          {Object.keys(stats.sessionsPerDay).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}