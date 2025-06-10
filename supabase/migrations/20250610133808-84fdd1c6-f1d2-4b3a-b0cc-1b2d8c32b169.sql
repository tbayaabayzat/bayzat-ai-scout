
-- Add Bayzat relationship field to companies2 table
ALTER TABLE companies2 
ADD COLUMN bayzat_relationship VARCHAR(50) DEFAULT 'prospect' CHECK (bayzat_relationship IN ('prospect', 'customer', 'partner'));

-- Add index for better query performance
CREATE INDEX idx_companies2_bayzat_relationship ON companies2(bayzat_relationship);

-- Add a comment to document the field
COMMENT ON COLUMN companies2.bayzat_relationship IS 'Defines relationship with Bayzat: prospect, customer, or partner';
