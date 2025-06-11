
-- First, let's fix the database function to handle authentication properly
-- and add better error logging

-- Drop existing triggers to avoid conflicts during update
DROP TRIGGER IF EXISTS employee_department_classification_insert_trigger ON public.employee_profiles;
DROP TRIGGER IF EXISTS employee_department_classification_update_trigger ON public.employee_profiles;

-- Update the classification function with better error handling and authentication
CREATE OR REPLACE FUNCTION classify_employee_department_trigger()
RETURNS TRIGGER AS $$
DECLARE
    classified_department TEXT;
    function_response JSONB;
    service_role_key TEXT;
BEGIN
    -- Only classify if headline exists and is not empty
    IF NEW.headline IS NOT NULL AND trim(NEW.headline) != '' THEN
        BEGIN
            -- Get the service role key from app settings
            -- This will work if the key is properly configured in database settings
            SELECT current_setting('app.supabase_service_role_key', true) INTO service_role_key;
            
            -- If we don't have the service role key, log and default to 'Other'
            IF service_role_key IS NULL OR service_role_key = '' THEN
                RAISE NOTICE 'Service role key not available for employee %', NEW.id;
                NEW.department := 'Other';
                RETURN NEW;
            END IF;
            
            -- Call the edge function to classify the department
            SELECT content INTO function_response
            FROM http((
                'POST',
                'https://zqowwzdptapgdohkvjxr.supabase.co/functions/v1/classify-employee-department',
                ARRAY[
                    http_header('Authorization', 'Bearer ' || service_role_key),
                    http_header('Content-Type', 'application/json'),
                    http_header('apikey', service_role_key)
                ],
                'application/json',
                json_build_object('jobTitle', NEW.headline)::text
            ));
            
            -- Log the response for debugging
            RAISE NOTICE 'Classification response for employee % (%): %', NEW.id, NEW.headline, function_response;
            
            -- Extract department from response
            classified_department := function_response->>'department';
            
            -- Validate the department is one of our expected values
            IF classified_department IN (
                'Engineering', 'IT', 'Sales', 'Marketing', 'Human Resources',
                'Finance & Accounting', 'Operations', 'Customer Success',
                'Product Management', 'Executive', 'Other'
            ) THEN
                NEW.department := classified_department;
                RAISE NOTICE 'Successfully classified employee % as %', NEW.id, classified_department;
            ELSE
                NEW.department := 'Other';
                RAISE NOTICE 'Invalid department returned for employee %: %, defaulting to Other', NEW.id, classified_department;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            -- If classification fails, default to 'Other' and log the error
            NEW.department := 'Other';
            RAISE NOTICE 'Department classification failed for employee % (%): %', NEW.id, NEW.headline, SQLERRM;
        END;
    ELSE
        -- No headline, default to 'Other'
        NEW.department := 'Other';
        RAISE NOTICE 'No headline for employee %, defaulting to Other', NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- Update the manual reclassification function with the same improvements
CREATE OR REPLACE FUNCTION reclassify_employee_departments(batch_size INTEGER DEFAULT 10)
RETURNS TABLE(processed_count INTEGER, success_count INTEGER, error_count INTEGER) AS $$
DECLARE
    employee_record RECORD;
    success_counter INTEGER := 0;
    error_counter INTEGER := 0;
    total_counter INTEGER := 0;
    classified_department TEXT;
    function_response JSONB;
    service_role_key TEXT;
BEGIN
    -- Get the service role key
    SELECT current_setting('app.supabase_service_role_key', true) INTO service_role_key;
    
    -- If we don't have the service role key, exit with error
    IF service_role_key IS NULL OR service_role_key = '' THEN
        RAISE EXCEPTION 'Service role key not available for department classification';
    END IF;
    
    RAISE NOTICE 'Starting batch classification with service role key available';
    
    -- Process employees in batches (reduced batch size to avoid overwhelming)
    FOR employee_record IN 
        SELECT id, headline 
        FROM public.employee_profiles 
        WHERE headline IS NOT NULL 
        AND trim(headline) != ''
        AND (department IS NULL OR department = 'Other')
        LIMIT batch_size
    LOOP
        total_counter := total_counter + 1;
        
        BEGIN
            RAISE NOTICE 'Classifying employee % with headline: %', employee_record.id, employee_record.headline;
            
            -- Call the edge function to classify the department
            SELECT content INTO function_response
            FROM http((
                'POST',
                'https://zqowwzdptapgdohkvjxr.supabase.co/functions/v1/classify-employee-department',
                ARRAY[
                    http_header('Authorization', 'Bearer ' || service_role_key),
                    http_header('Content-Type', 'application/json'),
                    http_header('apikey', service_role_key)
                ],
                'application/json',
                json_build_object('jobTitle', employee_record.headline)::text
            ));
            
            RAISE NOTICE 'Response for employee %: %', employee_record.id, function_response;
            
            -- Extract department from response
            classified_department := function_response->>'department';
            
            -- Validate and update
            IF classified_department IN (
                'Engineering', 'IT', 'Sales', 'Marketing', 'Human Resources',
                'Finance & Accounting', 'Operations', 'Customer Success',
                'Product Management', 'Executive', 'Other'
            ) THEN
                UPDATE public.employee_profiles 
                SET department = classified_department 
                WHERE id = employee_record.id;
                success_counter := success_counter + 1;
                RAISE NOTICE 'Successfully updated employee % to department %', employee_record.id, classified_department;
            ELSE
                UPDATE public.employee_profiles 
                SET department = 'Other' 
                WHERE id = employee_record.id;
                success_counter := success_counter + 1;
                RAISE NOTICE 'Invalid department for employee %, set to Other', employee_record.id;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            -- If classification fails, set to 'Other'
            UPDATE public.employee_profiles 
            SET department = 'Other' 
            WHERE id = employee_record.id;
            error_counter := error_counter + 1;
            RAISE NOTICE 'Error classifying employee %: %', employee_record.id, SQLERRM;
        END;
        
        -- Add delay to avoid rate limiting
        PERFORM pg_sleep(0.2);
    END LOOP;
    
    RAISE NOTICE 'Batch complete: % processed, % successful, % errors', total_counter, success_counter, error_counter;
    RETURN QUERY SELECT total_counter, success_counter, error_counter;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Set the service role key as a database setting (you'll need to replace with actual key)
-- This needs to be done with the actual service role key value
-- ALTER DATABASE postgres SET app.supabase_service_role_key = 'your_actual_service_role_key_here';
