
-- Create the missing authentication functions and triggers
-- This will restore email domain validation and user profile creation

-- Create the domain validation function
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

-- Create the user profile creation function (it should already exist, but let's ensure it's correct)
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

-- Drop any existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS validate_bayzat_domain ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the domain validation trigger
CREATE TRIGGER validate_bayzat_domain
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_email_domain();

-- Create the user profile creation trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Verify the triggers are created
SELECT 
    trigger_name, 
    event_manipulation, 
    action_timing,
    action_orientation
FROM information_schema.triggers 
WHERE trigger_schema = 'auth' 
AND event_object_table = 'users'
AND trigger_name IN ('validate_bayzat_domain', 'on_auth_user_created');
