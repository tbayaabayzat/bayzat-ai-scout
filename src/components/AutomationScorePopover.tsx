
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
    if (score >= 4) return "bg-green-500"
    if (score >= 2) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 2) return "Medium"
    return "Low"
  }

  // Debug logging for automation data structure
  console.log('AutomationScorePopover - analysis:', analysis)
  console.log('AutomationScorePopover - score:', score)

  // Access the correct nested structure for automation scores with fallbacks
  const automationLevel = analysis?.automation_level || {}
  console.log('AutomationScorePopover - automationLevel:', automationLevel)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-auto p-1">
          <Badge variant="outline" className="gap-1">
            {getScoreLabel(score)} ({score.toFixed(1)})
            <Info className="h-3 w-3" />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Automation Analysis</h4>
            <div className="space-y-3">
              {automationLevel?.finance && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Finance</span>
                    <span>{automationLevel.finance.toFixed(1)}</span>
                  </div>
                  <Progress value={automationLevel.finance * 20} className="h-2" />
                </div>
              )}
              {automationLevel?.hr && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>HR</span>
                    <span>{automationLevel.hr.toFixed(1)}</span>
                  </div>
                  <Progress value={automationLevel.hr * 20} className="h-2" />
                </div>
              )}
              {automationLevel?.it && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IT</span>
                    <span>{automationLevel.it.toFixed(1)}</span>
                  </div>
                  <Progress value={automationLevel.it * 20} className="h-2" />
                </div>
              )}
              
              {/* Show a message if no automation data is available */}
              {!automationLevel?.finance && !automationLevel?.hr && !automationLevel?.it && (
                <div className="text-sm text-muted-foreground">
                  No detailed automation scores available
                </div>
              )}
            </div>
          </div>
          
          {automationLevel?.automation_rationale && (
            <div>
              <h5 className="font-medium text-sm mb-2">Rationale</h5>
              <p className="text-sm text-muted-foreground">{automationLevel.automation_rationale}</p>
            </div>
          )}
          
          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-500 border-t pt-2">
              <div>Debug: Score={score}</div>
              <div>Has automation_level: {!!automationLevel}</div>
              <div>Keys: {Object.keys(automationLevel).join(', ')}</div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
