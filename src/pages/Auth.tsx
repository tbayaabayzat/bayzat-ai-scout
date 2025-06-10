
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
                <Button 
                  onClick={handleGoogleSignIn}
                  className="w-full h-14 bg-bayzat-purple hover:bg-bayzat-purple/90 text-white font-medium text-base rounded-xl transition-all duration-200 shadow-sm hover:shadow-md" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Continue with Google"}
                </Button>
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
