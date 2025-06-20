
import { useState, useCallback } from "react"
import { Company } from "@/types/company"

interface SemanticSearchResult {
  companies: Company[]
  query: string
  totalMatches: number
}

export function useSemanticSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SemanticSearchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState("")

  const progressMessages = [
    "Analyzing company data...",
    "Processing natural language query...",
    "Matching companies to criteria...",
    "Filtering results by requirements...",
    "Applying advanced matching algorithms...",
    "Finalizing search results..."
  ]

  const searchWithSemantics = useCallback(async (query: string) => {
    if (!query.trim()) return

    setIsSearching(true)
    setError(null)
    setProgress(0)
    setCurrentMessage(progressMessages[0])

    try {
      // Simulate progress updates during the 40-second workflow
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = Math.min(prev + 15, 95)
          const messageIndex = Math.floor((newProgress / 100) * progressMessages.length)
          setCurrentMessage(progressMessages[Math.min(messageIndex, progressMessages.length - 1)])
          return newProgress
        })
      }, 6000)

      // TODO: Replace with actual n8n webhook URL
      const n8nWebhookUrl = "YOUR_N8N_WEBHOOK_URL_HERE"
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          timestamp: new Date().toISOString()
        })
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const result = await response.json()
      
      setProgress(100)
      setCurrentMessage("Search completed!")
      
      setSearchResults({
        companies: result.companies || [],
        query: query,
        totalMatches: result.totalMatches || result.companies?.length || 0
      })

    } catch (err) {
      console.error('Semantic search error:', err)
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.')
    } finally {
      setIsSearching(false)
      setTimeout(() => {
        setProgress(0)
        setCurrentMessage("")
      }, 2000)
    }
  }, [])

  const clearResults = useCallback(() => {
    setSearchResults(null)
    setError(null)
  }, [])

  const cancelSearch = useCallback(() => {
    setIsSearching(false)
    setProgress(0)
    setCurrentMessage("")
    setError(null)
  }, [])

  return {
    isSearching,
    searchResults,
    error,
    progress,
    currentMessage,
    searchWithSemantics,
    clearResults,
    cancelSearch
  }
}
