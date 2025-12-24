import { useState, useEffect } from 'react';
import { Download, Check, Smartphone, Wifi, WifiOff, Share, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { FontSizeProvider } from '@/contexts/FontSizeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function InstallContent() {
  const { t, uiLanguage } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running as installed PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsInstalled(isStandalone);

    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Online/offline detection
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  const translations = {
    mg: {
      title: 'Hametraka ny Baiboly',
      subtitle: 'Afaka mamaky ny Baiboly na dia tsy misy Internet aza',
      installed: 'Efa nametraka!',
      install: 'Hametraka',
      features: {
        offline: 'Miasa na tsy misy Internet',
        fast: 'Haingana sy mora',
        home: 'Azo alefa amin\'ny home screen',
      },
      iosInstructions: 'Amin\'ny Safari, tsindrio Share ary "Add to Home Screen"',
      online: 'Mifandray amin\'ny Internet',
      offline: 'Tsy misy Internet',
      backToApp: 'Hiverina amin\'ny Baiboly',
    },
    en: {
      title: 'Install Baiboly',
      subtitle: 'Read the Bible even without an internet connection',
      installed: 'Already installed!',
      install: 'Install',
      features: {
        offline: 'Works offline',
        fast: 'Fast and lightweight',
        home: 'Add to home screen',
      },
      iosInstructions: 'In Safari, tap Share and then "Add to Home Screen"',
      online: 'You are online',
      offline: 'You are offline',
      backToApp: 'Back to Bible',
    },
    ko: {
      title: 'Baiboly 설치',
      subtitle: '인터넷 연결 없이도 성경을 읽을 수 있습니다',
      installed: '이미 설치됨!',
      install: '설치',
      features: {
        offline: '오프라인 작동',
        fast: '빠르고 가벼움',
        home: '홈 화면에 추가',
      },
      iosInstructions: 'Safari에서 공유를 누르고 "홈 화면에 추가"를 선택하세요',
      online: '온라인 상태',
      offline: '오프라인 상태',
      backToApp: '성경으로 돌아가기',
    },
  };

  const text = translations[uiLanguage] || translations.en;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Status bar */}
      <div className={`px-4 py-2 flex items-center justify-center gap-2 text-sm ${
        isOnline ? 'bg-green-500/10 text-green-700' : 'bg-destructive/10 text-destructive'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            {text.online}
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            {text.offline}
          </>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* App icon */}
        <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-lg">
          <img src="/pwa-512x512.png" alt="Baiboly" className="w-20 h-20 rounded-2xl" />
        </div>

        <h1 className="text-2xl font-bold text-center mb-2">{text.title}</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-sm">{text.subtitle}</p>

        {/* Features */}
        <div className="grid gap-4 mb-8 w-full max-w-sm">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <WifiOff className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">{text.features.offline}</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">{text.features.home}</span>
          </div>
        </div>

        {/* Install button */}
        {isInstalled ? (
          <div className="flex items-center gap-2 text-green-600 mb-4">
            <Check className="h-5 w-5" />
            <span className="font-medium">{text.installed}</span>
          </div>
        ) : isIOS ? (
          <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border mb-4 max-w-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Share className="h-5 w-5 text-primary" />
              <span className="font-medium">iOS</span>
            </div>
            <p className="text-sm text-muted-foreground">{text.iosInstructions}</p>
          </div>
        ) : deferredPrompt ? (
          <Button size="lg" onClick={handleInstall} className="gap-2 mb-4">
            <Download className="h-5 w-5" />
            {text.install}
          </Button>
        ) : (
          <div className="text-center p-4 rounded-xl bg-secondary/50 border border-border mb-4 max-w-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MoreVertical className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {uiLanguage === 'ko' 
                ? '브라우저 메뉴에서 "홈 화면에 추가"를 선택하세요'
                : uiLanguage === 'mg'
                ? 'Amin\'ny menu-n\'ny navigateur, safidio "Add to Home Screen"'
                : 'Use your browser menu to "Add to Home Screen"'
              }
            </p>
          </div>
        )}

        <a href="/" className="text-primary hover:underline">
          {text.backToApp}
        </a>
      </div>
    </div>
  );
}

export default function Install() {
  return (
    <ThemeProvider>
      <FontSizeProvider>
        <LanguageProvider>
          <InstallContent />
        </LanguageProvider>
      </FontSizeProvider>
    </ThemeProvider>
  );
}
