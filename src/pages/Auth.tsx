
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { BayzatLogo } from "@/components/BayzatLogo"

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSignUp) {
      if (!email || !password || !fullName) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        })
        return
      }

      setLoading(true)
      const { error } = await signUp(email, password, fullName)
      
      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Unable to create account",
            description: error.message,
            variant: "destructive"
          })
        }
      } else {
        toast({
          title: "Account created",
          description: "Please check your email to verify your account"
        })
      }
      setLoading(false)
    } else {
      if (!email || !password) {
        toast({
          title: "Missing information",
          description: "Please enter both email and password",
          variant: "destructive"
        })
        return
      }

      setLoading(true)
      const { error } = await signIn(email, password)
      
      if (error) {
        toast({
          title: "Unable to sign in",
          description: error.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Welcome back",
          description: "You've been signed in successfully"
        })
        navigate("/dashboard")
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-12">
        {/* Logo */}
        <div className="flex justify-center">
          <BayzatLogo width={120} height={40} />
        </div>

        {/* Main Content */}
        <div className="space-y-8 text-center">
          {/* Hero Text */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight">
              Your sales,
              <br />
              amplified
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Intelligence-first platform that helps you sell with confidence.
            </p>
          </div>

          {/* Auth Form */}
          <div className="space-y-6">
            {/* Toggle */}
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "New to Bayzat?"}{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 text-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="sr-only">
                    Full name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 text-base"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your personal or work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Create a secure password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 text-base"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-medium text-base rounded-lg" 
                disabled={loading}
              >
                {loading 
                  ? (isSignUp ? "Creating account..." : "Signing in...") 
                  : (isSignUp ? "Continue with email" : "Continue with email")
                }
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to Bayzat's{" "}
            <button className="underline hover:text-foreground">Consumer Terms</button>{" "}
            and{" "}
            <button className="underline hover:text-foreground">Usage Policy</button>,{" "}
            and acknowledge our{" "}
            <button className="underline hover:text-foreground">Privacy Policy</button>.
          </div>
        </div>
      </div>
    </div>
  )
}
