
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
  const [hasZeroResults, setHasZeroResults] = useState(false)
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
    setHasZeroResults(false)
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

      // n8n webhook URL
      const n8nWebhookUrl = "https://automation.bayzat.com/webhook/a76a74c7-fd60-4473-8831-323924605244"
      
      console.log('Sending semantic search request:', query)
      
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          {
            "query": query,
            "coming_from": "company search table of the internal company software tool to prospect and find the names and details of companies based on various parameters like size, industry, processes, automation levels and employees. the final output in the user experience is a table of companies filtered based on natural language search."
          }
        ])
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`)
      }

      const result = await response.json()
      console.log('n8n webhook response:', result)
      
      // Handle array response format - access first element
      if (!Array.isArray(result) || result.length === 0) {
        console.warn('Expected array response but got:', result)
        throw new Error('Invalid response format: expected array with at least one element')
      }

      const responseData = result[0]
      console.log('Extracted response data:', responseData)
      
      // Check if the response has the expected structure
      if (!responseData.success) {
        throw new Error('Search request was not successful')
      }

      if (!responseData.data) {
        console.warn('Unexpected response structure:', responseData)
        throw new Error('Invalid response format from search service')
      }

      const companies = responseData.data.companies || []
      const totalCount = responseData.data.total_count || companies.length
      
      console.log('Extracted companies:', companies.length, 'companies')
      console.log('Total count from response:', totalCount)
      console.log('Company IDs:', companies.map((c: any) => c.id))
      
      setProgress(100)
      setCurrentMessage("Search completed!")
      
      // Check for zero results
      if (companies.length === 0 || totalCount === 0) {
        console.log('Zero results found for query:', query)
        setHasZeroResults(true)
        setSearchResults({
          companies: [],
          query: query,
          totalMatches: 0
        })
      } else {
        setSearchResults({
          companies: companies,
          query: query,
          totalMatches: totalCount
        })
      }

    } catch (err) {
      console.error('Semantic search error:', err)
      setError(err instanceof Error ? err.message : 'Search failed. Please try again.')
      setHasZeroResults(false)
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
    setHasZeroResults(false)
  }, [])

  const cancelSearch = useCallback(() => {
    setIsSearching(false)
    setProgress(0)
    setCurrentMessage("")
    setError(null)
    setHasZeroResults(false)
  }, [])

  return {
    isSearching,
    searchResults,
    error,
    hasZeroResults,
    progress,
    currentMessage,
    searchWithSemantics,
    clearResults,
    cancelSearch
  }
}
