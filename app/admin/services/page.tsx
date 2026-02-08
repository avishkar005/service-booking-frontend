'use client'

import { useServiceStore } from '@/lib/store/service.store'
import { useState } from 'react'

export default function AdminServicesPage() {
  const services = useServiceStore((s) => s.services)
  const updateService = useServiceStore((s) => s.updateService)

  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all')

  const filteredServices =
    filter === 'all'
      ? services
      : services.filter((s) => s.status === filter)

  const toggleStatus = (id: string) => {
    const service = services.find((s) => s.id === id)
    if (!service) return

    updateService(id, {
      status: service.status === 'active' ? 'blocked' : 'active',
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-indigo-600 text-lg">
          Service Management
        </h1>

        <select
          className="border p-2 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </header>

      {/* Services Table */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Service
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Vendor
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Category
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Price
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="p-4 text-sm font-medium text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredServices.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500"
                  >
                    No services found
                  </td>
                </tr>
              )}

              {filteredServices.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="p-4 font-medium">
                    {service.title}
                  </td>
                  <td className="p-4 text-gray-600">
                    {service.vendorId}
                  </td>
                  <td className="p-4 capitalize">
                    {service.category}
                  </td>
                  <td className="p-4 font-medium">
                    ₹{service.price}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        service.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(service.id)}
                      className={`text-sm font-medium ${
                        service.status === 'active'
                          ? 'text-red-600'
                          : 'text-green-600'
                      } hover:underline`}
                    >
                      {service.status === 'active'
                        ? 'Block'
                        : 'Unblock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
