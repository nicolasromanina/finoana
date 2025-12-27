import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
}

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const [settings, setSettings] = useLocalStorage<NotificationSettings>('notificationSettings', {
    enabled: false,
    time: '08:00'
  });

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
        // Clear scheduled notifications via service worker
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

  const scheduleReminder = useCallback((time: string) => {
    if (!isSupported || permission !== 'granted') return;

    // Parse time
    const [hours, minutes] = time.split(':').map(Number);
    
    // Calculate next notification time
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    // If time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const delay = scheduledTime.getTime() - now.getTime();
    
    // Store schedule info for service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          payload: {
            time,
            delay,
            title: 'Baiboly',
            body: 'Fotoana famakiana ny Soratra Masina' // Time to read the Scriptures
          }
        });
      });
    }

    // Fallback: Use setTimeout for same-day notifications
    if (delay < 24 * 60 * 60 * 1000) {
      setTimeout(() => {
        if (settings.enabled && document.visibilityState !== 'visible') {
          new Notification('Baiboly', {
            body: 'Fotoana famakiana ny Soratra Masina',
            icon: '/pwa-192x192.png',
            badge: '/favicon.svg',
            tag: 'daily-reminder'
          });
        }
      }, delay);
    }
  }, [isSupported, permission, settings.enabled]);

  const sendTestNotification = useCallback(() => {
    if (permission === 'granted') {
      new Notification('Baiboly', {
        body: 'Fampahatsiarovana test - Notifications enabled!',
        icon: '/pwa-192x192.png',
        badge: '/favicon.svg'
      });
    }
  }, [permission]);

  return {
    isSupported,
    permission,
    isEnabled: settings.enabled,
    notificationTime: settings.time,
    requestPermission,
    enableNotifications,
    disableNotifications,
    setNotificationTime,
    sendTestNotification
  };
}
