'use client'

import { useBookingStore } from '@/lib/store/booking.store'
import { useServiceStore } from '@/lib/store/service.store'
import { useAuthStore } from '@/lib/store/auth.store'

export default function VendorEarningsPage() {
  const user = useAuthStore((s) => s.user)
  const services = useServiceStore((s) => s.services)
  const bookings = useBookingStore((s) => s.bookings)

  const vendorServiceIds = services
    .filter((s) => s.vendorId === user?.id)
    .map((s) => s.id)

  const completedBookings = bookings.filter(
    (b) =>
      vendorServiceIds.includes(b.serviceId) &&
      b.status === 'completed'
  )

  const totalEarnings = completedBookings.reduce(
    (sum, b) => sum + b.price,
    0
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          Earnings
        </h1>
      </header>

      <main className="p-6 space-y-6">
        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-sm text-gray-500 mb-1">
            Total Earnings
          </h2>
          <p className="text-3xl font-bold text-green-600">
            ₹{totalEarnings}
          </p>
        </div>

        {/* Earnings List */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            Completed Services
          </h2>

          {completedBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No completed bookings yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {completedBookings.map((b) => (
                <li
                  key={b.id}
                  className="flex justify-between items-center border p-3 rounded"
                >
                  <span>{b.serviceName}</span>
                  <span className="font-medium text-green-600">
                    ₹{b.price}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
