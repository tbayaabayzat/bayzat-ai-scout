
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { SystemsDisplay } from "@/components/SystemsDisplay"
import { QuickActionsBar } from "./QuickActionsBar"
import { CompanyInfoGrid } from "./CompanyInfoGrid"

interface CompanyOverviewProps {
  company: any
  aiAnalysis: any
}

export function CompanyOverview({ company, aiAnalysis }: CompanyOverviewProps) {
  return (
    <div className="space-y-6">
      <QuickActionsBar company={company} />
      <CompanyInfoGrid company={company} />

      {company.description && (
        <div className="space-y-2">
          <h4 className="font-medium">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium">Systems</h4>
        <SystemsDisplay systems={aiAnalysis?.systems} />
      </div>

      {aiAnalysis?.other_notable_facts && Array.isArray(aiAnalysis.other_notable_facts) && aiAnalysis.other_notable_facts.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Notable Facts</h4>
          <div className="space-y-2">
            {aiAnalysis.other_notable_facts.map((fact: any, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                <div className="flex-1">
                  <p className="text-sm">{typeof fact === 'string' ? fact : fact.fact || 'Notable fact'}</p>
                  {fact.evidence && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      Evidence available
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
