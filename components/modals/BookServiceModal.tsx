'use client'

import { useState } from 'react'
import { Service } from '@/lib/store/service.store'
import { useAuthStore } from '@/lib/store/auth.store'
import { useBookingStore } from '@/lib/store/booking.store'
import { generateId } from '@/lib/utils/helpers'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  service: Service
  open: boolean
  onClose: () => void
}

export default function BookServiceModal({
  service,
  open,
  onClose,
}: Props) {
  const user = useAuthStore((s) => s.user)
  const bookService = useBookingStore((s) => s.bookService)

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi')
  const [processing, setProcessing] = useState(false)

  if (!open) return null

  const handleConfirm = () => {
    if (!user) return

    setProcessing(true)

    // simulate payment gateway
    setTimeout(() => {
      bookService({
        id: generateId(),
        serviceId: service.id,
        serviceName: service.title,
        customerId: user.id,
        date: new Date().toISOString(),
        status: 'pending',
        price: service.price,
        paymentMethod,
        paymentStatus: 'paid',
      })

      setProcessing(false)
      onClose()
    }, 1200)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-2">
          Confirm Booking
        </h2>

        <div className="border rounded p-4 mb-4">
          <h3 className="font-semibold">{service.title}</h3>
          <p className="text-sm text-gray-500">
            {service.description}
          </p>
          <p className="text-indigo-600 font-medium mt-2">
            {formatCurrency(service.price)}
          </p>
        </div>

        {/* Payment Options */}
        <div className="mb-4 space-y-2">
          <p className="text-sm font-medium">Payment Method</p>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === 'upi'}
              onChange={() => setPaymentMethod('upi')}
            />
            UPI
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={processing}
            className="px-4 py-2 rounded border font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={processing}
            className="px-4 py-2 rounded bg-indigo-600 text-white font-medium"
          >
            {processing ? 'Processing...' : 'Pay & Book'}
          </button>
        </div>
      </div>
    </div>
  )
}
