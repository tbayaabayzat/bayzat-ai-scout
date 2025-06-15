
import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { CompanyDetailSheet } from "@/components/company-detail/CompanyDetailSheet"
import { getCompaniesTableColumns } from "@/components/CompaniesTableColumns"
import { Company } from "@/hooks/useCompaniesData"

interface CompaniesTableProps {
  companies: Company[]
  isLoading: boolean
  error: any
}

export function CompaniesTable({ companies, isLoading, error }: CompaniesTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company)
    setSheetOpen(true)
  }

  const columns = getCompaniesTableColumns(handleCompanyClick)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading companies...</span>
      </div>
    )
  }

  if (error) {
    console.error('Query error:', error)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading companies</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <p className="text-xs text-muted-foreground mt-2">Check browser console for details</p>
        </div>
      </div>
    )
  }

  const safeCompanies = companies || []
  console.log('CompaniesTable rendering with', safeCompanies.length, 'companies')

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {safeCompanies.length} companies
          </div>
          {safeCompanies.length === 0 && !isLoading && (
            <div className="text-sm text-orange-600">
              No data found. Check console for debugging info.
            </div>
          )}
        </div>
        <DataTable 
          columns={columns} 
          data={safeCompanies} 
          searchColumn="company_name"
          searchPlaceholder="Search companies..."
        />
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}
