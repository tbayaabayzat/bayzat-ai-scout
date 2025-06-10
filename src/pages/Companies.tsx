
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Users, Zap, Mail, TrendingUp, AlertTriangle } from "lucide-react"
import { SmartSearch } from "@/components/SmartSearch"
import { AIInsights } from "@/components/AIInsights"

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter],
    queryFn: async () => {
      let query = supabase
        .from('companies2')
        .select('*')
        .limit(20)

      if (searchTerm) {
        query = query.or(`company_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`)
      }

      // Apply AI-powered filters
      if (selectedFilter === "Legacy Systems") {
        query = query.lt('founded_year', 2015)
      } else if (selectedFilter === "High Manual Work") {
        query = query.contains('ai_analysis', { automation_score_overall: { range: [0, 3] } })
      } else if (selectedFilter === "Missing HRIS") {
        query = query.contains('ai_analysis', { systems_inventory: { has_hris: false } })
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    }
  })

  const getAutomationScore = (company: any) => {
    return company.ai_analysis?.automation_score_overall || 0
  }

  const getAutomationLevel = (score: number): { label: string; color: "default" | "destructive" | "outline" | "secondary" } => {
    if (score >= 4) return { label: "High", color: "default" }
    if (score >= 2) return { label: "Medium", color: "secondary" }
    return { label: "Low", color: "destructive" }
  }

  const getSystemsUsed = (company: any) => {
    const systems = company.ai_analysis?.systems_inventory || {}
    const activeSystems = []
    
    if (systems.has_erp) activeSystems.push("ERP")
    if (systems.has_crm) activeSystems.push("CRM")
    if (systems.has_hris) activeSystems.push("HRIS")
    if (systems.accounting_software) activeSystems.push(systems.accounting_software)
    
    return activeSystems.slice(0, 3) // Show max 3 systems
  }

  const aiFilters = [
    "Legacy Systems",
    "High Manual Work", 
    "Missing HRIS",
    "Growth Companies",
    "Modern Tech Stack"
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="h-4 w-4 mr-2" />
          Draft Outreach
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <SmartSearch
            placeholder="Ask about companies, systems, or opportunities..."
            onSearch={setSearchTerm}
            onFilterSelect={setSelectedFilter}
            filters={aiFilters}
          />

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2">
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
            <div className="grid gap-4 md:grid-cols-2">
              {companies?.map((company) => {
                const automationScore = getAutomationScore(company)
                const automationLevel = getAutomationLevel(automationScore)
                const systemsUsed = getSystemsUsed(company)

                return (
                  <Card key={company.id} className="hover:shadow-md transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {company.company_name}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          {company.industry && (
                            <Badge variant="outline" className="text-xs">
                              {company.industry}
                            </Badge>
                          )}
                          <Badge variant={automationLevel.color} className="text-xs">
                            {automationLevel.label} Auto
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {company.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          {company.headquarter && (
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{typeof company.headquarter === 'string' ? company.headquarter : JSON.stringify(company.headquarter)}</span>
                            </div>
                          )}
                          {company.employee_count && (
                            <div className="flex items-center space-x-2 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              <span>{company.employee_count.toLocaleString()}</span>
                            </div>
                          )}
                        </div>

                        {systemsUsed.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-medium text-muted-foreground">Systems:</span>
                            {systemsUsed.map((system, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Automation Score: {automationScore.toFixed(1)}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="text-xs">
                              AI Analysis
                            </Button>
                            <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                              Contact
                            </Button>
                          </div>
                        </div>

                        {company.website_url && (
                          <div className="text-sm border-t pt-2">
                            <a 
                              href={company.website_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {company.website_url}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {companies && companies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No companies found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <AIInsights />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Find Growth Companies
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Legacy System Alerts
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Automation Opportunities
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
