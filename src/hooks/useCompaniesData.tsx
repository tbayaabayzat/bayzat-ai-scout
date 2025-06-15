
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
        // Build the SQL query with explicit JOIN
        let sqlQuery = `
          SELECT 
            c.*,
            csf.has_erp,
            csf.has_hris,
            csf.has_accounting,
            csf.has_payroll
          FROM companies2 c
          LEFT JOIN company_search_flat csf ON c.id = csf.company_id
          WHERE 1=1
        `
        
        const params: any[] = []
        let paramCounter = 1

        // Apply search filter
        if (searchTerm && searchTerm.trim()) {
          console.log('Applying search filter for:', searchTerm)
          sqlQuery += ` AND (
            c.company_name ILIKE $${paramCounter} OR 
            c.description ILIKE $${paramCounter} OR 
            c.industry ILIKE $${paramCounter}
          )`
          params.push(`%${searchTerm}%`)
          paramCounter++
        }

        // Apply specific filters
        if (selectedFilter && selectedFilter.trim()) {
          console.log('Applying specific filter:', selectedFilter)
          if (selectedFilter === "Customers Only") {
            sqlQuery += ` AND c.bayzat_relationship = $${paramCounter}`
            params.push('customer')
            paramCounter++
          } else if (selectedFilter === "Prospects Only") {
            sqlQuery += ` AND c.bayzat_relationship = $${paramCounter}`
            params.push('prospect')
            paramCounter++
          } else if (selectedFilter === "Legacy Systems") {
            sqlQuery += ` AND c.founded_year < $${paramCounter}`
            params.push(2015)
            paramCounter++
          }
        }

        sqlQuery += ` LIMIT 100`

        console.log('Executing SQL query:', sqlQuery)
        console.log('With params:', params)

        const { data, error } = await supabase.rpc('', {}, { 
          get: false,
          post: true,
          body: {
            query: sqlQuery,
            params: params
          }
        }).select('*')

        // Fallback to using the SQL directly via rpc call
        const result = await supabase
          .from('companies2')
          .select(`
            *,
            company_search_flat:company_search_flat!company_search_flat_company_id_fkey(
              has_erp,
              has_hris,
              has_accounting,
              has_payroll
            )
          `)
          .limit(100)

        if (result.error) {
          console.error('Query error details:', {
            message: result.error.message,
            details: result.error.details,
            hint: result.error.hint,
            code: result.error.code
          })
          throw result.error
        }
        
        console.log('Query successful!')
        console.log('Raw data received:', result.data)
        console.log('Number of records:', result.data?.length || 0)
        
        // Transform and filter the data
        let transformedData = result.data?.map(company => {
          const searchFlat = company.company_search_flat?.[0] || {}
          
          return {
            ...company,
            has_erp: searchFlat.has_erp || false,
            has_hris: searchFlat.has_hris || false,
            has_accounting: searchFlat.has_accounting || false,
            has_payroll: searchFlat.has_payroll || false,
          }
        }) || []

        // Apply search filter client-side if needed
        if (searchTerm && searchTerm.trim()) {
          transformedData = transformedData.filter(company =>
            company.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }

        // Apply specific filters client-side if needed
        if (selectedFilter && selectedFilter.trim()) {
          if (selectedFilter === "Customers Only") {
            transformedData = transformedData.filter(company => company.bayzat_relationship === 'customer')
          } else if (selectedFilter === "Prospects Only") {
            transformedData = transformedData.filter(company => company.bayzat_relationship === 'prospect')
          } else if (selectedFilter === "Legacy Systems") {
            transformedData = transformedData.filter(company => company.founded_year && company.founded_year < 2015)
          }
        }

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
