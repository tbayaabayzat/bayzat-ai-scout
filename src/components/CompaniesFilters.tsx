
import { SemanticSearchBar } from "@/components/SemanticSearchBar"
import { AIFilterBadge } from "@/components/semantic-search/AIFilterBadge"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"
import { useState } from "react"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onSemanticFilter: (companyIds: string[], query?: string) => void
  onClearSemanticFilter: () => void
  activeSemanticQuery: string
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
  onClearSemanticFilter,
  activeSemanticQuery,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: CompaniesFiltersProps) {
  const [clearTrigger, setClearTrigger] = useState(0)

  const handleSemanticResults = (companyIds: string[], query: string) => {
    onSemanticFilter(companyIds, query)
  }

  const handleSemanticClear = () => {
    onClearSemanticFilter()
    // Trigger clear in SemanticSearchBar
    setClearTrigger(prev => prev + 1)
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
          clearTrigger={clearTrigger}
        />
      </div>

      {/* Active AI Filter Badge */}
      {activeSemanticQuery && (
        <AIFilterBadge
          query={activeSemanticQuery}
          onClear={handleSemanticClear}
          onRerun={() => {
            // Re-trigger the same search - this could be enhanced later
            console.log('Re-running search:', activeSemanticQuery)
          }}
        />
      )}

      {/* Traditional Advanced Filters */}
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
