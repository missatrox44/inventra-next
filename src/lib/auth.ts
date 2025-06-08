// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export type UserRole = 'admin' | 'editor';

// export interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: UserRole;
// }

// interface AuthState {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// export const useAuth = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       setUser: (user) => set({ user }),
//     }),
//     {
//       name: 'auth-storage',
//     }
//   )
// ); 