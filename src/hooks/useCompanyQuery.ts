
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Company, SystemsFilter, EmployeeCountFilter, AutomationFilter, CountryFilter, RelationshipFilter } from "@/types/company"
import { transformCompanyData } from "@/utils/companyDataUtils"

interface UseCompanyQueryParams {
  searchTerm: string
  systemsFilter: SystemsFilter
  employeeCountFilter: EmployeeCountFilter
  automationFilter: AutomationFilter
  countryFilter: CountryFilter
  relationshipFilter: RelationshipFilter
}

export function useCompanyQuery({
  searchTerm,
  systemsFilter,
  employeeCountFilter,
  automationFilter,
  countryFilter,
  relationshipFilter
}: UseCompanyQueryParams) {
  return useQuery({
    queryKey: [
      'companies', 
      searchTerm, 
      systemsFilter, 
      employeeCountFilter, 
      automationFilter, 
      countryFilter?.selectedCountries, // Use specific property for better cache key
      relationshipFilter,
      'v2' // Force cache bust
    ],
    queryFn: async () => {
      console.log('=== COMPREHENSIVE COMPANIES FETCH DEBUG ===')
      console.log('🔍 AQUANOW INVESTIGATION: All input parameters:')
      console.log('1. Search term:', searchTerm, '(type:', typeof searchTerm, ')')
      console.log('2. Systems filter:', systemsFilter)
      console.log('3. Employee count filter:', employeeCountFilter)
      console.log('4. Automation filter:', automationFilter)
      console.log('5. Country filter:', countryFilter)
      console.log('6. Relationship filter:', relationshipFilter)
      console.log('📋 This query should include ALL relationships unless specifically filtered')
      console.log('🎯 Aquanow is a CUSTOMER - it should appear unless relationship filter excludes customers')
      
      try {
        // Query directly from companies2 table - include logo_url and company_id
        let query = supabase
          .from('companies2')
          .select(`
            id,
            company_id,
            company_name,
            website_url,
            logo_url,
            url,
            tagline,
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

        // Apply employee count filter
        if (employeeCountFilter.min !== undefined) {
          query = query.gte('employee_count', employeeCountFilter.min)
          console.log(`Applied employee count min filter: ${employeeCountFilter.min}`)
        }
        if (employeeCountFilter.max !== undefined) {
          query = query.lte('employee_count', employeeCountFilter.max)
          console.log(`Applied employee count max filter: ${employeeCountFilter.max}`)
        }

        // Apply country filter - if no countries selected, show all companies
        console.log('Country filter state:', { countryFilter, selectedCountries: countryFilter?.selectedCountries })
        if (countryFilter?.selectedCountries && countryFilter.selectedCountries.length > 0) {
          const hasOther = countryFilter.selectedCountries.includes('OTHER')
          const specificCountries = countryFilter.selectedCountries.filter(c => c !== 'OTHER')
          
          if (hasOther && specificCountries.length > 0) {
            // If both specific countries and "Other" are selected, include all
            // This means: (SA OR AE OR NOT (SA OR AE)) which is everything
            // So we don't apply any country filter
            console.log('All countries selected (specific + other), no country filter applied')
          } else if (hasOther) {
            // Only "Other" selected - exclude SA and AE (case-insensitive)
            query = query.not('headquarter->>country', 'in', '("SA","AE","sa","ae")')
            console.log('Applied "Other" country filter: excluding SA, AE, sa, ae')
          } else if (specificCountries.length > 0) {
            // Only specific countries selected
            query = query.in('headquarter->>country', specificCountries)
            console.log(`Applied specific country filter: ${specificCountries.join(',')}`)
          }
        } else {
          // No countries selected - show all companies by default
          console.log('No country filter applied - showing all companies')
        }

        // Apply relationship filter - CRITICAL: Only filter if relationships are explicitly selected
        console.log('=== RELATIONSHIP FILTER DEBUG ===')
        console.log('relationshipFilter object:', relationshipFilter)
        console.log('relationshipFilter?.selectedRelationships:', relationshipFilter?.selectedRelationships)
        console.log('selectedRelationships length:', relationshipFilter?.selectedRelationships?.length)
        console.log('Is selectedRelationships array?', Array.isArray(relationshipFilter?.selectedRelationships))
        
        if (relationshipFilter?.selectedRelationships && relationshipFilter.selectedRelationships.length > 0) {
          query = query.in('bayzat_relationship', relationshipFilter.selectedRelationships)
          console.log('✅ APPLIED relationship filter - ONLY showing:', relationshipFilter.selectedRelationships)
          console.log('⚠️  This will EXCLUDE companies with other relationships!')
          console.log('⚠️  For example, if filtering for "prospect", customers like Aquanow will be HIDDEN')
        } else {
          console.log('✅ NO relationship filter applied - showing ALL relationships')
          console.log('✅ This means ALL customers, partners, and prospects should be visible')
          console.log('✅ Aquanow (customer) should be included in results')
        }

        console.log('Executing main query...')
        const { data, error } = await query
        
        if (error) {
          console.error('Main query error details:', error)
          throw error
        }
        
        console.log('Main query successful!')
        console.log('Raw data received:', data)
        console.log('Number of records:', data?.length || 0)
        console.log('Sample company data structure:', data?.[0])
        
        // Transform the data and extract systems/automation info from ai_analysis
        let transformedData: Company[] = transformCompanyData(data)

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
        
        console.log('🎯 FINAL RESULTS DEBUG - AQUANOW SPECIFIC:')
        console.log('Filtered data length:', transformedData.length)
        console.log('Sample transformed company:', transformedData[0])
        
        // Specific Aquanow search in final results
        const finalAquanow = transformedData.find(c => c.company_name?.toLowerCase().includes('aquanow'))
        console.log('🔍 Aquanow in FINAL results:', finalAquanow ? {
          name: finalAquanow.company_name,
          relationship: finalAquanow.bayzat_relationship,
          country: finalAquanow.headquarter?.country,
          id: finalAquanow.id
        } : '❌ NOT FOUND IN FINAL RESULTS')
        
        // Show relationship distribution in final results
        const finalRelationshipStats = transformedData.reduce((acc, c) => {
          const rel = c.bayzat_relationship || 'unknown'
          acc[rel] = (acc[rel] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        console.log('📊 Final relationship distribution:', finalRelationshipStats)
        
        return transformedData
      } catch (err) {
        console.error('Fetch error:', err)
        throw err
      }
    }
  })
}
