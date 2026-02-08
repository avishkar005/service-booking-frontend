'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { useBookingStore } from '@/lib/store/booking.store'
import { useServiceStore } from '@/lib/store/service.store'

export default function AdminAnalyticsPage() {
  const bookings = useBookingStore((s) => s.bookings)
  const services = useServiceStore((s) => s.services)

  // ---- Derived analytics (fully functional with dummy data) ----
  const completed = bookings.filter((b) => b.status === 'completed')
  const revenue = completed.reduce((sum, b) => sum + b.price, 0)

  const bookingsByDay = Object.values(
    bookings.reduce((acc: any, b) => {
      const day = new Date(b.date).toLocaleDateString()
      acc[day] = acc[day] || { day, count: 0 }
      acc[day].count += 1
      return acc
    }, {})
  )

  const servicesByCategory = Object.values(
    services.reduce((acc: any, s) => {
      acc[s.category] = acc[s.category] || {
        category: s.category,
        count: 0,
      }
      acc[s.category].count += 1
      return acc
    }, {})
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          Platform Analytics
        </h1>
      </header>

      {/* KPI Cards */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-indigo-600">
            {bookings.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {completed.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active Services</p>
          <p className="text-2xl font-bold text-indigo-600">
            {services.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-green-600">
            ₹{revenue}
          </p>
        </div>
      </main>

      {/* Charts */}
      <section className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings over time */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Bookings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsByDay}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line dataKey="count" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Services by category */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Services by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicesByCategory}>
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
