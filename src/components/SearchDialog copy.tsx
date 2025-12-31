import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  X,
  Clock,
  TrendingUp,
  Hash,
  Sparkles,
  ChevronRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useHotkeys } from "react-hotkeys-hook";

interface SearchResult {
  type: "course" | "module" | "section";
  courseId: string;
  courseTitle: string;
  moduleId?: number;
  moduleTitle?: string;
  sectionId?: string;
  sectionTitle?: string;
  content?: string;
  matchedText: string;
  relevance: number;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Hotkey pour ouvrir la recherche (Ctrl+K ou Cmd+K)
  useHotkeys('ctrl+k, cmd+k', (e) => {
    e.preventDefault();
    onOpenChange(true);
  }, { enableOnFormTags: true });

  // Reset state quand le dialog s'ouvre
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    courses.forEach((course) => {
      let relevance = 0;

      // Search in course
      const titleMatch = course.title.toLowerCase().includes(lowerQuery);
      const descMatch = course.description.toLowerCase().includes(lowerQuery);
      
      if (titleMatch) relevance += 3;
      if (descMatch) relevance += 1;

      if (titleMatch || descMatch) {
        searchResults.push({
          type: "course",
          courseId: course.id,
          courseTitle: course.title,
          matchedText: course.description.substring(0, 120) + (course.description.length > 120 ? "..." : ""),
          relevance
        });
      }

      // Search in modules
      course.modules.forEach((module) => {
        relevance = 0;
        const moduleTitleMatch = module.title.toLowerCase().includes(lowerQuery);
        
        if (moduleTitleMatch) relevance += 2;

        if (moduleTitleMatch) {
          searchResults.push({
            type: "module",
            courseId: course.id,
            courseTitle: course.title,
            moduleId: module.id,
            moduleTitle: module.title,
            matchedText: module.title,
            relevance
          });
        }

        // Search in sections
        module.sections.forEach((section) => {
          relevance = 0;
          const sectionTitleMatch = section.title.toLowerCase().includes(lowerQuery);
          const sectionContent = section.content || "";
          const contentMatch = sectionContent.toLowerCase().includes(lowerQuery);

          if (sectionTitleMatch) relevance += 3;
          if (contentMatch) relevance += 1;

          if (sectionTitleMatch || contentMatch) {
            let matchedText = section.title;
            
            if (contentMatch && sectionContent) {
              const index = sectionContent.toLowerCase().indexOf(lowerQuery);
              if (index !== -1) {
                const start = Math.max(0, index - 60);
                const end = Math.min(sectionContent.length, index + query.length + 60);
                matchedText = "..." + sectionContent.slice(start, end) + "...";
              }
            }

            searchResults.push({
              type: "section",
              courseId: course.id,
              courseTitle: course.title,
              moduleId: module.id,
              moduleTitle: module.title,
              sectionId: section.id,
              sectionTitle: section.title,
              content: sectionContent,
              matchedText,
              relevance
            });
          }
        });
      });
    });

