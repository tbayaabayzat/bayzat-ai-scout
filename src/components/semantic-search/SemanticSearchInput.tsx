
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
        {/* Animated Border Container */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-bayzat-purple/20 via-bayzat-pink/20 to-bayzat-purple/20 rounded-lg opacity-75 group-focus-within:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        <div className="absolute -inset-0.5 rounded-lg overflow-hidden group-focus-within:animate-spin-slow">
          <div className="absolute inset-0 bg-gradient-conic from-bayzat-purple/30 via-transparent via-transparent to-bayzat-purple/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Main Search Container */}
        <div className="relative flex items-center gap-2 px-3 py-2.5 bg-background/95 backdrop-blur-sm border border-border/60 rounded-lg transition-all duration-200 focus-within:bg-background focus-within:border-bayzat-purple/40 focus-within:shadow-lg focus-within:shadow-bayzat-purple/10 hover:bg-muted/30 hover:border-border/80">
          {/* Enhanced AI Icon */}
          <div className="relative">
            <Sparkles className={`h-5 w-5 flex-shrink-0 transition-all duration-300 ${
              isSearching 
                ? 'text-bayzat-purple animate-pulse scale-110' 
                : 'text-bayzat-purple/80 group-focus-within:text-bayzat-purple group-focus-within:scale-105'
            }`} />
            {isSearching && (
              <div className="absolute inset-0 h-5 w-5 bg-bayzat-purple/20 rounded-full animate-ping"></div>
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
            className="flex-1 border-none bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 px-0 h-auto text-base"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            {showClearButton && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-6 w-6 p-0 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
            
            {!isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExamples}
                className="h-6 px-2 text-xs text-muted-foreground hover:text-bayzat-purple hover:bg-bayzat-purple/10 transition-colors"
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
