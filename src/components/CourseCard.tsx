import { Link } from "react-router-dom";
import { Course } from "@/types/course";
import {
  Crown,
  Cross,
  BookOpen,
  Wind,
  Sparkles,
  Users,
  Heart,
  Church,
  Sunrise,
  Clock,
  PlayCircle,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Crown,
  Cross,
  BookOpen,
  Wind,
  Sparkles,
  Users,
  Heart,
  Church,
  Sunrise,
};

interface CourseCardProps {
  course: Course;
  index: number;
  featured?: boolean;
  viewMode?: "grid" | "list";
}

const CourseCard = ({ course, index, featured, viewMode = "grid" }: CourseCardProps) => {
  const Icon = iconMap[course.icon] || BookOpen;
  const totalSections = course.modules.reduce(
    (acc, mod) => acc + mod.sections.length,
    0
  );
  const totalDuration = course.modules.reduce((acc, mod) => {
    const minutes = parseInt(mod.duration) || 0;
    return acc + minutes;
  }, 0);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link
          to={`/course/${course.id}`}
          className="group block"
        >
          <div className="relative bg-background/50 backdrop-blur-lg rounded-2xl border border-foreground/5 p-6 transition-all duration-300 hover:border-gold/20 hover:shadow-lg hover:translate-y-[-2px]">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-background to-background/80 shadow-lg border border-foreground/5 group-hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="absolute inset-0 m-auto h-7 w-7 text-gold" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gold transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mt-1 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-foreground/30 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium text-foreground/70">
                    <Clock className="h-3 w-3" />
                    {totalDuration} min
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium text-foreground/70">
                    <BookOpen className="h-3 w-3" />
                    {course.modules.length} modules
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium text-foreground/70">
                    <Sparkles className="h-3 w-3" />
                    {totalSections} fizarana
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="relative group"
    >
      <Link
        to={`/course/${course.id}`}
        className="block"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Card */}
        <div className={cn(
          "relative bg-background/50 backdrop-blur-xl rounded-3xl border border-foreground/5 p-6 transition-all duration-500 overflow-hidden",
          featured && "border-gold/20",
          "group-hover:border-gold/30 group-hover:shadow-2xl"
        )}>
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-sacred/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gold/10 transition-all duration-500" />

          {/* Content */}
          <div className="relative z-10">
            {/* Icon and Badge */}
            <div className="flex items-start justify-between mb-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-background to-background/80 shadow-lg border border-foreground/5 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="absolute inset-0 m-auto h-8 w-8 text-gold" />
                </div>
                {featured && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-gold to-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                    Voalohany
                  </div>
                )}
              </div>
              
              <PlayCircle className="h-6 w-6 text-foreground/30 group-hover:text-gold transition-colors" />
            </div>

            {/* Title & Description */}
            <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-foreground/70 font-body leading-relaxed mb-6 line-clamp-3">
              {course.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{totalDuration} min</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-foreground/60">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>{course.modules.length} modules</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gold font-medium">
                <span>Mianara izao</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;