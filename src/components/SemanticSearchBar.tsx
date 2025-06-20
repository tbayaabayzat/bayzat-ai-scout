
import { useState, useRef, useEffect } from "react"
import { Search, Sparkles, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useSemanticSearch } from "@/hooks/useSemanticSearch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SemanticSearchBarProps {
  onResults: (companyIds: string[]) => void
  onClear: () => void
}

export function SemanticSearchBar({ onResults, onClear }: SemanticSearchBarProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const {
    isSearching,
    searchResults,
    error,
    progress,
    currentMessage,
    searchWithSemantics,
    clearResults,
    cancelSearch
  } = useSemanticSearch()

  const placeholders = [
    "Ask me about companies with specific software...",
    "Find companies by employee count and industry...",
    "Search for companies missing HR systems...",
    "Discover companies using legacy ERP systems..."
  ]

  const exampleQueries = [
    "Companies with NetSuite as their ERP and no HR software",
    "Restaurants with 50-500 employees missing HRIS",
    "Companies using Tally with over 100 employees",
    "Manufacturing companies with manual payroll processes",
    "Technology companies needing system modernization",
    "Healthcare companies with legacy accounting systems"
  ]

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % placeholders.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Update results when search completes
  useEffect(() => {
    if (searchResults) {
      const companyIds = searchResults.companies.map(company => company.id)
      onResults(companyIds)
    }
  }, [searchResults, onResults])

  const handleSearch = async () => {
    console.log('Search button clicked with query:', query)
    if (query.trim()) {
      await searchWithSemantics(query)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log('Key pressed:', e.key)
    if (e.key === 'Enter' && !isSearching) {
      handleSearch()
      setShowSuggestions(false)
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value)
    setQuery(e.target.value)
  }

  const handleInputFocus = () => {
    console.log('Input focused')
    setShowSuggestions(true)
  }

  const handleExampleClick = async (example: string) => {
    setQuery(example)
    setShowSuggestions(false)
    await searchWithSemantics(example)
  }

  const handleClear = () => {
    setQuery("")
    clearResults()
    onClear()
    inputRef.current?.focus()
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar - Simplified */}
      <div className="relative">
        <div className="flex items-center border border-border rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-400">
          {/* AI Icon */}
          <div className="flex items-center pl-4 pr-2">
            <Sparkles className={`h-5 w-5 text-purple-500 ${
              isSearching ? 'animate-pulse' : ''
            }`} />
          </div>

          {/* Search Input - Simplified styling */}
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder={placeholders[currentPlaceholder]}
            disabled={isSearching}
            className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/70"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pr-4">
            {query && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="h-8 w-8 p-0 hover:bg-muted/50"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            {isSearching ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={cancelSearch}
                className="h-8 px-3 text-xs hover:bg-muted/50"
              >
                Cancel
              </Button>
            ) : (
              <DropdownMenu open={showSuggestions} onOpenChange={setShowSuggestions}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs hover:bg-purple-50 hover:text-purple-700 transition-colors z-50"
                  >
                    Examples
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 max-h-64 overflow-y-auto bg-background border border-border shadow-lg z-50">
                  <div className="p-2">
                    <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Try these AI-powered searches
                    </div>
                    {exampleQueries.map((example, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleExampleClick(example)}
                        className="cursor-pointer text-sm py-2 px-3 rounded-md hover:bg-purple-50/50"
                      >
                        {example}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
              <span className="text-sm font-medium">AI Search in Progress</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-2" />
          
          <div className="text-xs text-muted-foreground">
            {currentMessage}
          </div>
        </div>
      )}

      {/* Results Summary */}
      {searchResults && !isSearching && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Found {searchResults.totalMatches} companies matching "{searchResults.query}"
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 text-xs text-green-700 hover:text-green-800 hover:bg-green-100/50"
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.location.reload()}
            className="h-8 text-xs text-red-700 hover:text-red-800 hover:bg-red-100/50"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}
