
-- Drop existing triggers to start fresh
DROP TRIGGER IF EXISTS employee_department_classification_insert_trigger ON public.employee_profiles;
DROP TRIGGER IF EXISTS employee_department_classification_update_trigger ON public.employee_profiles;

-- Create INSERT-only trigger for new employee classification
CREATE TRIGGER employee_department_classification_insert_trigger
    BEFORE INSERT ON public.employee_profiles
    FOR EACH ROW
    EXECUTE FUNCTION classify_employee_department_trigger();

-- Verify the trigger is created
SELECT 
    trigger_name, 
    event_manipulation, 
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table = 'employee_profiles';
