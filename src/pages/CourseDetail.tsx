import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/HeaderTeaching";
import ModuleAccordion from "@/components/ModuleAccordion";
import SectionReader from "@/components/SectionReader";
import { getCourseById } from "@/data/courses";
import { Section } from "@/types/course";
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Layers, 
  Menu, 
  ChevronRight,
  Download,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = getCourseById(courseId || "");

  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Flatten all sections for navigation
  const allSections = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap((mod) =>
      mod.sections.map((section) => ({
        ...section,
        moduleId: mod.id,
        moduleTitle: mod.title,
      }))
    );
  }, [course]);

  const currentIndex = activeSection
    ? allSections.findIndex((s) => s.id === activeSection.id)
    : -1;

  const handleSectionClick = (section: Section, moduleId: number) => {
    setActiveSection(section);
    setActiveModuleId(moduleId);
    setIsModulesOpen(false); // Fermer le sheet sur mobile
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prev = allSections[currentIndex - 1];
      setActiveSection(prev);
      setActiveModuleId(prev.moduleId);
      // Scroll vers le haut sur mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentIndex < allSections.length - 1) {
      const next = allSections[currentIndex + 1];
      setActiveSection(next);
      setActiveModuleId(next.moduleId);
      // Scroll vers le haut sur mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Partager le cours
  const handleShare = async () => {
    if (navigator.share && course) {
      try {
        await navigator.share({
          title: course.title,
          text: course.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-warm">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center safe-area-inset-top">
          <h1 className="font-display text-2xl font-semibold text-foreground mb-4">
            Tsy hita ny taranja
          </h1>
          <Button variant="outline" asChild>
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Hiverina amin'ny lisitra
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const totalSections = course.modules.reduce(
    (acc, mod) => acc + mod.sections.length,
    0
  );
  const totalDuration = course.modules.reduce((acc, mod) => {
    const minutes = parseInt(mod.duration) || 0;
    return acc + minutes;
  }, 0);

  const currentModuleTitle = activeModuleId
    ? course.modules.find((m) => m.id === activeModuleId)?.title || ""
    : "";

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Header />

      <div className="container mx-auto px-4 py-4 md:py-8 safe-area-inset-top">
        {/* Mobile Header avec bouton menu */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="h-9 w-9 p-0"
            >
              <Link to="/courses">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-lg font-semibold text-foreground truncate">
                {course.title}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {course.modules.length} modules • {totalDuration} min
              </p>
            </div>
          </div>

          {/* Boutons d'action mobile */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Sheet open={isModulesOpen} onOpenChange={setIsModulesOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="font-display text-lg font-semibold mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <h4 className="font-medium mb-4 text-sm text-muted-foreground">
                      Ireo Modules ({course.modules.length})
                    </h4>
                    <div className="space-y-2">
                      {course.modules.map((module, index) => (
                        <ModuleAccordion
                          key={module.id}
                          module={module}
                          index={index}
                          onSectionClick={handleSectionClick}
                          activeSection={activeSection?.id}
                          compact
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Breadcrumb */}
        <nav className="hidden md:block mb-6 animate-fade-in">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
            >
              Fahalalana
            </Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/courses"
              className="hover:text-foreground transition-colors"
            >
              Ireo taranja
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-xs">
              {course.title}
            </span>
          </div>
        </nav>

        {/* Course Header */}
        <div className="mb-6 md:mb-8 animate-slide-up">
          <div className="hidden md:block">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              {course.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-3xl">
              {course.description}
            </p>
          </div>

          {/* Course Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
                <Layers className="h-3 w-3 md:h-4 md:w-4 text-gold" />
                <span className="text-xs md:text-sm">{course.modules.length} modules</span>
              </span>
              <span className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
                <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-gold" />
                <span className="text-xs md:text-sm">{totalSections} fizarana</span>
              </span>
              <span className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full">
                <Clock className="h-3 w-3 md:h-4 md:w-4 text-gold" />
                <span className="text-xs md:text-sm">{totalDuration} min</span>
              </span>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                Zarao
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Raisina
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-4 md:gap-8">
          {/* Modules List - Desktop */}
          <div className="hidden lg:block lg:col-span-2 space-y-4">
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Ireo Modules
                </h2>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <ModuleAccordion
                      key={module.id}
                      module={module}
                      index={index}
                      onSectionClick={handleSectionClick}
                      activeSection={activeSection?.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Module Progress Bar */}
          {activeSection && (
            <div className="lg:hidden mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">
                  Fizarana {currentIndex + 1} amin'ny {allSections.length}
                </span>
                <span className="text-gold font-medium">
                  {Math.round(((currentIndex + 1) / allSections.length) * 100)}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / allSections.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Section Reader */}
          <div className="lg:col-span-3">
            {activeSection ? (
              <div className="md:sticky md:top-24">
                <SectionReader
                  section={activeSection}
                  moduleTitle={currentModuleTitle}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  hasPrevious={currentIndex > 0}
                  hasNext={currentIndex < allSections.length - 1}
                  currentIndex={currentIndex}
                  totalSections={allSections.length}
                />
              </div>
            ) : (
              <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-12 text-center animate-fade-in">
                <div className="inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-gold/10 mb-4">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-gold" />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3">
                  Safidio ny fizarana iray
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Tsindrio ny fizarana iray eo amin'ny lisitra mba hamakiana ny
                  votoatiny. Afaka mijery ny votoatin'ny modules rehetra ianao.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    className="gap-2"
                    onClick={() => {
                      const firstSection = allSections[0];
                      if (firstSection) {
                        setActiveSection(firstSection);
                        setActiveModuleId(firstSection.moduleId);
                      }
                    }}
                  >
                    <BookOpen className="h-4 w-4" />
                    Atombohy amin'ny voalohany
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="gap-2 md:hidden"
                    onClick={() => setIsModulesOpen(true)}
                  >
                    <Menu className="h-4 w-4" />
                    Jery ny lisitra
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Floating Action Button */}
        {activeSection && (
          <div className="lg:hidden fixed bottom-20 right-4 z-40">
            <Button
              variant="default"
              size="lg"
              className="h-12 w-12 rounded-full shadow-lg"
              onClick={() => setIsModulesOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Navigation Safety Spacer */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default CourseDetail;