
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Employee, EmployeeWithDepartment } from "@/types/employee"
import { Department } from "@/utils/employeeDepartmentUtils"

export function useCompanyEmployees(companyId: string) {
  const [employeesWithDepartments, setEmployeesWithDepartments] = useState<EmployeeWithDepartment[]>([])
  const [isClassifying, setIsClassifying] = useState(false)

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
      return data as Employee[]
    },
    enabled: !!companyId
  })

  const classifyEmployeeDepartment = async (jobTitle: string): Promise<Department> => {
    try {
      const { data, error } = await supabase.functions.invoke('classify-employee-department', {
        body: { jobTitle }
      })

      if (error) throw error
      return data.department as Department
    } catch (error) {
      console.error('Error classifying department:', error)
      return 'Other'
    }
  }

  useEffect(() => {
    if (!employees?.length) return

    const classifyEmployees = async () => {
      setIsClassifying(true)
      
      const employeesWithDepts = await Promise.all(
        employees.map(async (employee) => {
          const department = employee.headline 
            ? await classifyEmployeeDepartment(employee.headline)
            : 'Other'
          
          return {
            ...employee,
            department
          } as EmployeeWithDepartment
        })
      )

      setEmployeesWithDepartments(employeesWithDepts)
      setIsClassifying(false)
    }

    classifyEmployees()
  }, [employees])

  return {
    employees: employeesWithDepartments,
    isLoading: isLoading || isClassifying,
    error
  }
}
