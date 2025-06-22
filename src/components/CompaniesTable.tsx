
import { useState } from "react"
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import { CompanyDetailSheet } from "@/components/company-detail/CompanyDetailSheet"
import { Company } from "@/types/company"
import { createCompaniesTableColumns } from "./companies-table/CompaniesTableColumns"
import { LoadingState } from "./companies-table/LoadingState"
import { ErrorState } from "./companies-table/ErrorState"
import { EmptyState } from "./companies-table/EmptyState"
import * as React from "react"

interface CompaniesTableProps {
  companies: Company[]
  isLoading: boolean
  error: any
  emptyStateMessage?: string
}

export function CompaniesTable({ companies, isLoading, error, emptyStateMessage }: CompaniesTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company)
    setSheetOpen(true)
  }

  const columns = createCompaniesTableColumns(handleCompanyClick)

  // Handle undefined companies data
  const safeCompanies = companies || []

  const table = useReactTable({
    data: safeCompanies,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  })

  if (isLoading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} />
  }

  console.log('CompaniesTable rendering with', safeCompanies.length, 'companies')

  // Calculate pagination info
  const currentPageRows = table.getRowModel().rows.length
  const totalRows = safeCompanies.length

  return (
    <>
      <div>
        <DataTable 
          table={table}
          currentPageRows={currentPageRows}
          totalRows={totalRows}
        />
        {safeCompanies.length === 0 && !isLoading && (
          <EmptyState message={emptyStateMessage} />
        )}
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}
