export interface Section {
  id: string;
  title: string;
  content?: string;
}

export interface Module {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  sections: Section[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  modules: Module[];
  color: string;
}
