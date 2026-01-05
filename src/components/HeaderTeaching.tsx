import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, X, Search, Home, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import SearchDialog from "./SearchDialog copy";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-soft"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark shadow-soft transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg font-semibold text-foreground leading-tight">
                BAIBOLY
              </span>
              <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">
                Hamaky Baiboly
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/teaching"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive("/")
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Fandraisana
            </Link>
            <Link
              to="/courses"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                isActive("/courses")
                  ? "bg-gold/10 text-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              Lesona
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Chat Button */}
            <Link to="/chat/mode">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">Chat</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </Link>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-200 border border-border/50"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Fikarohana</span>
              <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-fade-in">
            <nav className="container mx-auto flex flex-col gap-1 p-4">
              <Link
                to="/"
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                  isActive("/")
                    ? "bg-gold/10 text-gold"
                    : "text-foreground hover:bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4" />
                Fandraisana
              </Link>
              <Link
                to="/courses"
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                  isActive("/courses")
                    ? "bg-gold/10 text-gold"
                    : "text-foreground hover:bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4" />
                Ireo Taranja
              </Link>
              <Link
                to="/chat/mode"
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center gap-2",
                  isActive("/chat/mode")
                    ? "bg-gold/10 text-gold"
                    : "text-foreground hover:bg-secondary"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
};

export default Header;