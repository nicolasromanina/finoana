// TheoLogicalExplorer.tsx - Minimal Design
import { Book, ChevronRight, BookOpen, Filter } from 'lucide-react';
import { THEOLOGICAL_TOPICS, REFORMED_CREEDS } from '../../lib/theologicalData';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface TheoLogicalExplorerProps {
  onSelectTopic: (topic: string) => void;
}

export function TheoLogicalExplorer({ onSelectTopic }: TheoLogicalExplorerProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const topics = Object.entries(THEOLOGICAL_TOPICS)
    .map(([key, value]) => ({
      id: key,
      ...value
    }))
    .filter(topic => 
      topic.titleFr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.descriptionFr.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="rounded-lg border bg-card p-4 mb-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">
              Explorer la Théologie
            </h3>
            <p className="text-xs text-muted-foreground">
              Thèmes réformés et doctrines bibliques
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un thème..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Topics Grid */}
      <div className="space-y-2">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic.id)}
            className="group text-left w-full p-3 rounded-md border border-border/50 hover:border-border hover:bg-secondary/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <h4 className="font-medium text-sm group-hover:text-primary">
                    {topic.titleFr}
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {topic.descriptionFr}
                </p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 ml-2" />
            </div>
          </button>
        ))}
      </div>

      {/* Creeds Section */}
      <div className="pt-4 border-t">
        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/10">
            <Book className="h-3 w-3 text-amber-600" />
          </div>
          Confessions Réformées
        </h4>
        <div className="grid sm:grid-cols-3 gap-2">
          {Object.entries(REFORMED_CREEDS).map(([key, creed]) => (
            <div
              key={key}
              className="p-2 rounded-md bg-amber-500/5 border border-amber-500/10 text-xs"
            >
              <div className="font-medium text-amber-700">
                {creed.name}
              </div>
              <div className="text-muted-foreground mt-0.5">
                Source d'autorité
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}