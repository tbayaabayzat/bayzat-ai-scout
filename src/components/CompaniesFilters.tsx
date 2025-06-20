
import { SemanticSearchBar } from "@/components/SemanticSearchBar"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onSemanticFilter: (companyIds: string[]) => void
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

export function CompaniesFilters({
  onSearch,
  onSemanticFilter,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: CompaniesFiltersProps) {
  const handleSemanticResults = (companyIds: string[]) => {
    onSemanticFilter(companyIds)
  }

  const handleSemanticClear = () => {
    onSemanticFilter([])
  }

  return (
    <div className="space-y-6">
      {/* AI-Powered Semantic Search */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-medium text-foreground">AI-Powered Search</h3>
          <div className="h-1 w-1 rounded-full bg-purple-500 animate-pulse" />
        </div>
        <SemanticSearchBar 
          onResults={handleSemanticResults}
          onClear={handleSemanticClear}
        />
      </div>

      {/* Traditional Advanced Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-muted-foreground">Traditional Filters</h3>
          <div className="flex-1 h-px bg-border" />
        </div>
        <AdvancedFilters
          systemsFilter={systemsFilter}
          onSystemsFilterChange={onSystemsFilterChange}
          employeeCountFilter={employeeCountFilter}
          onEmployeeCountFilterChange={onEmployeeCountFilterChange}
          automationFilter={automationFilter}
          onAutomationFilterChange={onAutomationFilterChange}
        />
      </div>
    </div>
  )
}
