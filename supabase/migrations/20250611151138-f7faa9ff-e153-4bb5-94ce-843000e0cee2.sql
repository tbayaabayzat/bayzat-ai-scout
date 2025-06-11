
-- Run batch reclassification for existing employees with NULL or 'Other' departments
-- This will process employees in batches and call the webhook to classify them
SELECT * FROM reclassify_employee_departments(20);
