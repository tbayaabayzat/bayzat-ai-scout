
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Building2, Calendar, Mail } from "lucide-react"
import { SmartSearch } from "@/components/SmartSearch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees', searchTerm, selectedFilter],
    queryFn: async () => {
      let query = supabase
        .from('employee_profiles')
        .select('*')
        .limit(50)

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

  const getSeniorityLevel = (headline: string, experience: number): { label: string; color: "default" | "destructive" | "outline" | "secondary" } => {
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

  const getNetworkStrength = (connections: number): { label: string; color: "default" | "destructive" | "outline" | "secondary" } => {
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

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employee Profiles</h2>
          <p className="text-muted-foreground">
            Find and connect with key decision makers and influencers
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="h-4 w-4 mr-2" />
          Create Outreach Campaign
        </Button>
      </div>

      <SmartSearch
        placeholder="Find decision makers, IT leaders, or specific roles..."
        onSearch={setSearchTerm}
        onFilterSelect={setSelectedFilter}
        filters={aiFilters}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Seniority</TableHead>
                <TableHead>Network</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.map((employee) => {
                const seniority = getSeniorityLevel(employee.headline, employee.years_of_experience)
                const networkStrength = getNetworkStrength(employee.connection_count || 0)

                return (
                  <TableRow key={employee.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={employee.profile_picture_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {employee.full_name?.split(' ').map(n => n[0]).join('') || 'UN'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{employee.full_name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm">
                        {employee.headline}
                      </div>
                    </TableCell>
                    <TableCell>
                      {employee.current_company_name && (
                        <div className="flex items-center space-x-1">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{employee.current_company_name}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {employee.location_full && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{employee.location_full}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {employee.years_of_experience && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{employee.years_of_experience} years</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {employee.department || 'Other'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={seniority.color} className="text-xs">
                        {seniority.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={networkStrength.color} className="text-xs">
                          {networkStrength.label}
                        </Badge>
                        {employee.connection_count && (
                          <div className="text-xs text-muted-foreground">
                            {employee.connection_count} connections
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button size="sm" variant="outline" className="text-xs">
                          View Profile
                        </Button>
                        <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                          Connect
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {employees && employees.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No employees found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  )
}
