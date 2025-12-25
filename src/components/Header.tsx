import { Book, Menu, Moon, Sun, Type, Minus, Plus, Search, Bookmark, Globe, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useFontSize } from '@/contexts/FontSizeContext';
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
  bookmarksCount: number;
  sidebarContent: React.ReactNode;
}

const uiLanguageOptions: { code: UILanguage; name: string; flag: string }[] = [
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
];

export function Header({ 
  languages, 
  selectedLanguage, 
  onLanguageChange,
  onOpenSearch,
  onOpenBookmarks,
  onOpenReadingPlans,
  bookmarksCount,
  sidebarContent 
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();
  const { uiLanguage, setUILanguage, t } = useLanguage();

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
              {/* Mobile language switcher */}
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">{t.interfaceLanguage}</p>
                <div className="flex gap-1">
                  {uiLanguageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setUILanguage(lang.code)}
                      className={`flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-sm transition-colors ${
                        uiLanguage === lang.code 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <span>{lang.flag}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <InstallButton variant="compact" className="w-full justify-center" />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center">
              <Book className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
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

          <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 relative" onClick={onOpenBookmarks}>
            <Bookmark className="h-4 w-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {bookmarksCount > 9 ? '9+' : bookmarksCount}
              </span>
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex">
                <Globe className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2">
              <p className="text-xs text-muted-foreground mb-2 px-2">{t.interfaceLanguage}</p>
              <div className="space-y-1">
                {uiLanguageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setUILanguage(lang.code)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      uiLanguage === lang.code ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-[80px] sm:w-[110px] h-8 sm:h-9 text-xs sm:text-sm">
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 hidden sm:flex">
                <Type className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decreaseFontSize} disabled={fontSize === 'sm'}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-8 text-center capitalize">{fontSize}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={increaseFontSize} disabled={fontSize === 'xl'}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 sm:h-9 sm:w-9">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
