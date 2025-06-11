
// Department formatting and ordering utilities

export const formatDepartmentName = (department: string): string => {
  const cleaned = department.replace(/_/g, ' ').toLowerCase()
  
  // Special cases for HR and IT
  if (cleaned === 'hr' || cleaned === 'human resources') return 'HR'
  if (cleaned === 'it' || cleaned === 'information technology') return 'IT'
  
  // Capitalize first letter for other departments
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

export const getDepartmentOrder = (department: string): number => {
  const formatted = formatDepartmentName(department)
  
  // Define priority order: HR, Finance, IT, Operations, then others
  const priorityOrder = ['HR', 'Finance', 'IT', 'Operations']
  const index = priorityOrder.indexOf(formatted)
  
  // Return index if found, otherwise return high number for "others"
  return index !== -1 ? index : 999
}

export const sortDepartments = (departments: Array<{ department: string; score: number }>) => {
  return departments.sort((a, b) => {
    const orderA = getDepartmentOrder(a.department)
    const orderB = getDepartmentOrder(b.department)
    
    if (orderA !== orderB) {
      return orderA - orderB
    }
    
    // If same priority order, sort alphabetically
    return formatDepartmentName(a.department).localeCompare(formatDepartmentName(b.department))
  })
}
