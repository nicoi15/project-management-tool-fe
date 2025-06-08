import { create } from 'zustand';
import { User } from '../constants/user.model';

const useUsersStore = create<{
  users: User[] | null;
  setUsers: (users: User[] | null) => void;
}>((set) => ({
  users: null,
  setUsers: (users: User[] | null): void => set({ users }),
}));

export default useUsersStore;
