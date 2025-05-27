-- =============================================
-- FIDUCIASECURE CURRENT DATABASE STATE
-- Version: 1.3.0 - Independent Representatives Architecture
-- Last Updated: May 26, 2025
-- =============================================

-- ARCHITECTURE:
-- advisors (optional firms) -> representatives (primary users) -> clients -> contacts
-- Representatives can work independently or be part of advisory firms

-- IMPLEMENTED TABLES

-- 1. Advisors (OPTIONAL - advisory firm entities)
CREATE TABLE public.advisors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firm_name TEXT NOT NULL,
    firm_crd_number TEXT UNIQUE,
    primary_contact_email TEXT,
    phone TEXT,
    address JSONB DEFAULT '{}'::jsonb,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. Representatives (PRIMARY USERS - can be independent or advisor-linked)
CREATE TABLE public.representatives (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    advisor_id UUID REFERENCES public.advisors(id), -- NULL for independent reps
    firm_name TEXT, -- For independent reps only (NULL if linked to advisor)
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
CREATE INDEX idx_advisors_firm_crd_number ON public.advisors(firm_crd_number);
CREATE INDEX idx_representatives_crd_number ON public.representatives(crd_number);
CREATE INDEX idx_representatives_registration_states ON public.representatives USING GIN (registration_states);
CREATE INDEX idx_representatives_advisor_id ON public.representatives(advisor_id);
-- RLS Policies for Advisors
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Representatives can view their advisor" ON public.advisors FOR SELECT USING (
    id IN (SELECT advisor_id FROM public.representatives WHERE auth.uid() = representatives.id)
);
CREATE POLICY "Representatives can update their advisor" ON public.advisors FOR UPDATE USING (
    id IN (SELECT advisor_id FROM public.representatives WHERE auth.uid() = representatives.id)
);

-- RLS Policies for Representatives  
ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own representative profile" ON public.representatives FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own representative profile" ON public.representatives FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own representative profile" ON public.representatives FOR INSERT WITH CHECK (auth.uid() = id);

-- =============================================
-- PLANNED TABLES (NOT YET IMPLEMENTED)
-- =============================================

-- 3. Clients (PLANNED - linked to representatives)
-- Will link to representatives instead of advisors
-- Supports individual and joint clients
-- Tracks onboarding progress

-- 4. Contacts (PLANNED)
-- Stores all people (clients, spouses, beneficiaries)
-- Encrypted PII fields
-- Linked to clients table

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

-- Automatic representative profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.representatives (id, compliance_email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER handle_advisors_updated_at
    BEFORE UPDATE ON public.advisors
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_representatives_updated_at
    BEFORE UPDATE ON public.representatives
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();