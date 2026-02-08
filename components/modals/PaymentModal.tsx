'use client'

import { useState } from 'react'
import { formatCurrency } from '@/lib/utils/format'

interface Props {
  amount: number
  open: boolean
  onSuccess: (method: 'upi' | 'card') => void
  onClose: () => void
}

export default function PaymentModal({
  amount,
  open,
  onSuccess,
  onClose,
}: Props) {
  const [method, setMethod] = useState<'upi' | 'card'>('upi')
  const [processing, setProcessing] = useState(false)

  if (!open) return null

  const handlePay = () => {
    setProcessing(true)

    // simulate payment gateway delay
    setTimeout(() => {
      onSuccess(method)
      setProcessing(false)
      onClose()
    }, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          Payment
        </h2>

        <p className="mb-4 text-gray-600">
          Amount to pay:{' '}
          <span className="font-semibold text-indigo-600">
            {formatCurrency(amount)}
          </span>
        </p>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === 'upi'}
              onChange={() => setMethod('upi')}
            />
            UPI
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === 'card'}
              onChange={() => setMethod('card')}
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
            onClick={handlePay}
            disabled={processing}
            className="px-4 py-2 rounded bg-indigo-600 text-white font-medium"
          >
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
