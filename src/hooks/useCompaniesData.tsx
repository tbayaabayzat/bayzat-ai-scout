
import { useCompanyFilters } from "@/hooks/useCompanyFilters"
import { useCompanyQuery } from "@/hooks/useCompanyQuery"

export function useCompaniesData() {
  const filters = useCompanyFilters()
  
  // Force cache invalidation by including a timestamp in development
  const { data: companies, isLoading, error } = useCompanyQuery({
    searchTerm: filters.searchTerm,
    systemsFilter: filters.systemsFilter,
    employeeCountFilter: filters.employeeCountFilter,
    automationFilter: filters.automationFilter,
    countryFilter: filters.countryFilter,
    relationshipFilter: filters.relationshipFilter
  })

  // Enhanced debug logging
  console.log('=== useCompaniesData Debug ===')
  console.log('Filter states:', {
    searchTerm: filters.searchTerm,
    countryFilter: filters.countryFilter,
    selectedCountries: filters.countryFilter?.selectedCountries
  })
  console.log('Query result:', { isLoading, error, companiesCount: companies?.length })
  console.log('Sample companies:', companies?.slice(0, 3)?.map(c => ({ 
    name: c.company_name, 
    country: c.headquarter?.country,
    id: c.id
  })))
  
  // Check if Aquanow is in the results
  const aquanow = companies?.find(c => c.company_name?.toLowerCase().includes('aquanow'))
  console.log('Aquanow found in results:', aquanow ? { 
    name: aquanow.company_name, 
    country: aquanow.headquarter?.country,
    id: aquanow.id 
  } : 'NOT FOUND')

  return {
    companies,
    isLoading,
    error,
    ...filters
  }
}

// Re-export types for backward compatibility
export type { Company, SystemsFilter, EmployeeCountFilter, AutomationFilter, RelationshipFilter } from "@/types/company"
