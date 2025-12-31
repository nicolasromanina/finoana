import { Course } from "@/types/course";

import mombaAndriamanitra from "./momba_an_Andriamanitra.json";
import kristolojia from "./kristolojia.json";
import anjelolojia from "./anjelolojia.json";
import bibliolojia from "./bibliolojia.json";
import antropolojia from "./antropolojia.json";
import soteriolojia from "./soteriolojia.json";
import pneomatolojia from "./pneomatolojia.json";
import eskatolojia from "./eskatolojia.json";
import ekleziolojia from "./ekleziolojia.json";

export const courses: Course[] = [
  {
    id: "bibliolojia",
    title: "Ny Baiboly",
    description: "Ny fampianarana momba ny Baiboly",
    icon: "BookOpen",
    modules: bibliolojia.modules,
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    id: "teolojia",
    title: "Momba an'Andriamanitra",
    description: "Ny fianarana momba ny toetran'Andriamanitra sy ny asany",
    icon: "Crown",
    modules: mombaAndriamanitra.modules,
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    id: "kristolojia",
    title: "Jesoa Kristy",
    description: "Ny fampianarana momba an'i Jesosy Kristy",
    icon: "Cross",
    modules: kristolojia.modules,
    color: "from-rose-500/20 to-red-500/10",
  },
  {
    id: "pneomatolojia",
    title: "Fanahy Masina",
    description: "Ny fampianarana momba ny Fanahy Masina",
    icon: "Wind",
    modules: pneomatolojia.modules,
    color: "from-sky-500/20 to-blue-500/10",
  },
  {
    id: "anjelolojia",
    title: "Ny Anjely",
    description: "Ny fampianarana momba ny anjely",
    icon: "Sparkles",
    modules: anjelolojia.modules,
    color: "from-violet-500/20 to-purple-500/10",
  },
  {
    id: "antropolojia",
    title: "Ny Olombelona",
    description: "Ny fampianarana momba ny olombelona",
    icon: "Users",
    modules: antropolojia.modules,
    color: "from-teal-500/20 to-cyan-500/10",
  },
  {
    id: "soteriolojia",
    title: "Ny Famonjena",
    description: "Ny fampianarana momba ny famonjena",
    icon: "Heart",
    modules: soteriolojia.modules,
    color: "from-pink-500/20 to-rose-500/10",
  },
  {
    id: "ekleziolojia",
    title: "Ny Fiangonana",
    description: "Ny fampianarana momba ny fiangonana",
    icon: "Church",
    modules: ekleziolojia.modules,
    color: "from-indigo-500/20 to-blue-500/10",
  },
  {
    id: "eskatolojia",
    title: "Ny Andro farany",
    description: "Ny fampianarana momba ny andro farany",
    icon: "Sunrise",
    modules: eskatolojia.modules,
    color: "from-orange-500/20 to-yellow-500/10",
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};

export const getTotalModules = (): number => {
  return courses.reduce((acc, course) => acc + course.modules.length, 0);
};

export const getTotalSections = (): number => {
  return courses.reduce(
    (acc, course) =>
      acc +
      course.modules.reduce((modAcc, mod) => modAcc + mod.sections.length, 0),
    0
  );
};
