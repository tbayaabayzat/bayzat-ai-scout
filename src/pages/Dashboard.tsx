import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, MessageCircle, Target } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { DashboardChatInterface } from "@/components/chat/DashboardChatInterface"
import { CompanyRequestForm } from "@/components/CompanyRequestForm"

export default function Dashboard() {

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

      <div className="space-y-6">
        <CompanyRequestForm />
        
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              AI Prospect Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 px-6 pb-6">
              <DashboardChatInterface />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
