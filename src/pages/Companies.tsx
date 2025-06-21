
import { useState } from "react"
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

  // Filter companies based on semantic search results
  const filteredCompanies = semanticCompanyIds.length > 0 
    ? companies.filter(company => semanticCompanyIds.includes(company.id))
    : companies

  const handleSemanticFilter = (companyIds: string[], query?: string) => {
    setSemanticCompanyIds(companyIds)
    setActiveSemanticQuery(query || "")
    // Clear traditional search when using semantic search
    if (companyIds.length > 0) {
      setSearchTerm("")
    }
  }

  const handleClearSemanticFilter = () => {
    setSemanticCompanyIds([])
    setActiveSemanticQuery("")
  }

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
      />
    </div>
  )
}
