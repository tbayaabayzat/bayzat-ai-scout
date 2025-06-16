
-- Remove the hardcoded service role key for security
-- The service role key should be accessed through Supabase's environment variables instead

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
    department_result TEXT;
    test_success BOOLEAN := false;
    test_error TEXT := '';
BEGIN
    BEGIN
        -- Call the edge function to classify the department
        SELECT content INTO function_response
        FROM http((
            'POST',
            'https://zqowwzdptapgdohkvjxr.supabase.co/functions/v1/classify-employee-department',
            ARRAY[
                http_header('Content-Type', 'application/json')
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
