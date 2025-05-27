-- =============================================
-- RENAME advisor_profiles TO representatives
-- Create new advisors table for firm entities
-- Version: 1.3.0
-- Date: May 26, 2025
-- =============================================

-- STEP 1: Create new advisors table (firm-level entities)
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

-- STEP 2: Rename advisor_profiles to representatives
ALTER TABLE public.advisor_profiles RENAME TO representatives;

-- STEP 3: Add advisor_id to representatives table
ALTER TABLE public.representatives ADD COLUMN advisor_id UUID REFERENCES public.advisors(id);

-- STEP 4: Update representatives table structure
-- Add advisor_id column (keep firm_name temporarily for backward compatibility)
-- We'll remove firm_name in a future migration after full transition

-- STEP 5: Update indexes
DROP INDEX IF EXISTS idx_advisor_profiles_crd_number;
DROP INDEX IF EXISTS idx_advisor_profiles_registration_states;

CREATE INDEX idx_representatives_crd_number ON public.representatives(crd_number);
CREATE INDEX idx_representatives_registration_states ON public.representatives USING GIN (registration_states);
CREATE INDEX idx_representatives_advisor_id ON public.representatives(advisor_id);
CREATE INDEX idx_advisors_firm_crd_number ON public.advisors(firm_crd_number);
-- STEP 6: Update RLS policies for representatives
DROP POLICY IF EXISTS "Users can view own profile" ON public.representatives;
DROP POLICY IF EXISTS "Users can update own profile" ON public.representatives;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.representatives;

ALTER TABLE public.representatives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own representative profile" ON public.representatives FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own representative profile" ON public.representatives FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own representative profile" ON public.representatives FOR INSERT WITH CHECK (auth.uid() = id);

-- STEP 7: Add RLS policies for advisors
ALTER TABLE public.advisors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Representatives can view their advisor" ON public.advisors FOR SELECT USING (
    id IN (SELECT advisor_id FROM public.representatives WHERE auth.uid() = representatives.id)
);
CREATE POLICY "Representatives can update their advisor" ON public.advisors FOR UPDATE USING (
    id IN (SELECT advisor_id FROM public.representatives WHERE auth.uid() = representatives.id)
);

-- STEP 8: Update triggers
CREATE TRIGGER handle_advisors_updated_at
    BEFORE UPDATE ON public.advisors
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- STEP 9: Update the automatic profile creation function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.representatives (id, compliance_email)
    VALUES (new.id, new.email);
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- The trigger on auth.users is already created and will work with the renamed table
