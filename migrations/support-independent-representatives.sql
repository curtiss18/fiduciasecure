-- =============================================
-- SUPPORT INDEPENDENT REPRESENTATIVES
-- Allow representatives to work independently of advisors
-- Date: May 26, 2025
-- =============================================

-- Add firm_name back to representatives table for independent reps
-- This allows reps to either:
-- 1. Be linked to an advisor (firm_name comes from advisors table)
-- 2. Work independently (firm_name stored in representatives table)
ALTER TABLE public.representatives 
ADD COLUMN firm_name TEXT;

-- Add a comment to clarify the logic
COMMENT ON COLUMN public.representatives.firm_name IS 
'Firm name for independent representatives. NULL if linked to an advisor (use advisors.firm_name instead).';

COMMENT ON COLUMN public.representatives.advisor_id IS 
'Optional reference to advisors table. NULL for independent representatives.';

-- Update the schema to reflect this is optional
COMMENT ON TABLE public.representatives IS 
'Individual representatives who can work independently or be part of an advisory firm.';

COMMENT ON TABLE public.advisors IS 
'Advisory firms that may have multiple representatives.';
