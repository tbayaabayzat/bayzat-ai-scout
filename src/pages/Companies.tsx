
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Building2, MapPin, Users } from "lucide-react"

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("")

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('companies2')
        .select('*')
        .limit(20)

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    }
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search companies..."
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
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
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
          {companies?.map((company) => (
            <Card key={company.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                  </div>
                  {company.industry && (
                    <Badge variant="secondary" className="text-xs">
                      {company.industry}
                    </Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {company.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {company.location && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{company.location}</span>
                    </div>
                  )}
                  {company.employee_count && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{company.employee_count.toLocaleString()} employees</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="text-sm">
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {companies && companies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No companies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or check back later.
          </p>
        </div>
      )}
    </div>
  )
}
