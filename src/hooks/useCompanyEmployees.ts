import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Employee, EmployeeWithDepartment } from "@/types/employee"
import { Department } from "@/utils/employeeDepartmentUtils"

export function useCompanyEmployees(companyId: string | number | null | undefined) {
  const { data: employees, isLoading, error, refetch } = useQuery({
    queryKey: ['company-employees', companyId],
    queryFn: async () => {
      if (!companyId) {
        console.log('No company ID provided')
        return []
      }

      console.log('Fetching employees for company ID:', companyId)
      
      let query = supabase.from('employee_profiles').select('*')
      
      // Try different lookup strategies based on the type of company identifier
      if (typeof companyId === 'string' && !companyId.match(/^\d+$/)) {
        // If it's a string that's not just numbers, try company name lookup
        console.log('Looking up by company name:', companyId)
        query = query.eq('current_company_name', companyId)
      } else {
        // Otherwise, try URN lookup
        console.log('Looking up by company URN:', companyId)
        query = query.eq('current_company_urn', companyId.toString())
      }
      
      const { data, error } = await query.limit(50)

      if (error) {
        console.error('Error fetching employees:', error)
        throw error
      }

      console.log(`Found ${data?.length || 0} employees for company ID ${companyId}`)
      
      // Map employees to include department from database, handling the updated department names
      const employeesWithDepartments = data?.map(employee => {
        let department = employee.department || 'Other'
        
        // Map database department names to our frontend department types
        const departmentMapping: Record<string, Department> = {
          'Engineering': 'Engineering',
          'IT': 'IT', 
          'Sales': 'Sales',
          'Marketing': 'Marketing',
          'Human Resources': 'HR',
          'HR': 'HR',
          'Finance & Accounting': 'Finance',
          'Finance': 'Finance',
          'Procurement': 'Procurement',
          'Operations': 'Operations',
          'Customer Success': 'Customer Success',
          'Product Management': 'Product Management',
          'Executive': 'Executive',
          'Other': 'Other'
        }
        
        const mappedDepartment = departmentMapping[department] || 'Other'
        
        return {
          ...employee,
          department: mappedDepartment as Department
        }
      }) as EmployeeWithDepartment[]

      return employeesWithDepartments || []
    },
    enabled: !!companyId,
    refetchInterval: 30000, // Refetch every 30 seconds to pick up new classifications
  })

  return {
    employees: employees || [],
    isLoading,
    error,
    refetch
  }
}
