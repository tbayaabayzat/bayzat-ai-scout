
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Company, SystemsFilter, EmployeeCountFilter, AutomationFilter, CountryFilter, RelationshipFilter, RequestedByFilter } from "@/types/company"
import { transformCompanyData } from "@/utils/companyDataUtils"

interface UseCompanyQueryParams {
  searchTerm: string
  systemsFilter: SystemsFilter
  employeeCountFilter: EmployeeCountFilter
  automationFilter: AutomationFilter
  countryFilter: CountryFilter
  relationshipFilter: RelationshipFilter
  requestedByFilter: RequestedByFilter
}

export function useCompanyQuery({
  searchTerm,
  systemsFilter,
  employeeCountFilter,
  automationFilter,
  countryFilter,
  relationshipFilter,
  requestedByFilter
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
      requestedByFilter,
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
        // Query companies - we'll handle requested_by filtering after data transformation
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
          .order('company_name', { ascending: true })
          .limit(2000) // Increase limit to include all companies (current total: ~1662)

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
        
        // Helper function to extract LinkedIn company identifier (slug or numeric ID)
        const extractLinkedInCompanyId = (url: string): string | null => {
          if (!url) return null
          try {
            // Extract company identifier from LinkedIn URLs, ignoring subdomain differences
            // Handles: https://www.linkedin.com/company/abc, https://ae.linkedin.com/company/abc
            // Also handles: https://www.linkedin.com/company/123456 (numeric IDs)
            const match = url.match(/linkedin\.com\/company\/([^\/\?#]+)/i)
            return match ? match[1].toLowerCase().replace(/\/$/, '') : null
          } catch {
            return null
          }
        }

        // Get requested_by information for companies if needed
        // Key by BOTH slug and numeric ID for better matching
        let requestedByData: Record<string | number, string[]> = {}
        
        try {
          // Use type assertion to bypass type checking issue with auto-generated types
          const result = await supabase
            .from('linkedin_queue' as any)
            .select('linkedin_url, requester')
            .not('requester', 'is', null)
            .neq('requester', '')

          if (!result.error && result.data) {
            const linkedinData = result.data as any[]
            
            // Group requesters by company LinkedIn identifier (both slug and numeric ID)
            linkedinData.forEach((item: any) => {
              if (item.linkedin_url && item.requester) {
                const linkedinUrl = item.linkedin_url as string
                const requester = item.requester as string
                
                // Extract the company identifier (e.g., "aquanow" or "2300429")
                const companyId = extractLinkedInCompanyId(linkedinUrl)
                if (!companyId) return
                
                // Store by the extracted identifier (slug or numeric as string)
                if (!requestedByData[companyId]) {
                  requestedByData[companyId] = []
                }
                if (!requestedByData[companyId].includes(requester)) {
                  requestedByData[companyId].push(requester)
                }
                
                // If it's numeric, also store by the number itself for company_id matching
                const numericId = parseInt(companyId, 10)
                if (!isNaN(numericId)) {
                  if (!requestedByData[numericId]) {
                    requestedByData[numericId] = []
                  }
                  if (!requestedByData[numericId].includes(requester)) {
                    requestedByData[numericId].push(requester)
                  }
                }
              }
            })
            
            // Debug: Show specific requester data
            const uniqueRequesters = [...new Set(Object.values(requestedByData).flat())]
            console.log(`✅ Built requestedByData index with ${Object.keys(requestedByData).length} company IDs and ${uniqueRequesters.length} unique requesters`)
            console.log('Sample company IDs:', Object.keys(requestedByData).slice(0, 5))
            console.log('Sample requesters:', uniqueRequesters.slice(0, 5))
            
            const selectedRequester = requestedByFilter?.selectedRequesters?.[0]
            if (selectedRequester) {
              const companyIdsForRequester = Object.entries(requestedByData)
                .filter(([id, requesters]) => requesters.includes(selectedRequester))
                .map(([id]) => id)
              console.log(`Found ${companyIdsForRequester.length} company IDs for requester "${selectedRequester}"`)
              console.log('Sample company IDs:', companyIdsForRequester.slice(0, 3))
            }
          }
        } catch (err) {
          console.error('Failed to fetch requested_by data:', err)
        }

        // Transform the data and extract systems/automation info from ai_analysis
        let transformedData: Company[] = transformCompanyData(data, requestedByData)

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

        // Apply automation score filters on the transformed data
        if (automationFilter.overall !== undefined) {
          transformedData = transformedData.filter(company => {
            const score = company.automation_overall || 0
            return score === automationFilter.overall
          })
          console.log(`Applied overall automation filter: ${automationFilter.overall}`)
        }
        
        if (automationFilter.hr !== undefined) {
          transformedData = transformedData.filter(company => {
            const score = company.automation_hr || 0
            return score === automationFilter.hr
          })
          console.log(`Applied HR automation filter: ${automationFilter.hr}`)
        }
        
        if (automationFilter.finance !== undefined) {
          transformedData = transformedData.filter(company => {
            const score = company.automation_finance || 0
            return score === automationFilter.finance
          })
          console.log(`Applied finance automation filter: ${automationFilter.finance}`)
        }

        // Apply requested by filter after data transformation
        console.log('=== REQUESTED BY FILTER DEBUG ===')
        console.log('requestedByFilter object:', requestedByFilter)
        console.log('requestedByFilter?.selectedRequesters:', requestedByFilter?.selectedRequesters)
        console.log('Available requestedByData keys sample:', Object.keys(requestedByData).slice(0, 5))
        
        if (requestedByFilter?.selectedRequesters && requestedByFilter.selectedRequesters.length > 0) {
          const initialCount = transformedData.length
          transformedData = transformedData.filter(company => {
            // Extract company identifiers from URL fields (slugs)
            const possibleIds: Array<string | number> = [
              extractLinkedInCompanyId(company.url || ''),
              extractLinkedInCompanyId(company.website_url || '')
            ].filter(Boolean) as string[]
            
            // ALSO add the numeric company_id if available
            if (company.company_id) {
              possibleIds.push(company.company_id)
            }
            
            // Check if any company identifier matches our requestedByData
            let companyRequesters: string[] = []
            for (const companyId of possibleIds) {
              if (requestedByData[companyId]) {
                companyRequesters = requestedByData[companyId]
                break
              }
            }
            
            const hasMatch = requestedByFilter.selectedRequesters!.some(requester => 
              companyRequesters.includes(requester)
            )
            
            if (hasMatch) {
              console.log(`✅ Company "${company.company_name}" (IDs: ${possibleIds.join(', ')}) matches requester filter:`, companyRequesters)
            }
            
            return hasMatch
          })
          console.log(`✅ APPLIED requested by filter - filtered from ${initialCount} to ${transformedData.length} companies`)
          console.log('Selected requesters:', requestedByFilter.selectedRequesters)
        } else {
          console.log('✅ NO requested by filter applied - showing all companies')
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
