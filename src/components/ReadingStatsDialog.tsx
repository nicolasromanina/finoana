import { BarChart3, Clock, BookOpen, Flame, TrendingUp, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { ReadingStats } from '@/hooks/useReadingStats';

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

  const maxMinutes = Math.max(...dailyData.map(d => d.minutes), 1);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            {t.readingStatistics}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Weekly Overview */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t.thisWeek}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{t.timeSpent}</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {formatTime(readingTimeThisWeek)}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-secondary border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-4 w-4 text-foreground" />
                    <span className="text-xs text-muted-foreground">{t.chaptersRead}</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {chaptersThisWeek}
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Chart */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t.dailyActivity}
              </h3>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-end justify-between gap-2 h-32 mb-2">
                  {dailyData.map((day, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className={cn(
                          "w-full rounded-t-md transition-all",
                          day.minutes > 0 ? "bg-primary" : "bg-muted"
                        )}
                        style={{ 
                          height: `${Math.max((day.minutes / maxMinutes) * 100, day.minutes > 0 ? 10 : 5)}%` 
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between gap-2">
                  {dailyData.map((day, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Streaks */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t.streaks}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span className="text-xs text-muted-foreground">{t.currentStreak}</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {stats.currentStreak} <span className="text-sm font-normal text-muted-foreground">{t.days}</span>
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">{t.longestStreak}</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {stats.longestStreak} <span className="text-sm font-normal text-muted-foreground">{t.days}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* All Time Stats */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t.allTimeStats}
              </h3>
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{t.totalReadingTime}</span>
                  </div>
                  <span className="font-semibold">{formatTime(stats.totalReadingTime)}</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span>{t.totalChapters}</span>
                  </div>
                  <span className="font-semibold">{stats.totalChaptersRead}</span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>{t.daysActive}</span>
                  </div>
                  <span className="font-semibold">{Object.keys(stats.sessionsPerDay).length}</span>
                </div>
              </div>
            </div>

            {/* Reading Goal Progress (Weekly) */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {t.weeklyGoal}
              </h3>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{t.chaptersPerWeek}</span>
                  <span className="text-sm font-semibold">{chaptersThisWeek} / 7</span>
                </div>
                <Progress value={Math.min((chaptersThisWeek / 7) * 100, 100)} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {chaptersThisWeek >= 7 ? t.goalReached : t.keepReading}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
