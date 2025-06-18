
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, Search, BarChart3, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function DevMenu() {
  const navigate = useNavigate()

  const devPages = [
    {
      title: "Dashboard",
      description: "Sales analytics and overview",
      icon: BarChart3,
      path: "/dashboard?dev=true"
    },
    {
      title: "Companies",
      description: "Company database and research",
      icon: Building2,
      path: "/companies?dev=true"
    },
    {
      title: "Employees",
      description: "Employee profiles and contacts",
      icon: Users,
      path: "/employees?dev=true"
    },
    {
      title: "Research",
      description: "AI-powered research tools",
      icon: Search,
      path: "/research?dev=true"
    }
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Home className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-4xl font-bold">Development Menu</h1>
          <p className="text-xl text-muted-foreground">
            Direct access to all pages (bypasses authentication for development)
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {devPages.map((page, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(page.path)}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <page.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{page.title}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Access {page.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access URLs</CardTitle>
            <CardDescription>
              You can also navigate directly to these URLs:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm font-mono">
              {devPages.map((page, index) => (
                <div key={index} className="p-2 bg-muted rounded">
                  {page.path}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
