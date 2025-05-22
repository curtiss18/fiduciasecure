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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-semibold text-gray-900">
            FiduciaSecure
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link
                href="/dashboard"
                className="bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  className="bg-gray-900 text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Secure Form Collection Platform for Independent Financial Advisors
          </h1>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl">
            The all-in-one form collection, compliance, and client data management platform 
            built for independent IARs. Collect client information — and secure it — faster, 
            safer, and fully compliant.
          </p>
          
          {!user && (
            <div className="flex space-x-4">
              <Link
                href="/login"
                className="bg-gray-900 text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="border border-gray-400 text-gray-700 px-6 py-3 rounded font-medium hover:bg-gray-50 transition-colors"
              >
                Request Demo
              </Link>
            </div>
          )}
        </div>
      </section>
      {/* The Challenge */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            The Challenge
          </h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Independent financial advisors — especially solo IARs and small firms — are expected to compete in a 
            digital-first world using tools that were never built for them. They struggle with a disconnected tech stack: 
            generic contact forms with no compliance review, manual client intake processes, insecure document collection, 
            and no easy system for required client onboarding.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            This fragmentation not only wastes time but introduces compliance risks and friction at every step — 
            from lead generation to account setup to regulatory check-ins. Advisors are forced to choose between growth 
            and compliance — when they urgently need both.
          </p>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Our Solution
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This platform delivers a complete client data collection, management, and compliance engine built specifically 
            for independent IARs. It unifies form collection, secure data storage, compliance management, and client 
            onboarding workflows — all backed by real-time compliance review and enterprise-grade security. From first click 
            to fully onboarded and compliant client, every step is automated, secure, and optimized for growth.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Client Forms</h3>
              <p className="text-gray-700">
                Collect sensitive client information with bank-grade encryption, compliance controls, and secure data storage.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Management</h3>
              <p className="text-gray-700">
                Real-time compliance review of all collected data with automated risk flagging and full audit trails.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Onboarding Workflow</h3>
              <p className="text-gray-700">
                Send secure, prefilled onboarding packets and route signed documents to ops automatically.
              </p>
            </div>            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
              <p className="text-gray-700">
                Enterprise-grade security with encrypted storage, secure document handling, and SOC 2 compliance.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client Management</h3>
              <p className="text-gray-700">
                Centralized client data with interaction history, compliance tracking, and automated follow-ups.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Audit Trail</h3>
              <p className="text-gray-700">
                Complete audit trail of all client interactions and data collection for full regulatory compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Who It's For
          </h2>
          
          <div className="text-left max-w-2xl mx-auto space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
              <p className="text-lg text-gray-700">Solo or small-firm independent IARs</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
              <p className="text-lg text-gray-700">Advisors launching new RIAs</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 mr-4 flex-shrink-0"></div>
              <p className="text-lg text-gray-700">Growth-minded fiduciaries seeking an all-in-one operations platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Practice?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join hundreds of independent advisors who are streamlining their practice 
            and growing their client base with our all-in-one platform.
          </p>
          
          {!user && (
            <Link
              href="/login"
              className="bg-white text-gray-900 px-6 py-3 rounded font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Start Your Free Trial
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold text-gray-900">
            FiduciaSecure
          </div>
          <div className="text-sm text-gray-500">
            © 2025 FiduciaSecure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}