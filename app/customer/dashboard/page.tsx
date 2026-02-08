'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { useBookingStore } from '@/lib/store/booking.store'
import { useServiceStore } from '@/lib/store/service.store'
import Link from 'next/link'

export default function CustomerDashboard() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)

  const bookings = useBookingStore((s) => s.bookings)
  const services = useServiceStore((s) => s.services)

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'customer') {
      router.replace('/auth/login')
    }
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.replace('/auth/login')
  }

  const activeBookings = bookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-indigo-600 text-lg">
          Service Booking Platform
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Hi, {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Cards */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/customer/bookings">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold mb-2">My Bookings</h2>
            <p className="text-gray-500 text-sm mb-2">
              View and manage your service bookings
            </p>
            <p className="text-indigo-600 font-bold text-xl">
              {bookings.length}
            </p>
          </div>
        </Link>

        <Link href="/customer/services">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold mb-2">Available Services</h2>
            <p className="text-gray-500 text-sm mb-2">
              Browse and book services easily
            </p>
            <p className="text-indigo-600 font-bold text-xl">
              {services.length}
            </p>
          </div>
        </Link>

        <Link href="/customer/profile">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="font-semibold mb-2">Profile</h2>
            <p className="text-gray-500 text-sm mb-2">
              Manage your personal information
            </p>
            <p className="text-indigo-600 font-bold text-xl">
              Active
            </p>
          </div>
        </Link>
      </main>

      {/* Active bookings */}
      <section className="px-6 pb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Active Bookings</h2>

          {activeBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No active bookings
            </p>
          ) : (
            <ul className="space-y-3">
              {activeBookings.map((booking) => (
                <li
                  key={booking.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{booking.serviceName}</span>
                  <span className="text-sm text-indigo-600 font-medium">
                    {booking.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
