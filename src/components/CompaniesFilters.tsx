
import { SemanticSearch } from "@/components/SemanticSearch"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onSemanticSearch: (query: string) => void
  isSemanticSearchLoading?: boolean
  onCancelSemanticSearch?: () => void
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

export function CompaniesFilters({
  onSearch,
  onSemanticSearch,
  isSemanticSearchLoading = false,
  onCancelSemanticSearch,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: CompaniesFiltersProps) {
  return (
    <div className="space-y-6">
      {/* AI-Powered Semantic Search */}
      <div className="space-y-2">
        <SemanticSearch
          onSearch={onSemanticSearch}
          isLoading={isSemanticSearchLoading}
          onCancel={onCancelSemanticSearch}
        />
        {!isSemanticSearchLoading && (
          <p className="text-xs text-muted-foreground text-center">
            Ask AI to find companies using natural language, or use traditional filters below
          </p>
        )}
      </div>

      {/* Traditional Filters - Only show when not in semantic search loading */}
      {!isSemanticSearchLoading && (
        <AdvancedFilters
          systemsFilter={systemsFilter}
          onSystemsFilterChange={onSystemsFilterChange}
          employeeCountFilter={employeeCountFilter}
          onEmployeeCountFilterChange={onEmployeeCountFilterChange}
          automationFilter={automationFilter}
          onAutomationFilterChange={onAutomationFilterChange}
        />
      )}
    </div>
  )
}
