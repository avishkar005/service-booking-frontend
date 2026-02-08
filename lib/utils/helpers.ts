import { User } from '@/lib/store/auth.store'
import { BookingStatus } from '@/lib/store/booking.store'
import { ROUTES } from './constants'

// =========================
// Role-based dashboard redirect
// =========================
export const getDashboardPath = (user: User | null) => {
  if (!user) return ROUTES.LOGIN

  switch (user.role) {
    case 'admin':
      return ROUTES.ADMIN_DASHBOARD
    case 'vendor':
      return ROUTES.VENDOR_DASHBOARD
    case 'customer':
    default:
      return ROUTES.CUSTOMER_DASHBOARD
  }
}

// =========================
// Booking status badge color
// =========================
export const getBookingStatusColor = (status: BookingStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700'
    case 'confirmed':
      return 'bg-blue-100 text-blue-700'
    case 'completed':
      return 'bg-green-100 text-green-700'
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

// =========================
// ID generator (frontend-safe)
// =========================
export const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).substring(2, 12)
}
