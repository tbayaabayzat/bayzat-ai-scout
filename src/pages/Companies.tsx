
import { useState, useMemo } from "react"
import { useCompaniesData } from "@/hooks/useCompaniesData"
import { CompaniesHeader } from "@/components/CompaniesHeader"
import { CompaniesFilters } from "@/components/CompaniesFilters"
import { CompaniesTable } from "@/components/CompaniesTable"

export default function Companies() {
  const [semanticCompanyIds, setSemanticCompanyIds] = useState<string[]>([])
  const [activeSemanticQuery, setActiveSemanticQuery] = useState<string>("")
  
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

  // Memoize filtered companies to maintain stable references
  const filteredCompanies = useMemo(() => {
    console.log('Companies.tsx - Recalculating filtered companies:', {
      totalCompanies: companies?.length,
      semanticIds: semanticCompanyIds.length,
      hasSemanticFilter: semanticCompanyIds.length > 0
    })
    
    return semanticCompanyIds.length > 0 
      ? (companies || []).filter(company => semanticCompanyIds.includes(company.id))
      : (companies || [])
  }, [companies, semanticCompanyIds])

  const handleSemanticFilter = (companyIds: string[], query?: string) => {
    setSemanticCompanyIds(companyIds)
    setActiveSemanticQuery(query || "")
    // Clear traditional search when using semantic search
    if (companyIds.length > 0) {
      setSearchTerm("")
    }
    console.log('Semantic filter applied:', { companyIds: companyIds.length, query })
  }

  const handleClearSemanticFilter = () => {
    setSemanticCompanyIds([])
    setActiveSemanticQuery("")
    console.log('Semantic filter cleared')
  }

  // Check if we have an active semantic search with zero results
  const hasActiveSemanticSearchWithZeroResults = activeSemanticQuery && semanticCompanyIds.length === 0

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <CompaniesHeader />
      
      <CompaniesFilters
        onSearch={setSearchTerm}
        onSemanticFilter={handleSemanticFilter}
        onClearSemanticFilter={handleClearSemanticFilter}
        activeSemanticQuery={activeSemanticQuery}
        systemsFilter={systemsFilter}
        onSystemsFilterChange={setSystemsFilter}
        employeeCountFilter={employeeCountFilter}
        onEmployeeCountFilterChange={setEmployeeCountFilter}
        automationFilter={automationFilter}
        onAutomationFilterChange={setAutomationFilter}
      />

      <CompaniesTable
        companies={filteredCompanies}
        isLoading={isLoading}
        error={error}
        emptyStateMessage={hasActiveSemanticSearchWithZeroResults 
          ? `Your AI search for "${activeSemanticQuery}" didn't find any matching companies.`
          : undefined
        }
        semanticFilterActive={semanticCompanyIds.length > 0}
      />
    </div>
  )
}
