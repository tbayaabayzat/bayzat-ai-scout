
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
  erp?: boolean | null
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
        // Start with base query from company_search_flat and join companies2
        let query = supabase
          .from('company_search_flat')
          .select(`
            company_id,
            has_erp,
            has_hris,
            has_accounting,
            has_payroll,
            automation_overall,
            automation_hr,
            automation_finance,
            companies2!inner(
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
            )
          `)

        // Apply search filter on the joined table
        if (searchTerm && searchTerm.trim()) {
          console.log('Applying search filter for:', searchTerm)
          query = query.or(`companies2.company_name.ilike.%${searchTerm}%,companies2.description.ilike.%${searchTerm}%,companies2.industry.ilike.%${searchTerm}%`)
        }

        // Apply legacy relationship filters
        if (selectedFilter && selectedFilter.trim() && selectedFilter !== "all") {
          console.log('Applying specific filter:', selectedFilter)
          if (selectedFilter === "Customers Only") {
            query = query.eq('companies2.bayzat_relationship', 'customer')
          } else if (selectedFilter === "Prospects Only") {
            query = query.eq('companies2.bayzat_relationship', 'prospect')
          } else if (selectedFilter === "Legacy Systems") {
            query = query.lt('companies2.founded_year', 2015)
          }
        }

        // Apply systems filters
        if (systemsFilter.erp !== null && systemsFilter.erp !== undefined) {
          query = query.eq('has_erp', systemsFilter.erp)
          console.log(`Applied ERP filter: ${systemsFilter.erp}`)
        }
        if (systemsFilter.hris !== null && systemsFilter.hris !== undefined) {
          query = query.eq('has_hris', systemsFilter.hris)
          console.log(`Applied HRIS filter: ${systemsFilter.hris}`)
        }
        if (systemsFilter.accounting !== null && systemsFilter.accounting !== undefined) {
          query = query.eq('has_accounting', systemsFilter.accounting)
          console.log(`Applied Accounting filter: ${systemsFilter.accounting}`)
        }
        if (systemsFilter.payroll !== null && systemsFilter.payroll !== undefined) {
          query = query.eq('has_payroll', systemsFilter.payroll)
          console.log(`Applied Payroll filter: ${systemsFilter.payroll}`)
        }

        // Apply employee count filter
        if (employeeCountFilter.min !== undefined) {
          query = query.gte('companies2.employee_count', employeeCountFilter.min)
          console.log(`Applied employee count min filter: ${employeeCountFilter.min}`)
        }
        if (employeeCountFilter.max !== undefined) {
          query = query.lte('companies2.employee_count', employeeCountFilter.max)
          console.log(`Applied employee count max filter: ${employeeCountFilter.max}`)
        }

        // Apply automation score filter
        if (automationFilter.min !== undefined || automationFilter.max !== undefined) {
          const automationColumn = automationFilter.department === 'hr' ? 'automation_hr' :
                                  automationFilter.department === 'finance' ? 'automation_finance' :
                                  'automation_overall'
          
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
        const transformedData: Company[] = (data || []).map(item => {
          // Since companies2 is joined with !inner, it should be a single object, not an array
          const company = Array.isArray(item.companies2) ? item.companies2[0] : item.companies2
          
          return {
            id: company.id,
            company_name: company.company_name,
            website_url: company.website_url,
            industry: company.industry,
            headquarter: company.headquarter,
            employee_count: company.employee_count,
            bayzat_relationship: company.bayzat_relationship,
            ai_analysis: company.ai_analysis,
            description: company.description,
            founded_year: company.founded_year,
            has_erp: item.has_erp,
            has_hris: item.has_hris,
            has_accounting: item.has_accounting,
            has_payroll: item.has_payroll,
            automation_overall: item.automation_overall,
            automation_hr: item.automation_hr,
            automation_finance: item.automation_finance,
          }
        })
        
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
