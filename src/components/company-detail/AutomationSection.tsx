
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp, Database, Shield } from "lucide-react"

interface AutomationSectionProps {
  aiAnalysis: any
}

export function AutomationSection({ aiAnalysis }: AutomationSectionProps) {
  console.log('AutomationSection - aiAnalysis:', aiAnalysis)

  if (!aiAnalysis) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No automation analysis available</p>
      </div>
    )
  }

  const overallScore = aiAnalysis.automation_overall_score || 0
  const automationLevel = aiAnalysis.automation_level || {}

  const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-automation-high text-white"
    if (score >= 3) return "bg-automation-medium text-white"
    return "bg-automation-low text-white"
  }

  const getProgressColorClass = (score: number) => {
    if (score >= 4) return "progress-automation-high"
    if (score >= 3) return "progress-automation-medium"
    return "progress-automation-low"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  const departments = [
    { key: 'finance', label: 'Finance', icon: TrendingUp, score: automationLevel.finance },
    { key: 'hr', label: 'Human Resources', icon: Shield, score: automationLevel.hr },
    { key: 'it', label: 'Information Technology', icon: Database, score: automationLevel.it },
    { key: 'operations', label: 'Operations', icon: Zap, score: automationLevel.operations },
  ].filter(dept => dept.score !== undefined && dept.score !== null)

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Overall Automation Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={`${getScoreColor(overallScore)} text-sm px-3 py-1`}>
              {getScoreLabel(overallScore)} - {overallScore.toFixed(1)}/5
            </Badge>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Automation Maturity</div>
            </div>
          </div>
          <Progress 
            value={overallScore * 20} 
            className={`h-3 ${getProgressColorClass(overallScore)}`}
          />
          <div className="text-sm text-muted-foreground">
            This score reflects the company's overall level of business process automation
          </div>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      {departments.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-lg">Department Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departments.map((dept) => {
              const DeptIcon = dept.icon
              return (
                <Card key={dept.key}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DeptIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{dept.label}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getScoreColor(dept.score)} border-0`}
                      >
                        {dept.score.toFixed(1)}
                      </Badge>
                    </div>
                    <Progress 
                      value={dept.score * 20} 
                      className={`h-2 ${getProgressColorClass(dept.score)}`}
                    />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Automation Insights */}
      {aiAnalysis.automation_rationale && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Analysis Rationale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {aiAnalysis.automation_rationale}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Automation Scale Reference */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-sm">Automation Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="grid grid-cols-[auto_1fr] gap-3">
              <span>1-2:</span><span>Excel-only, paper, manual processes</span>
              <span>3:</span><span>ERP + other systems with manual workflows</span>
              <span>4-5:</span><span>Integrated systems with AI/ML automation</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
