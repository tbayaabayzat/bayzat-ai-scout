
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

-- Create trigger to validate email domain on user creation
DROP TRIGGER IF EXISTS validate_bayzat_domain ON auth.users;
CREATE TRIGGER validate_bayzat_domain
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_email_domain();

-- Update existing user_profiles trigger to handle domain validation
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
