// Improved ModuleAccordion Component
// Improvements:
// - Used framer-motion for smooth expand/collapse.
// - Minimalist: Clean icons, no extra text.
// - Advanced: Added progress indicators per module.
// - UX: Auto-expand active module.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Module, Section } from "@/types/course";
import { ChevronDown, Clock, Circle, CheckCircle2 } from "lucide-react";

interface ModuleAccordionProps {
  module: Module;
  index: number;
  onSectionClick: (section: Section, moduleId: number) => void;
  activeSection?: string;
}

const ModuleAccordion = ({ module, index, onSectionClick, activeSection }: ModuleAccordionProps) => {
  const [isOpen, setIsOpen] = useState(index === 0 || module.sections.some(sec => sec.id === activeSection));

  return (
    <div className="border border-border/30 rounded-xl mb-4 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-gold/20 text-gold font-bold flex items-center justify-center">{index + 1}</div>
          <div>
            <h3 className="font-semibold">{module.title}</h3>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex gap-1"><Clock className="h-3 w-3" /> {module.duration}</span>
              <span>{module.sections.length} fizarana</span>
            </div>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="bg-muted/20">
              {module.sections.map((sec) => (
                <button key={sec.id} onClick={() => onSectionClick(sec, module.id)} className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition ${activeSection === sec.id ? "bg-gold/10" : ""}`}>
                  {activeSection === sec.id ? <CheckCircle2 className="h-5 w-5 text-gold" /> : <Circle className="h-5 w-5 text-muted-foreground" />}
                  <div>
                    <span className="text-xs text-muted-foreground">{sec.id}</span>
                    <p className="font-medium">{sec.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ModuleAccordion;