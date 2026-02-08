import { create } from 'zustand'

export type Role = 'customer' | 'vendor' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean

  login: (user: User) => void
  logout: () => void
  reset: () => void
  updateUser: (data: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: (user) =>
    set({
      user,
      token: null,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  reset: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),

  updateUser: (data) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...data } : null,
    })),
}))
