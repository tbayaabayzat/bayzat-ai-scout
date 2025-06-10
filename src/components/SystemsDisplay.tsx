
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MoreHorizontal } from "lucide-react"

interface SystemsDisplayProps {
  systems: any
}

export function SystemsDisplay({ systems }: SystemsDisplayProps) {
  const prioritySystems = []
  const otherSystems = []

  if (!systems) return <span className="text-muted-foreground text-sm">No systems data</span>

  console.log('SystemsDisplay - systems structure:', systems)

  // Based on the schema, access systems properly
  if (systems.ERP?.name && systems.ERP.name !== 'None') {
    prioritySystems.push(systems.ERP.name)
  }
  
  if (systems.HRIS?.name && systems.HRIS.name !== 'None') {
    prioritySystems.push(systems.HRIS.name)
  }
  
  if (systems.Accounting?.name && systems.Accounting.name !== 'None') {
    prioritySystems.push(systems.Accounting.name)
  }

  // Add other systems
  if (systems.Payroll?.name && systems.Payroll.name !== 'None') {
    otherSystems.push(systems.Payroll.name)
  }
  
  if (systems.AP_Automation?.name && systems.AP_Automation.name !== 'None') {
    otherSystems.push(systems.AP_Automation.name)
  }
  
  if (systems.Expense_Management?.name && systems.Expense_Management.name !== 'None') {
    otherSystems.push(systems.Expense_Management.name)
  }
  
  if (systems.Document_Management?.name && systems.Document_Management.name !== 'None') {
    otherSystems.push(systems.Document_Management.name)
  }
  
  if (systems.Time_Attendance_Hardware?.name && systems.Time_Attendance_Hardware.name !== 'None') {
    otherSystems.push(systems.Time_Attendance_Hardware.name)
  }

  // Add other software
  if (systems.Other_Software && Array.isArray(systems.Other_Software)) {
    systems.Other_Software.forEach((software: any) => {
      if (software.name) {
        otherSystems.push(software.name)
      }
    })
  }

  const hasMoreSystems = otherSystems.length > 0

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {prioritySystems.map((system, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {system}
        </Badge>
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
              <div className="flex flex-wrap gap-1">
                {otherSystems.map((system, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {system}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      
      {prioritySystems.length === 0 && !hasMoreSystems && (
        <span className="text-muted-foreground text-sm">No systems detected</span>
      )}
    </div>
  )
}
