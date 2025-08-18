
import { useCompanyFilters } from "@/hooks/useCompanyFilters"
import { useCompanyQuery } from "@/hooks/useCompanyQuery"

export function useCompaniesData() {
  const filters = useCompanyFilters()
  
  const { data: companies, isLoading, error } = useCompanyQuery({
    searchTerm: filters.searchTerm,
    systemsFilter: filters.systemsFilter,
    employeeCountFilter: filters.employeeCountFilter,
    automationFilter: filters.automationFilter,
    countryFilter: filters.countryFilter,
    relationshipFilter: filters.relationshipFilter
  })

  // Debug logging
  console.log('=== Component render state ===')
  console.log('Loading:', isLoading)
  console.log('Error:', error)
  console.log('Companies data:', companies)
  console.log('Companies length:', companies?.length)

  return {
    companies,
    isLoading,
    error,
    ...filters
  }
}

// Re-export types for backward compatibility
export type { Company, SystemsFilter, EmployeeCountFilter, AutomationFilter, RelationshipFilter } from "@/types/company"
