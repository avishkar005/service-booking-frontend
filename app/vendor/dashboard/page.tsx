'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/auth.store'
import { useServiceStore } from '@/lib/store/service.store'
import { useBookingStore } from '@/lib/store/booking.store'

export default function VendorDashboard() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)

  const services = useServiceStore((s) => s.services)
  const bookings = useBookingStore((s) => s.bookings)

  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'vendor') {
      router.replace('/auth/login')
    }
  }, [isAuthenticated, user, router])

  const handleLogout = () => {
    logout()
    router.replace('/auth/login')
  }

  const vendorServices = services.filter(
    (s) => s.vendorId === user?.id
  )

  const vendorBookings = bookings.filter(
    (b) => vendorServices.some((s) => s.id === b.serviceId)
  )

  const activeBookings = vendorBookings.filter(
    (b) => b.status === 'pending' || b.status === 'confirmed'
  )

  const earnings = vendorBookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-indigo-600 text-lg">
          Vendor Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/vendor/services">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-sm text-gray-500 mb-1">My Services</h2>
            <p className="text-2xl font-bold text-indigo-600">
              {vendorServices.length}
            </p>
          </div>
        </Link>

        <Link href="/vendor/bookings">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-sm text-gray-500 mb-1">Active Bookings</h2>
            <p className="text-2xl font-bold text-indigo-600">
              {activeBookings.length}
            </p>
          </div>
        </Link>

        <Link href="/vendor/earnings">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-sm text-gray-500 mb-1">Total Earnings</h2>
            <p className="text-2xl font-bold text-green-600">
              ₹{earnings}
            </p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">Account Status</h2>
          <p className="text-green-600 font-semibold">
            Active
          </p>
        </div>
      </main>

      {/* Recent bookings */}
      <section className="px-6 pb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Recent Bookings</h2>

          {vendorBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No bookings yet
            </p>
          ) : (
            <ul className="space-y-3">
              {vendorBookings.slice(0, 5).map((b) => (
                <li
                  key={b.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{b.serviceName}</span>
                  <span className="text-sm text-indigo-600 font-medium">
                    {b.status}
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
