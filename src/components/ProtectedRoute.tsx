
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

  useEffect(() => {
    if (!loading && !user && !isDev) {
      navigate("/auth")
    }
  }, [user, loading, navigate, isDev])

  if (loading && !isDev) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user && !isDev) {
    return null
  }

  return <>{children}</>
}
