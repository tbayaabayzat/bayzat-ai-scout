
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, TrendingUp, Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export default function Dashboard() {
  const { data: companyCount } = useQuery({
    queryKey: ['company-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('companies2')
        .select('*', { count: 'exact', head: true })
      return count || 0
    }
  })

  const { data: employeeCount } = useQuery({
    queryKey: ['employee-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('employee_profiles')
        .select('*', { count: 'exact', head: true })
      return count || 0
    }
  })

  const stats = [
    {
      title: "Total Companies",
      value: companyCount?.toLocaleString() || "Loading...",
      description: "Companies in database",
      icon: Building2,
    },
    {
      title: "Employee Profiles",
      value: employeeCount?.toLocaleString() || "Loading...",
      description: "LinkedIn profiles analyzed",
      icon: Users,
    },
    {
      title: "Research Tools",
      value: "5",
      description: "AI-powered features",
      icon: Search,
    },
    {
      title: "Success Rate",
      value: "92%",
      description: "Prospect engagement",
      icon: TrendingUp,
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sales Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Welcome to Bayzat Sales Hub
          </span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for sales research and prospecting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-accent transition-colors cursor-pointer">
                <Building2 className="h-6 w-6" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Search Companies
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Find and research target companies
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4 hover:bg-accent transition-colors cursor-pointer">
                <Users className="h-6 w-6" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Find Prospects
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Discover key decision makers
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest research and prospecting activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New profiles added</p>
                  <p className="text-sm text-muted-foreground">
                    25 LinkedIn profiles analyzed today
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Company research</p>
                  <p className="text-sm text-muted-foreground">
                    15 new companies added to database
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
