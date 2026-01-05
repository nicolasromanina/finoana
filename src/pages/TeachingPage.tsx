import { useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/HeaderTeaching";
import { courses, getTotalModules, getTotalSections } from "@/data/courses";
import {
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowRight,
  Search,
  TrendingUp,
  Users,
  Award,
  Bot // Icône d'IA ajoutée
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/SearchDialog copy";
import { Input } from "@/components/ui/input";

const CourseCard = lazy(() => import("@/components/CourseCard"));

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [featuredCourses, setFeaturedCourses] = useState(courses.slice(0, 3));

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold/50 z-50 origin-left transition-transform duration-300"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <Header />
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden py-12 md:py-32"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-muted/50 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gold/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Fianarana foto-pinoana Kristiana</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Mianara ny <span className="text-gold">Tenin'Andriamanitra</span> amin'ny fomba mirindra
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Fampianarana feno sy mirindra momba ny foto-pinoana kristiana, natao ho an'ny mpino rehetra.
            </motion.p>
            <div className="md:hidden mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tadiavo lohahevitra..."
                  className="pl-12 h-12 rounded-xl bg-muted/50 border-border/30"
                  onFocus={() => setIsSearchOpen(true)}
                  readOnly
                />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <Button variant="default" size="lg" asChild className="group">
                <Link to="/courses" className="flex items-center">
                  Hijery ireo taranja
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hidden md:flex gap-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
                Tadiavo
              </Button>
              {/* Bouton IA ajouté ici */}
              <Button
                variant="secondary"
                size="lg"
                asChild
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
              >
                <Link to="/chat/mode" className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Hianatra miaraka amin'ny IA
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <div className="grid grid-cols-3 gap-4 mt-8 md:hidden">
              {[
                { value: courses.length, label: "Lesona", icon: BookOpen },
                { value: getTotalModules(), label: "Modules", icon: GraduationCap },
                { value: getTotalSections(), label: "Fizarana", icon: Layers },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-muted/50 rounded-xl p-4 text-center border border-border/30"
                >
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-gold" />
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <section className="py-16 scroll-animate">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, value: courses.length, label: "Taranja", desc: "Fianarana maro", color: "text-amber-500" },
              { icon: GraduationCap, value: getTotalModules(), label: "Modules", desc: "Fizarana lalina", color: "text-blue-500" },
              { icon: Layers, value: getTotalSections(), label: "Fizarana", desc: "Fampianarana mirindra", color: "text-emerald-500" },
              { icon: Sparkles, value: "100%", label: "Maimaim-poana", desc: "Tsy misy sarany", color: "text-violet-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-muted/50 p-6 border border-border/30 hover:border-gold/30 transition-all"
              >
                <stat.icon className={`h-8 w-8 mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 scroll-animate">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Lesona voalohany</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Manomboka eto mba hahazoana fototra maharitra.</p>
          </motion.div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CourseCard course={course} index={i} />
                </motion.div>
              ))}
            </div>
          </Suspense>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/courses">Jereo ny taranja rehetra <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-muted/50 scroll-animate">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Tombony amin'ny fianarana</h2>
            <p className="text-muted-foreground">Mahazo tombontsoa maro ianao.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Malalaka", desc: "Mianara araka ny hafainganam-pandehanao", color: "text-blue-600" },
              { icon: Users, title: "Fampianarana azo itokisana", desc: "Avy amin'ny mpampianatra manana traikefa", color: "text-emerald-600" },
              { icon: Award, title: "Fahalalana marina", desc: "Fototra miorina amin'ny Baiboly", color: "text-amber-600" },
              { icon: BookOpen, title: "Fampianarana lalina", desc: "Mampitombo ny fahalalana", color: "text-purple-600" },
              { icon: Layers, title: "Fizarana mirindra", desc: "Fianarana mandeha tsikelikely", color: "text-rose-600" },
              { icon: Sparkles, title: "Maimaim-poana", desc: "Ho an'ny mpino rehetra", color: "text-violet-600" },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl bg-background p-6 border border-border/30 hover:border-gold/30 transition-all"
              >
                <benefit.icon className={`h-8 w-8 mb-4 ${benefit.color}`} />
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 scroll-animate">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-12 w-12 text-gold mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Efa vonona hanomboka?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Midira amin'ny dian'ny fahalalana.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/courses">Manomboka izao <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              {/* Bouton IA dans la section finale */}
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-blue-400 text-blue-600 hover:bg-blue-50"
              >
                <Link to="/chat/mode" className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  Hianatra miaraka amin'ny IA
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      <footer className="border-t border-border/30 bg-muted/50 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-gold" />
            <div>
              <span className="font-semibold">Finoanabai</span>
              <span className="text-xs text-muted-foreground block">Foto-pinoana Kristiana</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild><Link to="/courses">Taranja</Link></Button>
            <Button variant="ghost" asChild><Link to="/chat/mode">IA</Link></Button>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Finoanabai. Ho voninahitr'Andriamanitra.</p>
        </div>
      </footer>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/30 md:hidden">
        <div className="container px-4 py-3 flex justify-around">
          <Button variant="ghost" asChild className="flex-col"><Link to="/"><BookOpen className="h-5 w-5 mb-1" /><span className="text-xs">Faharoa</span></Link></Button>
          <Button variant="ghost" className="flex-col" onClick={() => setIsSearchOpen(true)}><Search className="h-5 w-5 mb-1" /><span className="text-xs">Tadiavo</span></Button>
          <Button variant="ghost" asChild className="flex-col"><Link to="/courses"><Layers className="h-5 w-5 mb-1" /><span className="text-xs">Taranja</span></Link></Button>
          {/* Bouton IA dans la barre mobile */}
          <Button variant="ghost" asChild className="flex-col"><Link to="/chat/mode"><Bot className="h-5 w-5 mb-1" /><span className="text-xs">IA</span></Link></Button>
        </div>
      </div>
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
};
export default Index;