
import { Sparkles } from "lucide-react"
import { EXAMPLE_QUERIES } from "./types"

interface SearchExamplesDropdownProps {
  isVisible: boolean
  onExampleClick: (example: string) => void
}

export function SearchExamplesDropdown({ isVisible, onExampleClick }: SearchExamplesDropdownProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border/60 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
      <div className="p-2">
        <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5 px-2">
          <Sparkles className="h-3 w-3" />
          Try these searches
        </div>
        {EXAMPLE_QUERIES.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example)}
            className="w-full text-left text-sm py-2 px-2 rounded-sm hover:bg-muted/50 transition-colors text-foreground/90 hover:text-foreground"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
