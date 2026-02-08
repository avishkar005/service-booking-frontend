import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  loading: boolean

  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  setLoading: (loading: boolean) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      loading: false,

      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      setSidebarOpen: (open) =>
        set({ sidebarOpen: open }),

      setLoading: (loading) =>
        set({ loading }),
    }),
    {
      name: 'ui-storage',
    }
  )
)
