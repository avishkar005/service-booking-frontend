'use client'

interface LoaderProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loader({
  text = 'Loading...',
  size = 'md',
}: LoaderProps) {
  const sizeClasses =
    size === 'sm'
      ? 'h-4 w-4 border-2'
      : size === 'lg'
      ? 'h-10 w-10 border-4'
      : 'h-6 w-6 border-3'

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full ${sizeClasses} border-indigo-600 border-t-transparent`}
      />
      {text && (
        <p className="text-sm text-gray-500">
          {text}
        </p>
      )}
    </div>
  )
}
