'use client'

import { useState } from 'react'
import { useServiceStore } from '@/lib/store/service.store'
import { useBookingStore } from '@/lib/store/booking.store'
import { useAuthStore } from '@/lib/store/auth.store'

export default function CustomerServicesPage() {
  const services = useServiceStore((s) => s.services)
  const bookService = useBookingStore((s) => s.bookService)
  const user = useAuthStore((s) => s.user)

  const [category, setCategory] = useState('all')

  // booking modal state
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  const filteredServices =
    category === 'all'
      ? services
      : services.filter((s) => s.category === category)

  const openBooking = (service: any) => {
    setSelectedService(service)
    setShowPayment(true)
  }

  const confirmBooking = () => {
    if (!user || !selectedService) return

    setIsPaying(true)

    setTimeout(() => {
      bookService({
        id: crypto.randomUUID(),
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        customerId: user.id,
        date: new Date().toISOString(),
        status: 'pending',
        price: selectedService.price,
      })

      setIsPaying(false)
      setShowPayment(false)
      setSelectedService(null)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          Available Services
        </h1>
      </header>

      {/* Filters */}
      <div className="p-6 flex gap-4">
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="cleaning">Cleaning</option>
          <option value="repair">Repair</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>

      {/* Services */}
      <main className="px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold mb-1">{service.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {service.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-indigo-600">
                ₹{service.price}
              </span>

              <button
                onClick={() => openBooking(service)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </main>

      {filteredServices.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No services found
        </p>
      )}

      {/* Payment / Confirm Modal */}
      {showPayment && selectedService && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="font-bold text-lg mb-2">
              Confirm Booking
            </h2>

            <p className="text-sm text-gray-600 mb-2">
              {selectedService.title}
            </p>

            <p className="font-semibold mb-4">
              Amount: ₹{selectedService.price}
            </p>

            <div className="flex gap-3">
              <button
                disabled={isPaying}
                onClick={confirmBooking}
                className="bg-indigo-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
              >
                {isPaying ? 'Processing...' : 'Confirm Booking'}
              </button>

              <button
                onClick={() => setShowPayment(false)}
                className="border px-4 py-2 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
