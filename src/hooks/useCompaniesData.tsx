
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

  // COMPREHENSIVE DEBUG LOGGING FOR AQUANOW INVESTIGATION
  console.log('=== useCompaniesData COMPREHENSIVE DEBUG ===')
  console.log('1. FILTER STATES:', {
    searchTerm: filters.searchTerm,
    systemsFilter: filters.systemsFilter,
    employeeCountFilter: filters.employeeCountFilter,
    automationFilter: filters.automationFilter,
    countryFilter: filters.countryFilter,
    relationshipFilter: filters.relationshipFilter,
    'relationshipFilter.selectedRelationships': filters.relationshipFilter?.selectedRelationships,
    'countryFilter.selectedCountries': filters.countryFilter?.selectedCountries
  })
  
  console.log('2. QUERY PARAMETERS BEING PASSED:', {
    searchTerm: filters.searchTerm,
    systemsFilter: filters.systemsFilter,
    employeeCountFilter: filters.employeeCountFilter,
    automationFilter: filters.automationFilter,
    countryFilter: filters.countryFilter,
    relationshipFilter: filters.relationshipFilter
  })
  
  console.log('3. QUERY RESULT:', { 
    isLoading, 
    hasError: !!error, 
    errorMessage: error?.message,
    companiesCount: companies?.length,
    companiesReceived: !!companies
  })
  
  if (companies) {
    console.log('4. COMPANIES SAMPLE (first 5):', companies.slice(0, 5).map(c => ({ 
      name: c.company_name, 
      relationship: c.bayzat_relationship,
      country: c.headquarter?.country,
      id: c.id
    })))
    
    // Check relationship distribution
    const relationshipStats = companies.reduce((acc, c) => {
      const rel = c.bayzat_relationship || 'unknown'
      acc[rel] = (acc[rel] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    console.log('5. RELATIONSHIP DISTRIBUTION:', relationshipStats)
    
    // Specific Aquanow search (multiple variations)
    const aquanowVariations = [
      companies.find(c => c.company_name?.toLowerCase() === 'aquanow'),
      companies.find(c => c.company_name?.toLowerCase().includes('aquanow')),
      companies.find(c => c.company_name?.includes('Aquanow')),
      companies.find(c => c.company_name?.toUpperCase().includes('AQUANOW'))
    ]
    
    console.log('6. AQUANOW SEARCH RESULTS:')
    aquanowVariations.forEach((result, index) => {
      const searchTypes = ['exact lowercase', 'includes lowercase', 'includes mixed case', 'includes uppercase']
      if (result) {
        console.log(`   ${searchTypes[index]}: FOUND`, {
          name: result.company_name,
          relationship: result.bayzat_relationship,
          country: result.headquarter?.country,
          id: result.id,
          hasAllRequiredFields: !!(result.company_name && result.bayzat_relationship)
        })
      } else {
        console.log(`   ${searchTypes[index]}: NOT FOUND`)
      }
    })
    
    // Check for any customers in the results
    const customers = companies.filter(c => c.bayzat_relationship === 'customer')
    console.log('7. CUSTOMERS IN RESULTS:', {
      count: customers.length,
      sample: customers.slice(0, 3).map(c => ({ name: c.company_name, country: c.headquarter?.country }))
    })
    
    // Check for companies with 'CA' country
    const canadianCompanies = companies.filter(c => c.headquarter?.country === 'CA')
    console.log('8. CANADIAN COMPANIES (CA):', {
      count: canadianCompanies.length,
      companies: canadianCompanies.map(c => ({ 
        name: c.company_name, 
        relationship: c.bayzat_relationship,
        country: c.headquarter?.country 
      }))
    })
  } else {
    console.log('4. NO COMPANIES DATA RECEIVED')
  }

  return {
    companies,
    isLoading,
    error,
    ...filters
  }
}

// Re-export types for backward compatibility
export type { Company, SystemsFilter, EmployeeCountFilter, AutomationFilter, RelationshipFilter } from "@/types/company"
