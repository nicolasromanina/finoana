import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  GraduationCap, 
  Star,
  History,
  X,
  Filter,
  LayoutGrid,
  List
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import type { BookMetadata } from '@/types/bible';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useDebounce } from '../hooks/useDebounce';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  books: BookMetadata[];
  selectedBook: BookMetadata | null;
  onBookChange: (book: BookMetadata) => void;
  recentBooks?: BookMetadata[];
  favoriteBooks?: BookMetadata[];
  onToggleFavorite?: (bookId: string) => void;
}

type ViewMode = 'list' | 'grid';
type SortOption = 'alphabetical' | 'canonical' | 'popular';

export function Sidebar({ 
  books, 
  selectedBook, 
  onBookChange, 
  recentBooks = [],
  favoriteBooks = [],
  onToggleFavorite
}: SidebarProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTestament, setExpandedTestament] = useState<'old' | 'new' | 'both'>('old');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortOption, setSortOption] = useState<SortOption>('canonical');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const sortedBooks = useMemo(() => {
    const sorted = [...books];
    switch (sortOption) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'popular':
        // Vous pouvez remplacer ceci par des données réelles d'utilisation
        return sorted.sort((a, b) => b.chapters - a.chapters);
      case 'canonical':
      default:
        return sorted;
    }
  }, [books, sortOption]);

  const oldTestamentBooks = sortedBooks.filter(b => b.testament === 'old');
  const newTestamentBooks = sortedBooks.filter(b => b.testament === 'new');

  const filteredOldTestament = oldTestamentBooks.filter(b => 
    b.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const filteredNewTestament = newTestamentBooks.filter(b => 
    b.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const hasSearchResults = filteredOldTestament.length > 0 || filteredNewTestament.length > 0;
  const totalSearchResults = filteredOldTestament.length + filteredNewTestament.length;

  useEffect(() => {
    if (selectedBook) {
      setExpandedTestament(selectedBook.testament);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (debouncedSearchQuery) {
      setExpandedTestament('both');
      setIsFilterOpen(true);
    }
  }, [debouncedSearchQuery]);

  const toggleTestament = (testament: 'old' | 'new') => {
    if (expandedTestament === 'both') {
      setExpandedTestament(testament);
    } else if (expandedTestament === testament) {
      setExpandedTestament(testament === 'old' ? 'new' : 'old');
    } else {
      setExpandedTestament(testament);
    }
  };

  const isExpanded = (testament: 'old' | 'new') => 
    expandedTestament === testament || expandedTestament === 'both';

  const clearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  const handleBookSelect = (book: BookMetadata) => {
    onBookChange(book);
    // Fermer automatiquement le filtre sur mobile
    if (window.innerWidth < 768) {
      setIsFilterOpen(false);
    }
  };

  const renderBookList = (bookList: BookMetadata[]) => (
    <div className={cn(
      "space-y-1 py-1",
      viewMode === 'grid' ? "grid grid-cols-2 gap-1.5 px-2" : "pl-2"
    )}>
      {bookList.map((book) => {
        const isFavorite = favoriteBooks.some(fb => fb.file === book.file);
        const isRecent = recentBooks.some(rb => rb.file === book.file);
        
        return (
          <TooltipProvider key={book.file}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleBookSelect(book)}
                  className={cn(
                    "w-full text-left transition-all duration-200 relative group",
                    viewMode === 'list' && "px-3 py-2.5 rounded-lg flex items-center justify-between",
                    viewMode === 'grid' && "p-2 rounded-md flex flex-col items-center justify-center text-center",
                    selectedBook?.file === book.file 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-secondary/60"
                  )}
                >
                  {/* Badges d'état */}
                  <div className="absolute top-1.5 left-1.5 flex gap-1">
                    {isFavorite && (
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    )}
                    {isRecent && (
                      <History className="h-3 w-3 text-blue-400" />
                    )}
                  </div>

                  {viewMode === 'list' ? (
                    <>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate text-sm">{book.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <BookOpen className="h-3 w-3 opacity-50" />
                          <span className="text-xs opacity-70">{book.chapters} {t.chapters || 'chapters'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {onToggleFavorite && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleFavorite(book.file);
                            }}
                            className={cn(
                              "p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity",
                              isFavorite && "opacity-100"
                            )}
                          >
                            <Star className={cn(
                              "h-4 w-4",
                              isFavorite 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-muted-foreground hover:text-yellow-400"
                            )} />
                          </button>
                        )}
                        <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                      </div>
                    </>
                  ) : (
                    // Vue grille
                    <>
                      <div className="font-medium text-sm mb-1 truncate w-full">{book.name}</div>
                      <div className="flex items-center gap-1 text-xs opacity-70">
                        <BookOpen className="h-3 w-3" />
                        <span>{book.chapters}</span>
                      </div>
                    </>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-medium">{book.name}</p>
                <p className="text-xs opacity-70">{book.chapters} {t.chapters || 'chapters'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-border">
      {/* En-tête */}
      <div className="p-4 border-b border-border space-y-3">
        {/* Boutons d'action principaux */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Link
              to="/teaching"
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
                "hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <GraduationCap className="h-4 w-4" />
              <span className="font-medium text-sm">{t.teaching || "Teaching"}</span>
            </Link>
          </div>

          {/* Boutons de vue */}
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              onClick={() => setViewMode('list')}
              className="h-7 w-7 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              onClick={() => setViewMode('grid')}
              className="h-7 w-7 p-0"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Barre de recherche avec filtres */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder={t.searchBooks || "Search books..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9 h-10 bg-background/50 backdrop-blur-sm border-input/50"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filtres rapides */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="h-8 px-2 text-xs"
              >
                <Filter className="h-3.5 w-3.5 mr-1" />
                {t.filter || "Filter"}
              </Button>
              
              {debouncedSearchQuery && (
                <Badge variant="secondary" className="text-xs">
                  {totalSearchResults} results
                </Badge>
              )}
            </div>

            {recentBooks.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleBookSelect(recentBooks[0])}
                className="h-8 px-2 text-xs"
              >
                <History className="h-3.5 w-3.5 mr-1" />
                {t.recent || "Recent"}
              </Button>
            )}
          </div>

          {/* Panneau de filtres */}
          {isFilterOpen && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.sortBy || "Sort by"}</span>
                  <div className="flex gap-1">
                    {(['canonical', 'alphabetical', 'popular'] as SortOption[]).map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortOption(option)}
                        className={cn(
                          "px-2 py-1 rounded text-xs transition-colors",
                          sortOption === option 
                            ? "bg-primary text-primary-foreground" 
                            : "hover:bg-secondary/80"
                        )}
                      >
                        {option === 'canonical' 
                          ? t.canonical || 'Canonical'
                          : option === 'alphabetical'
                          ? t.alphabetical || 'Alphabetical'
                          : t.popular || 'Popular'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{t.quickAccess || "Quick access"}</span>
                  <div className="flex gap-1">
                    {favoriteBooks.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookSelect(favoriteBooks[0])}
                        className="h-7 px-2 text-xs"
                      >
                        <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                        {t.favorites || "Favorites"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Liste des livres */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {/* Livres récents */}
          {recentBooks.length > 0 && !debouncedSearchQuery && (
            <div className="mb-4">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <History className="h-4 w-4 text-blue-500" />
                <span className="font-semibold text-sm">{t.recentlyRead || "Recently Read"}</span>
              </div>
              <div className="space-y-1">
                {recentBooks.slice(0, 3).map((book) => (
                  <button
                    key={`recent-${book.file}`}
                    onClick={() => handleBookSelect(book)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium text-sm truncate">{book.name}</span>
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
              <Separator className="my-3" />
            </div>
          )}

          {/* Ancien Testament */}
          <div className="mb-3">
            <button
              onClick={() => toggleTestament('old')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group",
                "hover:bg-secondary/50 border border-transparent hover:border-secondary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isExpanded('old') ? "bg-primary/10" : "bg-secondary"
                )}>
                  {isExpanded('old') ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                <div className="text-left">
                  <span className="font-semibold text-sm block">
                    {t.oldTestament || "Old Testament"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {filteredOldTestament.length} {t.books || "books"} • 39 total
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {filteredOldTestament.length}
              </Badge>
            </button>
            
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isExpanded('old') ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0"
            )}>
              {renderBookList(filteredOldTestament)}
            </div>
          </div>

          {/* Nouveau Testament */}
          <div>
            <button
              onClick={() => toggleTestament('new')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-200 group",
                "hover:bg-secondary/50 border border-transparent hover:border-secondary/30"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isExpanded('new') ? "bg-blue-500/10" : "bg-secondary"
                )}>
                  {isExpanded('new') ? (
                    <ChevronDown className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
                <div className="text-left">
                  <span className="font-semibold text-sm block">
                    {t.newTestament || "New Testament"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {filteredNewTestament.length} {t.books || "books"} • 27 total
                  </span>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {filteredNewTestament.length}
              </Badge>
            </button>
            
            <div className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              isExpanded('new') ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0"
            )}>
              {renderBookList(filteredNewTestament)}
            </div>
          </div>

          {/* Message si aucun résultat */}
          {debouncedSearchQuery && !hasSearchResults && (
            <div className="py-8 text-center">
              <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">{t.noBooksFound || "No books found"} "{debouncedSearchQuery}"</p>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {t.tryDifferentSearch || "Try a different search term"}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Pied de page avec statistiques */}
      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{books.length} {t.bookstotal || "books total"}</span>
            <span>•</span>
            <span>{oldTestamentBooks.length} {t.ot || "OT"}</span>
            <span>•</span>
            <span>{newTestamentBooks.length} {t.nt || "NT"}</span>
          </div>
          {selectedBook && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{t.nowReading || "Now reading"}: {selectedBook.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{t.currentSelection || "Current selection"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </div>
  );
}