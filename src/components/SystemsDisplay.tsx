
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { MoreHorizontal, Check, X } from "lucide-react"

interface SystemsDisplayProps {
  systems: any
  has_erp?: boolean
  has_hris?: boolean
  has_accounting?: boolean
  has_payroll?: boolean
}

export function SystemsDisplay({ 
  systems, 
  has_erp, 
  has_hris, 
  has_accounting, 
  has_payroll 
}: SystemsDisplayProps) {
  const prioritySystems = []
  const otherSystems = []

  console.log('SystemsDisplay - systems structure:', systems)
  console.log('SystemsDisplay - system flags:', { has_erp, has_hris, has_accounting, has_payroll })

  // Primary systems with status indicators
  const primarySystemsConfig = [
    { key: 'ERP', hasSystem: has_erp, name: systems?.ERP?.name },
    { key: 'HRIS', hasSystem: has_hris, name: systems?.HRIS?.name },
    { key: 'Accounting', hasSystem: has_accounting, name: systems?.Accounting?.name },
    { key: 'Payroll', hasSystem: has_payroll, name: systems?.Payroll?.name }
  ]

  primarySystemsConfig.forEach(({ key, hasSystem, name }) => {
    const systemName = name && name !== 'None' ? name : key
    const displayName = hasSystem ? systemName : `${key}: None`
    
    prioritySystems.push({ 
      name: displayName, 
      hasSystem: hasSystem || false,
      isNone: !hasSystem || name === 'None'
    })
  })

  // Add other systems only if they have actual values (not "None")
  if (systems) {
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
  }

  const hasMoreSystems = otherSystems.length > 0

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {prioritySystems.map((system, index) => (
        <Badge 
          key={index} 
          variant={system.hasSystem ? "default" : "outline"} 
          className={`text-xs flex items-center gap-1 ${
            system.hasSystem 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'text-muted-foreground border-muted'
          }`}
        >
          {system.hasSystem ? (
            <Check className="h-3 w-3" />
          ) : (
            <X className="h-3 w-3" />
          )}
          {system.name}
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
    </div>
  )
}
