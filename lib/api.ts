import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { ApiResponse, PaginatedResponse } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor - add JWT token
    this.instance.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const authStorage = localStorage.getItem('auth-storage')
          if (authStorage) {
            const { state } = JSON.parse(authStorage)
            if (state?.token) {
              config.headers.Authorization = `Bearer ${state.token}`
            }
          }
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor - handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth-storage')
            window.location.href = '/auth/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.get(url, config)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      }
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.post(url, data, config)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      }
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.put(url, data, config)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      }
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.delete(url, config)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      }
    }
  }

  async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.instance.patch(url, data, config)
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'An error occurred',
      }
    }
  }

  async upload<T>(url: string, file: File, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await this.instance.post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Upload failed',
      }
    }
  }
}

export const api = new ApiClient()

// API endpoints
export const endpoints = {
  // Auth
  login: '/auth/login',
  register: '/auth/register',
  googleAuth: '/auth/google',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  forgotPassword: '/auth/forgot-password',
  resetPassword: '/auth/reset-password',
  
  // Users
  profile: '/users/profile',
  updateProfile: '/users/profile',
  
  // Services
  services: '/services',
  serviceById: (id: string) => `/services/${id}`,
  servicesByCategory: (category: string) => `/services/category/${category}`,
  servicesByVendor: (vendorId: string) => `/services/vendor/${vendorId}`,
  
  // Categories
  categories: '/categories',
  
  // Vendors
  vendors: '/vendors',
  vendorById: (id: string) => `/vendors/${id}`,
  vendorServices: (id: string) => `/vendors/${id}/services`,
  
  // Bookings
  bookings: '/bookings',
  bookingById: (id: string) => `/bookings/${id}`,
  createBooking: '/bookings',
  updateBooking: (id: string) => `/bookings/${id}`,
  cancelBooking: (id: string) => `/bookings/${id}/cancel`,
  
  // Reviews
  reviews: '/reviews',
  reviewsByService: (serviceId: string) => `/reviews/service/${serviceId}`,
  createReview: '/reviews',
  
  // Coupons
  coupons: '/coupons',
  validateCoupon: '/coupons/validate',
  
  // Notifications
  notifications: '/notifications',
  markAsRead: (id: string) => `/notifications/${id}/read`,
  markAllAsRead: '/notifications/read-all',
  
  // Dashboard
  customerDashboard: '/dashboard/customer',
  vendorDashboard: '/dashboard/vendor',
  adminDashboard: '/dashboard/admin',
  
  // Analytics
  analytics: '/analytics',
  earnings: '/analytics/earnings',
}
