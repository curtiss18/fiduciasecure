// Database types for FiduciaSecure

// Updated architecture: Advisors -> Representatives -> Clients -> Contacts

export interface Advisor {
  id: string; // UUID
  firm_name: string;
  firm_crd_number: string | null;
  primary_contact_email: string | null;
  phone: string | null;
  address: Address;
  settings: AdvisorSettings;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Representative {
  id: string; // UUID (references auth.users)
  advisor_id: string | null; // UUID (references advisors) - NULL for independent reps
  crd_number: string | null;
  registration_states: string[]; // Array of state codes
  compliance_email: string;
  phone: string | null;
  address: Address;
  settings: RepresentativeSettings;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  // Firm name for independent representatives (NULL if linked to advisor)
  firm_name: string | null;
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
  timezone?: string;
  default_compliance_email?: string;
}

export interface RepresentativeSettings {
  email_notifications?: boolean;
  two_factor_enabled?: boolean;
  default_client_view?: 'grid' | 'list';
  timezone?: string;
}
// Legacy type alias for backward compatibility during migration
export type AdvisorProfile = Representative;

// Enums for future tables
export type ClientType = 'individual' | 'joint';
export type ClientStatus = 'prospect' | 'onboarding' | 'active' | 'inactive';
export type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'widow';

// More types will be added as we create additional tables

// Helper type for representative with resolved advisor data
export interface RepresentativeWithAdvisor extends Representative {
  advisor?: Advisor | null;
}

// Helper functions for working with representatives
export const getEffectiveFirmName = (representative: RepresentativeWithAdvisor): string | null => {
  // If linked to an advisor, use the advisor's firm name
  if (representative.advisor_id && representative.advisor) {
    return representative.advisor.firm_name;
  }
  // Otherwise use the representative's own firm name (for independent reps)
  return representative.firm_name;
};

export const isIndependentRepresentative = (representative: Representative): boolean => {
  return representative.advisor_id === null;
};