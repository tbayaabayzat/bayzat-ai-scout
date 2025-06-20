
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchResultsSummaryProps {
  isVisible: boolean
  totalMatches: number
  query: string
  onClear: () => void
}

export function SearchResultsSummary({ isVisible, totalMatches, query, onClear }: SearchResultsSummaryProps) {
  if (!isVisible) return null

  return (
    <div className="bg-green-50/50 border border-green-200/60 rounded-md p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-3 w-3 text-green-600" />
        <span className="text-sm text-green-800">
          Found {totalMatches} companies matching "{query}"
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="h-6 text-xs text-green-700 hover:text-green-800 hover:bg-green-100/50"
      >
        Clear
      </Button>
    </div>
  )
}
