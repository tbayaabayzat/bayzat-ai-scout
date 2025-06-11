
-- First, let's test the classification function directly
SELECT * FROM test_department_classification('Software Engineer');

-- Let's also check if there are any recent updates to employee profiles
SELECT 
    id,
    full_name,
    headline,
    department,
    updated_at,
    created_at
FROM public.employee_profiles 
WHERE updated_at > NOW() - INTERVAL '1 hour'
ORDER BY updated_at DESC;

-- Run a small batch classification to see if it works
SELECT * FROM reclassify_employee_departments(5);
