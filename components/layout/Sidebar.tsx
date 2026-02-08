'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { useUIStore } from '@/lib/store/ui.store'

export default function Sidebar() {
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)

  if (!user) return null

  const links =
    user.role === 'admin'
      ? [
          { href: '/admin/dashboard', label: 'Dashboard' },
          { href: '/admin/users', label: 'Users' },
          { href: '/admin/services', label: 'Services' },
          { href: '/admin/analytics', label: 'Analytics' },
        ]
      : user.role === 'vendor'
      ? [
          { href: '/vendor/dashboard', label: 'Dashboard' },
          { href: '/vendor/services', label: 'Services' },
          { href: '/vendor/bookings', label: 'Bookings' },
          { href: '/vendor/earnings', label: 'Earnings' },
        ]
      : [
          { href: '/customer/dashboard', label: 'Dashboard' },
          { href: '/customer/services', label: 'Services' },
          { href: '/customer/bookings', label: 'Bookings' },
          { href: '/customer/profile', label: 'Profile' },
        ]

  return (
    <aside
      className={`bg-white shadow h-screen w-64 p-6 transition-all ${
        sidebarOpen ? 'block' : 'hidden'
      }`}
    >
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded font-medium ${
              pathname === link.href
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
