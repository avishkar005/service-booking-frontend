import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PaymentMethod = 'upi' | 'card'
export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface Payment {
  id: string
  bookingId: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  createdAt: string
}

interface PaymentState {
  payments: Payment[]

  addPayment: (payment: Payment) => void
  updatePaymentStatus: (
    id: string,
    status: PaymentStatus
  ) => void
  getPaymentByBookingId: (
    bookingId: string
  ) => Payment | undefined
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      payments: [],

      addPayment: (payment) =>
        set((state) => ({
          payments: [...state.payments, payment],
        })),

      updatePaymentStatus: (id, status) =>
        set((state) => ({
          payments: state.payments.map((p) =>
            p.id === id ? { ...p, status } : p
          ),
        })),

      getPaymentByBookingId: (bookingId) =>
        get().payments.find(
          (p) => p.bookingId === bookingId
        ),
    }),
    {
      name: 'payment-storage',
    }
  )
)
