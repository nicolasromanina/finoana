import { useState, useEffect } from 'react';
import { Wifi, WifiOff, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { uiLanguage } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setDismissed(false);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      setDismissed(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner || dismissed) return null;

  const messages = {
    mg: {
      online: 'Mifandray amin\'ny Internet indray',
      offline: 'Tsy misy Internet - Miasa amin\'ny cache',
    },
    en: {
      online: 'Back online',
      offline: 'No internet - Using cached data',
    },
    ko: {
      online: '온라인 복귀',
      offline: '오프라인 - 캐시 데이터 사용 중',
    },
    sw: {
      online: 'Tumeunganishwa tena mtandaoni',
      offline: 'Hakuna intaneti - Kutumia data iliyohifadhiwa',
    },
  };

  const text = messages[uiLanguage] || messages.en;

  return (
    <div
      className={cn(
        "fixed top-16 left-0 right-0 z-50 px-4 py-2 flex items-center justify-center gap-2 text-sm transition-all duration-300",
        isOnline 
          ? "bg-green-500/90 text-white" 
          : "bg-amber-500/90 text-white"
      )}
    >
      {isOnline ? (
        <Wifi className="h-4 w-4" />
      ) : (
        <WifiOff className="h-4 w-4" />
      )}
      <span>{isOnline ? text.online : text.offline}</span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
