
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Employee, EmployeeWithDepartment } from "@/types/employee"
import { Department } from "@/utils/employeeDepartmentUtils"

export function useCompanyEmployees(companyId: string | number | null | undefined) {
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['company-employees', companyId],
    queryFn: async () => {
      if (!companyId) {
        console.log('No company ID provided')
        return []
      }

      console.log('Fetching employees for company ID:', companyId)
      
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('current_company_urn', companyId.toString())
        .limit(50)

      if (error) {
        console.error('Error fetching employees:', error)
        throw error
      }

      console.log(`Found ${data?.length || 0} employees for company ID ${companyId}`)
      
      // Map employees to include department from database
      const employeesWithDepartments = data?.map(employee => ({
        ...employee,
        department: (employee.department || 'Other') as Department
      })) as EmployeeWithDepartment[]

      return employeesWithDepartments || []
    },
    enabled: !!companyId
  })

  return {
    employees: employees || [],
    isLoading,
    error
  }
}
