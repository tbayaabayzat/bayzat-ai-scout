
import { useState } from "react"
import { useCompaniesData } from "@/hooks/useCompaniesData"
import { CompaniesHeader } from "@/components/CompaniesHeader"
import { CompaniesFilters } from "@/components/CompaniesFilters"
import { CompaniesTable } from "@/components/CompaniesTable"

export default function Companies() {
  const [isSemanticSearchLoading, setIsSemanticSearchLoading] = useState(false)
  
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

  const handleSemanticSearch = async (query: string, results?: any[]) => {
    setIsSemanticSearchLoading(true)
    
    try {
      // TODO: Integrate with n8n workflow
      console.log('Processing semantic search:', query)
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For now, just use it as a regular search term
      // Later this will be replaced with filtering based on n8n results
      setSearchTerm(query)
      
    } catch (error) {
      console.error('Semantic search error:', error)
    } finally {
      setIsSemanticSearchLoading(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <CompaniesHeader />
      
      <CompaniesFilters
        onSearch={setSearchTerm}
        onSemanticSearch={handleSemanticSearch}
        systemsFilter={systemsFilter}
        onSystemsFilterChange={setSystemsFilter}
        employeeCountFilter={employeeCountFilter}
        onEmployeeCountFilterChange={setEmployeeCountFilter}
        automationFilter={automationFilter}
        onAutomationFilterChange={setAutomationFilter}
        isSemanticSearchLoading={isSemanticSearchLoading}
      />

      <CompaniesTable
        companies={companies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
