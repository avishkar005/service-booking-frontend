'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth.store'
import { API_BASE_URL } from '@/lib/utils/constants'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        throw new Error('Invalid email or password')
      }

      const data = await res.json()

      if (!data.role) {
        throw new Error('Invalid user role')
      }

      login({
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
      })

      router.replace(`/${data.role}/dashboard`)
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login to Service Booking Platform
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          className="w-full mb-4 p-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold mb-4 disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Login'}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-3 rounded font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <span>🔐</span>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer font-medium"
            onClick={() => router.push('/auth/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  )
}
