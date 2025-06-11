
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SystemsInventory } from "./SystemsInventory"

interface AutomationSectionProps {
  aiAnalysis: any
}

export function AutomationSection({ aiAnalysis }: AutomationSectionProps) {
  console.log('AutomationSection - aiAnalysis:', aiAnalysis)

  const getAutomationScoreColor = (score: number) => {
    if (score >= 4) return "bg-green-500"
    if (score >= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getAutomationLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  return (
    <div className="space-y-8">
      {/* Overall Automation Score */}
      {aiAnalysis?.automation_level?.overall && (
        <div className="p-6 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Overall Automation Score</h4>
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

      {/* Analysis Rationale */}
      {aiAnalysis?.automation_rationale && typeof aiAnalysis.automation_rationale === 'string' && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Analysis Rationale</h4>
          <div className="p-4 bg-muted/30 rounded-lg border">
            <p className="text-sm text-foreground leading-relaxed">
              {aiAnalysis.automation_rationale}
            </p>
          </div>
        </div>
      )}

      {/* Systems Inventory */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Systems Inventory</h4>
        <SystemsInventory systems={aiAnalysis?.systems} />
      </div>

      {/* Department Breakdown */}
      {aiAnalysis?.automation_level && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Department Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(aiAnalysis.automation_level)
              .filter(([key]) => key !== 'overall')
              .map(([department, score]: [string, any]) => {
                console.log('Department:', department, 'Score:', score)
                // Ensure score is a number and not an object
                const numericScore = typeof score === 'number' ? score : 0
                return (
                  <div key={department} className="p-4 border rounded-lg bg-card">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium capitalize">
                        {department.replace('_', ' ')}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {numericScore}/5
                      </Badge>
                    </div>
                    <Progress 
                      value={numericScore * 20} 
                      className="h-3"
                    />
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
