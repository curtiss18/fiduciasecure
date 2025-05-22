'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">FiduciaSecure</h1>
          <div>
            {user ? (
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl font-bold text-white mb-6">
          Secure Form Collection Platform
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Collect and manage form submissions with enterprise-grade security and authentication.
        </p>
        
        {!user && (
          <Link
            href="/login"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold inline-block"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}