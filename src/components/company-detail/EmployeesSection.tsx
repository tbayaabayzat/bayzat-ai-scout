
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Users, Search } from "lucide-react"
import { useCompanyEmployees } from "@/hooks/useCompanyEmployees"
import { EmployeeCard } from "../employee-detail/EmployeeCard"
import { DepartmentFilter } from "./DepartmentFilter"
import { Department, getDepartmentPriority } from "@/utils/employeeDepartmentUtils"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeesSectionProps {
  company: any
  onEmployeeClick: (employee: EmployeeWithDepartment) => void
}

export function EmployeesSection({ company, onEmployeeClick }: EmployeesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([])
  
  // Debug the company object to see what ID fields are available
  console.log('EmployeesSection - Company object:', company)
  console.log('Available company fields:', Object.keys(company || {}))
  console.log('company.id:', company?.id)
  console.log('company.company_id:', company?.company_id)
  
  // Try to get the correct company identifier
  const companyId = company?.company_id || company?.id
  console.log('Using company ID for employee lookup:', companyId)
  
  const { employees, isLoading, error } = useCompanyEmployees(companyId)

  // Calculate department counts
  const departmentCounts = useMemo(() => {
    const counts: Record<Department, number> = {
      'Engineering': 0,
      'IT': 0,
      'Sales': 0,
      'Marketing': 0,
      'HR': 0,
      'Finance': 0,
      'Procurement': 0,
      'Operations': 0,
      'Customer Success': 0,
      'Product Management': 0,
      'Executive': 0,
      'Other': 0
    }

    employees.forEach(employee => {
      counts[employee.department]++
    })

    return counts
  }, [employees])

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    return employees
      .filter(employee => {
        const matchesSearch = !searchTerm || 
          employee.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.headline?.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesDepartment = selectedDepartments.length === 0 || 
          selectedDepartments.includes(employee.department)

        return matchesSearch && matchesDepartment
      })
      .sort((a, b) => {
        // Sort by department priority first
        const aPriority = getDepartmentPriority(a.department)
        const bPriority = getDepartmentPriority(b.department)
        
        if (aPriority !== bPriority) {
          return aPriority - bPriority
        }
        
        // Then sort by name
        const aName = a.full_name || ''
        const bName = b.full_name || ''
        return aName.localeCompare(bName)
      })
  }, [employees, searchTerm, selectedDepartments])

  const handleDepartmentToggle = (department: Department) => {
    setSelectedDepartments(prev => 
      prev.includes(department)
        ? prev.filter(d => d !== department)
        : [...prev, department]
    )
  }

  const handleClearFilters = () => {
    setSelectedDepartments([])
  }

  const getEmployeeCountDisplay = () => {
    if (company.employee_count) {
      return `(${employees.length} out of ${company.employee_count})`
    }
    return `(${employees.length})`
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Current Employees</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Employee fetch error:', error)
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Current Employees</h3>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Unable to load employee data</p>
          <p className="text-xs mt-2">Company ID: {companyId}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Current Employees</h3>
          <span className="text-sm text-muted-foreground">{getEmployeeCountDisplay()}</span>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Employee Data Available</h3>
          <p className="text-sm">No current employees found for this company.</p>
          <p className="text-xs mt-2">Searched with Company ID: {companyId}</p>
        </div>
      ) : (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Department Filters */}
          <DepartmentFilter
            selectedDepartments={selectedDepartments}
            onDepartmentToggle={handleDepartmentToggle}
            onClearAll={handleClearFilters}
            departmentCounts={departmentCounts}
          />

          {/* Results */}
          {filteredEmployees.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No employees match your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <EmployeeCard 
                  key={employee.id} 
                  employee={employee} 
                  onClick={onEmployeeClick}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
