import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Server, Users, Calculator, CreditCard, FileText, Clock, Package, Receipt } from "lucide-react"
import { EvidenceIndicator } from "./EvidenceIndicator"
import { extractSystemEvidence, processEvidence } from "@/utils/evidenceUtils"

interface SystemsInventoryProps {
  systems: any
}

export function SystemsInventory({ systems }: SystemsInventoryProps) {
  console.log('SystemsInventory - Full systems data:', JSON.stringify(systems, null, 2))

  if (!systems) {
    console.log('SystemsInventory - No systems data provided')
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No systems data available</p>
      </div>
    )
  }

  const getSystemIcon = (systemType: string) => {
    switch (systemType) {
      case 'ERP': return Server
      case 'HRIS': return Users
      case 'Accounting': return Calculator
      case 'Payroll': return CreditCard
      case 'AP_Automation': return FileText
      case 'Time_Attendance_Hardware': return Clock
      case 'Document_Management': return FileText
      case 'Expense_Management': return Receipt
      default: return Package
    }
  }

  const getSystemLabel = (systemType: string) => {
    return systemType.replace(/_/g, ' ')
  }

  const mainSystems = ['ERP', 'HRIS', 'Accounting', 'Payroll', 'AP_Automation', 'Document_Management', 'Expense_Management', 'Time_Attendance_Hardware']
  const otherSystemTypes = Object.keys(systems).filter(key => 
    !mainSystems.includes(key) && key !== 'Other_Software' && systems[key]?.name && systems[key].name !== 'None'
  )

  console.log('SystemsInventory - Main systems data:', mainSystems.map(sys => ({ [sys]: systems[sys] })))
  console.log('SystemsInventory - Other system types:', otherSystemTypes)

  return (
    <div className="space-y-6">
      {/* Main Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mainSystems.map((systemType) => {
          const system = systems[systemType]
          const SystemIcon = getSystemIcon(systemType)
          const hasSystem = system?.name && system.name !== 'None'
          const evidence = extractSystemEvidence(systems, systemType)
          
          console.log(`SystemsInventory - ${systemType}:`, system, 'hasSystem:', hasSystem)
          
          return (
            <Card key={systemType} className={`${hasSystem ? 'border-primary/20' : 'border-muted'}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <SystemIcon className={`h-4 w-4 ${hasSystem ? 'text-primary' : 'text-muted-foreground'}`} />
                  {getSystemLabel(systemType)}
                  <EvidenceIndicator evidence={evidence} size="sm" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Badge 
                    variant={hasSystem ? "default" : "outline"}
                    className="text-xs"
                  >
                    {system?.name || 'None'}
                  </Badge>
                  {evidence.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Evidence from {evidence.length} source{evidence.length > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Other Systems */}
      {otherSystemTypes.length > 0 && (
        <div className="space-y-3">
          <h5 className="font-medium text-sm text-muted-foreground">Other Systems</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {otherSystemTypes.map((systemType) => {
              const system = systems[systemType]
              const SystemIcon = getSystemIcon(systemType)
              const evidence = extractSystemEvidence(systems, systemType)
              
              return (
                <Card key={systemType} className="border-muted">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <SystemIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">{getSystemLabel(systemType)}</div>
                          <EvidenceIndicator evidence={evidence} size="sm" />
                        </div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {system.name}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Additional Software */}
      {systems.Other_Software && Array.isArray(systems.Other_Software) && systems.Other_Software.length > 0 && (
        <div className="space-y-3">
          <h5 className="font-medium text-sm text-muted-foreground">Additional Software</h5>
          <div className="flex flex-wrap gap-2">
            {systems.Other_Software.map((software: any, index: number) => (
              <div key={index} className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {typeof software === 'string' ? software : software?.name || `Software ${index + 1}`}
                </Badge>
                {typeof software === 'object' && software?.evidence && (
                  <EvidenceIndicator evidence={processEvidence(software.evidence)} size="sm" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
