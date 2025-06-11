
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Users, Search } from "lucide-react"
import { useCompanyEmployees } from "@/hooks/useCompanyEmployees"
import { EmployeeCard } from "./EmployeeCard"
import { DepartmentFilter } from "./DepartmentFilter"
import { Department } from "@/utils/employeeDepartmentUtils"

interface EmployeesSectionProps {
  companyId: string
}

export function EmployeesSection({ companyId }: EmployeesSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>([])
  
  const { employees, isLoading, error } = useCompanyEmployees(companyId)

  // Calculate department counts
  const departmentCounts = useMemo(() => {
    const counts: Record<Department, number> = {
      'Engineering': 0,
      'IT': 0,
      'Sales': 0,
      'Marketing': 0,
      'Human Resources': 0,
      'Finance & Accounting': 0,
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

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = !searchTerm || 
        employee.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.headline?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartments.length === 0 || 
        selectedDepartments.includes(employee.department)

      return matchesSearch && matchesDepartment
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
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Current Employees</h3>
        </div>
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Unable to load employee data</p>
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
          <span className="text-sm text-muted-foreground">({employees.length})</span>
        </div>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">No Employee Data Available</h3>
          <p className="text-sm">No current employees found for this company.</p>
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
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
