// =========================
// Application
// =========================
export const APP_NAME = 'Service Booking Platform'

// =========================
// API
// =========================
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:8080/api'

// =========================
// User Roles
// =========================
export const ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer',
} as const

// =========================
// Booking Status
// =========================
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

// =========================
// Service Categories
// =========================
export const SERVICE_CATEGORIES = [
  'cleaning',
  'repair',
  'beauty',
] as const

// =========================
// Routes
// =========================
export const ROUTES = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  ADMIN_DASHBOARD: '/admin/dashboard',
  VENDOR_DASHBOARD: '/vendor/dashboard',
  CUSTOMER_DASHBOARD: '/customer/dashboard',
}

// =========================
// OAuth
// =========================
export const GOOGLE_OAUTH_URL = `${API_BASE_URL}/oauth2/authorization/google`
