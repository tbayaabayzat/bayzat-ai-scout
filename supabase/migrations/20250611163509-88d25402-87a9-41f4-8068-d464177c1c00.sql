
-- Check if the triggers are actually enabled
SELECT 
    trigger_name, 
    event_manipulation, 
    action_statement,
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'employee_profiles';

-- Let's test with a specific employee record and see what happens
UPDATE public.employee_profiles 
SET headline = 'Senior Software Engineer at Tech Company'
WHERE id = (
    SELECT id FROM public.employee_profiles 
    WHERE headline IS NOT NULL 
    LIMIT 1
);

-- Check if that update triggered the classification
SELECT 
    id,
    full_name,
    headline,
    department,
    updated_at
FROM public.employee_profiles 
WHERE headline LIKE '%Senior Software Engineer%'
ORDER BY updated_at DESC;

-- Also check if there are any employees that have been classified recently
SELECT 
    department,
    COUNT(*) as count,
    MAX(updated_at) as last_updated
FROM public.employee_profiles 
WHERE department IS NOT NULL 
AND department != 'Other'
GROUP BY department
ORDER BY last_updated DESC;
