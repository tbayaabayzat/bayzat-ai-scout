
import { useState } from "react"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SemanticSearchProps {
  onSearch: (query: string, results?: any[]) => void
  isLoading?: boolean
}

export function SemanticSearch({ onSearch, isLoading = false }: SemanticSearchProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const aiSuggestions = [
    "Companies using NetSuite as ERP but missing HR software",
    "Retail companies with 100+ employees using legacy accounting",
    "Companies with manual payroll processes",
    "High-growth companies needing system modernization",
    "Manufacturing companies without integrated HRIS",
    "Companies using Tally with automation opportunities"
  ]

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setQuery(searchQuery)
    setShowSuggestions(false)
    
    // TODO: Integrate with n8n workflow
    console.log('Semantic search query:', searchQuery)
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query)
    }
  }

  return (
    <div className="relative space-y-4">
      {/* Hero Search Bar */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl blur-xl" />
        <div className="relative bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            {/* AI Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Search</span>
            </div>
            
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Ask anything about companies... 'Companies using NetSuite without HR software'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onKeyPress={handleKeyPress}
                className="pl-12 pr-12 h-12 text-base bg-background/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/30 rounded-lg"
                disabled={isLoading}
              />
              {isLoading ? (
                <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary animate-spin" />
              ) : (
                <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              )}
            </div>
            
            <Button 
              onClick={() => handleSearch(query)}
              disabled={!query.trim() || isLoading}
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
          
          {/* Quick suggestion chips */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Try:</span>
            {aiSuggestions.slice(0, 3).map((suggestion, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions Dropdown */}
      {showSuggestions && !isLoading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI-Powered Suggestions</span>
            </div>
            <div className="space-y-1">
              {aiSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    <span className="text-foreground/80 group-hover:text-foreground">
                      {suggestion}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
