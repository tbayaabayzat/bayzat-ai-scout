
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export type Company = {
  id: string
  company_name: string
  website_url?: string
  industry?: string
  headquarter?: any
  employee_count?: number
  bayzat_relationship: string
  ai_analysis?: any
  description?: string
  founded_year?: number
  has_erp?: boolean
  has_hris?: boolean
  has_accounting?: boolean
  has_payroll?: boolean
}

export type SystemFilter = {
  has_erp: boolean
  has_hris: boolean
  has_accounting: boolean
  has_payroll: boolean
}

export function useCompaniesData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [systemFilter, setSystemFilter] = useState<SystemFilter>({
    has_erp: false,
    has_hris: false,
    has_accounting: false,
    has_payroll: false
  })

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter, systemFilter],
    queryFn: async () => {
      console.log('=== Starting companies fetch ===')
      console.log('Search term:', searchTerm)
      console.log('Selected filter:', selectedFilter)
      console.log('System filter:', systemFilter)
      
      try {
        let query = supabase
          .from('companies2')
          .select(`
            *,
            company_search_flat!inner(
              has_erp,
              has_hris,
              has_accounting,
              has_payroll
            )
          `)

        // Apply search filter only if search term is provided
        if (searchTerm && searchTerm.trim()) {
          console.log('Applying search filter for:', searchTerm)
          query = query.or(`company_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`)
        }

        // Apply specific filters only if a filter is actually selected
        if (selectedFilter && selectedFilter.trim()) {
          console.log('Applying specific filter:', selectedFilter)
          if (selectedFilter === "Customers Only") {
            query = query.eq('bayzat_relationship', 'customer')
          } else if (selectedFilter === "Prospects Only") {
            query = query.eq('bayzat_relationship', 'prospect')
          } else if (selectedFilter === "Legacy Systems") {
            query = query.lt('founded_year', 2015)
          }
        }

        console.log('Executing main query...')
        const { data, error } = await query.limit(100)
        
        if (error) {
          console.error('Main query error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          throw error
        }
        
        console.log('Main query successful!')
        console.log('Raw data received:', data)
        console.log('Number of records:', data?.length || 0)
        
        // Transform data to flatten company_search_flat fields
        const transformedData = data?.map(company => ({
          ...company,
          has_erp: company.company_search_flat?.has_erp || false,
          has_hris: company.company_search_flat?.has_hris || false,
          has_accounting: company.company_search_flat?.has_accounting || false,
          has_payroll: company.company_search_flat?.has_payroll || false,
        })) || []

        // Apply system filters client-side
        let filteredData = transformedData
        const activeSystemFilters = Object.entries(systemFilter).filter(([_, value]) => value)
        
        if (activeSystemFilters.length > 0) {
          console.log('Applying system filters:', activeSystemFilters)
          filteredData = transformedData.filter(company => {
            return activeSystemFilters.every(([key]) => {
              const systemKey = key as keyof SystemFilter
              return company[systemKey] === true
            })
          })
          console.log('Filtered data count:', filteredData.length)
        }
        
        return filteredData
      } catch (err) {
        console.error('Fetch error:', err)
        throw err
      }
    }
  })

  // Debug logging with better undefined handling
  console.log('=== Component render state ===')
  console.log('Loading:', isLoading)
  console.log('Error:', error)
  console.log('Companies data:', companies)
  console.log('Companies length:', companies?.length)

  return {
    companies,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    systemFilter,
    setSystemFilter
  }
}
