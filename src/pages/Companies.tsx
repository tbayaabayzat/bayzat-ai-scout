
import { useCompaniesData } from "@/hooks/useCompaniesData"
import { CompaniesHeader } from "@/components/CompaniesHeader"
import { CompaniesFilters } from "@/components/CompaniesFilters"
import { CompaniesTable } from "@/components/CompaniesTable"

export default function Companies() {
  const {
    companies,
    isLoading,
    error,
    setSearchTerm,
    setSelectedFilter
  } = useCompaniesData()

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <CompaniesHeader />
      
      <CompaniesFilters
        onSearch={setSearchTerm}
        onFilterSelect={setSelectedFilter}
      />

      <CompaniesTable
        companies={companies}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
