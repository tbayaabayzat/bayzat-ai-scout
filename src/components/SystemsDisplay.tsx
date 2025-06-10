
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

  // Prioritize ERP, HRIS, Accounting
  if (systems.has_erp) prioritySystems.push("ERP")
  if (systems.has_hris) prioritySystems.push("HRIS")
  if (systems.accounting_software) prioritySystems.push(systems.accounting_software)

  // Add other systems
  if (systems.has_crm) otherSystems.push("CRM")
  if (systems.payroll_software) otherSystems.push(systems.payroll_software)
  if (systems.project_management_tools) otherSystems.push(...systems.project_management_tools)
  if (systems.communication_tools) otherSystems.push(...systems.communication_tools)

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
