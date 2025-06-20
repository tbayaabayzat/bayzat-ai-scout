
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SearchLoadingStateProps {
  isVisible: boolean
  progress: number
  currentMessage: string
}

export function SearchLoadingState({ isVisible, progress, currentMessage }: SearchLoadingStateProps) {
  if (!isVisible) return null

  return (
    <div className="bg-muted/30 border border-border/60 rounded-md p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
          <span className="text-sm font-medium text-foreground">AI Search</span>
        </div>
        <div className="text-xs text-muted-foreground ml-auto">
          {Math.round(progress)}%
        </div>
      </div>
      
      <Progress value={progress} className="h-1.5 mb-2" />
      
      <div className="text-xs text-muted-foreground">
        {currentMessage}
      </div>
    </div>
  )
}
