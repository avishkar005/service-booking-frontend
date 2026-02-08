'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { APP_NAME } from '@/lib/utils/constants'

export default function Navbar() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  // 🔒 Do not render navbar if not logged in
  if (!user) return null

  const handleLogout = () => {
    logout()
    router.replace('/auth/login')
  }

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="font-bold text-indigo-600 text-lg">
          {APP_NAME}
        </h1>
        <p className="text-xs text-gray-500 capitalize">
          {user.role} panel
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 text-sm">
          {user.name}
        </span>

        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
