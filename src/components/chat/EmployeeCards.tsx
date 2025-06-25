
import { EmployeeCard } from "../employee-detail/EmployeeCard"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeeCardsProps {
  employees: EmployeeWithDepartment[]
  onEmployeeClick: (employee: EmployeeWithDepartment) => void
}

export function EmployeeCards({ employees, onEmployeeClick }: EmployeeCardsProps) {
  if (!employees || employees.length === 0) {
    return (
      <div className="my-4 p-6 border rounded-lg bg-muted/30 text-center">
        <p className="text-muted-foreground">No employees found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="my-4">
      <div className="mb-3 text-sm text-muted-foreground">
        Showing {employees.length} professional{employees.length !== 1 ? 's' : ''}
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={onEmployeeClick}
          />
        ))}
      </div>
    </div>
  )
}
