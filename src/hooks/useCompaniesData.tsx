
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
  automation_hr?: number
  automation_finance?: number
  automation_overall?: number
}

export function useCompaniesData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [systemFilters, setSystemFilters] = useState<string[]>([])

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter, systemFilters],
    queryFn: async () => {
      console.log('=== Starting companies fetch ===')
      console.log('Search term:', searchTerm)
      console.log('Selected filter:', selectedFilter)
      console.log('System filters:', systemFilters)
      
      try {
        let query = supabase
          .from('companies2')
          .select(`
            id,
            company_name,
            website_url,
            industry,
            headquarter,
            employee_count,
            bayzat_relationship,
            ai_analysis,
            description,
            founded_year,
            company_search_flat(
              has_erp,
              has_hris,
              has_accounting,
              has_payroll,
              automation_hr,
              automation_finance,
              automation_overall
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

        // Apply system filters
        if (systemFilters && systemFilters.length > 0) {
          console.log('Applying system filters:', systemFilters)
          systemFilters.forEach(filter => {
            if (filter === "Has ERP") {
              query = query.eq('company_search_flat.has_erp', true)
            } else if (filter === "Has HRIS") {
              query = query.eq('company_search_flat.has_hris', true)
            } else if (filter === "Has Accounting") {
              query = query.eq('company_search_flat.has_accounting', true)
            } else if (filter === "Has Payroll") {
              query = query.eq('company_search_flat.has_payroll', true)
            }
          })
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
        
        // Transform the data to flatten the company_search_flat fields
        const transformedData = data?.map(company => ({
          ...company,
          has_erp: company.company_search_flat?.[0]?.has_erp || false,
          has_hris: company.company_search_flat?.[0]?.has_hris || false,
          has_accounting: company.company_search_flat?.[0]?.has_accounting || false,
          has_payroll: company.company_search_flat?.[0]?.has_payroll || false,
          automation_hr: company.company_search_flat?.[0]?.automation_hr || 0,
          automation_finance: company.company_search_flat?.[0]?.automation_finance || 0,
          automation_overall: company.company_search_flat?.[0]?.automation_overall || 0,
        })) || []
        
        console.log('Transformed data:', transformedData)
        return transformedData
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
    systemFilters,
    setSystemFilters
  }
}
