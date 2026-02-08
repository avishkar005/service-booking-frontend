'use client'

import { useBookingStore } from '@/lib/store/booking.store'
import { formatDate, formatCurrency } from '@/lib/utils/format'
import { getBookingStatusColor } from '@/lib/utils/helpers'

export default function CustomerBookingsPage() {
  const bookings = useBookingStore((s) => s.bookings)
  const cancelBooking = useBookingStore((s) => s.cancelBooking)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          My Bookings
        </h1>
      </header>

      {/* Booking List */}
      <main className="p-6 space-y-4">
        {bookings.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            You have no bookings yet.
          </div>
        )}

        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="font-semibold">
                {booking.serviceName}
              </h2>
              <p className="text-sm text-gray-500">
                Booked on {formatDate(booking.date)}
              </p>
              <p className="text-sm font-medium text-indigo-600 mt-1">
                {formatCurrency(booking.price)}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${getBookingStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>

              {booking.status === 'pending' && (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
