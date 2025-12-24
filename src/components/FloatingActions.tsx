import { Bookmark, Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface FloatingActionsProps {
  isVisible: boolean;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  selectedVerseText?: string;
  verseReference?: string;
}

export function FloatingActions({
  isVisible,
  isBookmarked,
  onToggleBookmark,
  selectedVerseText,
  verseReference,
}: FloatingActionsProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (selectedVerseText && verseReference) {
      await navigator.clipboard.writeText(`"${selectedVerseText}" — ${verseReference}`);
      setCopied(true);
      toast({
        title: t.copied,
        description: t.copiedToClipboard,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (selectedVerseText && verseReference) {
      if (navigator.share) {
        await navigator.share({
          title: t.appName,
          text: `"${selectedVerseText}" — ${verseReference}`,
        });
      } else {
        handleCopy();
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="floating-bar scale-in">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleBookmark}
        className={cn(
          "gap-2 transition-colors",
          isBookmarked && "text-primary"
        )}
      >
        <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
        <span className="hidden sm:inline">{isBookmarked ? t.saved : t.save}</span>
      </Button>

      <div className="w-px h-6 bg-border" />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">{t.copy}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleShare}
        className="gap-2"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">{t.share}</span>
      </Button>
    </div>
  );
}
