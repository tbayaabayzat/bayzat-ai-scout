
-- Step 1: Add department column to employee_profiles table
ALTER TABLE public.employee_profiles 
ADD COLUMN department TEXT DEFAULT 'Other';

-- Step 2: Create index for performance
CREATE INDEX idx_employee_profiles_department ON public.employee_profiles(department);

-- Step 3: Create function to classify employee department via edge function
CREATE OR REPLACE FUNCTION classify_employee_department_trigger()
RETURNS TRIGGER AS $$
DECLARE
    classified_department TEXT;
    function_response JSONB;
BEGIN
    -- Only classify if headline exists and is not empty
    IF NEW.headline IS NOT NULL AND trim(NEW.headline) != '' THEN
        BEGIN
            -- Call the edge function to classify the department
            SELECT content INTO function_response
            FROM http((
                'POST',
                'https://zqowwzdptapgdohkvjxr.supabase.co/functions/v1/classify-employee-department',
                ARRAY[
                    http_header('Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)),
                    http_header('Content-Type', 'application/json')
                ],
                'application/json',
                json_build_object('jobTitle', NEW.headline)::text
            ));
            
            -- Extract department from response
            classified_department := function_response->>'department';
            
            -- Validate the department is one of our expected values
            IF classified_department IN (
                'Engineering', 'IT', 'Sales', 'Marketing', 'Human Resources',
                'Finance & Accounting', 'Operations', 'Customer Success',
                'Product Management', 'Executive', 'Other'
            ) THEN
                NEW.department := classified_department;
            ELSE
                NEW.department := 'Other';
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            -- If classification fails, default to 'Other'
            NEW.department := 'Other';
            -- Log the error (optional)
            RAISE NOTICE 'Department classification failed for employee %: %', NEW.id, SQLERRM;
        END;
    ELSE
        -- No headline, default to 'Other'
        NEW.department := 'Other';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4: Create separate triggers for INSERT and UPDATE with appropriate conditions
CREATE TRIGGER employee_department_classification_insert_trigger
    BEFORE INSERT ON public.employee_profiles
    FOR EACH ROW
    EXECUTE FUNCTION classify_employee_department_trigger();

CREATE TRIGGER employee_department_classification_update_trigger
    BEFORE UPDATE OF headline ON public.employee_profiles
    FOR EACH ROW
    WHEN (NEW.headline IS DISTINCT FROM OLD.headline)
    EXECUTE FUNCTION classify_employee_department_trigger();

-- Step 5: Create function to manually reclassify existing employees
CREATE OR REPLACE FUNCTION reclassify_employee_departments(batch_size INTEGER DEFAULT 50)
RETURNS TABLE(processed_count INTEGER, success_count INTEGER, error_count INTEGER) AS $$
DECLARE
    employee_record RECORD;
    success_counter INTEGER := 0;
    error_counter INTEGER := 0;
    total_counter INTEGER := 0;
    classified_department TEXT;
    function_response JSONB;
BEGIN
    -- Process employees in batches
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
            -- Call the edge function to classify the department
            SELECT content INTO function_response
            FROM http((
                'POST',
                'https://zqowwzdptapgdohkvjxr.supabase.co/functions/v1/classify-employee-department',
                ARRAY[
                    http_header('Authorization', 'Bearer ' || current_setting('app.supabase_service_role_key', true)),
                    http_header('Content-Type', 'application/json')
                ],
                'application/json',
                json_build_object('jobTitle', employee_record.headline)::text
            ));
            
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
            ELSE
                UPDATE public.employee_profiles 
                SET department = 'Other' 
                WHERE id = employee_record.id;
                success_counter := success_counter + 1;
            END IF;
            
        EXCEPTION WHEN OTHERS THEN
            -- If classification fails, set to 'Other'
            UPDATE public.employee_profiles 
            SET department = 'Other' 
            WHERE id = employee_record.id;
            error_counter := error_counter + 1;
        END;
        
        -- Add small delay to avoid rate limiting
        PERFORM pg_sleep(0.1);
    END LOOP;
    
    RETURN QUERY SELECT total_counter, success_counter, error_counter;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Enable http extension if not already enabled (required for calling edge functions)
CREATE EXTENSION IF NOT EXISTS http;
