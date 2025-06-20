
import { Sparkles } from "lucide-react"
import { EXAMPLE_QUERIES } from "./types"

interface SearchExamplesDropdownProps {
  isVisible: boolean
  onExampleClick: (example: string) => void
}

export function SearchExamplesDropdown({ isVisible, onExampleClick }: SearchExamplesDropdownProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
      <div className="p-3">
        <div className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Try these AI-powered searches
        </div>
        {EXAMPLE_QUERIES.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="w-full text-left cursor-pointer text-sm py-2 px-3 rounded-md hover:bg-purple-50/80 transition-colors text-gray-800 hover:text-purple-700"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
