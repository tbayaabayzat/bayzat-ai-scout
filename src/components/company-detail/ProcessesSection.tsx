
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Settings, Building2 } from "lucide-react"
import { DepartmentProcessCard } from "./DepartmentProcessCard"
import { SubProcessesGrid } from "./SubProcessesGrid"
import { EvidenceIndicator } from "./EvidenceIndicator"

interface ProcessesSectionProps {
  aiAnalysis: any
}

export function ProcessesSection({ aiAnalysis }: ProcessesSectionProps) {
  console.log('ProcessesSection - aiAnalysis:', aiAnalysis)

  const processesData = aiAnalysis?.processes_mentioned || {}
  const manualWorkIndicators = aiAnalysis?.manual_work_indicators || []

  // Extract department data
  const departments = Object.entries(processesData)
    .filter(([key]) => !['evidence', 'sub_processes'].includes(key))
    .map(([department, data]: [string, any]) => ({
      department,
      activities: data?.activities || [],
      evidence: data?.evidence || []
    }))

  const subProcesses = processesData?.sub_processes

  return (
    <div className="space-y-8">
      {/* Departmental Processes */}
      {departments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-semibold">Departmental Processes</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {departments.map(({ department, activities, evidence }) => (
              <DepartmentProcessCard
                key={department}
                department={department}
                activities={activities}
                evidence={evidence}
              />
            ))}
          </div>
        </div>
      )}

      {/* HR Sub-Processes */}
      {subProcesses && (
        <div className="space-y-4">
          <SubProcessesGrid subProcesses={subProcesses} />
        </div>
      )}

      {/* Manual Work Indicators */}
      {manualWorkIndicators.length > 0 && (
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Manual Work Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {manualWorkIndicators.map((indicator: any, index: number) => {
                const indicatorText = typeof indicator === 'string' ? indicator : (indicator?.indicator || 'Manual work indicator')
                const evidence = indicator?.evidence || []

                return (
                  <Card key={index} className="border-orange-200 bg-orange-50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-orange-800">{indicatorText}</p>
                          {indicator?.description && typeof indicator.description === 'string' && (
                            <p className="text-xs text-orange-600 mt-1">{indicator.description}</p>
                          )}
                        </div>
                        
                        {evidence.length > 0 && (
                          <div className="ml-3">
                            <EvidenceIndicator evidence={evidence} label="Evidence" size="sm" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {departments.length === 0 && !subProcesses && manualWorkIndicators.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Process Information Available</h3>
          <p className="text-sm">No process data has been analyzed for this company yet.</p>
        </div>
      )}
    </div>
  )
}
