import { 
  Home, 
  BookOpen, 
  Search, 
  Bookmark, 
  Settings,
  Calendar,
  BarChart3,
  Trophy,
  Moon,
  Sun,
  MessageCircle // Icône de chat ajoutée
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from 'react-router-dom'; // Import pour la navigation

interface MobileFooterProps {
  isHomePage: boolean;
  onNavigateHome: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenReadingPlans: () => void;
  onOpenStats: () => void;
  onOpenBadges: () => void;
  onOpenSettings: () => void;
  selectedVerse: number | null;
  isPlaying: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  bookmarksCount: number;
}

export function MobileFooter({ 
  isHomePage,
  onNavigateHome,
  onOpenSearch,
  onOpenBookmarks,
  onOpenReadingPlans,
  onOpenStats,
  onOpenBadges,
  onOpenSettings,
  selectedVerse,
  isPlaying,
  isPaused,
  onPlay,
  onPause,
  onStop,
  bookmarksCount
}: MobileFooterProps) {
  const { effectiveTheme, toggleTheme } = useTheme();
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour naviguer vers l'interface de chat
  const navigateToChat = () => {
    navigate('/chat/interface');
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16 px-2">
        {/* Navigation Buttons */}
        <Button 
          variant={isHomePage ? "default" : "ghost"} 
          size="icon" 
          className={`h-12 w-12 rounded-full ${isHomePage ? 'shadow-lg' : ''}`}
          onClick={onNavigateHome}
        >
          <Home className="h-5 w-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full"
          onClick={onOpenSearch}
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Bouton Chat IA */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-12 w-12 rounded-full relative"
          onClick={navigateToChat}
        >
          <MessageCircle className="h-5 w-5" />
          {/* Optionnel: Indicateur de nouveaux messages */}
          {/* <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary border-2 border-background" /> */}
        </Button>

        {/* Main Action Button - Changes based on context */}
        {selectedVerse ? (
          <Button 
            variant="default" 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg relative bg-primary"
            onClick={onOpenBookmarks}
          >
            <Bookmark className="h-6 w-6" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center border-2 border-background">
                {bookmarksCount > 9 ? '9+' : bookmarksCount}
              </span>
            )}
          </Button>
        ) : (
          <Button 
            variant="default" 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-primary"
            onClick={onOpenReadingPlans}
          >
            <BookOpen className="h-6 w-6" />
          </Button>
        )}

        {/* More Actions Menu */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full">
              <div className="flex flex-col items-center gap-0.5">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-48 p-2 mb-2">
            <div className="space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={onOpenStats}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Statistics
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={onOpenBadges}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Badges
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={toggleTheme}
              >
                {effectiveTheme === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={onOpenSettings}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Audio Controls - Only show when playing */}
        {(isPlaying || isPaused) && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-card border rounded-full px-3 py-2 shadow-lg">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={onStop}
            >
              <div className="h-3 w-3 bg-destructive rounded-sm" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="h-8 w-8"
              onClick={isPaused ? onPlay : onPause}
            >
              {isPaused ? (
                <div className="h-4 w-4 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-current transform rotate-90" />
              ) : (
                <div className="h-4 w-4 flex items-center justify-center">
                  <div className="h-4 w-1 bg-current" />
                  <div className="h-4 w-1 bg-current ml-1" />
                </div>
              )}
            </Button>
          </div>
        )}
      </div>
    </footer>
  );
}