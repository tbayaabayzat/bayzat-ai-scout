
import { SmartSearch } from "@/components/SmartSearch"

interface CompaniesFiltersProps {
  onSearch: (term: string) => void
  onFilterSelect: (filter: string) => void
}

export function CompaniesFilters({ onSearch, onFilterSelect }: CompaniesFiltersProps) {
  const aiFilters = [
    "Legacy Systems",
    "Customers Only",
    "Prospects Only"
  ]

  return (
    <SmartSearch
      placeholder="Ask about companies, systems, or opportunities..."
      onSearch={onSearch}
      onFilterSelect={onFilterSelect}
      filters={aiFilters}
    />
  )
}
