
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Building2 } from "lucide-react"
import { DepartmentProcessCard } from "./DepartmentProcessCard"
import { SubProcessesGrid } from "./SubProcessesGrid"
import { useRowExpansion } from "@/hooks/useRowExpansion"
import { sortDepartments } from "@/utils/departmentUtils"

interface ProcessesSectionProps {
  aiAnalysis: any
}

export function ProcessesSection({ aiAnalysis }: ProcessesSectionProps) {
  console.log('ProcessesSection - aiAnalysis:', aiAnalysis)

  const processesData = aiAnalysis?.processes_mentioned || {}
  const manualWorkIndicators = aiAnalysis?.manual_work_indicators || []

  // Extract and sort department data with proper structure including activities and evidence
  const departments = sortDepartments(
    Object.entries(processesData)
      .filter(([key]) => !['evidence', 'sub_processes'].includes(key))
      .map(([department, data]: [string, any]) => ({
        department,
        activities: data?.activities || [],
        evidence: data?.evidence || [],
        score: 0 // placeholder for sorting
      }))
  )

  // Use row expansion hook for departments
  const { isItemExpanded, toggleRow } = useRowExpansion(departments, 2)

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
            {departments.map((dept, index) => (
              <DepartmentProcessCard
                key={dept.department}
                department={dept.department}
                activities={dept.activities}
                evidence={[]} // Temporarily disabled
                isOpen={isItemExpanded(index)}
                onToggle={() => toggleRow(index)}
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
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Notable Manual Work Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {manualWorkIndicators.map((indicator: any, index: number) => {
                const indicatorText = typeof indicator === 'string' ? indicator : (indicator?.indicator || 'Manual work indicator')

                return (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-1">{indicatorText}</p>
                        {indicator?.description && typeof indicator.description === 'string' && (
                          <p className="text-xs text-muted-foreground">{indicator.description}</p>
                        )}
                      </div>
                      
                      {/* Evidence temporarily disabled */}
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded bg-muted opacity-50" />
                      </div>
                    </div>
                  </div>
                )
              })}
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
