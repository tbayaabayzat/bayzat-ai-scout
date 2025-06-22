
import { SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchZeroResultsStateProps {
  isVisible: boolean
  query: string
  onClear: () => void
}

export function SearchZeroResultsState({ isVisible, query, onClear }: SearchZeroResultsStateProps) {
  if (!isVisible) return null

  return (
    <div className="bg-yellow-50/50 border border-yellow-200/60 rounded-md p-4">
      <div className="flex items-start gap-3">
        <SearchX className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-medium text-yellow-800 mb-1">
            No companies found
          </div>
          <div className="text-sm text-yellow-700 mb-3">
            Your AI search for "{query}" didn't find any matching companies. Try adjusting your search terms or using different keywords.
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="h-7 text-xs text-yellow-700 border-yellow-300 hover:bg-yellow-100"
            >
              Clear Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
