
import { forwardRef } from "react"
import { Sparkles, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SemanticSearchInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onFocus: () => void
  onClear: () => void
  onToggleExamples: () => void
  placeholder: string
  isSearching: boolean
  showClearButton: boolean
}

export const SemanticSearchInput = forwardRef<HTMLInputElement, SemanticSearchInputProps>(
  ({
    value,
    onChange,
    onKeyDown,
    onFocus,
    onClear,
    onToggleExamples,
    placeholder,
    isSearching,
    showClearButton
  }, ref) => {
    return (
      <div className="relative group">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 border border-border/60 rounded-md transition-all duration-200 focus-within:bg-background focus-within:border-primary/40 focus-within:shadow-sm hover:bg-muted/50">
          {/* AI Icon */}
          <Sparkles className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-colors ${
            isSearching ? 'animate-pulse text-primary' : 'group-focus-within:text-primary/70'
          }`} />

          {/* Search Input */}
          <Input
            ref={ref}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={isSearching}
            className="flex-1 border-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {showClearButton && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-6 w-6 p-0 hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {!isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExamples}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                Examples
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

SemanticSearchInput.displayName = "SemanticSearchInput"
