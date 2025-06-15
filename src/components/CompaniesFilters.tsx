
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdvancedFilters } from "@/components/AdvancedFilters"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/hooks/useCompaniesData"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onFilterSelect: (filter: string) => void
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

export function CompaniesFilters({
  onSearch,
  onFilterSelect,
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: CompaniesFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and Legacy Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search companies by name, description, or industry..."
            className="pl-10 h-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-200"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <Select onValueChange={onFilterSelect}>
          <SelectTrigger className="w-full sm:w-[200px] h-10 bg-background/50 border-border/50">
            <SelectValue placeholder="Legacy filters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="Customers Only">Customers Only</SelectItem>
            <SelectItem value="Prospects Only">Prospects Only</SelectItem>
            <SelectItem value="Legacy Systems">Legacy Systems</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Advanced Filters */}
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
