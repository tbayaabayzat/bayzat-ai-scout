
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
          <span className="text-sm font-medium text-gray-900">AI Search in Progress</span>
        </div>
        <div className="text-xs text-gray-500">
          {Math.round(progress)}% complete
        </div>
      </div>
      
      <Progress value={progress} className="h-2 mb-2" />
      
      <div className="text-xs text-gray-500">
        {currentMessage}
      </div>
    </div>
  )
}
