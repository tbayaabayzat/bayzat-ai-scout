
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
    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-green-600" />
        <span className="text-sm font-medium text-green-800">
          Found {totalMatches} companies matching "{query}"
        </span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClear}
        className="h-8 text-xs text-green-700 hover:text-green-800 hover:bg-green-100/50"
      >
        Clear Search
      </Button>
    </div>
  )
}
