// ModeSelector.tsx - Minimal Design
import { BookOpen, Heart, Layers, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../HeaderTeaching';

interface ModeSelectorProps {
  onSelectMode: (mode: string) => void;
}

const modes = [
  {
    id: 'teaching_fr',
    title: 'Enseignement Biblique',
    subtitle: 'Étude Théologique Approfondie',
    description: 'Exégèse rigoureuse, contexte historique et doctrine réformée',
    icon: BookOpen,
    color: 'blue',
  },
  {
    id: 'teaching_mg',
    title: 'Fampianarana Baiboly',
    subtitle: 'Fandinihana Teolojika Lalina',
    description: 'Fanadihadiana marina, tontolo ara-tantara ary teolojia reformé',
    icon: BookOpen,
    color: 'blue',
  },
  {
    id: 'counseling_fr',
    title: 'Counseling Biblique',
    subtitle: 'Accompagnement Pastoral',
    description: 'Sagesse pratique fondée sur l\'Écriture et la théologie réformée',
    icon: Heart,
    color: 'emerald',
  },
  {
    id: 'counseling_mg',
    title: 'Counseling Baiboly',
    subtitle: 'Fanohanana Ara-panahy',
    description: 'Fahendrena miorina amin\'ny Soratra Masina sy teolojia reformé',
    icon: Heart,
    color: 'emerald',
  },
];

const principles = [
  {
    title: 'Sola Scriptura',
    description: 'L\'Écriture seule comme autorité suprême',
  },
  {
    title: 'Westminster',
    description: 'Confessions réformées historiques',
  },
  {
    title: 'Théologie de l\'Alliance',
    description: 'Cadre biblique unifié',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-primary/5',
    border: 'border-primary/10',
    text: 'text-primary',
    icon: 'bg-primary/10 text-primary',
  },
  emerald: {
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/10',
    text: 'text-emerald-600',
    icon: 'bg-emerald-500/10 text-emerald-600',
  },
};

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  return (
    <>
      <Header />
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-6 pt-20">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Assistant Théologique Réformé
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Finoana{' '}
            <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Miorina
            </span>
          </h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Assistant d'enseignement biblique et de counseling strictement soumis à l'autorité 
            de l'Écriture, avec une approche réformée et confessionnelle.
          </p>
        </div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const colors = colorClasses[mode.color];
            
            return (
              <motion.button
                key={mode.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => onSelectMode(mode.id)}
                onMouseEnter={() => setHoveredMode(mode.id)}
                onMouseLeave={() => setHoveredMode(null)}
                className={cn(
                  "relative p-4 rounded-xl border transition-all text-left",
                  "hover:shadow-md hover:scale-[1.01]",
                  colors.bg,
                  colors.border,
                  hoveredMode === mode.id && "border-primary/30"
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className={cn(
                      "p-2.5 rounded-lg",
                      colors.icon
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-full",
                      mode.id.includes('fr') 
                        ? "bg-blue-100 text-blue-700"
                        : "bg-emerald-100 text-emerald-700"
                    )}>
                      {mode.id.includes('fr') ? 'FR' : 'MG'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={cn(
                      "font-semibold text-base",
                      colors.text
                    )}>
                      {mode.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-foreground">
                      {mode.subtitle}
                    </p>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-primary pt-2">
                    <span>Sélectionner</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Principles */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-muted-foreground">
              Fondements Théologiques
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-3">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-secondary/50 border border-border/50"
              >
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8">
          <div className="inline-flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Sola Scriptura
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Westminster
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              Théologie de l'Alliance
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}