import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'

export type PaymentMethod = 'upi' | 'card'
export type PaymentStatus = 'paid' | 'failed' | 'pending'

export interface Booking {
  id: string
  serviceId: string
  serviceName: string
  customerId: string
  date: string
  status: BookingStatus
  price: number

  // 🔹 optional payment fields (safe)
  paymentMethod?: PaymentMethod
  paymentStatus?: PaymentStatus
}

interface BookingState {
  bookings: Booking[]

  bookService: (booking: Booking) => void
  cancelBooking: (id: string) => void
  updateBookingStatus: (id: string, status: BookingStatus) => void
}

const initialBookings: Booking[] = []

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: initialBookings,

      bookService: (booking) =>
        set((state) => ({
          bookings: [
            ...state.bookings,
            {
              ...booking,
              paymentMethod:
                booking.paymentMethod ?? 'upi',
              paymentStatus:
                booking.paymentStatus ?? 'paid',
            },
          ],
        })),

      cancelBooking: (id) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id
              ? { ...b, status: 'cancelled' }
              : b
          ),
        })),

      updateBookingStatus: (id, status) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, status } : b
          ),
        })),
    }),
    {
      name: 'booking-storage',
    }
  )
)
