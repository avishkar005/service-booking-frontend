'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { ROUTES } from '@/lib/utils/constants'

export default function Home() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    if (!isAuthenticated || !user || !user.role) {
      router.replace(ROUTES.LOGIN)
      return
    }

    router.replace(`/${user.role}/dashboard`)
  }, [isAuthenticated, user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">Loading ServiceHub...</p>
      </div>
    </div>
  )
}
