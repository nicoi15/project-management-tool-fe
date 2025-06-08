import { create } from 'zustand';
import { Project } from '../constants/project.model';

const useProjectsStore = create<{
  projects: Project[] | null;
  setProjects: (projects: Project[] | null) => void;
}>((set) => ({
  projects: null,
  setProjects: (projects: Project[] | null): void => set({ projects }),
}));

export default useProjectsStore;
