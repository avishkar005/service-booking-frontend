export type UserRole = 'customer' | 'vendor' | 'admin'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar?: string
  createdAt: string
}

export interface Customer extends User {
  role: 'customer'
  addresses: Address[]
  bookings: Booking[]
}

export interface Vendor extends User {
  role: 'vendor'
  businessName: string
  category: ServiceCategory
  location: string
  rating: number
  totalReviews: number
  services: Service[]
  verified: boolean
  documents?: string[]
  earnings: number
  completedBookings: number
}

export interface Admin extends User {
  role: 'admin'
  permissions: string[]
}

export interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  street: string
  city: string
  state: string
  zipCode: string
  landmark?: string
  isDefault: boolean
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  image: string
}

export interface Service {
  id: string
  vendorId: string
  vendor?: Vendor
  title: string
  description: string
  category: ServiceCategory
  price: number
  duration: number // in minutes
  images: string[]
  rating: number
  totalReviews: number
  availableSlots: TimeSlot[]
  features: string[]
  createdAt: string
}

export interface TimeSlot {
  id: string
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
}

export interface Booking {
  id: string
  customerId: string
  customer?: Customer
  vendorId: string
  vendor?: Vendor
  serviceId: string
  service?: Service
  date: string
  timeSlot: TimeSlot
  address: Address
  status: BookingStatus
  totalAmount: number
  discount?: number
  finalAmount: number
  paymentMethod: 'card' | 'upi' | 'wallet' | 'cash'
  paymentStatus: 'pending' | 'completed' | 'failed'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  id: string
  bookingId: string
  customerId: string
  customer?: Customer
  vendorId: string
  serviceId: string
  rating: number
  comment: string
  images?: string[]
  createdAt: string
}

export interface Coupon {
  id: string
  code: string
  description: string
  discount: number
  discountType: 'percentage' | 'fixed'
  minAmount: number
  maxDiscount?: number
  validFrom: string
  validUntil: string
  usageLimit: number
  usedCount: number
  isActive: boolean
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'booking' | 'payment' | 'review' | 'promotion' | 'system'
  isRead: boolean
  link?: string
  createdAt: string
}

export interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  totalEarnings: number
  monthlyEarnings: number
  rating: number
  totalReviews: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
  role: UserRole
  businessName?: string
  category?: string
  location?: string
}

export interface FilterOptions {
  category?: string
  location?: string
  priceMin?: number
  priceMax?: number
  rating?: number
  availability?: string
  sortBy?: 'price' | 'rating' | 'popular'
}
