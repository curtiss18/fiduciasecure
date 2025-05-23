'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { MultiSelect } from '@/components/ui/multi-select'
import type { AdvisorProfile } from '@/types/database.types'

// US States for dropdown
const US_STATES = [
  { value: '', label: 'Select a state' },
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' },
  { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' },
  { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' },
  { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' },
  { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' },
  { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' },
  { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' },
  { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' },
  { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' },
  { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' },
  { value: 'WY', label: 'Wyoming' },
]

interface ProfileEditFormProps {
  profile: AdvisorProfile | null
  onSubmit: (data: Partial<AdvisorProfile>) => Promise<{ data: AdvisorProfile | null; error: string | null }>
  onCancel: () => void
}

export function ProfileEditForm({ profile, onSubmit, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    firm_name: '',
    crd_number: '',
    registration_states: [] as string[],
    compliance_email: '',
    phone: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA',
    },
    settings: {
      email_notifications: true,
      two_factor_enabled: false,
      default_client_view: 'grid' as 'grid' | 'list',
      timezone: 'America/Los_Angeles',
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Initialize form with current profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        firm_name: profile.firm_name || '',
        crd_number: profile.crd_number || '',
        registration_states: profile.registration_states || [],
        compliance_email: profile.compliance_email || '',
        phone: profile.phone || '',
        address: {
          line1: profile.address?.line1 || '',
          line2: profile.address?.line2 || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          zip: profile.address?.zip || '',
          country: profile.address?.country || 'USA',
        },
        settings: {
          email_notifications: profile.settings?.email_notifications ?? true,
          two_factor_enabled: profile.settings?.two_factor_enabled ?? false,
          default_client_view: profile.settings?.default_client_view || 'grid',
          timezone: profile.settings?.timezone || 'America/Los_Angeles',
        },
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error } = await onSubmit(formData)
      if (error) {
        setError(error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          onCancel() // Close modal on success
        }, 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
          Profile updated successfully!
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Firm Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Firm Information</h3>
        
        <div>
          <Label htmlFor="firm_name">Firm Name</Label>
          <Input
            id="firm_name"
            type="text"
            value={formData.firm_name}
            onChange={(e) => setFormData({ ...formData, firm_name: e.target.value })}
            placeholder="Enter your firm name"
          />
        </div>

        <div>
          <Label htmlFor="crd_number">CRD Number</Label>
          <Input
            id="crd_number"
            type="text"
            value={formData.crd_number}
            onChange={(e) => setFormData({ ...formData, crd_number: e.target.value })}
            placeholder="Enter your CRD number"
          />
        </div>

        <div>
          <MultiSelect
            label="Registration States"
            options={US_STATES.filter(s => s.value !== '')}
            value={formData.registration_states}
            onChange={(states) => setFormData({ ...formData, registration_states: states })}
            maxHeight="250px"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        
        <div>
          <Label htmlFor="compliance_email">Compliance Email</Label>
          <Input
            id="compliance_email"
            type="email"
            value={formData.compliance_email}
            onChange={(e) => setFormData({ ...formData, compliance_email: e.target.value })}
            placeholder="compliance@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      {/* Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address</h3>
        
        <div>
          <Label htmlFor="address_line1">Address Line 1</Label>
          <Input
            id="address_line1"
            type="text"
            value={formData.address.line1}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, line1: e.target.value }
            })}
            placeholder="123 Main Street"
          />
        </div>

        <div>
          <Label htmlFor="address_line2">Address Line 2</Label>
          <Input
            id="address_line2"
            type="text"
            value={formData.address.line2}
            onChange={(e) => setFormData({
              ...formData,
              address: { ...formData.address, line2: e.target.value }
            })}
            placeholder="Suite 100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              type="text"
              value={formData.address.city}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value }
              })}
              placeholder="San Francisco"
            />
          </div>

          <div>
            <Label htmlFor="state">State</Label>
            <Select
              id="state"
              value={formData.address.state}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, state: e.target.value }
              })}
            >
              {US_STATES.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              type="text"
              value={formData.address.zip}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, zip: e.target.value }
              })}
              placeholder="94105"
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              value={formData.address.country}
              onChange={(e) => setFormData({
                ...formData,
                address: { ...formData.address, country: e.target.value }
              })}
              placeholder="USA"
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="email_notifications"
              checked={formData.settings.email_notifications}
              onChange={(e) => setFormData({
                ...formData,
                settings: { ...formData.settings, email_notifications: e.target.checked }
              })}
            />
            <Label htmlFor="email_notifications" className="cursor-pointer">
              Enable email notifications
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="two_factor"
              checked={formData.settings.two_factor_enabled}
              onChange={(e) => setFormData({
                ...formData,
                settings: { ...formData.settings, two_factor_enabled: e.target.checked }
              })}
            />
            <Label htmlFor="two_factor" className="cursor-pointer">
              Enable two-factor authentication
            </Label>
          </div>
        </div>

        <div>
          <Label htmlFor="default_view">Default Client View</Label>
          <Select
            id="default_view"
            value={formData.settings.default_client_view}
            onChange={(e) => setFormData({
              ...formData,
              settings: { ...formData.settings, default_client_view: e.target.value as 'grid' | 'list' }
            })}
          >
            <option value="grid">Grid View</option>
            <option value="list">List View</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="timezone">Timezone</Label>
          <Select
            id="timezone"
            value={formData.settings.timezone}
            onChange={(e) => setFormData({
              ...formData,
              settings: { ...formData.settings, timezone: e.target.value }
            })}
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="America/Anchorage">Alaska Time</option>
            <option value="Pacific/Honolulu">Hawaii Time</option>
          </Select>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}