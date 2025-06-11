
-- Set the service role key as a database setting
-- This allows the database functions to authenticate with edge functions
ALTER DATABASE postgres SET app.supabase_service_role_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpxb3d3emRwdGFwZ2RvaGt2anhyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODMyODU0NiwiZXhwIjoyMDYzOTA0NTQ2fQ.wlnYFq1M8QFoXtVKCLsN9JI0q_5x9yfkxu3VHJ3YzZk';

-- Create a test function to verify the classification system
CREATE OR REPLACE FUNCTION test_department_classification(test_job_title TEXT)
RETURNS TABLE(
    job_title TEXT,
    classified_department TEXT,
    response_raw JSONB,
    success BOOLEAN,
    error_message TEXT
) AS $$
DECLARE
    function_response JSONB;
    service_role_key TEXT;
    department_result TEXT;
    test_success BOOLEAN := false;
    test_error TEXT := '';
BEGIN
    -- Get the service role key
    SELECT current_setting('app.supabase_service_role_key', true) INTO service_role_key;
    
    -- Check if we have the service role key
    IF service_role_key IS NULL OR service_role_key = '' THEN
        test_error := 'Service role key not available';
        RETURN QUERY SELECT test_job_title, 'Other'::TEXT, '{}'::JSONB, false, test_error;
        RETURN;
    END IF;
    
    BEGIN
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
            json_build_object('jobTitle', test_job_title)::text
        ));
        
        -- Extract department from response
        department_result := function_response->>'department';
        
        -- Check if we got a valid response
        IF department_result IS NOT NULL AND department_result != '' THEN
            test_success := true;
        ELSE
            test_error := 'No department returned in response';
            department_result := 'Other';
        END IF;
        
    EXCEPTION WHEN OTHERS THEN
        test_error := SQLERRM;
        department_result := 'Other';
        function_response := json_build_object('error', test_error);
    END;
    
    RETURN QUERY SELECT test_job_title, COALESCE(department_result, 'Other'), 
                       COALESCE(function_response, '{}'::JSONB), test_success, test_error;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
