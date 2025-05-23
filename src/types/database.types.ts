// Database types for FiduciaSecure

export interface AdvisorProfile {
  id: string; // UUID
  firm_name: string | null;
  crd_number: string | null;
  registration_states: string[]; // Array of state codes
  compliance_email: string;
  phone: string | null;
  address: Address;
  settings: AdvisorSettings;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface AdvisorSettings {
  email_notifications?: boolean;
  two_factor_enabled?: boolean;
  default_client_view?: 'grid' | 'list';
  timezone?: string;
}

// Enums for future tables
export type ClientType = 'individual' | 'joint';
export type ClientStatus = 'prospect' | 'onboarding' | 'active' | 'inactive';
export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'widow';

// More types will be added as we create additional tables