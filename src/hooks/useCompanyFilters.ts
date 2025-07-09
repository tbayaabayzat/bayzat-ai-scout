
import { useState } from "react"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter, CountryFilter } from "@/types/company"

export function useCompanyFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [systemsFilter, setSystemsFilter] = useState<SystemsFilter>({})
  const [employeeCountFilter, setEmployeeCountFilter] = useState<EmployeeCountFilter>({})
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>({})
  const [countryFilter, setCountryFilter] = useState<CountryFilter>({})

  return {
    searchTerm,
    setSearchTerm,
    systemsFilter,
    setSystemsFilter,
    employeeCountFilter,
    setEmployeeCountFilter,
    automationFilter,
    setAutomationFilter,
    countryFilter,
    setCountryFilter
  }
}
