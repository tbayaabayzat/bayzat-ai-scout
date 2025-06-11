
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Building2 } from "lucide-react"
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
            <Building2 className="h-5 w-5 text-muted-foreground" />
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-muted-foreground" />
              Manual Work Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="space-y-3">
                {manualWorkIndicators.map((indicator: any, index: number) => {
                  const indicatorText = typeof indicator === 'string' ? indicator : (indicator?.indicator || 'Manual work indicator')
                  const evidence = indicator?.evidence || []

                  return (
                    <div key={index} className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm">{indicatorText}</p>
                        </div>
                        {indicator?.description && typeof indicator.description === 'string' && (
                          <p className="text-xs text-muted-foreground mt-1 ml-4">{indicator.description}</p>
                        )}
                      </div>
                      
                      {evidence.length > 0 && (
                        <div className="flex-shrink-0">
                          <EvidenceIndicator evidence={evidence} label="Evidence" size="sm" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {departments.length === 0 && !subProcesses && manualWorkIndicators.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Process Information Available</h3>
          <p className="text-sm">No process data has been analyzed for this company yet.</p>
        </div>
      )}
    </div>
  )
}
