-- =============================================
-- NON-DESTRUCTIVE MIGRATION FOR REGISTRATION STATES
-- This version keeps the old column and adds the new one
-- =============================================

-- Step 1: Add new column for array of states (if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'advisor_profiles' 
        AND column_name = 'registration_states'
    ) THEN
        ALTER TABLE public.advisor_profiles 
        ADD COLUMN registration_states TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- Step 2: Copy existing data to the new column (if old column exists)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'advisor_profiles' 
        AND column_name = 'registration_state'
    ) THEN
        UPDATE public.advisor_profiles 
        SET registration_states = ARRAY[registration_state]
        WHERE registration_state IS NOT NULL 
        AND registration_state != ''
        AND (registration_states IS NULL OR registration_states = '{}');
    END IF;
END $$;

-- Step 3: Create index if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_advisor_profiles_registration_states 
ON public.advisor_profiles USING GIN (registration_states);

-- Note: To complete the migration later, you can run:
-- ALTER TABLE public.advisor_profiles DROP COLUMN registration_state;