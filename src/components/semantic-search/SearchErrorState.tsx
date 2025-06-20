
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchErrorStateProps {
  isVisible: boolean
  error: string
  onRetry: () => void
}

export function SearchErrorState({ isVisible, error, onRetry }: SearchErrorStateProps) {
  if (!isVisible) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <X className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-700">{error}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onRetry}
        className="h-8 text-xs text-red-700 hover:text-red-800 hover:bg-red-100/50"
      >
        Retry
      </Button>
    </div>
  )
}