    // Sort by relevance and limit results
    return searchResults
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
          
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
          
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
          
        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex, onOpenChange]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsContainerRef.current && results.length > 0) {
      const selectedElement = resultsContainerRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex, results]);

  const handleSelect = useCallback((result: SearchResult) => {
    onOpenChange(false);
    setQuery("");
    setSelectedIndex(0);

    if (result.type === "course") {
      navigate(`/course/${result.courseId}`);
    } else if (result.type === "module" || result.type === "section") {
      navigate(`/course/${result.courseId}`, {
        state: { 
          openModule: result.moduleId,
          openSection: result.sectionId 
        }
      });
    }
  }, [navigate, onOpenChange]);

  const getTypeIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />;
      case "module":
        return <FileText className="h-4 w-4" />;
      case "section":
        return <Hash className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    switch (type) {
      case "course":
        return "bg-blue-500/20 text-blue-600";
      case "module":
        return "bg-emerald-500/20 text-emerald-600";
      case "section":
        return "bg-amber-500/20 text-amber-600";
      default:
        return "bg-foreground/10 text-foreground";
    }
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "course":
        return "Taranja";
      case "module":
        return "Module";
      case "section":
        return "Fizarana";
      default:
        return "Fizarana";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 overflow-hidden border-foreground/10 bg-background/95 backdrop-blur-xl shadow-2xl">
        {/* Search Header */}
        <div className="px-6 py-5 border-b border-foreground/10">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Tadiavo lohahevitra, taranja, modules..."
                className="pl-8 pr-12 border-0 bg-transparent p-0 text-lg placeholder:text-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-sm text-foreground/50">
              <kbd className="px-2 py-1 bg-foreground/5 rounded text-xs">Esc</kbd>
              <span>hanakatona</span>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div 
          ref={resultsContainerRef}
          className="max-h-[60vh] overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            {query.length < 2 ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-12 text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 mb-4">
                  <Search className="h-8 w-8 text-foreground/30" />
                </div>
                <p className="text-sm text-foreground/60 mb-2">
                  Soraty ny teny karohina
                </p>
                <p className="text-xs text-foreground/40">
                  Manomboka amin'ny 2 litera farafahakeliny
                </p>
                
                {/* Recent Searches Placeholder */}
                <div className="mt-8 text-left">
                  <div className="text-xs font-medium text-foreground/50 mb-3">
                    Fanoroana matetika
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["Fiangonana", "Baptisma", "Foto-pinoana", "Fivavahana"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 text-sm rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/70 hover:text-foreground transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : results.length === 0 ? (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-6 py-12 text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/5 mb-4">
                  <FileText className="h-8 w-8 text-foreground/30" />
                </div>
                <p className="text-sm text-foreground/60 mb-1">
                  Tsy nahitana vokatra
                </p>
                <p className="text-xs text-foreground/40">
                  Tsy nahitana vokatra ho an'ny "{query}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Results Info */}
                <div className="px-6 py-3 border-b border-foreground/10 bg-foreground/2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-foreground/60">
                      Nahitana <span className="font-semibold text-foreground">{results.length}</span> vokatra
                    </p>
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <ArrowRight className="h-3 w-3" />
                      <span>hifidiana</span>
                    </div>
                  </div>
                </div>

                {/* Results List */}
                <div className="py-2">
                  {results.map((result, index) => (
                    <motion.button
                      key={`${result.type}-${result.courseId}-${result.moduleId || ''}-${result.sectionId || ''}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full px-6 py-4 flex items-start gap-4 text-left transition-all duration-150",
                        "hover:bg-foreground/5 active:bg-foreground/10",
                        selectedIndex === index && "bg-foreground/5"
                      )}
                    >
                      {/* Type Indicator */}
                      <div className={cn(
                        "shrink-0 p-2 rounded-lg",
                        getTypeColor(result.type)
                      )}>
                        {getTypeIcon(result.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            getTypeColor(result.type)
                          )}>
                            {getTypeLabel(result.type)}
                          </span>
                          
                          <div className="flex items-center gap-1 text-xs text-foreground/50">
                            <span className="truncate">{result.courseTitle}</span>
                            {result.moduleTitle && (
                              <>
                                <ChevronRight className="h-3 w-3" />
                                <span className="truncate">{result.moduleTitle}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <h4 className="font-medium text-foreground mb-1.5 line-clamp-1">
                          {result.sectionTitle || result.moduleTitle || result.courseTitle}
                        </h4>
                        
                        {result.matchedText && (
                          <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                            {result.matchedText}
                          </p>
                        )}
                      </div>

                      {/* Relevance Indicator */}
                      {result.relevance > 2 && (
                        <div className="flex items-center gap-1 text-xs text-foreground/40">
                          <TrendingUp className="h-3 w-3" />
                          <span>Matetika</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-foreground/10 bg-foreground/2.5">
          <div className="flex items-center justify-between text-xs text-foreground/50">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="h-3 w-3" />
                <span>hifidiana</span>
              </span>
              <span className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  <kbd className="px-1.5 py-0.5 bg-foreground/5 rounded text-xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-foreground/5 rounded text-xs">↓</kbd>
                </div>
                <span>hifindra</span>
              </span>
            </div>
            
            {query && results.length > 0 && (
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                <span>{results.length} vokatra hita</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;