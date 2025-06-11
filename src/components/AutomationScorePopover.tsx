
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Info } from "lucide-react"

interface AutomationScorePopoverProps {
  score: number
  analysis: any
}

export function AutomationScorePopover({ score, analysis }: AutomationScorePopoverProps) {
  const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-automation-high text-white"
    if (score >= 3) return "bg-automation-medium text-white"
    return "bg-automation-low text-white"
  }

  const getProgressColor = (score: number) => {
    if (score >= 4) return "[&>div]:bg-automation-high"
    if (score >= 3) return "[&>div]:bg-automation-medium"
    return "[&>div]:bg-automation-low"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  // Debug logging for automation data structure
  console.log('AutomationScorePopover - analysis:', analysis)
  console.log('AutomationScorePopover - score:', score)

  // Access the correct nested structure for automation scores based on the schema
  let automationLevel = null
  if (analysis && typeof analysis === 'object' && analysis.automation_level) {
    automationLevel = analysis.automation_level
  }
  console.log('AutomationScorePopover - automationLevel:', automationLevel)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-1">
          <Badge variant="outline" className={`gap-1 border-0 ${getScoreColor(score)} hover:opacity-90 transition-opacity`}>
            {getScoreLabel(score)} ({score.toFixed(1)})
            <Info className="h-3 w-3" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-3">Automation Analysis</h4>
            
            {/* Overall Score */}
            <div className="mb-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="font-medium">Overall Score</span>
                <span className="font-semibold">{score.toFixed(1)}</span>
              </div>
              <Progress 
                value={score * 20} 
                className={`h-3 ${getProgressColor(score)}`} 
              />
            </div>

            {/* Department Breakdown */}
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-muted-foreground">Department Breakdown</h5>
              
              {automationLevel?.finance && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Finance</span>
                    <span>{automationLevel.finance}</span>
                  </div>
                  <Progress 
                    value={automationLevel.finance * 20} 
                    className={`h-2 ${getProgressColor(automationLevel.finance)}`} 
                  />
                </div>
              )}
              {automationLevel?.hr && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>HR</span>
                    <span>{automationLevel.hr}</span>
                  </div>
                  <Progress 
                    value={automationLevel.hr * 20} 
                    className={`h-2 ${getProgressColor(automationLevel.hr)}`} 
                  />
                </div>
              )}
              {automationLevel?.it && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IT</span>
                    <span>{automationLevel.it}</span>
                  </div>
                  <Progress 
                    value={automationLevel.it * 20} 
                    className={`h-2 ${getProgressColor(automationLevel.it)}`} 
                  />
                </div>
              )}
              {automationLevel?.operations && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Operations</span>
                    <span>{automationLevel.operations}</span>
                  </div>
                  <Progress 
                    value={automationLevel.operations * 20} 
                    className={`h-2 ${getProgressColor(automationLevel.operations)}`} 
                  />
                </div>
              )}
              
              {/* Show a message if no automation data is available */}
              {(!automationLevel || 
                (!automationLevel.finance && !automationLevel.hr && !automationLevel.it && !automationLevel.operations)) && (
                <div className="text-sm text-muted-foreground">
                  No detailed automation scores available
                </div>
              )}
            </div>
          </div>
          
          {analysis?.automation_rationale && (
            <div>
              <h5 className="font-medium text-sm mb-2">Rationale</h5>
              <p className="text-sm text-muted-foreground">{analysis.automation_rationale}</p>
            </div>
          )}
          
          {/* Score Legend */}
          <div className="text-xs text-muted-foreground border-t pt-3">
            <div className="space-y-1">
              <div className="flex justify-between"><span>1</span><span>Excel-only, paper, manual processes</span></div>
              <div className="flex justify-between"><span>2</span><span>Basic standalone tools or legacy point solutions</span></div>
              <div className="flex justify-between"><span>3</span><span>ERP, Mix of multiple systems and manual processes</span></div>
              <div className="flex justify-between"><span>4</span><span>Integrated business systems</span></div>
              <div className="flex justify-between"><span>5</span><span>AI/ML, advanced automation</span></div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
