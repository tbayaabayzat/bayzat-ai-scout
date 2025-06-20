
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
        <div className="flex items-center gap-3 px-4 py-3 bg-background/60 backdrop-blur-sm border border-border/40 rounded-lg transition-all duration-300 focus-within:bg-background focus-within:border-primary/30 focus-within:shadow-sm focus-within:shadow-primary/10 hover:bg-background/80 hover:border-border/60 hover:scale-[1.01]">
          {/* Enhanced AI Icon */}
          <div className="relative">
            <Sparkles className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
              isSearching 
                ? 'text-primary animate-pulse scale-110' 
                : value 
                ? 'text-primary/80 scale-105' 
                : 'text-muted-foreground/70 group-focus-within:text-primary/70 group-hover:text-primary/50'
            }`} />
            {isSearching && (
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            )}
          </div>

          {/* Search Input */}
          <Input
            ref={ref}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={isSearching}
            className="flex-1 border-none bg-transparent text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto text-base"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {showClearButton && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-7 w-7 p-0 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-105"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            )}
            
            {!isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExamples}
                className="h-7 px-3 text-xs font-medium text-muted-foreground/80 hover:text-foreground hover:bg-muted/40 transition-all duration-200 hover:scale-105 border border-transparent hover:border-border/30"
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
