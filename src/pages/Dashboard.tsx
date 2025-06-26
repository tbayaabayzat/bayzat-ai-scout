
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, TrendingUp, Search, MessageCircle, Target } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { CompanyRequestForm } from "@/components/CompanyRequestForm"
import { ProspectInsights } from "@/components/ProspectInsights"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  const { data: totalCompanies } = useQuery({
    queryKey: ['total-companies'],
    queryFn: async () => {
      const { count } = await supabase
        .from('companies2')
        .select('*', { count: 'exact', head: true })
      return count || 0
    }
  })

  const { data: customerCount } = useQuery({
    queryKey: ['customer-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('companies2')
        .select('*', { count: 'exact', head: true })
        .eq('bayzat_relationship', 'customer')
      return count || 0
    }
  })

  const { data: prospectCount } = useQuery({
    queryKey: ['prospect-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('companies2')
        .select('*', { count: 'exact', head: true })
        .eq('bayzat_relationship', 'prospect')
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
      value: totalCompanies?.toLocaleString() || "Loading...",
      description: "In intelligence database",
      icon: Building2,
    },
    {
      title: "Active Prospects",
      value: prospectCount?.toLocaleString() || "Loading...",
      description: "Potential customers",
      icon: Target,
    },
    {
      title: "Current Customers", 
      value: customerCount?.toLocaleString() || "Loading...",
      description: "Bayzat clients",
      icon: Users,
    },
    {
      title: "Decision Makers",
      value: employeeCount?.toLocaleString() || "Loading...",
      description: "Key contacts profiled",
      icon: MessageCircle,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Prospect Intelligence Hub</h2>
          <p className="text-muted-foreground">
            AI-powered prospect discovery and relationship intelligence
          </p>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                AI Prospect Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] p-0">
              <div className="h-full px-6 pb-6">
                <ChatInterface />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <CompanyRequestForm />
          <ProspectInsights />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/companies')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Explore Companies
            </CardTitle>
            <CardDescription>
              Search and analyze companies with AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Browse Company Database
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/employees')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Decision Makers
            </CardTitle>
            <CardDescription>
              Find and connect with key stakeholders at target companies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Explore Profiles
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/research')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Market Research
            </CardTitle>
            <CardDescription>
              Deep-dive analysis and competitive intelligence tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Start Research
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
