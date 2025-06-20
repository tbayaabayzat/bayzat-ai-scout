
import { Sparkles } from "lucide-react"
import { EXAMPLE_QUERIES } from "./types"

interface SearchExamplesDropdownProps {
  isVisible: boolean
  onExampleClick: (example: string) => void
}

export function SearchExamplesDropdown({ isVisible, onExampleClick }: SearchExamplesDropdownProps) {
  if (!isVisible) return null

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/40 rounded-lg shadow-lg shadow-black/5 z-50 max-h-64 overflow-y-auto">
      <div className="p-3">
        <div className="text-xs font-medium text-muted-foreground/90 mb-3 flex items-center gap-2 px-2">
          <Sparkles className="h-3.5 w-3.5 text-primary/70" />
          Try these AI searches
        </div>
        <div className="space-y-1">
          {EXAMPLE_QUERIES.map((example, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(example)}
              className="w-full text-left text-sm py-2.5 px-3 rounded-md hover:bg-muted/60 transition-all duration-200 text-foreground/90 hover:text-foreground hover:scale-[1.02] border border-transparent hover:border-border/30"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
