
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SemanticSearch } from "@/components/SemanticSearch"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/types/company"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onSemanticSearch?: (query: string, results?: any[]) => void
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
  isSemanticSearchLoading?: boolean
}

export function CompaniesFilters({
  onSearch,
  onSemanticSearch,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange,
  isSemanticSearchLoading = false
}: CompaniesFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Hero AI Search */}
      <SemanticSearch 
        onSearch={onSemanticSearch || (() => {})}
        isLoading={isSemanticSearchLoading}
      />

      {/* Divider with "or" */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-medium">or use traditional filters</span>
        </div>
      </div>

      {/* Traditional Search - More Compact */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Filter by company name, industry..."
          className="pl-10 h-9 bg-background/30 border-border/50 focus:border-primary/50 transition-all duration-200 text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Advanced Filters - Compact */}
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
