'use client'

import { useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  role: 'customer' | 'vendor' | 'admin'
  status: 'active' | 'blocked'
}

/* Dummy users – fully functional */
const initialUsers: User[] = [
  {
    id: '1',
    name: 'Amit Sharma',
    email: 'amit@gmail.com',
    role: 'customer',
    status: 'active',
  },
  {
    id: '2',
    name: 'Rohit Vendor',
    email: 'rohit@vendor.com',
    role: 'vendor',
    status: 'active',
  },
  {
    id: '3',
    name: 'Sneha Customer',
    email: 'sneha@gmail.com',
    role: 'customer',
    status: 'blocked',
  },
]

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === 'active' ? 'blocked' : 'active',
            }
          : u
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="font-bold text-indigo-600 text-lg">
          User Management
        </h1>
      </header>

      {/* Table */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-sm font-medium text-gray-500">Name</th>
                <th className="p-4 text-sm font-medium text-gray-500">Email</th>
                <th className="p-4 text-sm font-medium text-gray-500">Role</th>
                <th className="p-4 text-sm font-medium text-gray-500">Status</th>
                <th className="p-4 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4 capitalize">{user.role}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`text-sm font-medium ${
                        user.status === 'active'
                          ? 'text-red-600'
                          : 'text-green-600'
                      } hover:underline`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
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
