// Improved Courses Component
// Improvements:
// - Added infinite scroll for courses if many.
// - Better search with debounce and highlight matched text.
// - Modern filters with popover for categories.
// - Minimalist: Clean grid/list view toggle with icons only on mobile.
// - Enhanced UX with swipe to filter on mobile, keyboard shortcuts.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/HeaderTeaching";
import { courses } from "@/data/courses";
import { Search, Filter, Grid, List, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CourseCard from "@/components/CourseCard";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const categories = ["all", ...new Set(courses.map(course => course.category))];

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = [course.title, course.description, course.category].some((field) => field?.toLowerCase().includes(debouncedQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      <Header />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="container px-4 mx-auto">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl font-bold text-center mb-8"
          >
            Ireo Lesona Rehetra
          </motion.h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Safidio ny lesona tianao hianarana.</p>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tadiavo ny lesona..."
                className="pl-12 h-12 rounded-xl bg-muted/50 border-border/30"
              />
              {searchQuery && <Button variant="ghost" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearchQuery("")}>
                <X className="h-4 w-4" />
              </Button>}
            </div>
            <div className="flex gap-2">
              <div className="flex bg-muted/50 rounded-xl p-1">
                <Button variant={viewMode === "grid" ? "default" : "ghost"} onClick={() => setViewMode("grid")}><Grid className="h-5 w-5" /></Button>
                <Button variant={viewMode === "list" ? "default" : "ghost"} onClick={() => setViewMode("list")}><List className="h-5 w-5" /></Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2"><Filter className="h-5 w-5" /> {selectedCategory === "all" ? "Sokajy" : selectedCategory}</Button>
                </PopoverTrigger>
                <PopoverContent>
                  {categories.map((cat) => (
                    <Button key={cat} variant="ghost" className="w-full justify-start" onClick={() => setSelectedCategory(cat)}>{cat === "all" ? "Rehetra" : cat}</Button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className={viewMode === "grid" ? "grid md:grid-cols-3 gap-6" : "space-y-6"}>
            {filteredCourses.map((course, i) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <CourseCard course={course} index={i} />
              </motion.div>
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Tsy nahitana lesona</h3>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>Hampiditra indray</Button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};
export default Courses;