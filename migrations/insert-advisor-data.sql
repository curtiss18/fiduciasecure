-- =============================================
-- INSERT ADVISOR DATA FOR EXISTING REPRESENTATIVES
-- Institute for Wealth Management
-- Date: May 26, 2025
-- =============================================

-- Step 1: Insert the advisor record
INSERT INTO public.advisors (
    firm_name,
    firm_crd_number,
    primary_contact_email,
    phone,
    address,
    settings,
    created_at,
    updated_at
) VALUES (
    'Institute for Wealth Management',
    '127207',
    'curtiss18@gmail.com',
    '775-309-7092',
    '{
        "line1": "9878 W Belleview Ave #2306",
        "city": "Denver",
        "state": "CO",
        "zip": "80123",
        "country": "USA"
    }'::jsonb,
    '{
        "email_notifications": false,
        "timezone": "America/Denver",
        "default_compliance_email": "curtiss18@gmail.com"
    }'::jsonb,
    NOW(),
    NOW()
);

-- Step 2: Update all existing representatives to link to this advisor
UPDATE public.representatives 
SET advisor_id = (
    SELECT id 
    FROM public.advisors 
    WHERE firm_crd_number = '127207'
), 
updated_at = NOW()
WHERE advisor_id IS NULL;
-- Step 3: Verify the data was inserted correctly (Optional verification query)
SELECT 
    a.firm_name,
    a.firm_crd_number,
    a.primary_contact_email,
    COUNT(r.id) as representative_count
FROM public.advisors a
LEFT JOIN public.representatives r ON a.id = r.advisor_id
WHERE a.firm_crd_number = '127207'
GROUP BY a.id, a.firm_name, a.firm_crd_number, a.primary_contact_email;

-- Step 4: View the linked representatives (Optional verification query)
SELECT 
    r.compliance_email,
    r.crd_number,
    r.registration_states,
    a.firm_name
FROM public.representatives r
JOIN public.advisors a ON r.advisor_id = a.id
WHERE a.firm_crd_number = '127207';