import { Clock, Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

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

  return (
    <Card 
      className="glass border-border/50 cursor-pointer hover:bg-secondary/30 transition-colors"
      onClick={onOpenStats}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t.readingStatistics}
          </h3>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {/* Time This Week */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="text-lg font-bold">{formatTime(readingTimeThisWeek)}</div>
            <div className="text-xs text-muted-foreground">{t.thisWeek}</div>
          </div>
          
          {/* Chapters This Week */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-secondary mb-2">
              <span className="text-lg font-bold">{chaptersThisWeek}</span>
            </div>
            <div className="text-lg font-bold">{t.chaptersRead}</div>
            <div className="text-xs text-muted-foreground">{t.thisWeek}</div>
          </div>
          
          {/* Current Streak */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10 mb-2">
              <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
            </div>
            <div className="text-lg font-bold">{currentStreak} {t.days}</div>
            <div className="text-xs text-muted-foreground">{t.currentStreak}</div>
          </div>
        </div>

        {currentStreak > 0 && currentStreak >= longestStreak && (
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
              🔥 {t.longestStreak}!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
