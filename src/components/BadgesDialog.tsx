import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Award, Trophy, Flame, Clock, Star, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Badge as BadgeType, BadgeCategory } from '../types/badges';
import { ReadingStats } from '../hooks/useReadingStats';

interface BadgesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  badges: BadgeType[];
  level: number;
  totalPoints: number;
  stats: ReadingStats;
  getProgress: (stats: ReadingStats) => (BadgeType & { progress: number })[];
}

const categoryIcons: Record<BadgeCategory, React.ReactNode> = {
  reading: <Award className="h-4 w-4" />,
  streak: <Flame className="h-4 w-4" />,
  milestone: <Clock className="h-4 w-4" />,
  special: <Star className="h-4 w-4" />,
};

const categoryLabels: Record<BadgeCategory, Record<string, string>> = {
  reading: { en: 'Reading', mg: 'Famakiana', ko: '독서', sw: 'Kusoma' },
  streak: { en: 'Streaks', mg: 'Fitohy', ko: '연속', sw: 'Mfululizo' },
  milestone: { en: 'Milestones', mg: 'Dingana', ko: '마일스톤', sw: 'Hatua' },
  special: { en: 'Special', mg: 'Manokana', ko: '특별', sw: 'Maalum' },
};

export function BadgesDialog({
  open,
  onOpenChange,
  badges,
  level,
  totalPoints,
  stats,
  getProgress,
}: BadgesDialogProps) {
  const { uiLanguage, t } = useLanguage();
  const badgesWithProgress = getProgress(stats);
  const unlockedCount = badges.filter(b => b.unlocked).length;

  const groupedBadges = badgesWithProgress.reduce((acc, badge) => {
    if (!acc[badge.category]) acc[badge.category] = [];
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<BadgeCategory, (BadgeType & { progress: number })[]>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            {t.badgesRewards}
          </DialogTitle>
        </DialogHeader>

        <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {level}
              </div>
              <div>
                <div className="font-semibold">{t.level} {level}</div>
                <div className="text-xs text-muted-foreground">{totalPoints} {t.points}</div>
              </div>
            </div>
            <Badge variant="secondary">
              {unlockedCount}/{badges.length} {t.unlocked}
            </Badge>
          </div>
          <Progress value={(totalPoints % 50) * 2} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            {50 - (totalPoints % 50)} {t.pointsToNextLevel}
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          {(Object.keys(groupedBadges) as BadgeCategory[]).map(category => (
            <div key={category} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                {categoryIcons[category]}
                <span className="font-medium">
                  {categoryLabels[category][uiLanguage] || categoryLabels[category].en}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {groupedBadges[category].map(badge => (
                  <div
                    key={badge.id}
                    className={`relative p-3 rounded-lg border transition-all ${
                      badge.unlocked
                        ? 'bg-primary/10 border-primary/30'
                        : 'bg-muted/50 border-border opacity-60'
                    }`}
                  >
                    {!badge.unlocked && (
                      <Lock className="absolute top-2 right-2 h-3 w-3 text-muted-foreground" />
                    )}
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-medium text-sm">{badge.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {badge.description}
                    </div>
                    {!badge.unlocked && badge.progress < 100 && (
                      <Progress value={badge.progress} className="h-1" />
                    )}
                    {badge.unlocked && badge.unlockedAt && (
                      <div className="text-xs text-primary">
                        ✓ {new Date(badge.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
