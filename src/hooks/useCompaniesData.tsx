
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

        console.log('Executing query...')
        const { data, error } = await query.limit(100)
        
        if (error) {
          console.error('Query error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          throw error
        }
        
        console.log('Query successful!')
        console.log('Raw data received:', data)
        console.log('Number of records:', data?.length || 0)
        
        if (data && data.length > 0) {
          console.log('Sample record:', data[0])
        } else {
          console.log('No data returned from query')
        }
        
        return data || []
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
    setSelectedFilter
  }
}
