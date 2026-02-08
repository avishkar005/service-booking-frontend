'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        {
          default: 'bg-gray-100 text-gray-700',
          success: 'bg-green-100 text-green-700',
          warning: 'bg-yellow-100 text-yellow-700',
          danger: 'bg-red-100 text-red-700',
          info: 'bg-indigo-100 text-indigo-700',
        }[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
