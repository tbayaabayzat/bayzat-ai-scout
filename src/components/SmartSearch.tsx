
import { useState } from "react"
import { Search, Sparkles, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SmartSearchProps {
  placeholder?: string
  suggestions?: string[]
  onSearch?: (query: string) => void
  onFilterSelect?: (filter: string) => void
  filters?: string[]
}

export function SmartSearch({ 
  placeholder = "Ask anything about your data...", 
  suggestions = [],
  onSearch,
  onFilterSelect,
  filters = []
}: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)

  const defaultSuggestions = [
    "Companies using legacy ERP systems",
    "Companies with manual HR processes",
    "Retail companies without HRIS",
    "Companies using Tally with 100+ employees",
    "High automation score companies",
    "Companies needing system modernization"
  ]

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setShowSuggestions(false)
    onSearch?.(searchQuery)
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(query)
              }
            }}
            className="pl-10 pr-12"
          />
          <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
        </div>

        {filters.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {filters.map((filter) => (
                <DropdownMenuItem
                  key={filter}
                  onClick={() => onFilterSelect?.(filter)}
                >
                  {filter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
          <div className="p-3">
            <div className="text-sm font-medium text-muted-foreground mb-2">AI-Powered Suggestions</div>
            <div className="space-y-1">
              {[...suggestions, ...defaultSuggestions].slice(0, 6).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-sm transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span>{suggestion}</span>
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
