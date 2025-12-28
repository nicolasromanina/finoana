import { useState, useEffect } from 'react';
import { Settings, Sun, Moon, Monitor, Download, Trash2, Bell, BellOff, Clock, HardDrive, Check, Eye, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from '@/contexts/ThemeContext';
import { useFontSize } from '@/contexts/FontSizeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useOfflineDownload } from '@/hooks/useOfflineDownload';
import { useIsMobile } from '@/hooks/use-mobile';
import { InstallButton } from '@/components/InstallButton';
import { toast } from 'sonner';
import type { Language, BookMetadata } from '@/types/bible';
import type { IndexedDbService } from '@/services/indexedDbService';
import type { UILanguage } from '@/i18n/translations';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dbService: IndexedDbService | null;
  languages: Language[];
  books: BookMetadata[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const uiLanguageOptions: { code: UILanguage; name: string; flag: string }[] = [
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export function SettingsDialog({
  open,
  onOpenChange,
  dbService,
  languages,
  books,
  selectedLanguage,
  onLanguageChange,
}: SettingsDialogProps) {
  const isMobile = useIsMobile();
  const { themeMode, setThemeMode, effectiveTheme } = useTheme();
  const { fontSize, setFontSize } = useFontSize();
  const { uiLanguage, setUILanguage, t } = useLanguage();
  const notifications = useNotifications();
  const offlineDownload = useOfflineDownload({ dbService, books, languages });
  
  const [storageInfo, setStorageInfo] = useState<{ used: number; quota: number } | null>(null);

  useEffect(() => {
    if (open) {
      offlineDownload.getStorageEstimate().then(setStorageInfo);
    }
  }, [open]);

  const fontSizeMap: Record<string, number> = { sm: 0, base: 1, lg: 2, xl: 3 };
  const fontSizeReverse: Record<number, 'sm' | 'base' | 'lg' | 'xl'> = { 0: 'sm', 1: 'base', 2: 'lg', 3: 'xl' };

  const handleResetCache = async () => {
    if (!dbService) return;
    
    try {
      await dbService.clearAllData();
      toast.success(t.resetCacheSuccess);
      // Reload page after cache clear
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast.error(t.error);
    }
  };

  const handleDownloadOffline = async () => {
    const success = await offlineDownload.downloadAllBooks(selectedLanguage);
    if (success) {
      toast.success(t.downloadComplete);
      offlineDownload.getStorageEstimate().then(setStorageInfo);
    } else if (offlineDownload.error) {
      toast.error(offlineDownload.error);
    }
  };

  const handleToggleNotifications = async () => {
    if (notifications.isEnabled) {
      notifications.disableNotifications();
      toast.success(t.notificationsDisabled);
    } else {
      const success = await notifications.enableNotifications();
      if (success) {
        toast.success(t.notificationsEnabled);
      }
    }
  };

  const content = (
    <div className="space-y-6 py-4">
      {/* UI Language */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          {t.interfaceLanguage}
        </h3>
        <div className="flex gap-2">
          {uiLanguageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setUILanguage(lang.code)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                uiLanguage === lang.code
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Theme */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.theme}</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setThemeMode('system')}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm transition-all ${
              themeMode === 'system'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <Monitor className="h-5 w-5" />
            <span>{t.themeSystem}</span>
          </button>
          <button
            onClick={() => setThemeMode('light')}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm transition-all ${
              themeMode === 'light'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <Sun className="h-5 w-5" />
            <span>{t.lightMode}</span>
          </button>
          <button
            onClick={() => setThemeMode('dark')}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm transition-all ${
              themeMode === 'dark'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <Moon className="h-5 w-5" />
            <span>{t.darkMode}</span>
          </button>
          <button
            onClick={() => setThemeMode('night')}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-sm transition-all ${
              themeMode === 'night'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            <Eye className="h-5 w-5" />
            <span>{t.nightMode}</span>
          </button>
        </div>
        <p className="text-xs text-muted-foreground">{t.nightModeDescription}</p>
      </div>

      <Separator />

      {/* Font Size */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.fontSize}</h3>
        <div className="px-2">
          <Slider
            value={[fontSizeMap[fontSize]]}
            min={0}
            max={3}
            step={1}
            onValueChange={([value]) => setFontSize(fontSizeReverse[value])}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>A</span>
            <span className="text-sm">A</span>
            <span className="text-base">A</span>
            <span className="text-lg">A</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bible Language */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.bibleLanguage}</h3>
        <Select value={selectedLanguage} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t.language} />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Notifications */}
      {notifications.isSupported && (
        <>
          <div className="space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              {notifications.isEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
              {t.dailyReminder}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t.enableNotifications}</span>
              <Switch
                checked={notifications.isEnabled}
                onCheckedChange={handleToggleNotifications}
              />
            </div>
            {notifications.isEnabled && (
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <input
                  type="time"
                  value={notifications.notificationTime}
                  onChange={(e) => notifications.setNotificationTime(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            )}
          </div>
          <Separator />
        </>
      )}

      {/* Offline Data */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <HardDrive className="h-4 w-4" />
          {t.downloadForOffline}
        </h3>
        
        {storageInfo && (
          <div className="text-xs text-muted-foreground">
            {t.storageUsed}: {offlineDownload.formatBytes(storageInfo.used)} / {offlineDownload.formatBytes(storageInfo.quota)}
          </div>
        )}

        {offlineDownload.isDownloading ? (
          <div className="space-y-2">
            <Progress value={offlineDownload.progressPercent} />
            <p className="text-xs text-muted-foreground text-center">
              {offlineDownload.progress.currentBook} ({offlineDownload.progress.current}/{offlineDownload.progress.total})
            </p>
          </div>
        ) : (
          <Button
            onClick={handleDownloadOffline}
            variant="secondary"
            className="w-full gap-2"
          >
            <Download className="h-4 w-4" />
            {t.downloadForOffline}
          </Button>
        )}
      </div>

      <Separator />

      {/* Reset Cache */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.resetCache}</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full gap-2">
              <Trash2 className="h-4 w-4" />
              {t.resetCache}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.resetCache}</AlertDialogTitle>
              <AlertDialogDescription>
                {t.resetCacheConfirm}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleResetCache}>
                {t.confirm}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Separator />

      {/* Install PWA */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{t.installApp}</h3>
        <InstallButton variant="default" className="w-full" />
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t.settings}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 overflow-y-auto">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {t.settings}
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
