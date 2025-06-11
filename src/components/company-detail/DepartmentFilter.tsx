
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Department, DEPARTMENT_CONFIG } from "@/utils/employeeDepartmentUtils"

interface DepartmentFilterProps {
  selectedDepartments: Department[]
  onDepartmentToggle: (department: Department) => void
  onClearAll: () => void
  departmentCounts: Record<Department, number>
}

export function DepartmentFilter({ 
  selectedDepartments, 
  onDepartmentToggle, 
  onClearAll,
  departmentCounts 
}: DepartmentFilterProps) {
  const availableDepartments = Object.keys(DEPARTMENT_CONFIG).filter(
    dept => departmentCounts[dept as Department] > 0
  ) as Department[]

  if (availableDepartments.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Filter by Department</span>
        {selectedDepartments.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearAll}
            className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {availableDepartments.map((department) => {
          const config = DEPARTMENT_CONFIG[department]
          const isSelected = selectedDepartments.includes(department)
          const count = departmentCounts[department]
          
          return (
            <Button
              key={department}
              variant="ghost"
              size="sm"
              onClick={() => onDepartmentToggle(department)}
              className={`h-auto px-3 py-1.5 border transition-colors ${
                isSelected 
                  ? 'bg-accent border-border' 
                  : 'border-transparent hover:border-border'
              }`}
            >
              <config.icon className="h-3 w-3 mr-1.5" />
              <span className="text-xs">{department}</span>
              <Badge variant="secondary" className="ml-1.5 text-xs h-4 px-1">
                {count}
              </Badge>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
