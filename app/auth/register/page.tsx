'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '@/lib/utils/constants'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'customer' | 'vendor'>('customer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('All fields are required')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      })

      if (!res.ok) {
        throw new Error('Registration failed')
      }

      // after successful registration → force login
      router.replace('/auth/login')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = () => {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join the Service Booking Platform
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          className="w-full mb-4 p-3 border rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <select
          className="w-full mb-4 p-3 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="customer">
            Customer – Book services
          </option>
          <option value="vendor">
            Vendor – Offer services
          </option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded font-semibold mb-4 disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Register'}
        </button>

        <button
          onClick={handleGoogleRegister}
          className="w-full border border-gray-300 py-3 rounded font-semibold flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <span>🔐</span>
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            className="text-indigo-600 cursor-pointer font-medium"
            onClick={() => router.push('/auth/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
