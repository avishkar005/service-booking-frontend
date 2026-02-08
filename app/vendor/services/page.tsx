'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/store/auth.store'
import {
  useServiceStore,
  Service,
} from '@/lib/store/service.store'

export default function VendorServicesPage() {
  const user = useAuthStore((s) => s.user)

  const services = useServiceStore((s) => s.services)
  const fetchServices = useServiceStore((s) => s.fetchServices)
  const addService = useServiceStore((s) => s.addService)
  const updateService = useServiceStore((s) => s.updateService)
  const removeService = useServiceStore((s) => s.removeService)

  useEffect(() => {
    fetchServices()
  }, [fetchServices])

  const vendorServices = services.filter(
    (s) => s.vendorId === user?.id
  )

  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState<number>(0)
  const [category, setCategory] = useState<Service['category']>('cleaning')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setEditingId(null)
    setTitle('')
    setPrice(0)
    setCategory('cleaning')
    setDescription('')
  }

  const submit = async () => {
    if (!user) return

    if (editingId) {
      await updateService(editingId, {
        title,
        price,
        category,
        description,
      })
    } else {
      await addService({
        id: crypto.randomUUID(),
        vendorId: user.id,
        title,
        description,
        category,
        price,
        status: 'active',
      })
    }

    resetForm()
  }

  const startEdit = (service: Service) => {
    setEditingId(service.id)
    setTitle(service.title)
    setPrice(service.price)
    setCategory(service.category)
    setDescription(service.description)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          My Services
        </h1>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Form */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">
            {editingId ? 'Edit Service' : 'Add New Service'}
          </h2>

          <div className="space-y-3">
            <input
              className="w-full border p-3 rounded"
              placeholder="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-3 rounded"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="w-full border p-3 rounded"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Service['category'])
              }
            >
              <option value="cleaning">Cleaning</option>
              <option value="repair">Repair</option>
              <option value="beauty">Beauty</option>
            </select>

            <input
              type="number"
              className="w-full border p-3 rounded"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <div className="flex gap-3">
              <button
                onClick={submit}
                className="bg-indigo-600 text-white px-4 py-2 rounded font-medium"
              >
                {editingId ? 'Update' : 'Add'}
              </button>

              {editingId && (
                <button
                  onClick={resetForm}
                  className="border px-4 py-2 rounded font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="lg:col-span-2 space-y-4">
          {vendorServices.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow text-gray-500">
              No services added yet.
            </div>
          )}

          {vendorServices.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl shadow flex justify-between items-start gap-4"
            >
              <div>
                <h3 className="font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  {service.description}
                </p>
                <p className="text-sm text-indigo-600 font-medium">
                  ₹{service.price} • {service.category}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(service)}
                  className="text-sm text-indigo-600 font-medium hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeService(service.id)}
                  className="text-sm text-red-600 font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
