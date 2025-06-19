
import { useState, useEffect, createContext, useContext } from "react"
import { User, Session } from "@supabase/supabase-js"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface AuthContextType {
  user: User | null
  session: Session | null
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session)
        
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle authentication errors
        if (event === 'SIGNED_IN' && session?.user) {
          // Check if the user's email is from bayzat.com domain
          const email = session.user.email
          if (email && !email.endsWith('@bayzat.com')) {
            console.log('Invalid domain detected:', email)
            // Sign out the user immediately
            supabase.auth.signOut()
            toast({
              title: "Access Denied",
              description: "Access is restricted to Bayzat team members. Please use your @bayzat.com email address.",
              variant: "destructive"
            })
          }
        }
        
        if (event === 'SIGNED_OUT') {
          console.log('User signed out')
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [toast])

  const signOut = async () => {
    console.log('Signing out user');
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    signOut,
    loading
  }

  console.log('Auth context value:', { user: !!user, loading });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
