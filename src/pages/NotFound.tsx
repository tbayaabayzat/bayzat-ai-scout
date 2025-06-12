
import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

const NotFound = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect old test-classification route to dashboard
  useEffect(() => {
    if (location.pathname === '/test-classification') {
      navigate('/dashboard', { replace: true })
    }
  }, [location.pathname, navigate])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-6xl font-bold text-muted-foreground mb-4">
              404
            </CardTitle>
            <CardTitle>Page Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button onClick={() => navigate(-1)} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
              <Button onClick={() => navigate('/dashboard')}>
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NotFound
