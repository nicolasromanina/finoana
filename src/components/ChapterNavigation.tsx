import { ChevronLeft, ChevronRight, Hash, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ChapterNavigationProps {
  currentChapter: number;
  totalChapters: number;
  bookName?: string;
  onChapterChange: (chapter: number) => void;
}

export function ChapterNavigation({ 
  currentChapter, 
  totalChapters, 
  bookName,
  onChapterChange 
}: ChapterNavigationProps) {
  const { t } = useLanguage();
  
  const goToPrevious = () => {
    if (currentChapter > 1) {
      onChapterChange(currentChapter - 1);
    }
  };

  const goToNext = () => {
    if (currentChapter < totalChapters) {
      onChapterChange(currentChapter + 1);
    }
  };

  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-background rounded-xl border border-border/50">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPrevious}
        disabled={currentChapter === 1}
        className={cn(
          "h-9 w-9 rounded-lg transition-colors",
          currentChapter === 1 
            ? "opacity-30 cursor-not-allowed" 
            : "hover:bg-secondary hover:text-primary"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Chapter Selector */}
      <div className="flex items-center gap-2 flex-1">
        {bookName && (
          <span className="text-sm font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px]">
            {bookName}
          </span>
        )}
        
        <div className="relative flex-1 min-w-[100px]">
          <Select
            value={currentChapter.toString()}
            onValueChange={(val) => onChapterChange(parseInt(val))}
          >
            <SelectTrigger className="h-9 w-full bg-background border-border/50 hover:border-border">
              <div className="flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue>
                  <span className="font-medium">{currentChapter}</span>
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {chapters.map((chapter) => (
                <SelectItem 
                  key={chapter} 
                  value={chapter.toString()}
                  className={cn(
                    "flex items-center gap-2",
                    chapter === currentChapter && "bg-primary/5 text-primary"
                  )}
                >
                  <span className={cn(
                    "h-6 w-6 rounded-md flex items-center justify-center text-xs",
                    chapter === currentChapter 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  )}>
                    {chapter}
                  </span>
                  {t.chapter} {chapter}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Progress indicator */}
          <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-border/30 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentChapter - 1) / (totalChapters - 1)) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {t.of} {totalChapters}
        </div>
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={goToNext}
        disabled={currentChapter === totalChapters}
        className={cn(
          "h-9 w-9 rounded-lg transition-colors",
          currentChapter === totalChapters
            ? "opacity-30 cursor-not-allowed"
            : "hover:bg-secondary hover:text-primary"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}