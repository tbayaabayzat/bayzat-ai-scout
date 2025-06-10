
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
              {analysis?.automation_score_finance && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Finance</span>
                    <span>{analysis.automation_score_finance.toFixed(1)}</span>
                  </div>
                  <Progress value={analysis.automation_score_finance * 20} className="h-2" />
                </div>
              )}
              {analysis?.automation_score_hr && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>HR</span>
                    <span>{analysis.automation_score_hr.toFixed(1)}</span>
                  </div>
                  <Progress value={analysis.automation_score_hr * 20} className="h-2" />
                </div>
              )}
              {analysis?.automation_score_it && (
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>IT</span>
                    <span>{analysis.automation_score_it.toFixed(1)}</span>
                  </div>
                  <Progress value={analysis.automation_score_it * 20} className="h-2" />
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
        </div>
      </PopoverContent>
    </Popover>
  )
}
