import { useState } from 'react';
import { Calendar, Check, ChevronRight, Clock, Bell, BellOff, Trash2, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { ReadingPlan, UserReadingPlan, BookMetadata } from '@/types/bible';

interface ReadingPlansDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePlans: ReadingPlan[];
  userPlans: UserReadingPlan[];
  books: BookMetadata[];
  onStartPlan: (planId: string) => void;
  onMarkDayComplete: (planId: string, day: number) => void;
  onToggleNotifications: (planId: string, enabled: boolean) => void;
  onDeletePlan: (planId: string) => void;
  onNavigateToReading: (bookId: string, chapter: number) => void;
  getPlanProgress: (planId: string) => number;
  getTodaysReading: (planId: string) => { day: number; readings: { book: string; chapter: number }[] } | null;
  getPlanById: (id: string) => ReadingPlan | undefined;
}

export function ReadingPlansDialog({
  open,
  onOpenChange,
  availablePlans,
  userPlans,
  books,
  onStartPlan,
  onMarkDayComplete,
  onToggleNotifications,
  onDeletePlan,
  onNavigateToReading,
  getPlanProgress,
  getTodaysReading,
  getPlanById,
}: ReadingPlansDialogProps) {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const getBookName = (bookId: string) => {
    return books.find(b => b.id === bookId)?.name || bookId;
  };

  const handleStartReading = (bookId: string, chapter: number) => {
    onNavigateToReading(bookId, chapter);
    onOpenChange(false);
  };

  const activePlans = userPlans.filter(up => {
    const plan = getPlanById(up.planId);
    return plan && up.completedDays.length < plan.duration;
  });

  const inactivePlanIds = userPlans.map(p => p.planId);
  const availableToStart = availablePlans.filter(p => !inactivePlanIds.includes(p.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {t.readingPlans}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Active Plans */}
            {activePlans.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t.activePlans}
                </h3>
                <div className="space-y-3">
                  {activePlans.map(userPlan => {
                    const plan = getPlanById(userPlan.planId);
                    if (!plan) return null;
                    
                    const todaysReading = getTodaysReading(userPlan.planId);
                    const progress = getPlanProgress(userPlan.planId);
                    const isSelected = selectedPlan === userPlan.planId;

                    return (
                      <div
                        key={userPlan.planId}
                        className="rounded-xl border border-border bg-card overflow-hidden"
                      >
                        <button
                          className="w-full p-4 text-left"
                          onClick={() => setSelectedPlan(isSelected ? null : userPlan.planId)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{plan.name}</h4>
                            <ChevronRight className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform",
                              isSelected && "rotate-90"
                            )} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Progress value={progress} className="flex-1 h-2" />
                            <span className="text-xs font-medium">{progress}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {userPlan.completedDays.length} / {plan.duration} {t.days}
                          </p>
                        </button>

                        {isSelected && (
                          <div className="border-t border-border p-4 bg-secondary/30 space-y-4">
                            {/* Today's Reading */}
                            {todaysReading && (
                              <div>
                                <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <Play className="h-4 w-4 text-primary" />
                                  {t.todaysReading} ({t.day} {todaysReading.day})
                                </h5>
                                <div className="space-y-2">
                                  {todaysReading.readings.map((reading, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => handleStartReading(reading.book, reading.chapter)}
                                      className="w-full flex items-center justify-between p-2 rounded-lg bg-background hover:bg-secondary transition-colors text-sm"
                                    >
                                      <span>{getBookName(reading.book)} {reading.chapter}</span>
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    </button>
                                  ))}
                                </div>
                                {!userPlan.completedDays.includes(todaysReading.day) && (
                                  <Button
                                    size="sm"
                                    className="w-full mt-2 gap-2"
                                    onClick={() => onMarkDayComplete(userPlan.planId, todaysReading.day)}
                                  >
                                    <Check className="h-4 w-4" />
                                    {t.markAsComplete}
                                  </Button>
                                )}
                              </div>
                            )}

                            {/* Notifications Toggle */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {userPlan.notificationsEnabled ? (
                                  <Bell className="h-4 w-4 text-primary" />
                                ) : (
                                  <BellOff className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm">{t.dailyReminder}</span>
                              </div>
                              <Switch
                                checked={userPlan.notificationsEnabled}
                                onCheckedChange={(checked) => onToggleNotifications(userPlan.planId, checked)}
                              />
                            </div>

                            {userPlan.notificationsEnabled && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{t.notificationTime}: {userPlan.notificationTime}</span>
                              </div>
                            )}

                            {/* Delete Plan */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                              onClick={() => onDeletePlan(userPlan.planId)}
                            >
                              <Trash2 className="h-4 w-4" />
                              {t.cancel}
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Available Plans */}
            {availableToStart.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  {t.availablePlans}
                </h3>
                <div className="space-y-3">
                  {availableToStart.map(plan => (
                    <div
                      key={plan.id}
                      className="p-4 rounded-xl border border-border bg-card"
                    >
                      <h4 className="font-semibold mb-1">{plan.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{plan.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {plan.duration} {t.days}
                        </span>
                        <Button size="sm" onClick={() => onStartPlan(plan.id)} className="gap-2">
                          <Play className="h-4 w-4" />
                          {t.startPlan}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activePlans.length === 0 && availableToStart.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">{t.noActivePlans}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
