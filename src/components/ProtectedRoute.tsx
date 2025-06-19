
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  
  // Check for development bypass parameter
  const isDev = searchParams.get('dev') === 'true'

  console.log('ProtectedRoute - User:', user, 'Loading:', loading, 'isDev:', isDev);

  useEffect(() => {
    if (!loading && !user && !isDev) {
      console.log('User not authenticated, redirecting to auth');
      navigate("/auth")
    }
  }, [user, loading, navigate, isDev])

  if (loading && !isDev) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-lg text-foreground">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (!user && !isDev) {
    return null
  }

  return <>{children}</>
}
