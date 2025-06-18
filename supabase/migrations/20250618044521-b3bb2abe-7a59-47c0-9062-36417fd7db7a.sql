
-- Add bayzat_relationship column to linkedin_queue table
ALTER TABLE linkedin_queue 
ADD COLUMN bayzat_relationship VARCHAR(50) DEFAULT 'prospect' 
CHECK (bayzat_relationship IN ('prospect', 'customer'));

-- Add index for better query performance
CREATE INDEX idx_linkedin_queue_bayzat_relationship ON linkedin_queue(bayzat_relationship);

-- Add a comment to document the field
COMMENT ON COLUMN linkedin_queue.bayzat_relationship IS 'Defines relationship with Bayzat: prospect or customer';
