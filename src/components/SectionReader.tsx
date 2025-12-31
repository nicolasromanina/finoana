import { Section } from "@/types/course";
import { ArrowLeft, ArrowRight, BookMarked, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface SectionReaderProps {
  section: Section;
  moduleTitle: string;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  currentIndex?: number;
  totalSections?: number;
}

const SectionReader = ({
  section,
  moduleTitle,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  currentIndex = 0,
  totalSections = 0,
}: SectionReaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Détection du scroll pour l'header sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevious = () => {
    onPrevious?.();
    // Scroll vers le haut pour une meilleure UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    onNext?.();
    // Scroll vers le haut pour une meilleure UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcul de la progression
  const progress = totalSections > 0 ? ((currentIndex + 1) / totalSections) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky mobile-friendly */}
      <div className={`sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border/50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      }`}>
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="hidden xs:flex items-center gap-2 text-sm text-muted-foreground">
                <BookMarked className="h-4 w-4 text-gold flex-shrink-0" />
                <span className="truncate">{moduleTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gold bg-gold/10 px-2.5 py-1 rounded-full flex-shrink-0">
                  {section.id}
                </span>
                <h2 className="font-display text-lg font-semibold text-foreground truncate">
                  {section.title}
                </h2>
              </div>
            </div>
            
            {/* Indicateur de progression mobile */}
            <div className="flex items-center gap-2 sm:hidden">
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1}/{totalSections}
              </span>
            </div>
          </div>
          
          {/* Barre de progression */}
          {totalSections > 0 && (
            <div className="mt-3">
              <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Progression</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container px-4 mx-auto py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header desktop amélioré */}
          <div className="hidden sm:block mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 text-gold" />
                  <span>{moduleTitle}</span>
                </div>
                {totalSections > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Section {currentIndex + 1} sur {totalSections}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {section.title}
              </h1>
            </div>
          </div>

          {/* Carte de contenu */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden animate-fade-in">
            {/* Contenu avec meilleure typographie */}
            <div className="p-5 sm:p-6 md:p-8">
              <div className="prose prose-slate max-w-none dark:prose-invert">
                <div className="text-foreground/90 leading-relaxed text-base md:text-lg font-body whitespace-pre-wrap">
                  {section.content.split('\n\n').map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="mb-5 last:mb-0 text-foreground/90 leading-7 md:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Actions rapides */}
              <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 text-sm"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour en haut
                </Button>
                <div className="flex-1" />
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gap-2 text-sm"
                >
                  <BookMarked className="h-4 w-4" />
                  Marquer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation sticky en bas - optimisée mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border/50 shadow-lg">
        <div className="container px-4 mx-auto py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Bouton précédent */}
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="gap-2 flex-1 sm:flex-none justify-center sm:justify-start min-w-0"
              size="lg"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden xs:inline truncate">Précédent</span>
            </Button>

            {/* Indicateur de progression mobile */}
            <div className="flex flex-col items-center flex-shrink-0 sm:hidden">
              <div className="text-xs font-medium text-foreground">
                {currentIndex + 1}/{totalSections}
              </div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: Math.min(3, totalSections) }).map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${
                      i === currentIndex % 3 ? 'bg-gold' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Indicateur de section desktop */}
            <div className="hidden sm:flex flex-col items-center flex-1 max-w-xs">
              <div className="flex items-center gap-2 mb-1">
                {hasPrevious && (
                  <div className="h-1.5 w-6 rounded-full bg-gold/30" />
                )}
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                  <span className="text-sm font-medium text-foreground">
                    Section {currentIndex + 1}
                  </span>
                </div>
                {hasNext && (
                  <div className="h-1.5 w-6 rounded-full bg-gold/30" />
                )}
              </div>
              {totalSections > 0 && (
                <div className="text-xs text-muted-foreground">
                  {Math.round(progress)}% complété
                </div>
              )}
            </div>

            {/* Bouton suivant */}
            <Button
              variant="sacred"
              onClick={handleNext}
              disabled={!hasNext}
              className="gap-2 flex-1 sm:flex-none justify-center sm:justify-end min-w-0"
              size="lg"
            >
              <span className="hidden xs:inline truncate">Suivant</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation rapide pour tablette/desktop */}
          <div className="hidden md:flex items-center justify-center gap-4 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!hasPrevious}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Section précédente
            </Button>
            
            <div className="text-sm text-muted-foreground px-3 py-1 bg-secondary/50 rounded-full">
              Appuyez sur <kbd className="px-2 py-1 bg-background rounded text-xs mx-1">Espace</kbd> pour continuer
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!hasNext}
              className="gap-2"
            >
              Section suivante
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Padding pour éviter que le contenu soit caché par la navigation fixe */}
      <div className="h-24 sm:h-32" />
    </div>
  );
};

export default SectionReader;