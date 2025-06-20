
import { useState } from "react"
import { useCompaniesData } from "@/hooks/useCompaniesData"
import { CompaniesHeader } from "@/components/CompaniesHeader"
import { CompaniesFilters } from "@/components/CompaniesFilters"
import { CompaniesTable } from "@/components/CompaniesTable"

export default function Companies() {
  const {
    companies,
    isLoading,
    error,
    setSearchTerm,
    systemsFilter,
    setSystemsFilter,
    employeeCountFilter,
    setEmployeeCountFilter,
    automationFilter,
    setAutomationFilter
  } = useCompaniesData()

  const [isSemanticSearchLoading, setIsSemanticSearchLoading] = useState(false)
  const [semanticSearchAbortController, setSemanticSearchAbortController] = useState<AbortController | null>(null)

  const handleSemanticSearch = async (query: string) => {
    console.log('Starting semantic search for:', query)
    
    // Create abort controller for cancellation
    const abortController = new AbortController()
    setSemanticSearchAbortController(abortController)
    setIsSemanticSearchLoading(true)

    try {
      // TODO: Replace with actual n8n workflow integration
      // For now, simulate the 40-second processing time
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 40000) // 40 seconds
        
        abortController.signal.addEventListener('abort', () => {
          clearTimeout(timeout)
          reject(new Error('Search cancelled'))
        })
      })

      // TODO: Process the results from n8n workflow
      // The workflow should return filtered company IDs or criteria
      // For now, we'll use the query as a search term
      console.log('Semantic search completed for:', query)
      setSearchTerm(query)
      
    } catch (error: any) {
      if (error.message !== 'Search cancelled') {
        console.error('Semantic search error:', error)
        // TODO: Show error toast to user
      }
    } finally {
      setIsSemanticSearchLoading(false)
      setSemanticSearchAbortController(null)
    }
  }

  const handleCancelSemanticSearch = () => {
    if (semanticSearchAbortController) {
      semanticSearchAbortController.abort()
      console.log('Semantic search cancelled by user')
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <CompaniesHeader />
      
      <CompaniesFilters
        onSearch={setSearchTerm}
        onSemanticSearch={handleSemanticSearch}
        isSemanticSearchLoading={isSemanticSearchLoading}
        onCancelSemanticSearch={handleCancelSemanticSearch}
        systemsFilter={systemsFilter}
        onSystemsFilterChange={setSystemsFilter}
        employeeCountFilter={employeeCountFilter}
        onEmployeeCountFilterChange={setEmployeeCountFilter}
        automationFilter={automationFilter}
        onAutomationFilterChange={setAutomationFilter}
      />

      <CompaniesTable
        companies={companies}
        isLoading={isLoading || isSemanticSearchLoading}
        error={error}
      />
    </div>
  )
}
