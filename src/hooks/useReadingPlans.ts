import { useState, useEffect, useCallback } from 'react';
import { IndexedDbService } from '@/services/indexedDbService';
import { readingPlans, getPlanById } from '@/data/readingPlans';
import type { ReadingPlan, UserReadingPlan, BookMetadata } from '@/types/bible';

interface UseReadingPlansProps {
  dbService: IndexedDbService | null;
}

export function useReadingPlans({ dbService }: UseReadingPlansProps) {
  const [userPlans, setUserPlans] = useState<UserReadingPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserPlans = async () => {
      if (!dbService) return;
      
      setIsLoading(true);
      try {
        const plans = await dbService.getAllUserReadingPlans();
        setUserPlans(plans);
      } catch (error) {
        console.error('Error loading user plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPlans();
  }, [dbService]);

  const startPlan = useCallback(async (planId: string) => {
    if (!dbService) return;
    
    const plan = getPlanById(planId);
    if (!plan) return;
    
    const userPlan: UserReadingPlan = {
      planId,
      startDate: Date.now(),
      completedDays: [],
      currentDay: 1,
      notificationsEnabled: false,
      notificationTime: '08:00',
    };
    
    try {
      await dbService.saveUserReadingPlan(userPlan);
      setUserPlans(prev => [...prev.filter(p => p.planId !== planId), userPlan]);
    } catch (error) {
      console.error('Error starting plan:', error);
    }
  }, [dbService]);

  const markDayComplete = useCallback(async (planId: string, day: number) => {
    if (!dbService) return;
    
    const userPlan = userPlans.find(p => p.planId === planId);
    if (!userPlan) return;
    
    const updatedPlan: UserReadingPlan = {
      ...userPlan,
      completedDays: [...new Set([...userPlan.completedDays, day])],
      currentDay: Math.max(userPlan.currentDay, day + 1),
    };
    
    try {
      await dbService.saveUserReadingPlan(updatedPlan);
      setUserPlans(prev => prev.map(p => p.planId === planId ? updatedPlan : p));
    } catch (error) {
      console.error('Error marking day complete:', error);
    }
  }, [dbService, userPlans]);

  const toggleNotifications = useCallback(async (planId: string, enabled: boolean, time?: string) => {
    if (!dbService) return;
    
    const userPlan = userPlans.find(p => p.planId === planId);
    if (!userPlan) return;
    
    const updatedPlan: UserReadingPlan = {
      ...userPlan,
      notificationsEnabled: enabled,
      notificationTime: time || userPlan.notificationTime,
    };
    
    try {
      await dbService.saveUserReadingPlan(updatedPlan);
      setUserPlans(prev => prev.map(p => p.planId === planId ? updatedPlan : p));
      
      // Request notification permission if enabling
      if (enabled && 'Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          // Revert if permission denied
          const revertedPlan = { ...updatedPlan, notificationsEnabled: false };
          await dbService.saveUserReadingPlan(revertedPlan);
          setUserPlans(prev => prev.map(p => p.planId === planId ? revertedPlan : p));
        }
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
    }
  }, [dbService, userPlans]);

  const deletePlan = useCallback(async (planId: string) => {
    if (!dbService) return;
    
    try {
      await dbService.deleteUserReadingPlan(planId);
      setUserPlans(prev => prev.filter(p => p.planId !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  }, [dbService]);

  const getTodaysReading = useCallback((planId: string) => {
    const userPlan = userPlans.find(p => p.planId === planId);
    if (!userPlan) return null;
    
    const plan = getPlanById(planId);
    if (!plan) return null;
    
    const daysSinceStart = Math.floor((Date.now() - userPlan.startDate) / (1000 * 60 * 60 * 24)) + 1;
    const currentDay = Math.min(daysSinceStart, plan.duration);
    
    return plan.readings[currentDay - 1] || null;
  }, [userPlans]);

  const getPlanProgress = useCallback((planId: string) => {
    const userPlan = userPlans.find(p => p.planId === planId);
    if (!userPlan) return 0;
    
    const plan = getPlanById(planId);
    if (!plan) return 0;
    
    return Math.round((userPlan.completedDays.length / plan.duration) * 100);
  }, [userPlans]);

  const getUserPlan = useCallback((planId: string) => {
    return userPlans.find(p => p.planId === planId);
  }, [userPlans]);

  return {
    availablePlans: readingPlans,
    userPlans,
    isLoading,
    startPlan,
    markDayComplete,
    toggleNotifications,
    deletePlan,
    getTodaysReading,
    getPlanProgress,
    getUserPlan,
    getPlanById,
  };
}
