
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { BayzatLogo } from "@/components/BayzatLogo"
import { UseCaseSlider } from "@/components/UseCaseSlider"
import { supabase } from "@/integrations/supabase/client"

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
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
    <div className="min-h-screen bg-background flex">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md space-y-10">
          {/* Logo */}
          <div className="flex justify-center">
            <BayzatLogo width={140} height={46} />
          </div>

          {/* Main Content */}
          <div className="space-y-8 text-center">
            {/* Hero Text */}
            <div className="space-y-6">
              <h1 className="text-[2.75rem] md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-foreground leading-[0.95] font-serif">
                Your sales,
                <br />
                amplified
              </h1>
              <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-sm mx-auto">
                Intelligence-first platform that helps you sell with confidence.
              </p>
            </div>

            {/* Auth Form */}
            <div className="space-y-8">
              <div className="space-y-5">
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                    </g>
                  </svg>
                  {loading ? "Signing in..." : "Continue with Google"}
                </button>
              </div>

              <p className="text-sm text-muted-foreground/70 leading-relaxed font-light max-w-xs mx-auto">
                Access is restricted to authorized Bayzat team members only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Use Case Slider */}
      <div className="hidden lg:flex flex-1 bg-muted/20">
        <UseCaseSlider />
      </div>
    </div>
  )
}
