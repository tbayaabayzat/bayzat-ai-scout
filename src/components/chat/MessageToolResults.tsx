
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ToolResult {
  tool: string
  success: boolean
  data?: any
  error?: string
  execution_time_ms: number
}

interface MessageToolResultsProps {
  toolResults: ToolResult[]
}

export function MessageToolResults({ toolResults }: MessageToolResultsProps) {
  return (
    <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50">
      <div className="text-xs font-medium text-muted-foreground mb-2">
        Tool Results
      </div>
      <div className="space-y-2">
        {toolResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Badge 
                variant={result.success ? "default" : "destructive"}
                className="text-xs"
              >
                {result.tool}
              </Badge>
              <span className="text-muted-foreground">
                {result.execution_time_ms}ms
              </span>
            </div>
            {result.data && (
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
              >
                <Download className="w-3 h-3 mr-1" />
                Export
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
