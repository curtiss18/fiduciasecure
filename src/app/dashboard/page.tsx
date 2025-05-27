'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'
import { useAdvisorProfile } from '@/hooks/useAdvisorProfile'
import { Modal } from '@/components/ui/modal'
import { ProfileEditForm } from '@/components/ProfileEditForm'
import type { User } from '@supabase/supabase-js'
import type { AdvisorProfile } from '@/types/database.types'
import { getEffectiveFirmName, isIndependentRepresentative } from '@/types/database.types'

export const dynamic = 'force-dynamic'

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])
  const { profile, loading: profileLoading, updateProfile, refetch } = useAdvisorProfile()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleProfileUpdate = async (updates: Partial<AdvisorProfile>) => {
    // For independent representatives, allow firm_name updates
    // For representatives linked to advisors, filter out firm_name (managed at advisor level)
    const updatesForRep = profile && isIndependentRepresentative(profile) 
      ? updates // Keep all fields including firm_name for independent reps
      : (() => { 
          const { firm_name, ...filteredUpdates } = updates; 
          return filteredUpdates; 
        })(); // Filter out firm_name for advisor-linked reps
    
    const result = await updateProfile(updatesForRep)
    if (!result.error) {
      await refetch() // Refresh the profile data
    }
    return result
  }

  if (loading || profileLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">FiduciaSecure</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Advisor Profile</h2>
              <button
                onClick={() => setShowProfileModal(true)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-500">
                  {isIndependentRepresentative(profile) ? 'Practice:' : 'Firm:'}
                </span>{' '}
                <span className="text-gray-900">{getEffectiveFirmName(profile) || 'Not set'}</span>
                {isIndependentRepresentative(profile) && (
                  <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Independent
                  </span>
                )}
              </div>
              <div>
                <span className="font-medium text-gray-500">CRD #:</span>{' '}
                <span className="text-gray-900">{profile?.crd_number || 'Not set'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-500">States:</span>{' '}
                <span className="text-gray-900">
                  {profile?.registration_states && profile.registration_states.length > 0
                    ? profile.registration_states.join(', ')
                    : 'Not set'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-500">Phone:</span>{' '}
                <span className="text-gray-900">{profile?.phone || 'Not set'}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Clients</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Onboarding</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Pending Reviews</span>
                <span className="font-semibold">0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition">
                Add New Client
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition">
                Create Form
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition">
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          </div>
        </div>
      </main>

      {/* Profile Edit Modal */}
      <Modal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        title={isIndependentRepresentative(profile) ? "Edit Representative Profile" : "Edit Representative Profile"}
      >
        <ProfileEditForm
          profile={profile}
          onSubmit={handleProfileUpdate}
          onCancel={() => setShowProfileModal(false)}
        />
      </Modal>
    </div>
  )
}