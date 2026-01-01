import { Menu, Search, Bookmark, Calendar, BarChart3, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileHeaderProps {
  onOpenMenu: () => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenReadingPlans: () => void;
  onOpenStats: () => void;
  onOpenBadges: () => void;
  bookmarksCount: number;
  sidebarContent: React.ReactNode;
}

export function MobileHeader({ 
  onOpenMenu, 
  onOpenSearch, 
  onOpenBookmarks, 
  onOpenReadingPlans, 
  onOpenStats, 
  onOpenBadges, 
  bookmarksCount,
  sidebarContent 
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border lg:hidden">
      <div className="px-4 h-14 flex items-center justify-between">
        {/* Left: Menu Button */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              {sidebarContent}
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            {/* Favicon-style logo */}
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center overflow-hidden">
              <img 
                src="/favicon.svg" 
                alt="Baiboly" 
                className="w-5 h-5"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<span class="text-primary-foreground font-bold text-sm">B</span>';
                }}
              />
            </div>
            <span className="font-semibold text-base">Baiboly</span>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onOpenSearch}>
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 relative" onClick={onOpenBookmarks}>
            <Bookmark className="h-4 w-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {bookmarksCount > 9 ? '9+' : bookmarksCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}