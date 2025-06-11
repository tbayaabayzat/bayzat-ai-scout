
-- Check the current state of employee_profiles to see if departments are being updated
SELECT 
    id,
    full_name,
    headline,
    department,
    updated_at
FROM public.employee_profiles 
WHERE headline IS NOT NULL 
AND trim(headline) != ''
ORDER BY updated_at DESC 
LIMIT 20;

-- Also check how many employees have each department classification
SELECT 
    department,
    COUNT(*) as employee_count
FROM public.employee_profiles 
GROUP BY department 
ORDER BY employee_count DESC;

-- Check if there are any employees from Arabian Ethicals specifically
SELECT 
    id,
    full_name,
    headline,
    department,
    current_company_name,
    updated_at
FROM public.employee_profiles 
WHERE current_company_name ILIKE '%arabian%ethicals%'
ORDER BY updated_at DESC;
