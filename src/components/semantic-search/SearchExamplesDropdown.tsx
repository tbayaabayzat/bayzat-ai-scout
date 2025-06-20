
import { Sparkles } from "lucide-react"
import { EXAMPLE_QUERIES } from "./types"

interface SearchExamplesDropdownProps {
  isVisible: boolean
  onExampleClick: (example: string) => void
}

export function SearchExamplesDropdown({ isVisible, onExampleClick }: SearchExamplesDropdownProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-background/95 backdrop-blur-sm border border-border/60 rounded-md shadow-lg shadow-bayzat-purple/5 z-50 max-h-60 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5 px-2">
          <Sparkles className="h-3 w-3 text-bayzat-purple" />
          Try these AI searches
        </div>
        {EXAMPLE_QUERIES.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="w-full text-left text-sm py-2 px-2 rounded-sm hover:bg-bayzat-purple/10 hover:border-l-2 hover:border-l-bayzat-purple transition-all duration-200 text-foreground/90 hover:text-foreground group"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="h-3 w-3 text-bayzat-purple/60 group-hover:text-bayzat-purple mt-0.5 flex-shrink-0" />
              <span>{example}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
