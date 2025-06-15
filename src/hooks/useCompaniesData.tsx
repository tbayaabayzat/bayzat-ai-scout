
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
            founded_year
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
        
        // Transform the data to extract system and automation info from ai_analysis
        const transformedData = data?.map(company => {
          const aiAnalysis = company.ai_analysis || {}
          const systems = aiAnalysis.systems || {}
          const automationLevel = aiAnalysis.automation_level || {}
          
          return {
            ...company,
            has_erp: systems.ERP?.name && systems.ERP.name !== 'None',
            has_hris: systems.HRIS?.name && systems.HRIS.name !== 'None',
            has_accounting: systems.Accounting?.name && systems.Accounting.name !== 'None',
            has_payroll: systems.Payroll?.name && systems.Payroll.name !== 'None',
            automation_hr: automationLevel.hr || 0,
            automation_finance: automationLevel.finance || 0,
            automation_overall: automationLevel.overall || 0,
          }
        }) || []

        // Apply system filters after transformation
        let filteredData = transformedData
        if (systemFilters && systemFilters.length > 0) {
          console.log('Applying system filters:', systemFilters)
          filteredData = transformedData.filter(company => {
            return systemFilters.every(filter => {
              if (filter === "Has ERP") return company.has_erp
              if (filter === "Has HRIS") return company.has_hris
              if (filter === "Has Accounting") return company.has_accounting
              if (filter === "Has Payroll") return company.has_payroll
              return true
            })
          })
        }
        
        console.log('Transformed and filtered data:', filteredData)
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
    systemFilters,
    setSystemFilters
  }
}
