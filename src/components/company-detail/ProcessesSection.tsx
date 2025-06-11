
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertTriangle, XCircle, Settings } from "lucide-react"

interface ProcessesSectionProps {
  aiAnalysis: any
}

export function ProcessesSection({ aiAnalysis }: ProcessesSectionProps) {
  console.log('ProcessesSection - aiAnalysis:', aiAnalysis)

  return (
    <div className="space-y-6">
      {aiAnalysis?.processes_mentioned && Array.isArray(aiAnalysis.processes_mentioned) && aiAnalysis.processes_mentioned.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Processes Mentioned
          </h4>
          <div className="space-y-2">
            {aiAnalysis.processes_mentioned.map((process: any, index: number) => {
              console.log('Process:', process, 'Type:', typeof process)
              
              // Ensure we're working with the right data structure
              const processName = typeof process === 'string' ? process : (process?.process || 'Process')
              
              return (
                <div key={index} className="flex items-start gap-2 p-3 border rounded-lg">
                  <Settings className="h-4 w-4 mt-0.5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{processName}</p>
                    {process?.description && typeof process.description === 'string' && (
                      <p className="text-xs text-muted-foreground mt-1">{process.description}</p>
                    )}
                    {process?.evidence && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Evidence available
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {aiAnalysis?.manual_work_indicators && Array.isArray(aiAnalysis.manual_work_indicators) && aiAnalysis.manual_work_indicators.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Manual Work Indicators
          </h4>
          <div className="space-y-2">
            {aiAnalysis.manual_work_indicators.map((indicator: any, index: number) => {
              console.log('Manual work indicator:', indicator, 'Type:', typeof indicator)
              
              // Ensure we're working with the right data structure
              const indicatorText = typeof indicator === 'string' ? indicator : (indicator?.indicator || 'Manual work indicator')
              
              return (
                <div key={index} className="flex items-start gap-2 p-3 border border-orange-200 rounded-lg bg-orange-50">
                  <XCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{indicatorText}</p>
                    {indicator?.description && typeof indicator.description === 'string' && (
                      <p className="text-xs text-muted-foreground mt-1">{indicator.description}</p>
                    )}
                    {indicator?.evidence && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        Evidence available
                      </Badge>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {(!aiAnalysis?.processes_mentioned || aiAnalysis.processes_mentioned.length === 0) && 
       (!aiAnalysis?.manual_work_indicators || aiAnalysis.manual_work_indicators.length === 0) && (
        <div className="text-center py-8 text-muted-foreground">
          <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No process information available</p>
        </div>
      )}
    </div>
  )
}
