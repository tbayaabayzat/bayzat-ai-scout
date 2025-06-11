
import { Badge } from "@/components/ui/badge"
import { QuickActionsBar } from "./QuickActionsBar"
import { CompanyInfoGrid } from "./CompanyInfoGrid"

interface CompanyOverviewProps {
  company: any
  aiAnalysis: any
}

export function CompanyOverview({ company, aiAnalysis }: CompanyOverviewProps) {
  console.log('CompanyOverview - company:', company)
  console.log('CompanyOverview - aiAnalysis:', aiAnalysis)

  return (
    <div className="space-y-6">
      <QuickActionsBar company={company} />
      <CompanyInfoGrid company={company} />

      {company.description && (
        <div className="space-y-3">
          <h4 className="font-medium">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
          
          {company.specialities && Array.isArray(company.specialities) && company.specialities.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {company.specialities.map((specialty: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {aiAnalysis?.other_notable_facts && Array.isArray(aiAnalysis.other_notable_facts) && aiAnalysis.other_notable_facts.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Notable Facts</h4>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <ul className="space-y-2">
              {aiAnalysis.other_notable_facts.map((fact: any, index: number) => {
                console.log('Notable fact:', fact, 'Type:', typeof fact)
                
                // Ensure we're working with the right data structure
                const factText = typeof fact === 'string' ? fact : (fact?.fact || 'Notable fact')
                
                return (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <div className="flex-1">
                      <span className="text-sm">{factText}</span>
                      {fact?.evidence && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Evidence
                        </Badge>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
