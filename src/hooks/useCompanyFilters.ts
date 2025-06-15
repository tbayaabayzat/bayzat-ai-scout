
import { useState } from "react"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

export function useCompanyFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [systemsFilter, setSystemsFilter] = useState<SystemsFilter>({})
  const [employeeCountFilter, setEmployeeCountFilter] = useState<EmployeeCountFilter>({})
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>({})

  return {
    searchTerm,
    setSearchTerm,
    systemsFilter,
    setSystemsFilter,
    employeeCountFilter,
    setEmployeeCountFilter,
    automationFilter,
    setAutomationFilter
  }
}
