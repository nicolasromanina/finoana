import { useState } from 'react';
import { MessageSquare, Palette, X, Check, Trash2, Edit3 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import type { HighlightColor, VerseHighlight, VerseNote } from '@/types/bible';

interface VerseActionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verseNumber: number;
  verseText: string;
  verseReference: string;
  currentHighlight?: VerseHighlight;
  currentNote?: VerseNote;
  onAddHighlight: (color: HighlightColor) => void;
  onRemoveHighlight: () => void;
  onSaveNote: (text: string) => void;
  onDeleteNote: () => void;
}

const highlightColors: { color: HighlightColor; label: string; className: string }[] = [
  { color: 'yellow', label: 'Yellow', className: 'bg-yellow-300/50 hover:bg-yellow-300/70 border-yellow-400' },
  { color: 'green', label: 'Green', className: 'bg-green-300/50 hover:bg-green-300/70 border-green-400' },
  { color: 'blue', label: 'Blue', className: 'bg-blue-300/50 hover:bg-blue-300/70 border-blue-400' },
  { color: 'pink', label: 'Pink', className: 'bg-pink-300/50 hover:bg-pink-300/70 border-pink-400' },
  { color: 'purple', label: 'Purple', className: 'bg-purple-300/50 hover:bg-purple-300/70 border-purple-400' },
];

export function VerseActionsDialog({
  open,
  onOpenChange,
  verseNumber,
  verseText,
  verseReference,
  currentHighlight,
  currentNote,
  onAddHighlight,
  onRemoveHighlight,
  onSaveNote,
  onDeleteNote,
}: VerseActionsDialogProps) {
  const { t } = useLanguage();
  const [noteText, setNoteText] = useState(currentNote?.text || '');
  const [isEditing, setIsEditing] = useState(!currentNote);

  const handleSaveNote = () => {
    if (noteText.trim()) {
      onSaveNote(noteText.trim());
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">{verseReference}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Verse preview */}
          <div className="p-3 rounded-lg bg-secondary/50 border border-border">
            <p className="text-sm font-serif leading-relaxed line-clamp-3">
              <span className="font-semibold text-primary mr-1">{verseNumber}</span>
              {verseText}
            </p>
          </div>

          {/* Highlight colors */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              {t.highlight}
            </h4>
            <div className="flex flex-wrap gap-2">
              {highlightColors.map(({ color, className }) => (
                <button
                  key={color}
                  onClick={() => onAddHighlight(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center",
                    className,
                    currentHighlight?.color === color && "ring-2 ring-offset-2 ring-primary"
                  )}
                >
                  {currentHighlight?.color === color && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
              {currentHighlight && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={onRemoveHighlight}
                >
                  <X className="h-4 w-4 mr-1" />
                  {t.removeHighlight}
                </Button>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {currentNote ? t.editNote : t.addNote}
            </h4>
            
            {isEditing || !currentNote ? (
              <div className="space-y-2">
                <Textarea
                  placeholder={t.noteText}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveNote} disabled={!noteText.trim()}>
                    <Check className="h-4 w-4 mr-1" />
                    {t.save}
                  </Button>
                  {currentNote && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setNoteText(currentNote.text);
                        setIsEditing(false);
                      }}
                    >
                      {t.cancel}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <p className="text-sm mb-2">{currentNote.text}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit3 className="h-3 w-3 mr-1" />
                    {t.editNote}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={onDeleteNote}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    {t.deleteNote}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
