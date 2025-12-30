import { useState } from 'react';
import { BookOpen, Sun, Moon, Monitor, ChevronRight, ChevronLeft, Download, Check, Share, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import type { UILanguage } from '@/i18n/translations';

interface OnboardingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const uiLanguageOptions: { code: UILanguage; name: string; flag: string; greeting: string }[] = [
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬', greeting: 'Tongasoa!' },
  { code: 'en', name: 'English', flag: '🇬🇧', greeting: 'Welcome!' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', greeting: '환영합니다!' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿', greeting: 'Karibu!' }
];

export function OnboardingDialog({ open, onOpenChange, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(0);
  const { themeMode, setThemeMode } = useTheme();
  const { uiLanguage, setUILanguage, t } = useLanguage();
  const { isInstallable, isInstalled, isIOS, promptInstall } = usePWAInstall();

  const steps = ['welcome', 'language', 'theme', 'install'];
  const totalSteps = steps.length;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    onComplete();
    onOpenChange(false);
  };

  const handleSkip = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    onComplete();
    onOpenChange(false);
  };

  const renderStep = () => {
    switch (steps[step]) {
      case 'welcome':
        return (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
              <BookOpen className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{t.welcomeTitle}</h1>
              <p className="text-muted-foreground">{t.welcomeSubtitle}</p>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{t.chooseLanguage}</h2>
              <p className="text-sm text-muted-foreground">{t.interfaceLanguage}</p>
            </div>
            <div className="grid gap-3">
              {uiLanguageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setUILanguage(lang.code)}
                  className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                    uiLanguage === lang.code
                      ? 'bg-primary text-primary-foreground shadow-md scale-[1.02]'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium">{lang.name}</p>
                    <p className={`text-sm ${uiLanguage === lang.code ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {lang.greeting}
                    </p>
                  </div>
                  {uiLanguage === lang.code && <Check className="h-5 w-5" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 'theme':
        return (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{t.chooseTheme}</h2>
              <p className="text-sm text-muted-foreground">{t.theme}</p>
            </div>
            <div className="grid gap-3">
              <button
                onClick={() => setThemeMode('system')}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  themeMode === 'system'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  themeMode === 'system' ? 'bg-primary-foreground/20' : 'bg-background'
                }`}>
                  <Monitor className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t.themeSystem}</p>
                  <p className={`text-sm ${themeMode === 'system' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    Auto-detect
                  </p>
                </div>
                {themeMode === 'system' && <Check className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setThemeMode('light')}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  themeMode === 'light'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  themeMode === 'light' ? 'bg-primary-foreground/20' : 'bg-background'
                }`}>
                  <Sun className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t.lightMode}</p>
                </div>
                {themeMode === 'light' && <Check className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setThemeMode('dark')}
                className={`flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                  themeMode === 'dark'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary hover:bg-secondary/80'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  themeMode === 'dark' ? 'bg-primary-foreground/20' : 'bg-background'
                }`}>
                  <Moon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t.darkMode}</p>
                </div>
                {themeMode === 'dark' && <Check className="h-5 w-5" />}
              </button>
            </div>
          </div>
        );

      case 'install':
        return (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{t.installStep}</h2>
              <p className="text-sm text-muted-foreground">{t.installInstructions}</p>
            </div>

            {isInstalled ? (
              <div className="text-center p-6 rounded-xl bg-green-500/10 border border-green-500/20">
                <Check className="h-12 w-12 mx-auto text-green-500 mb-3" />
                <p className="font-medium text-green-600 dark:text-green-400">{t.appInstalled}</p>
              </div>
            ) : isIOS ? (
              <div className="space-y-4 p-4 rounded-xl bg-secondary">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">iPhone / iPad</p>
                </div>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <div className="flex items-center gap-2">
                      <Share className="h-4 w-4" />
                      <span>{t.iosInstallStep1}</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <span>{t.iosInstallStep2}</span>
                  </li>
                </ol>
              </div>
            ) : isInstallable ? (
              <div className="text-center">
                <Button
                  onClick={promptInstall}
                  size="lg"
                  className="gap-2 w-full max-w-xs mx-auto"
                >
                  <Download className="h-5 w-5" />
                  {t.installApp}
                </Button>
              </div>
            ) : (
              <div className="text-center p-6 rounded-xl bg-secondary">
                <p className="text-sm text-muted-foreground">
                  {t.installInstructions}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden [&>button]:hidden">
        {/* Progress indicator */}
        <div className="flex gap-1 p-4 pb-0">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-all ${
                index <= step ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 min-h-[300px]">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          {step > 0 ? (
            <Button variant="ghost" onClick={handlePrevious} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              {t.previousStep}
            </Button>
          ) : (
            <Button variant="ghost" onClick={handleSkip}>
              {t.skip}
            </Button>
          )}

          <Button onClick={handleNext} className="gap-1">
            {step === totalSteps - 1 ? t.letsStart : t.nextStep}
            {step < totalSteps - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
