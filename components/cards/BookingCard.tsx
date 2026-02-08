'use client'

import { Booking } from '@/lib/store/booking.store'
import { useAuthStore } from '@/lib/store/auth.store'
import { useBookingStore } from '@/lib/store/booking.store'
import { formatCurrency, formatDate, capitalize } from '@/lib/utils/format'
import { getBookingStatusColor } from '@/lib/utils/helpers'

interface Props {
  booking: Booking
}

export default function BookingCard({ booking }: Props) {
  const user = useAuthStore((s) => s.user)
  const cancelBooking = useBookingStore((s) => s.cancelBooking)
  const updateStatus = useBookingStore((s) => s.updateBookingStatus)

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg">
          {booking.serviceName}
        </h3>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getBookingStatusColor(
            booking.status
          )}`}
        >
          {capitalize(booking.status)}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-1">
        Date: {formatDate(booking.date)}
      </p>

      <p className="text-sm text-indigo-600 font-medium mb-1">
        {formatCurrency(booking.price)}
      </p>

      {booking.paymentStatus && (
        <p className="text-xs text-gray-500 mb-3">
          Payment: {capitalize(booking.paymentStatus)}
        </p>
      )}

      {/* Customer actions */}
      {user?.role === 'customer' &&
        booking.status === 'pending' && (
          <button
            onClick={() => cancelBooking(booking.id)}
            className="text-sm text-red-600 font-medium hover:underline"
          >
            Cancel Booking
          </button>
        )}

      {/* Vendor actions */}
      {user?.role === 'vendor' &&
        booking.status === 'confirmed' && (
          <button
            onClick={() =>
              updateStatus(booking.id, 'completed')
            }
            className="text-sm text-green-600 font-medium hover:underline"
          >
            Mark as Completed
          </button>
        )}
    </div>
  )
}
