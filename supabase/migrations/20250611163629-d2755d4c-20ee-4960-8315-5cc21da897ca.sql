
-- Check if the classification function exists
SELECT 
    proname
FROM pg_proc 
WHERE proname = 'classify_employee_department_trigger';

-- Check existing triggers using the correct system view
SELECT 
    trigger_name, 
    event_manipulation, 
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'employee_profiles';

-- Drop and recreate the triggers to ensure they're working
DROP TRIGGER IF EXISTS employee_department_classification_insert_trigger ON public.employee_profiles;
DROP TRIGGER IF EXISTS employee_department_classification_update_trigger ON public.employee_profiles;

-- Recreate the triggers
CREATE TRIGGER employee_department_classification_insert_trigger
    BEFORE INSERT ON public.employee_profiles
    FOR EACH ROW
    EXECUTE FUNCTION classify_employee_department_trigger();

CREATE TRIGGER employee_department_classification_update_trigger
    BEFORE UPDATE OF headline ON public.employee_profiles
    FOR EACH ROW
    WHEN (NEW.headline IS DISTINCT FROM OLD.headline)
    EXECUTE FUNCTION classify_employee_department_trigger();

-- Verify the triggers are now created
SELECT 
    trigger_name, 
    event_manipulation, 
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'employee_profiles';

-- Test the trigger by updating a headline
UPDATE public.employee_profiles 
SET headline = 'Senior Software Engineer at Tech Company'
WHERE id = (
    SELECT id FROM public.employee_profiles 
    WHERE headline IS NOT NULL 
    LIMIT 1
);

-- Check if the update triggered the classification
SELECT 
    id,
    full_name,
    headline,
    department,
    updated_at
FROM public.employee_profiles 
WHERE headline LIKE '%Senior Software Engineer%'
ORDER BY updated_at DESC
LIMIT 5;
