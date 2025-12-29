import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
  streakReminder: boolean;
}

interface NotificationMessages {
  title: string;
  body: string;
  streakBody: string;
}

const getNotificationMessages = (lang: string = 'en'): NotificationMessages => {
  const messages: Record<string, NotificationMessages> = {
    mg: {
      title: 'Baiboly',
      body: 'Fotoana famakiana ny Soratra Masina',
      streakBody: 'Aza adino mamaky androany mba hihazona ny fitohizana!'
    },
    en: {
      title: 'Bible',
      body: 'Time to read the Holy Scriptures',
      streakBody: "Don't forget to read today to maintain your streak!"
    },
    ko: {
      title: '바이볼리',
      body: '성경을 읽을 시간입니다',
      streakBody: '연속 기록을 유지하기 위해 오늘 읽는 것을 잊지 마세요!'
    },
    sw: {
      title: 'Biblia',
      body: 'Wakati wa kusoma Maandiko Matakatifu',
      streakBody: 'Usisahau kusoma leo ili kudumisha mfululizo wako!'
    }
  };
  return messages[lang] || messages.en;
};

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [settings, setSettings] = useLocalStorage<NotificationSettings>('notificationSettings', {
    enabled: false,
    time: '08:00',
    streakReminder: true
  });
  const [uiLanguage] = useLocalStorage<string>('uiLanguage', 'mg');

  useEffect(() => {
    const supported = 'Notification' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;
    
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [isSupported]);

  const enableNotifications = useCallback(async (): Promise<boolean> => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return false;
    }
    
    setSettings(prev => ({ ...prev, enabled: true }));
    scheduleReminder(settings.time);
    return true;
  }, [permission, requestPermission, settings.time, setSettings]);

  const disableNotifications = useCallback(() => {
    setSettings(prev => ({ ...prev, enabled: false }));
    // Clear any scheduled notifications
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({ type: 'CLEAR_NOTIFICATIONS' });
      });
    }
  }, [setSettings]);

  const setNotificationTime = useCallback((time: string) => {
    setSettings(prev => ({ ...prev, time }));
    if (settings.enabled) {
      scheduleReminder(time);
    }
  }, [settings.enabled, setSettings]);

  const toggleStreakReminder = useCallback((enabled: boolean) => {
    setSettings(prev => ({ ...prev, streakReminder: enabled }));
  }, [setSettings]);

  const scheduleReminder = useCallback((time: string) => {
    if (!isSupported || permission !== 'granted') return;

    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const delay = scheduledTime.getTime() - now.getTime();
    const messages = getNotificationMessages(uiLanguage);
    
    // Store schedule info for service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          payload: {
            time,
            delay,
            title: messages.title,
            body: messages.body
          }
        });
      });
    }

    // Fallback: Use setTimeout for same-day notifications
    if (delay < 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        if (settings.enabled && document.visibilityState !== 'visible') {
          new Notification(messages.title, {
            body: messages.body,
            icon: '/pwa-192x192.png',
            badge: '/favicon.svg',
            tag: 'daily-reminder'
          });
        }
      }, delay);
    }
  }, [isSupported, permission, settings.enabled, uiLanguage]);

  const sendStreakReminder = useCallback((currentStreak: number) => {
    if (permission !== 'granted' || !settings.streakReminder) return;
    
    const messages = getNotificationMessages(uiLanguage);
    
    new Notification(messages.title, {
      body: `🔥 ${currentStreak} ${messages.streakBody}`,
      icon: '/pwa-192x192.png',
      badge: '/favicon.svg',
      tag: 'streak-reminder'
    });
  }, [permission, settings.streakReminder, uiLanguage]);

  const sendTestNotification = useCallback(() => {
    if (permission === 'granted') {
      const messages = getNotificationMessages(uiLanguage);
      new Notification(messages.title, {
        body: 'Test notification - Notifications enabled!',
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg'
      });
    }
  }, [permission, uiLanguage]);

  return {
    isSupported,
    permission,
    isEnabled: settings.enabled,
    notificationTime: settings.time,
    streakReminderEnabled: settings.streakReminder,
    requestPermission,
    enableNotifications,
    disableNotifications,
    setNotificationTime,
    toggleStreakReminder,
    sendStreakReminder,
    sendTestNotification
  };
}
