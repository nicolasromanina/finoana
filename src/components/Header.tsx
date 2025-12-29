import { Menu, Moon, Sun, Search, Bookmark, Globe, Calendar, Settings, BarChart3, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { InstallButton } from '@/components/InstallButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Language } from '@/types/bible';
import type { UILanguage } from '@/i18n/translations';

interface HeaderProps {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenReadingPlans: () => void;
  onOpenStats: () => void;
  onOpenBadges: () => void;
  onOpenSettings: () => void;
  bookmarksCount: number;
  sidebarContent: React.ReactNode;
}

const uiLanguageOptions: { code: UILanguage; name: string; flag: string }[] = [
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
];

export function Header({ 
  languages, 
  selectedLanguage, 
  onLanguageChange,
  onOpenSearch,
  onOpenBookmarks,
  onOpenReadingPlans,
  onOpenStats,
  onOpenBadges,
  onOpenSettings,
  bookmarksCount,
  sidebarContent 
}: HeaderProps) {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { uiLanguage, setUILanguage, t } = useLanguage();

  const currentFlag = uiLanguageOptions.find(l => l.code === uiLanguage)?.flag || '🌐';

  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-2 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              {sidebarContent}
              {/* Mobile bottom section - simplified, settings moved to header */}
              <div className="p-4 border-t border-border space-y-3">
                <InstallButton variant="compact" className="w-full justify-center" />
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            {/* Favicon-style logo */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
              <img 
                src="/favicon.svg" 
                alt="Baiboly" 
                className="w-5 h-5 sm:w-6 sm:h-6"
                onError={(e) => {
                  // Fallback to text if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<span class="text-primary-foreground font-bold text-sm">B</span>';
                }}
              />
            </div>
            <span className="font-semibold text-base sm:text-lg hidden sm:block">{t.appName}</span>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onOpenSearch}>
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onOpenReadingPlans}>
            <Calendar className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onOpenStats}>
            <BarChart3 className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onOpenBadges}>
            <Trophy className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 relative" onClick={onOpenBookmarks}>
            <Bookmark className="h-4 w-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {bookmarksCount > 9 ? '9+' : bookmarksCount}
              </span>
            )}
          </Button>

          {/* Bible language selector - hidden on mobile, now in settings */}
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[80px] sm:w-[110px] h-8 sm:h-9 text-xs sm:text-sm hidden md:flex">
              <SelectValue placeholder={t.language} />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Settings button - visible on all screens */}
          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={onOpenSettings}>
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 sm:h-9 sm:w-9">
            {effectiveTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
