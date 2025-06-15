
import { SmartSearch } from "@/components/SmartSearch"
import { SystemFilters } from "@/components/SystemFilters"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onFilterSelect: (filter: string) => void
  systemFilters: string[]
  onSystemFiltersChange: (filters: string[]) => void
}

export function CompaniesFilters({ 
  onSearch, 
  onFilterSelect, 
  systemFilters, 
  onSystemFiltersChange 
}: CompaniesFiltersProps) {
  const aiFilters = [
    "Legacy Systems",
    "Customers Only",
    "Prospects Only"
  ]

  return (
    <div className="space-y-4">
      <SmartSearch
        placeholder="Ask about companies, systems, or opportunities..."
        onSearch={onSearch}
        onFilterSelect={onFilterSelect}
        filters={aiFilters}
      />
      
      <SystemFilters
        systemFilters={systemFilters}
        onSystemFiltersChange={onSystemFiltersChange}
      />
    </div>
  )
}
