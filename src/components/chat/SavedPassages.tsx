// SavedPassages.tsx - Minimal Design
import { Bookmark, Trash2, Copy, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SavedPassage {
  id: string;
  reference: string;
  content: string;
  notes?: string;
  created_at: string;
  tags?: string[];
}

interface SavedPassagesProps {
  passages: SavedPassage[];
  onDelete: (id: string) => void;
}

export function SavedPassages({ passages, onDelete }: SavedPassagesProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (passages.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-500/10">
            <Bookmark className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-emerald-900">
              Versets Sauvegardés
            </h3>
            <p className="text-xs text-muted-foreground">
              {passages.length} passages enregistrés
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {passages.map((passage) => (
          <div
            key={passage.id}
            className="group p-3 rounded-md border border-border/50 hover:border-border hover:bg-secondary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-emerald-900">
                    {passage.reference}
                  </h4>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">
                    {formatDate(passage.created_at)}
                  </span>
                </div>
                
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  {passage.content}
                </p>
              </div>

              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => handleCopy(passage.content, passage.id)}
                  className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-background border border-border transition-colors"
                  title={copied === passage.id ? 'Copié' : 'Copier'}
                >
                  <Copy className={cn(
                    "h-3.5 w-3.5",
                    copied === passage.id
                      ? "text-green-600"
                      : "text-muted-foreground"
                  )} />
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(menuOpen === passage.id ? null : passage.id)}
                    className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-background border border-border transition-colors"
                  >
                    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  
                  {menuOpen === passage.id && (
                    <div className="absolute right-0 top-full mt-1 py-1 rounded-md border bg-popover shadow-lg min-w-[120px] z-10">
                      <button
                        onClick={() => {
                          onDelete(passage.id);
                          setMenuOpen(null);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {passage.notes && (
              <div className="mt-2 pl-3 border-l-2 border-emerald-300">
                <p className="text-xs text-muted-foreground">
                  📝 {passage.notes}
                </p>
              </div>
            )}

            {passage.tags && passage.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {passage.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}