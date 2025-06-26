
import { useState, useRef, useEffect } from "react"
import { useSemanticSearch } from "@/hooks/useSemanticSearch"
import { SemanticSearchInput } from "./semantic-search/SemanticSearchInput"
import { SearchExamplesDropdown } from "./semantic-search/SearchExamplesDropdown"
import { SearchLoadingState } from "./semantic-search/SearchLoadingState"
import { SearchErrorState } from "./semantic-search/SearchErrorState"
import { SearchZeroResultsState } from "./semantic-search/SearchZeroResultsState"
import { PLACEHOLDERS } from "./semantic-search/types"

interface SemanticSearchBarProps {
  onResults: (companyIds: string[], query: string) => void
  onClear: () => void
  clearTrigger?: number // Add a trigger to clear internal state
}

export function SemanticSearchBar({ onResults, onClear, clearTrigger }: SemanticSearchBarProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [lastClearTrigger, setLastClearTrigger] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  
  const {
    isSearching,
    searchResults,
    error,
    hasZeroResults,
    progress,
    currentMessage,
    searchWithSemantics,
    clearResults,
    cancelSearch
  } = useSemanticSearch()

  // Clear internal state when parent triggers clear
  useEffect(() => {
    if (clearTrigger && clearTrigger !== lastClearTrigger) {
      console.log('Received clear trigger, clearing internal state')
      setQuery("")
      clearResults()
      setLastClearTrigger(clearTrigger)
    }
  }, [clearTrigger, lastClearTrigger, clearResults])

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder(prev => (prev + 1) % PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Update results when search completes - but only if we have results
  useEffect(() => {
    if (searchResults && searchResults.companies.length > 0) {
      const companyIds = searchResults.companies.map(company => company.id)
      onResults(companyIds, searchResults.query)
    }
  }, [searchResults, onResults])

  const handleSearch = async () => {
    console.log('Search button clicked with query:', query)
    if (query.trim()) {
      await searchWithSemantics(query)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log('Key pressed:', e.key, 'Query:', query)
    if (e.key === 'Enter' && !isSearching) {
      handleSearch()
      setShowSuggestions(false)
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    console.log('Input changed from:', query, 'to:', newValue)
    setQuery(newValue)
  }

  const handleInputFocus = () => {
    console.log('Input focused, current query:', query)
    setShowSuggestions(true)
  }

  const handleExampleClick = async (example: string) => {
    console.log('Example clicked:', example)
    setQuery(example)
    setShowSuggestions(false)
    await searchWithSemantics(example)
  }

  const handleClear = () => {
    console.log('Clear clicked')
    setQuery("")
    clearResults()
    onClear()
    inputRef.current?.focus()
  }

  const handleToggleExamples = () => {
    setShowSuggestions(!showSuggestions)
  }

  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <div className="relative" ref={searchContainerRef}>
        <SemanticSearchInput
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onClear={handleClear}
          onToggleExamples={handleToggleExamples}
          placeholder={PLACEHOLDERS[currentPlaceholder]}
          isSearching={isSearching}
          showClearButton={!!query}
        />

        <SearchExamplesDropdown
          isVisible={showSuggestions && !isSearching}
          onExampleClick={handleExampleClick}
        />
      </div>

      {/* Loading State */}
      <SearchLoadingState
        isVisible={isSearching}
        progress={progress}
        currentMessage={currentMessage}
      />

      {/* Zero Results State */}
      <SearchZeroResultsState
        isVisible={hasZeroResults}
        query={searchResults?.query || query}
        onClear={handleClear}
      />

      {/* Error State */}
      <SearchErrorState
        isVisible={!!error}
        error={error || ""}
        onRetry={handleRetry}
      />
    </div>
  )
}
