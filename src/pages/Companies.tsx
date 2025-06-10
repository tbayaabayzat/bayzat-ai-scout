
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Users, Crown, Mail } from "lucide-react"
import { SmartSearch } from "@/components/SmartSearch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter],
    queryFn: async () => {
      let query = supabase
        .from('companies2')
        .select('*')
        .limit(50)

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
      } else if (selectedFilter === "Customers Only") {
        query = query.eq('bayzat_relationship', 'customer')
      } else if (selectedFilter === "Prospects Only") {
        query = query.eq('bayzat_relationship', 'prospect')
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
    
    return activeSystems.slice(0, 2)
  }

  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case 'customer':
        return <Badge variant="default" className="bg-green-500 text-white"><Crown className="h-3 w-3 mr-1" />Customer</Badge>
      case 'partner':
        return <Badge variant="secondary"><Users className="h-3 w-3 mr-1" />Partner</Badge>
      case 'prospect':
      default:
        return <Badge variant="outline">Prospect</Badge>
    }
  }

  const aiFilters = [
    "Legacy Systems",
    "High Manual Work", 
    "Missing HRIS",
    "Growth Companies",
    "Modern Tech Stack",
    "Customers Only",
    "Prospects Only"
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Intelligence</h2>
          <p className="text-muted-foreground">
            Discover and analyze companies with AI-powered insights
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="h-4 w-4 mr-2" />
          Draft Outreach
        </Button>
      </div>

      <SmartSearch
        placeholder="Ask about companies, systems, or opportunities..."
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
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Employees</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Automation</TableHead>
                <TableHead>Systems</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies?.map((company) => {
                const automationScore = getAutomationScore(company)
                const automationLevel = getAutomationLevel(automationScore)
                const systemsUsed = getSystemsUsed(company)

                return (
                  <TableRow key={company.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{company.company_name}</div>
                          {company.website_url && (
                            <div className="text-sm text-muted-foreground">
                              <a 
                                href={company.website_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary"
                              >
                                {company.website_url.replace(/^https?:\/\//, '')}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {company.industry && (
                        <Badge variant="outline" className="text-xs">
                          {company.industry}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {company.headquarter && (
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{typeof company.headquarter === 'string' ? company.headquarter : JSON.stringify(company.headquarter)}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {company.employee_count && (
                        <div className="flex items-center space-x-1 text-sm">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span>{company.employee_count.toLocaleString()}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {getRelationshipBadge(company.bayzat_relationship)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={automationLevel.color} className="text-xs">
                        {automationLevel.label} ({automationScore.toFixed(1)})
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {systemsUsed.map((system, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {system}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button size="sm" variant="outline" className="text-xs">
                          Analyze
                        </Button>
                        <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
                          Contact
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
  )
}
