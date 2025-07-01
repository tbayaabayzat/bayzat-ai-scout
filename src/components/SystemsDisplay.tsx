
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MoreHorizontal } from "lucide-react"
import { EvidenceIndicator } from "./company-detail/EvidenceIndicator"
import { extractSystemEvidence } from "@/utils/evidenceUtils"

interface SystemsDisplayProps {
  systems: any
}

export function SystemsDisplay({ systems }: SystemsDisplayProps) {
  const prioritySystems = []
  const otherSystems = []

  if (!systems) return <span className="text-muted-foreground text-sm">No systems data</span>

  console.log('SystemsDisplay - systems structure:', systems)

  // Always show ERP, HRIS, and Accounting - with category names when "None"
  const erpName = systems.ERP?.name || 'None'
  const hrisName = systems.HRIS?.name || 'None'
  const accountingName = systems.Accounting?.name || 'None'

  // Format display text with category names when value is "None"
  const formatSystemDisplay = (categoryName: string, systemName: string) => {
    return systemName === 'None' ? `${categoryName}: None` : systemName
  }

  prioritySystems.push({ 
    name: formatSystemDisplay('ERP', erpName), 
    isNone: erpName === 'None',
    evidence: extractSystemEvidence(systems, 'ERP')
  })
  prioritySystems.push({ 
    name: formatSystemDisplay('HRIS', hrisName), 
    isNone: hrisName === 'None',
    evidence: extractSystemEvidence(systems, 'HRIS')
  })
  prioritySystems.push({ 
    name: formatSystemDisplay('Accounting', accountingName), 
    isNone: accountingName === 'None',
    evidence: extractSystemEvidence(systems, 'Accounting')
  })

  // Add other systems only if they have actual values (not "None")
  if (systems.Payroll?.name && systems.Payroll.name !== 'None') {
    otherSystems.push({
      name: systems.Payroll.name,
      evidence: extractSystemEvidence(systems, 'Payroll')
    })
  }
  
  if (systems.AP_Automation?.name && systems.AP_Automation.name !== 'None') {
    otherSystems.push({
      name: systems.AP_Automation.name,
      evidence: extractSystemEvidence(systems, 'AP_Automation')
    })
  }
  
  if (systems.Expense_Management?.name && systems.Expense_Management.name !== 'None') {
    otherSystems.push({
      name: systems.Expense_Management.name,
      evidence: extractSystemEvidence(systems, 'Expense_Management')
    })
  }
  
  if (systems.Document_Management?.name && systems.Document_Management.name !== 'None') {
    otherSystems.push({
      name: systems.Document_Management.name,
      evidence: extractSystemEvidence(systems, 'Document_Management')
    })
  }
  
  if (systems.Time_Attendance_Hardware?.name && systems.Time_Attendance_Hardware.name !== 'None') {
    otherSystems.push({
      name: systems.Time_Attendance_Hardware.name,
      evidence: extractSystemEvidence(systems, 'Time_Attendance_Hardware')
    })
  }

  // Add other software
  if (systems.Other_Software && Array.isArray(systems.Other_Software)) {
    systems.Other_Software.forEach((software: any, index: number) => {
      if (software.name) {
        otherSystems.push({
          name: software.name,
          evidence: processEvidence(software.evidence || [])
        })
      }
    })
  }

  const hasMoreSystems = otherSystems.length > 0

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {prioritySystems.map((system, index) => (
        <div key={index} className="flex items-center gap-1">
          <Badge 
            variant={system.isNone ? "outline" : "secondary"} 
            className={`text-xs ${system.isNone ? 'text-muted-foreground' : ''}`}
          >
            {system.name}
          </Badge>
          <EvidenceIndicator evidence={system.evidence} size="sm" />
        </div>
      ))}
      
      {hasMoreSystems && (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="outline" className="text-xs cursor-pointer gap-1">
              <MoreHorizontal className="h-3 w-3" />
              +{otherSystems.length}
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-64" align="start">
            <div>
              <h5 className="font-medium text-sm mb-2">Other Systems</h5>
              <div className="space-y-1">
                {otherSystems.map((system, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {system.name}
                    </Badge>
                    <EvidenceIndicator evidence={system.evidence} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  )
}
