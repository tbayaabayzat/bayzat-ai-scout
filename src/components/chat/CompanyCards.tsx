
import { Building2, Users, Globe, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CompanyCardData } from "@/types/chat"

interface CompanyCardsProps {
  companies: CompanyCardData[]
  onCompanyClick: (company: CompanyCardData) => void
}

export function CompanyCards({ companies, onCompanyClick }: CompanyCardsProps) {
  const getRelationshipColor = (relationship: string) => {
    switch (relationship?.toLowerCase()) {
      case 'client': return 'bg-green-100 text-green-800'
      case 'prospect': return 'bg-blue-100 text-blue-800'
      case 'partner': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAutomationScoreColor = (score: number) => {
    if (score >= 4) return "bg-bayzat-pink"
    if (score >= 3) return "bg-bayzat-purple"
    return "bg-bayzat-dark-purple"
  }

  const getAutomationLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-4">
      {companies.map((company) => (
        <Card key={company.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {company.logo_url ? (
                  <img 
                    src={company.logo_url} 
                    alt={`${company.company_name} logo`}
                    className="w-8 h-8 rounded object-contain flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <Building2 className={`w-8 h-8 text-muted-foreground ${company.logo_url ? 'hidden' : ''}`} />
                <CardTitle className="text-sm font-medium leading-tight truncate">
                  {company.company_name}
                </CardTitle>
              </div>
              <Badge className={`text-xs ${getRelationshipColor(company.bayzat_relationship)}`}>
                {company.bayzat_relationship}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 space-y-3">
            {company.industry && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{company.industry}</span>
              </div>
            )}
            
            {company.employee_count && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>{company.employee_count} employees</span>
              </div>
            )}
            
            {company.automation_overall !== undefined && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span>Automation</span>
                </div>
                <Badge className={`text-xs ${getAutomationScoreColor(company.automation_overall)} text-white`}>
                  {getAutomationLabel(company.automation_overall)} ({company.automation_overall.toFixed(1)})
                </Badge>
              </div>
            )}
            
            {company.location && (
              <div className="text-xs text-muted-foreground truncate">
                📍 {company.location}
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => onCompanyClick(company)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
