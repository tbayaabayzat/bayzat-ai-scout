
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"
import { BayzatLogo } from "@/components/BayzatLogo"
import { supabase } from "@/integrations/supabase/client"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleGoogleSignIn = async () => {
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })
    
    if (error) {
      toast({
        title: "Unable to sign in",
        description: error.message,
        variant: "destructive"
      })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <BayzatLogo width={120} height={39} />
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-center">
          {/* Hero Text */}
          <div className="space-y-3">
            <h1 className="text-display text-foreground">
              Sales Intelligence
            </h1>
            <p className="text-body text-muted-foreground max-w-xs mx-auto">
              Intelligence-first platform for confident selling
            </p>
          </div>

          {/* Auth Form */}
          <div className="space-y-6">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn-auth-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </g>
              </svg>
              {loading ? "Signing in..." : "Continue with Google"}
            </button>

            <p className="text-caption max-w-xs mx-auto">
              Access restricted to authorized Bayzat team members
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
