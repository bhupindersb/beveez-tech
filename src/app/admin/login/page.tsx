'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin() {
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/leads')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-6">
          Admin Login
        </h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3"
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-gradient-to-r from-[#cf5a20] to-[#f68f1e]
                     text-white py-3 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  )
}
