
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  const advancedFilters = AdvancedFilters({
    systemsFilter,
    onSystemsFilterChange,
    employeeCountFilter,
    onEmployeeCountFilterChange,
    automationFilter,
    onAutomationFilterChange
  })

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

      {/* Filters Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          {advancedFilters.component}
        </div>
        
        {/* External Clear All Filters Button */}
        {advancedFilters.activeCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={advancedFilters.clearAllFilters}
            className="gap-2 transition-all duration-200 animate-in fade-in-0 slide-in-from-right-2"
          >
            <X className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}
