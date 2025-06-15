
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
  // Fields from company_search_flat
  has_erp?: boolean
  has_hris?: boolean
  has_accounting?: boolean
  has_payroll?: boolean
  automation_overall?: number
  automation_hr?: number
  automation_finance?: number
}

export type SystemsFilter = {
  erp?: boolean | null // null = don't filter, true = has, false = missing
  hris?: boolean | null
  accounting?: boolean | null
  payroll?: boolean | null
}

export type EmployeeCountFilter = {
  min?: number
  max?: number
}

export type AutomationFilter = {
  min?: number
  max?: number
  department?: 'overall' | 'hr' | 'finance'
}

export function useCompaniesData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [systemsFilter, setSystemsFilter] = useState<SystemsFilter>({})
  const [employeeCountFilter, setEmployeeCountFilter] = useState<EmployeeCountFilter>({})
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>({})

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter, systemsFilter, employeeCountFilter, automationFilter],
    queryFn: async () => {
      console.log('=== Starting companies fetch ===')
      console.log('Search term:', searchTerm)
      console.log('Selected filter:', selectedFilter)
      console.log('Systems filter:', systemsFilter)
      console.log('Employee count filter:', employeeCountFilter)
      console.log('Automation filter:', automationFilter)
      
      try {
        let query = supabase
          .from('companies2')
          .select(`
            *,
            company_search_flat!inner(
              has_erp,
              has_hris,
              has_accounting,
              has_payroll,
              automation_overall,
              automation_hr,
              automation_finance
            )
          `)

        // Apply search filter
        if (searchTerm && searchTerm.trim()) {
          console.log('Applying search filter for:', searchTerm)
          query = query.or(`company_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`)
        }

        // Apply legacy relationship filters
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

        // Apply systems filters
        Object.entries(systemsFilter).forEach(([system, value]) => {
          if (value !== null && value !== undefined) {
            const columnName = `company_search_flat.has_${system}`
            query = query.eq(columnName, value)
            console.log(`Applied systems filter: ${columnName} = ${value}`)
          }
        })

        // Apply employee count filter
        if (employeeCountFilter.min !== undefined) {
          query = query.gte('employee_count', employeeCountFilter.min)
          console.log(`Applied employee count min filter: ${employeeCountFilter.min}`)
        }
        if (employeeCountFilter.max !== undefined) {
          query = query.lte('employee_count', employeeCountFilter.max)
          console.log(`Applied employee count max filter: ${employeeCountFilter.max}`)
        }

        // Apply automation score filter
        if (automationFilter.min !== undefined || automationFilter.max !== undefined) {
          const automationColumn = automationFilter.department === 'hr' ? 'company_search_flat.automation_hr' :
                                  automationFilter.department === 'finance' ? 'company_search_flat.automation_finance' :
                                  'company_search_flat.automation_overall'
          
          if (automationFilter.min !== undefined) {
            query = query.gte(automationColumn, automationFilter.min)
            console.log(`Applied automation min filter: ${automationColumn} >= ${automationFilter.min}`)
          }
          if (automationFilter.max !== undefined) {
            query = query.lte(automationColumn, automationFilter.max)
            console.log(`Applied automation max filter: ${automationColumn} <= ${automationFilter.max}`)
          }
        }

        console.log('Executing main query...')
        const { data, error } = await query.limit(100)
        
        if (error) {
          console.error('Main query error details:', error)
          throw error
        }
        
        console.log('Main query successful!')
        console.log('Raw data received:', data)
        console.log('Number of records:', data?.length || 0)
        
        // Transform the data to flatten the joined fields
        const transformedData = data?.map(company => ({
          ...company,
          has_erp: company.company_search_flat?.[0]?.has_erp,
          has_hris: company.company_search_flat?.[0]?.has_hris,
          has_accounting: company.company_search_flat?.[0]?.has_accounting,
          has_payroll: company.company_search_flat?.[0]?.has_payroll,
          automation_overall: company.company_search_flat?.[0]?.automation_overall,
          automation_hr: company.company_search_flat?.[0]?.automation_hr,
          automation_finance: company.company_search_flat?.[0]?.automation_finance,
        })) || []
        
        return transformedData
      } catch (err) {
        console.error('Fetch error:', err)
        throw err
      }
    }
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
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    systemsFilter,
    setSystemsFilter,
    employeeCountFilter,
    setEmployeeCountFilter,
    automationFilter,
    setAutomationFilter
  }
}
