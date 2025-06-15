
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
}

export function useCompaniesData() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter],
    queryFn: async () => {
      console.log('=== Starting companies fetch ===')
      console.log('Search term:', searchTerm)
      console.log('Selected filter:', selectedFilter)
      
      try {
        let query = supabase
          .from('companies2')
          .select('*')

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
        } else {
          console.log('No specific filter applied - showing all companies')
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
        
        if (data && data.length > 0) {
          console.log('Sample record structure:')
          console.log('- Full record:', data[0])
          console.log('- Company name:', data[0]?.company_name)
          console.log('- AI analysis exists:', !!data[0]?.ai_analysis)
          console.log('- AI analysis type:', typeof data[0]?.ai_analysis)
          console.log('- AI analysis structure:', data[0]?.ai_analysis)
          
          // Check for automation data specifically with proper type checking
          if (data[0]?.ai_analysis && typeof data[0].ai_analysis === 'object') {
            const aiAnalysis = data[0].ai_analysis as any
            console.log('- Automation level exists:', !!aiAnalysis?.automation_level)
            console.log('- Automation level structure:', aiAnalysis?.automation_level)
            console.log('- Systems inventory exists:', !!aiAnalysis?.systems)
            console.log('- Systems inventory structure:', aiAnalysis?.systems)
          }
          
          // Check relationship field
          console.log('- Bayzat relationship:', data[0]?.bayzat_relationship)
        } else {
          console.log('No data returned from main query')
        }
        
        return data || []
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
  console.log('Companies is undefined:', companies === undefined)
  console.log('Companies is null:', companies === null)

  return {
    companies,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter
  }
}
