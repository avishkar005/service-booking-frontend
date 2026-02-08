'use client'

import { Service } from '@/lib/store/service.store'
import { useAuthStore } from '@/lib/store/auth.store'
import { useBookingStore } from '@/lib/store/booking.store'
import { formatCurrency } from '@/lib/utils/format'
import { generateId } from '@/lib/utils/helpers'

interface Props {
  service: Service
}

export default function ServiceCard({ service }: Props) {
  const user = useAuthStore((s) => s.user)
  const bookService = useBookingStore((s) => s.bookService)

  const handleBook = () => {
    if (!user || service.status !== 'active') return

    bookService({
      id: generateId(),
      serviceId: service.id,
      serviceName: service.title,
      customerId: user.id,
      date: new Date().toISOString(),
      status: 'pending',
      price: service.price,
      paymentMethod: 'upi',
      paymentStatus: 'pending'
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-semibold text-lg mb-1">
        {service.title}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        {service.description}
      </p>

      <p className="text-sm text-indigo-600 font-medium mb-4">
        {formatCurrency(service.price)} • {service.category}
      </p>

      {service.status !== 'active' && (
        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
          Blocked
        </span>
      )}

      {user?.role === 'customer' && service.status === 'active' && (
        <button
          onClick={handleBook}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded font-medium hover:bg-indigo-700 transition"
        >
          Book Service
        </button>
      )}
    </div>
  )
}
