import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { API_BASE_URL } from '@/lib/utils/constants'
import { useAuthStore } from './auth.store'

export type ServiceStatus = 'active' | 'blocked'
export type ServiceCategory = 'cleaning' | 'repair' | 'beauty'

export interface Service {
  id: string
  vendorId: string
  title: string
  description: string
  category: ServiceCategory
  price: number
  status: ServiceStatus
}

interface ServiceState {
  services: Service[]
  loading: boolean

  fetchServices: () => Promise<void>
  addService: (service: Service) => Promise<void>
  updateService: (id: string, data: Partial<Service>) => Promise<void>
  removeService: (id: string) => Promise<void>
}

const dummyServices: Service[] = [
  {
    id: 's1',
    vendorId: 'vendor-1',
    title: 'Home Cleaning',
    description: 'Professional home cleaning service',
    category: 'cleaning',
    price: 1200,
    status: 'active',
  },
  {
    id: 's2',
    vendorId: 'vendor-1',
    title: 'AC Repair',
    description: 'AC servicing and repair',
    category: 'repair',
    price: 800,
    status: 'active',
  },
  {
    id: 's3',
    vendorId: 'vendor-2',
    title: 'Salon at Home',
    description: 'Beauty and salon services at home',
    category: 'beauty',
    price: 1500,
    status: 'active',
  },
]

export const useServiceStore = create<ServiceState>()(
  persist(
    (set) => ({
      services: dummyServices,
      loading: false,

      fetchServices: async () => {
        const token = useAuthStore.getState().token
        set({ loading: true })

        try {
          const res = await fetch(`${API_BASE_URL}/services`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!res.ok) throw new Error()

          const data = await res.json()
          set({ services: data })
        } catch {
          set({ services: dummyServices })
        } finally {
          set({ loading: false })
        }
      },

      addService: async (service) => {
        const token = useAuthStore.getState().token

        try {
          const res = await fetch(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(service),
          })

          if (!res.ok) throw new Error()

          const saved = await res.json()
          set((state) => ({
            services: [...state.services, saved],
          }))
        } catch {
          set((state) => ({
            services: [...state.services, service],
          }))
        }
      },

      updateService: async (id, data) => {
        const token = useAuthStore.getState().token

        try {
          await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          })
        } finally {
          set((state) => ({
            services: state.services.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
          }))
        }
      },

      removeService: async (id) => {
        const token = useAuthStore.getState().token

        try {
          await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        } finally {
          set((state) => ({
            services: state.services.filter((s) => s.id !== id),
          }))
        }
      },
    }),
    {
      name: 'service-storage',
    }
  )
)
