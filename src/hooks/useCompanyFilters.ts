
import { useState } from "react"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

export function useCompanyFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")
  const [systemsFilter, setSystemsFilter] = useState<SystemsFilter>({})
  const [employeeCountFilter, setEmployeeCountFilter] = useState<EmployeeCountFilter>({})
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>({})

  return {
    searchTerm,
    setSearchTerm,
    selectedFilter,
    setSelectedFilter,
    systemsFilter,
    setSystemsFilter,
    employeeCountFilter,
    setEmployeeCountFilter,
    automationFilter,
    setAutomationFilter
  }
}
