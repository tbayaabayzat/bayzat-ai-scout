
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

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
    <div className="space-y-6">
      {aiAnalysis?.automation_level?.overall && (
        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Overall Automation Score</h4>
            <Badge className={`${getAutomationScoreColor(aiAnalysis.automation_level.overall)} text-white`}>
              {getAutomationLabel(aiAnalysis.automation_level.overall)} ({aiAnalysis.automation_level.overall}/5)
            </Badge>
          </div>
          <Progress 
            value={aiAnalysis.automation_level.overall * 20} 
            className="h-3"
          />
        </div>
      )}

      {aiAnalysis?.automation_level && (
        <div className="space-y-4">
          <h4 className="font-medium">Department Breakdown</h4>
          <div className="space-y-3">
            {Object.entries(aiAnalysis.automation_level)
              .filter(([key]) => key !== 'overall')
              .map(([department, score]: [string, any]) => {
                console.log('Department:', department, 'Score:', score)
                // Ensure score is a number and not an object
                const numericScore = typeof score === 'number' ? score : 0
                return (
                  <div key={department} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {department.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-muted-foreground">{numericScore}/5</span>
                    </div>
                    <Progress 
                      value={numericScore * 20} 
                      className="h-2"
                    />
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {aiAnalysis?.automation_rationale && typeof aiAnalysis.automation_rationale === 'string' && (
        <div className="space-y-2">
          <h4 className="font-medium">Analysis Rationale</h4>
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aiAnalysis.automation_rationale}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
