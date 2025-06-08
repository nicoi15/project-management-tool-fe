import { create } from 'zustand';
import { User } from '../constants/user.model';

const useUserStore = create<{
  user: User | null;
  setUser: (user: User | null) => void;
}>((set) => ({
  user: null,
  setUser: (user: User | null): void => set({ user }),
}));

export default useUserStore;
