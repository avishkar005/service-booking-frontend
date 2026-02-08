'use client'

import { useBookingStore } from '@/lib/store/booking.store'
import { useServiceStore } from '@/lib/store/service.store'
import { useAuthStore } from '@/lib/store/auth.store'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getBookingStatusColor } from '@/lib/utils/helpers'

export default function VendorBookingsPage() {
  const user = useAuthStore((s) => s.user)
  const services = useServiceStore((s) => s.services)
  const bookings = useBookingStore((s) => s.bookings)
  const updateStatus = useBookingStore((s) => s.updateBookingStatus)

  const vendorServiceIds = services
    .filter((s) => s.vendorId === user?.id)
    .map((s) => s.id)

  const vendorBookings = bookings.filter((b) =>
    vendorServiceIds.includes(b.serviceId)
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          Booking Requests
        </h1>
      </header>

      {/* Booking List */}
      <main className="p-6 space-y-4">
        {vendorBookings.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            No bookings received yet.
          </div>
        )}

        {vendorBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="font-semibold">
                {booking.serviceName}
              </h2>
              <p className="text-sm text-gray-500">
                Customer ID: {booking.customerId}
              </p>
              <p className="text-sm text-gray-500">
                Date: {formatDate(booking.date)}
              </p>
              <p className="text-sm font-medium text-indigo-600 mt-1">
                {formatCurrency(booking.price)}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${getBookingStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>

              {booking.status === 'pending' && (
                <>
                  <button
                    onClick={() =>
                      updateStatus(booking.id, 'confirmed')
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(booking.id, 'cancelled')
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm"
                  >
                    Reject
                  </button>
                </>
              )}

              {booking.status === 'confirmed' && (
                <button
                  onClick={() =>
                    updateStatus(booking.id, 'completed')
                  }
                  className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
