# FiduciaSecure - Project Documentation

**Version**: 1.1.0  
**Last Updated**: May 2025  
**Status**: Active Development

## Changelog
- v1.1.0 - Added multi-state registration support for advisors
- v1.0.0 - Initial implementation with advisor profiles

## Project Overview
FiduciaSecure is a secure client onboarding and data management platform designed specifically for independent financial advisors (IARs). The platform helps advisors collect, manage, and maintain client information while ensuring regulatory compliance.

## Technical Stack
- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Radix UI primitives

## Database Architecture

### Implemented Tables

#### advisor_profiles
```sql
advisor_profiles {
  id: uuid (PK, FK to auth.users)
  firm_name: text
  crd_number: text (unique)
  registration_states: text[] -- Array of state codes
  compliance_email: text
  phone: text
  address: jsonb -- {line1, line2, city, state, zip, country}
  settings: jsonb -- {email_notifications, two_factor_enabled, default_client_view, timezone}
  created_at: timestamp
  updated_at: timestamp
}
```

### Planned Tables (Designed but not yet implemented)

#### clients
```sql
clients {
  id: uuid (PK)
  advisor_id: uuid (FK to advisor_profiles)
  client_number: text (unique, auto-generated)
  client_type: enum ('individual', 'joint')
  status: enum ('prospect', 'onboarding', 'active', 'inactive')
  onboarding_stage: enum
  primary_contact_id: uuid (FK to contacts)
  filing_status: enum
  created_at: timestamp
  updated_at: timestamp
}
```

#### contacts
```sql
contacts {
  id: uuid (PK)
  client_id: uuid (FK to clients)
  relationship_type: enum ('self', 'spouse', 'dependent', 'beneficiary', 'other')
  -- Personal information (encrypted)
  first_name, middle_name, last_name: text
  date_of_birth: date
  ssn: text
  -- Contact details
  email, phone_primary, phone_mobile: text
  -- Address fields
  address_line1, address_line2, city, state, zip: text
  -- Other fields...
}
```

#### Additional planned tables:
- employment_details
- financial_profiles
- accounts
- risk_profiles
- investment_objectives
- documents
- forms/form_progress
- audit_logs
- compliance_reviews

## Security Implementation
- Row Level Security (RLS) enabled on all tables
- Automatic timestamp management
- Audit trail for compliance
- Sensitive field encryption planned
- Secure document storage architecture

## Key Features Implemented
1. **Authentication System**
   - User signup/login via Supabase
   - Protected routes with middleware
   - Automatic profile creation

2. **Advisor Dashboard**
   - Profile display and editing
   - Quick stats placeholders
   - Activity feed structure

3. **Profile Management**
   - Comprehensive profile editing form
   - Multi-state registration support
   - Address and settings management

## UI Components Created
- Button, Card, Input, Label, Select
- Checkbox, Modal, MultiSelect
- ProfileEditForm
- Consistent Tailwind styling

## Form Architecture Philosophy
Forms are purely UI components that collect data for normalized database tables. Each form maps to specific database entities:
- Contact Information Form → contacts table
- Employment Form → employment_details table
- Financial Profile Form → financial_profiles table
- Account Inventory Form → accounts table
- Risk Assessment Form → risk_profiles table
- Investment Objectives Form → investment_objectives table

## Compliance Considerations
- SOC 2 compliance requirements
- SEC/FINRA regulatory needs
- Full audit trail implementation
- Encrypted storage for sensitive data
- Document retention policies

## Development Patterns
1. **Type Safety**: Full TypeScript implementation
2. **Component Architecture**: Reusable UI components
3. **Data Fetching**: Custom hooks for data management
4. **Error Handling**: Comprehensive error states
5. **Loading States**: Proper loading indicators
6. **Responsive Design**: Mobile-first approach

## Next Implementation Priorities
1. Create clients table and management system
2. Build contacts table for people associated with clients
3. Implement client onboarding form flow
4. Add document upload functionality
5. Create compliance tracking features

## File Structure
```
C:\Users\curti\OneDrive\Desktop\WebDev\fiduciasecure\
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── signup/
│   │   └── auth/
│   ├── components/
│   │   ├── ui/
│   │   └── ProfileEditForm.tsx
│   ├── hooks/
│   │   └── useAdvisorProfile.ts
│   ├── lib/
│   │   ├── supabase-client.ts
│   │   └── supabase-server.ts
│   ├── types/
│   │   └── database.types.ts
│   └── middleware.ts
├── migrations/
│   ├── advisor-profiles-migration.sql
│   └── safe-registration-states.sql
└── package.json
```

## Environment Setup
Required environment variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Known Decisions & Constraints
1. Starting with individual/joint clients only (business entities later)
2. Using PostgreSQL arrays for multi-value fields (e.g., registration_states)
3. JSONB for flexible structured data (address, settings)
4. Soft deletes preferred over hard deletes
5. All timestamps in UTC

## Testing Approach
- Manual testing during development
- Focus on data integrity and security
- RLS policy verification
- Form validation and error handling

This documentation should be provided at the start of any new conversation along with the context prompt for immediate productivity.