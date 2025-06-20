
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
      <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-400">
        {/* AI Icon */}
        <Sparkles className={`h-5 w-5 text-purple-500 flex-shrink-0 ${
          isSearching ? 'animate-pulse' : ''
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
          className="flex-1 border-none bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-0"
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {showClearButton && !isSearching && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {!isSearching && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExamples}
              className="h-8 px-3 text-xs hover:bg-purple-50 hover:text-purple-700 transition-colors text-gray-700"
            >
              Examples
            </Button>
          )}
        </div>
      </div>
    )
  }
)

SemanticSearchInput.displayName = "SemanticSearchInput"
