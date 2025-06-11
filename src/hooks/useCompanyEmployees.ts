
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Employee, EmployeeWithDepartment } from "@/types/employee"
import { Department } from "@/utils/employeeDepartmentUtils"

export function useCompanyEmployees(companyId: string) {
  const { data: employees, isLoading, error } = useQuery({
    queryKey: ['company-employees', companyId],
    queryFn: async () => {
      console.log('Fetching employees for company:', companyId)
      
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('current_company_urn', companyId)
        .limit(50)

      if (error) {
        console.error('Error fetching employees:', error)
        throw error
      }

      console.log(`Found ${data?.length || 0} employees`)
      
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
