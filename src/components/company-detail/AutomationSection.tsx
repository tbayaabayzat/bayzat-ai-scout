
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { SystemsInventory } from "./SystemsInventory"
import { formatDepartmentName, sortDepartments } from "@/utils/departmentUtils"

interface AutomationSectionProps {
  aiAnalysis: any
}

export function AutomationSection({ aiAnalysis }: AutomationSectionProps) {
  console.log('AutomationSection - aiAnalysis:', aiAnalysis)

  const getAutomationScoreColor = (score: number) => {
    if (score >= 4) return "bg-bayzat-pink"
    if (score >= 3) return "bg-bayzat-purple"
    return "bg-bayzat-dark-purple"
  }

  const getAutomationLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  // Filter out non-department fields from automation_level and format/sort departments
  const departmentScores = aiAnalysis?.automation_level ? 
    sortDepartments(
      Object.entries(aiAnalysis.automation_level)
        .filter(([key]) => !['overall', 'evidence', 'automation_rationale'].includes(key))
        .map(([department, score]: [string, any]) => ({
          department: formatDepartmentName(department),
          score: typeof score === 'number' ? score : 0
        }))
    ) : []

  // Get automation rationale from the correct path
  const automationRationale = aiAnalysis?.automation_level?.automation_rationale

  return (
    <div className="space-y-8">
      {/* Automation Scores Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Automation Scores</h3>
        
        {/* Overall Score */}
        {aiAnalysis?.automation_level?.overall && (
          <div className="p-6 border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-semibold text-foreground">Overall Automation Score</h4>
                {aiAnalysis?.automation_level?.evidence && aiAnalysis.automation_level.evidence.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="text-xs">Evidence available for overall score</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <Badge className={`${getAutomationScoreColor(aiAnalysis.automation_level.overall)} text-white px-3 py-1`}>
                {getAutomationLabel(aiAnalysis.automation_level.overall)} ({aiAnalysis.automation_level.overall}/5)
              </Badge>
            </div>
            <Progress 
              value={aiAnalysis.automation_level.overall * 20} 
              className="h-4"
            />
          </div>
        )}

        {/* Department Scores and Rationale Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Breakdown - Vertical Bars */}
          {departmentScores.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Department Breakdown</h4>
              <div className="space-y-4">
                {departmentScores.map(({ department, score }) => (
                  <div key={department} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{department}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="max-w-xs">
                                <p className="text-xs">Evidence available for {department} automation</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getAutomationScoreColor(score)} text-white border-none`}
                      >
                        {score}/5
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getAutomationScoreColor(score)}`}
                        style={{ width: `${score * 20}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Rationale */}
          {automationRationale && typeof automationRationale === 'string' && (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Analysis Rationale</h4>
              <div className="p-4 bg-muted/30 rounded-lg border">
                <p className="text-sm text-foreground leading-relaxed">
                  {automationRationale}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Systems Inventory Section */}
      <div className="space-y-4 border-t pt-8">
        <h3 className="text-xl font-semibold text-foreground">Systems Inventory</h3>
        <SystemsInventory systems={aiAnalysis?.systems} />
      </div>
    </div>
  )
}
