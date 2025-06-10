
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Building2, Calendar } from "lucide-react"

export default function Employees() {
  const [searchTerm, setSearchTerm] = useState("")

  const { data: employees, isLoading } = useQuery({
    queryKey: ['employees', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('employee_profiles')
        .select('*')
        .limit(20)

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,headline.ilike.%${searchTerm}%,current_company_name.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Employee Profiles</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees?.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.profile_picture_url || undefined} />
                    <AvatarFallback>
                      {employee.full_name?.split(' ').map(n => n[0]).join('') || 'UN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{employee.full_name}</CardTitle>
                    <CardDescription>{employee.headline}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {employee.current_company_name && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{employee.current_company_name}</span>
                    </div>
                  )}
                  {employee.location_full && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{employee.location_full}</span>
                    </div>
                  )}
                  {employee.years_of_experience && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{employee.years_of_experience} years experience</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {employees && employees.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No employees found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or check back later.
          </p>
        </div>
      )}
    </div>
  )
}
