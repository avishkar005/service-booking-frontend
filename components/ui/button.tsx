'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded font-medium transition',
        {
          primary:
            'bg-indigo-600 text-white hover:bg-indigo-700',
          secondary:
            'border border-gray-300 hover:bg-gray-100',
          danger:
            'bg-red-600 text-white hover:bg-red-700',
        }[variant],
        fullWidth && 'w-full',
        className
      )}
    >
      {children}
    </button>
  )
}
