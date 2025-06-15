
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
  // Fields from ai_analysis extraction
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
  selectedScores?: number[]
  department?: 'overall' | 'hr' | 'finance'
}

// Helper functions to extract data from ai_analysis
const extractSystemBoolean = (aiAnalysis: any, systemName: string): boolean => {
  if (!aiAnalysis?.systems?.[systemName]) return false
  return aiAnalysis.systems[systemName].name !== "None"
}

const extractAutomationScore = (aiAnalysis: any, department: string): number => {
  if (!aiAnalysis?.automation_level) return 0
  return aiAnalysis.automation_level[department] || 0
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
        // Query directly from companies2 table
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

        // Apply search filter
        if (searchTerm && searchTerm.trim()) {
          console.log('Applying search filter for:', searchTerm)
          query = query.or(`company_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`)
        }

        // Apply legacy relationship filters
        if (selectedFilter && selectedFilter.trim() && selectedFilter !== "all") {
          console.log('Applying specific filter:', selectedFilter)
          if (selectedFilter === "Customers Only") {
            query = query.eq('bayzat_relationship', 'customer')
          } else if (selectedFilter === "Prospects Only") {
            query = query.eq('bayzat_relationship', 'prospect')
          } else if (selectedFilter === "Legacy Systems") {
            query = query.lt('founded_year', 2015)
          }
        }

        // Apply employee count filter
        if (employeeCountFilter.min !== undefined) {
          query = query.gte('employee_count', employeeCountFilter.min)
          console.log(`Applied employee count min filter: ${employeeCountFilter.min}`)
        }
        if (employeeCountFilter.max !== undefined) {
          query = query.lte('employee_count', employeeCountFilter.max)
          console.log(`Applied employee count max filter: ${employeeCountFilter.max}`)
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
        
        // Transform the data and extract systems/automation info from ai_analysis
        let transformedData: Company[] = (data || []).map(item => {
          const company: Company = {
            id: item.id,
            company_name: item.company_name,
            website_url: item.website_url,
            industry: item.industry,
            headquarter: item.headquarter,
            employee_count: item.employee_count,
            bayzat_relationship: item.bayzat_relationship,
            ai_analysis: item.ai_analysis,
            description: item.description,
            founded_year: item.founded_year,
            // Extract systems data from ai_analysis
            has_erp: extractSystemBoolean(item.ai_analysis, 'ERP'),
            has_hris: extractSystemBoolean(item.ai_analysis, 'HRIS'),
            has_accounting: extractSystemBoolean(item.ai_analysis, 'Accounting'),
            has_payroll: extractSystemBoolean(item.ai_analysis, 'Payroll'),
            // Extract automation scores from ai_analysis
            automation_overall: extractAutomationScore(item.ai_analysis, 'overall'),
            automation_hr: extractAutomationScore(item.ai_analysis, 'hr'),
            automation_finance: extractAutomationScore(item.ai_analysis, 'finance'),
          }
          return company
        })

        // Apply systems filters on the transformed data
        if (systemsFilter.erp !== null && systemsFilter.erp !== undefined) {
          transformedData = transformedData.filter(company => company.has_erp === systemsFilter.erp)
          console.log(`Applied ERP filter: ${systemsFilter.erp}`)
        }
        if (systemsFilter.hris !== null && systemsFilter.hris !== undefined) {
          transformedData = transformedData.filter(company => company.has_hris === systemsFilter.hris)
          console.log(`Applied HRIS filter: ${systemsFilter.hris}`)
        }
        if (systemsFilter.accounting !== null && systemsFilter.accounting !== undefined) {
          transformedData = transformedData.filter(company => company.has_accounting === systemsFilter.accounting)
          console.log(`Applied Accounting filter: ${systemsFilter.accounting}`)
        }
        if (systemsFilter.payroll !== null && systemsFilter.payroll !== undefined) {
          transformedData = transformedData.filter(company => company.has_payroll === systemsFilter.payroll)
          console.log(`Applied Payroll filter: ${systemsFilter.payroll}`)
        }

        // Apply automation score filter on the transformed data
        if (automationFilter.selectedScores && automationFilter.selectedScores.length > 0) {
          const automationField = automationFilter.department === 'hr' ? 'automation_hr' :
                                  automationFilter.department === 'finance' ? 'automation_finance' :
                                  'automation_overall'
          
          transformedData = transformedData.filter(company => {
            const score = company[automationField as keyof Company] as number || 0
            return automationFilter.selectedScores!.includes(score)
          })
          
          console.log(`Applied automation filter: ${automationField} scores=${automationFilter.selectedScores.join(',')}`)
        }
        
        console.log('Filtered data length:', transformedData.length)
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
