
-- Migration to fix the hardcoded service role key security issue
-- This updates the validate_email_domain function to not rely on hardcoded keys

-- Update the handle_new_user function to be more secure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Validate domain (extra safety check)
  IF NEW.email NOT LIKE '%@bayzat.com' THEN
    RAISE EXCEPTION 'Access restricted to Bayzat team members only.';
  END IF;
  
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- The domain validation trigger remains the same as it doesn't use the service role key
-- Function to validate email domain during signup
CREATE OR REPLACE FUNCTION public.validate_email_domain()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow @bayzat.com emails
  IF NEW.email NOT LIKE '%@bayzat.com' THEN
    RAISE EXCEPTION 'Access restricted to Bayzat team members only. Please use your @bayzat.com email address.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
