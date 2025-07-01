
import { Badge } from "@/components/ui/badge"
import { QuickActionsBar } from "./QuickActionsBar"
import { CompanyInfoGrid } from "./CompanyInfoGrid"
import { EvidenceIndicator } from "./EvidenceIndicator"
import { extractNotableFactsEvidence } from "@/utils/evidenceUtils"

interface CompanyOverviewProps {
  company: any
  aiAnalysis: any
}

export function CompanyOverview({ company, aiAnalysis }: CompanyOverviewProps) {
  console.log('CompanyOverview - company:', company)
  console.log('CompanyOverview - aiAnalysis:', aiAnalysis)

  // Parse specialties if they exist
  let specialties = []
  if (company.specialities) {
    try {
      if (typeof company.specialities === 'string') {
        specialties = JSON.parse(company.specialties)
      } else if (Array.isArray(company.specialities)) {
        specialties = company.specialities
      }
    } catch (error) {
      console.log('Error parsing specialties:', error)
    }
  }

  // Extract notable facts evidence
  const notableFactsEvidence = extractNotableFactsEvidence(aiAnalysis)

  return (
    <div className="space-y-6">
      <QuickActionsBar company={company} />
      <CompanyInfoGrid company={company} />

      {company.description && (
        <div className="space-y-3">
          <h4 className="font-medium">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
          
          {specialties.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {specialties.map((specialty: string, index: number) => (
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
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Notable Facts</h4>
            {notableFactsEvidence.length > 0 && (
              <EvidenceIndicator evidence={notableFactsEvidence} label="Sources" size="sm" />
            )}
          </div>
          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <ul className="space-y-2">
              {aiAnalysis.other_notable_facts.map((fact: any, index: number) => {
                console.log('Notable fact:', fact, 'Type:', typeof fact)
                
                // Ensure we're working with the right data structure
                const factText = typeof fact === 'string' ? fact : (fact?.fact || 'Notable fact')
                const factEvidence = fact?.evidence || []
                
                return (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{factText}</span>
                        {factEvidence.length > 0 && (
                          <EvidenceIndicator 
                            evidence={factEvidence.map((item: any) => ({
                              employee: item.full_name || item.employee,
                              role: item.role,
                              description: item.quote || item.description,
                              linkedin_url: item.profile_url || item.linkedin_url,
                            }))} 
                            size="sm" 
                          />
                        )}
                      </div>
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
