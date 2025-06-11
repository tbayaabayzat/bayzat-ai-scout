
-- Create a new function to test department classification via webhook
CREATE OR REPLACE FUNCTION test_department_classification(test_job_title TEXT)
RETURNS TABLE(
    job_title TEXT,
    classified_department TEXT,
    response_raw JSONB,
    success BOOLEAN,
    error_message TEXT
) AS $$
DECLARE
    webhook_response JSONB;
    classified_dept TEXT;
    request_body JSONB;
BEGIN
    -- Build the request body with the required fields
    request_body := json_build_object(
        'headline', test_job_title,
        'current_title', test_job_title,
        'years_of_experience', NULL,
        'about', NULL
    );
    
    BEGIN
        -- Call the webhook
        SELECT content INTO webhook_response
        FROM http((
            'POST',
            'https://automation.bayzat.com/webhook/7732390f-d53f-4adf-8310-668c9c692371',
            ARRAY[
                http_header('Content-Type', 'application/json')
            ],
            'application/json',
            request_body::text
        ));
        
        -- Extract department from response
        classified_dept := webhook_response->>'department';
        
        -- Return the result
        RETURN QUERY SELECT 
            test_job_title,
            COALESCE(classified_dept, 'Other'),
            webhook_response,
            true,
            NULL::TEXT;
            
    EXCEPTION WHEN OTHERS THEN
        -- Return error result
        RETURN QUERY SELECT 
            test_job_title,
            'Other'::TEXT,
            json_build_object('error', SQLERRM)::JSONB,
            false,
            SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the employee classification trigger function
CREATE OR REPLACE FUNCTION classify_employee_department_trigger()
RETURNS TRIGGER AS $$
DECLARE
    classified_department TEXT;
    webhook_response JSONB;
    request_body JSONB;
BEGIN
    -- Only classify if headline exists and is not empty
    IF NEW.headline IS NOT NULL AND trim(NEW.headline) != '' THEN
        BEGIN
            -- Build the request body with the required fields
            request_body := json_build_object(
                'headline', NEW.headline,
                'current_title', NEW.current_title,
                'years_of_experience', NEW.years_of_experience,
                'about', NEW.about
            );
            
            -- Call the webhook
            SELECT content INTO webhook_response
            FROM http((
                'POST',
                'https://automation.bayzat.com/webhook/7732390f-d53f-4adf-8310-668c9c692371',
                ARRAY[
                    http_header('Content-Type', 'application/json')
                ],
                'application/json',
                request_body::text
            ));
            
            -- Extract department from response
            classified_department := webhook_response->>'department';
            
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

-- Update the batch reclassification function
CREATE OR REPLACE FUNCTION reclassify_employee_departments(batch_size INTEGER DEFAULT 10)
RETURNS TABLE(processed_count INTEGER, success_count INTEGER, error_count INTEGER) AS $$
DECLARE
    employee_record RECORD;
    success_counter INTEGER := 0;
    error_counter INTEGER := 0;
    total_counter INTEGER := 0;
    classified_department TEXT;
    webhook_response JSONB;
    request_body JSONB;
BEGIN
    RAISE NOTICE 'Starting batch classification using webhook';
    
    -- Process employees in batches
    FOR employee_record IN 
        SELECT id, headline, current_title, years_of_experience, about
        FROM public.employee_profiles 
        WHERE headline IS NOT NULL 
        AND trim(headline) != ''
        AND (department IS NULL OR department = 'Other')
        LIMIT batch_size
    LOOP
        total_counter := total_counter + 1;
        
        BEGIN
            RAISE NOTICE 'Classifying employee % with headline: %', employee_record.id, employee_record.headline;
            
            -- Build the request body with the required fields
            request_body := json_build_object(
                'headline', employee_record.headline,
                'current_title', employee_record.current_title,
                'years_of_experience', employee_record.years_of_experience,
                'about', employee_record.about
            );
            
            -- Call the webhook
            SELECT content INTO webhook_response
            FROM http((
                'POST',
                'https://automation.bayzat.com/webhook/7732390f-d53f-4adf-8310-668c9c692371',
                ARRAY[
                    http_header('Content-Type', 'application/json')
                ],
                'application/json',
                request_body::text
            ));
            
            RAISE NOTICE 'Response for employee %: %', employee_record.id, webhook_response;
            
            -- Extract department from response
            classified_department := webhook_response->>'department';
            
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
