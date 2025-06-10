
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building2, Calendar, Mail, Users, TrendingUp, Target } from "lucide-react"
import { SmartSearch } from "@/components/SmartSearch"
import { AIInsights } from "@/components/AIInsights"

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees', searchTerm, selectedFilter],
    queryFn: async () => {
      let query = supabase
        .from('employee_profiles')
        .select('*')
        .limit(20)

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,headline.ilike.%${searchTerm}%,current_company_name.ilike.%${searchTerm}%`)
      }

      // Apply AI-powered filters
      if (selectedFilter === "Decision Makers") {
        query = query.or('headline.ilike.%director%,headline.ilike.%manager%,headline.ilike.%head%,headline.ilike.%vp%,headline.ilike.%chief%')
      } else if (selectedFilter === "IT Leaders") {
        query = query.or('headline.ilike.%technology%,headline.ilike.%software%,headline.ilike.%engineering%,headline.ilike.%IT%')
      } else if (selectedFilter === "High Network") {
        query = query.gte('connection_count', 500)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    }
  })

  const getSeniorityLevel = (headline: string, experience: number) => {
    const title = headline?.toLowerCase() || ""
    const years = experience || 0
    
    if (title.includes('chief') || title.includes('ceo') || title.includes('cto') || title.includes('cfo')) {
      return { label: "C-Level", color: "default" }
    }
    if (title.includes('director') || title.includes('vp') || title.includes('vice president')) {
      return { label: "Director+", color: "secondary" }
    }
    if (title.includes('manager') || title.includes('head') || title.includes('lead') || years >= 8) {
      return { label: "Manager", color: "outline" }
    }
    return { label: "Individual", color: "outline" }
  }

  const getNetworkStrength = (connections: number) => {
    if (connections >= 1000) return { label: "High", color: "default" }
    if (connections >= 500) return { label: "Medium", color: "secondary" }
    return { label: "Low", color: "outline" }
  }

  const aiFilters = [
    "Decision Makers",
    "IT Leaders",
    "High Network",
    "Recent Job Changes",
    "Growing Companies"
  ]

  const employeeInsights = [
    {
      icon: <Target className="h-4 w-4" />,
      title: "Decision Makers",
      description: "C-level and director-level contacts",
      value: "23%",
      trend: "up" as const,
      color: "default" as const
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "High Network Value",
      description: "Professionals with 500+ connections",
      value: "156",
      trend: "stable" as const,
      color: "secondary" as const
    },
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "IT Decision Makers",
      description: "Technology leaders and managers",
      value: "89",
      trend: "up" as const,
      color: "default" as const
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Recent Role Changes",
      description: "New positions in last 6 months",
      value: "34",
      trend: "up" as const,
      color: "default" as const
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employee Profiles</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="h-4 w-4 mr-2" />
          Create Outreach Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <SmartSearch
            placeholder="Find decision makers, IT leaders, or specific roles..."
            onSearch={setSearchTerm}
            onFilterSelect={setSelectedFilter}
            filters={aiFilters}
          />

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-32"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {employees?.map((employee) => {
                const seniority = getSeniorityLevel(employee.headline, employee.years_of_experience)
                const networkStrength = getNetworkStrength(employee.connection_count || 0)

                return (
                  <Card key={employee.id} className="hover:shadow-md transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.profile_picture_url || undefined} />
                          <AvatarFallback>
                            {employee.full_name?.split(' ').map(n => n[0]).join('') || 'UN'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {employee.full_name}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {employee.headline}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Badge variant={seniority.color} className="text-xs">
                            {seniority.label}
                          </Badge>
                          <Badge variant={networkStrength.color} className="text-xs">
                            {networkStrength.label} Network
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {employee.current_company_name && (
                          <div className="flex items-center space-x-2 text-sm">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{employee.current_company_name}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          {employee.location_full && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{employee.location_full}</span>
                            </div>
                          )}
                          {employee.years_of_experience && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{employee.years_of_experience} years</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex flex-wrap gap-1">
                            {employee.connection_count && (
                              <Badge variant="outline" className="text-xs">
                                {employee.connection_count} connections
                              </Badge>
                            )}
                            {employee.is_premium && (
                              <Badge variant="secondary" className="text-xs">
                                Premium
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              View Profile
                            </Button>
                            <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                              Connect
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {employees && employees.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No employees found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <AIInsights insights={employeeInsights} title="Contact Intelligence" />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Smart Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Find Decision Makers
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Build Contact Lists
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Track Job Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
