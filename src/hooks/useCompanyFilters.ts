
import { useState } from "react"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter, CountryFilter, RelationshipFilter, RequestedByFilter } from "@/types/company"

export function useCompanyFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [systemsFilter, setSystemsFilter] = useState<SystemsFilter>({})
  const [employeeCountFilter, setEmployeeCountFilter] = useState<EmployeeCountFilter>({})
  const [automationFilter, setAutomationFilter] = useState<AutomationFilter>({})
  const [countryFilter, setCountryFilter] = useState<CountryFilter>({ selectedCountries: undefined })
  const [relationshipFilter, setRelationshipFilter] = useState<RelationshipFilter>({})
  const [requestedByFilter, setRequestedByFilter] = useState<RequestedByFilter>({})

  // AQUANOW DEBUG: Log initial relationship filter state
  console.log('🔍 useCompanyFilters initialized - relationshipFilter:', relationshipFilter)
  console.log('🔍 relationshipFilter.selectedRelationships:', relationshipFilter.selectedRelationships)
  console.log('🔍 This should be undefined/empty to show ALL relationships by default')

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
    setCountryFilter,
    relationshipFilter,
    setRelationshipFilter,
    requestedByFilter,
    setRequestedByFilter
  }
}
