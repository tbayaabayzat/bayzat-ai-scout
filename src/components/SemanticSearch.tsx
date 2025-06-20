
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"

interface SemanticSearchProps {
  onSearch: (query: string) => void
  isLoading?: boolean
  onCancel?: () => void
}

const loadingMessages = [
  "Analyzing company data...",
  "Processing AI insights...",
  "Matching your criteria...",
  "Filtering results...",
  "Almost there..."
]

const searchSuggestions = [
  "Companies with NetSuite as their ERP, and are not using an HR software",
  "Retail companies without HRIS systems",
  "Companies using Tally with 100+ employees",
  "High automation score companies needing system modernization",
  "Manufacturing companies with manual HR processes"
]

export function SemanticSearch({ onSearch, isLoading = false, onCancel }: SemanticSearchProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [companiesAnalyzed, setCompaniesAnalyzed] = useState(0)

  // Cycle through loading messages during search
  useEffect(() => {
    if (isLoading) {
      const messageInterval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length)
      }, 8000)

      const counterInterval = setInterval(() => {
        setCompaniesAnalyzed(prev => Math.min(prev + Math.floor(Math.random() * 50) + 10, 2500))
      }, 1500)

      return () => {
        clearInterval(messageInterval)
        clearInterval(counterInterval)
      }
    } else {
      setLoadingMessageIndex(0)
      setCompaniesAnalyzed(0)
    }
  }, [isLoading])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery)
      setShowSuggestions(false)
      onSearch(searchQuery)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full">
      {/* Main AI Search Input */}
      <div className={`relative transition-all duration-300 ${
        isLoading 
          ? 'bg-gradient-to-r from-primary/5 to-pink/5 border-2 border-primary/20' 
          : 'bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
      } rounded-xl`}>
        
        {/* AI Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading ? (
            <div className="relative">
              <img 
                src="/lovable-uploads/db428e34-40c1-41d0-b04a-cda5d3f8b0d3.png" 
                alt="AI" 
                className="w-5 h-5 animate-pulse"
              />
              <div className="absolute inset-0 animate-ping">
                <img 
                  src="/lovable-uploads/db428e34-40c1-41d0-b04a-cda5d3f8b0d3.png" 
                  alt="AI" 
                  className="w-5 h-5 opacity-40"
                />
              </div>
            </div>
          ) : (
            <img 
              src="/lovable-uploads/db428e34-40c1-41d0-b04a-cda5d3f8b0d3.png" 
              alt="AI" 
              className="w-5 h-5 transition-transform duration-200 hover:scale-110"
            />
          )}
        </div>

        {/* Search Input */}
        <Input
          placeholder={isLoading ? "AI is analyzing your request..." : "Ask AI anything about your companies..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => !isLoading && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className={`pl-12 pr-12 h-12 bg-transparent border-0 text-base placeholder:text-muted-foreground/70 focus-visible:ring-0 focus-visible:ring-offset-0 ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
        />

        {/* Cancel/Clear Button */}
        {(isLoading || query) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isLoading && onCancel) {
                onCancel()
              } else {
                setQuery("")
                setShowSuggestions(false)
              }
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted/50"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Loading Status */}
      {isLoading && (
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
              <span>{loadingMessages[loadingMessageIndex]}</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {companiesAnalyzed.toLocaleString()} companies analyzed
          </Badge>
        </div>
      )}

      {/* AI Suggestions Dropdown */}
      {showSuggestions && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src="/lovable-uploads/db428e34-40c1-41d0-b04a-cda5d3f8b0d3.png" 
                alt="AI" 
                className="w-4 h-4"
              />
              <span className="text-sm font-medium text-muted-foreground">AI-Powered Suggestions</span>
            </div>
            <div className="space-y-1">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-3 text-sm hover:bg-accent/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-3 w-3 text-primary mt-0.5 group-hover:text-pink transition-colors" />
                    <span className="leading-relaxed">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click overlay to close suggestions */}
      {showSuggestions && !isLoading && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}
