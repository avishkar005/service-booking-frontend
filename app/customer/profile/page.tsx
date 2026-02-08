'use client'

import { useState } from 'react'
import { useAuthStore } from '@/lib/store/auth.store'

export default function CustomerProfilePage() {
  const user = useAuthStore((s) => s.user)
  const updateUser = useAuthStore((s) => s.updateUser)

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [editing, setEditing] = useState(false)

  const handleSave = () => {
    updateUser({ name, email })
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          My Profile
        </h1>
      </header>

      {/* Profile Card */}
      <main className="p-6">
        <div className="bg-white p-6 rounded-xl shadow max-w-xl">
          <div className="mb-6">
            <h2 className="font-semibold text-lg mb-1">Personal Information</h2>
            <p className="text-sm text-gray-500">
              Manage your account details
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Full Name
              </label>
              <input
                className="w-full border p-3 rounded"
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email
              </label>
              <input
                className="w-full border p-3 rounded"
                value={email}
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded font-medium"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-5 py-2 rounded font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setName(user?.name || '')
                    setEmail(user?.email || '')
                    setEditing(false)
                  }}
                  className="border px-5 py-2 rounded font-medium"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
