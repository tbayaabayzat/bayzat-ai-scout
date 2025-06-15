
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

export function CompaniesFilters({
  onSearch,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: CompaniesFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search Input - Full Width */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search companies by name, description, or industry..."
          className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <AdvancedFilters
        systemsFilter={systemsFilter}
        onSystemsFilterChange={onSystemsFilterChange}
        employeeCountFilter={employeeCountFilter}
        onEmployeeCountFilterChange={onEmployeeCountFilterChange}
        automationFilter={automationFilter}
        onAutomationFilterChange={onAutomationFilterChange}
      />
    </div>
  )
}
