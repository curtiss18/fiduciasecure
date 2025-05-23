-- =============================================
-- FIDUCIASECURE CURRENT DATABASE STATE
-- Version: 1.2.0
-- Last Updated: May 23, 2025
-- =============================================

-- IMPLEMENTED TABLES

-- 1. Advisor Profiles (IMPLEMENTED)
CREATE TABLE public.advisor_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    firm_name TEXT,
    crd_number TEXT UNIQUE,
    registration_states TEXT[] DEFAULT '{}',
    compliance_email TEXT,
    phone TEXT,
    address JSONB DEFAULT '{}'::jsonb,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Indexes
CREATE INDEX idx_advisor_profiles_crd_number ON public.advisor_profiles(crd_number);
CREATE INDEX idx_advisor_profiles_registration_states ON public.advisor_profiles USING GIN (registration_states);

-- RLS Policies
ALTER TABLE public.advisor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.advisor_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.advisor_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.advisor_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- PLANNED TABLES (NOT YET IMPLEMENTED)
-- =============================================

-- 2. Clients (PLANNED)
-- Will store client relationships and status
-- Supports individual and joint clients
-- Tracks onboarding progress

-- 3. Contacts (PLANNED)
-- Stores all people (clients, spouses, beneficiaries)
-- Encrypted PII fields
-- Linked to clients table

-- 4. Financial Profiles (PLANNED)
-- Net worth and financial situation
-- Income, assets, liabilities
-- Tax information

-- 5. Accounts (PLANNED)
-- Investment and bank accounts
-- Multiple ownership support
-- Beneficiary tracking

-- 6. Documents (PLANNED)
-- Secure document storage references
-- Compliance and retention tracking
-- Encryption status

-- 7. Forms & Compliance (PLANNED)
-- Form templates and submissions
-- Compliance reviews and audit logs
-- Risk assessments

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Automatic timestamp update
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Automatic profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.advisor_profiles (id, compliance_email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER handle_advisor_profiles_updated_at
    BEFORE UPDATE ON public.advisor_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();