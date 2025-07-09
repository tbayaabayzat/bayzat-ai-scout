
import { useState, useMemo, useEffect } from "react"
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
  semanticFilterActive?: boolean
}

export function CompaniesTable({ companies, isLoading, error, emptyStateMessage, semanticFilterActive }: CompaniesTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [tableKey, setTableKey] = useState(0)

  console.log('CompaniesTable - Semantic filter active:', semanticFilterActive)
  console.log('CompaniesTable - Companies count:', companies?.length)

  const handleCompanyClick = (company: Company) => {
    console.log('CompaniesTable - Company clicked:', {
      companyName: company.company_name,
      companyId: company.id,
      semanticFilterActive,
      tableKey
    })
    setSelectedCompany(company)
    setSheetOpen(true)
  }

  // Memoize columns to prevent unnecessary recreation
  const columns = useMemo(() => createCompaniesTableColumns(handleCompanyClick), [])

  // Handle undefined companies data with memoization for stability
  const safeCompanies = useMemo(() => companies || [], [companies])

  // Reset table state when semantic filter changes
  useEffect(() => {
    console.log('CompaniesTable - Filter state changed, resetting table state:', {
      semanticFilterActive,
      companiesLength: safeCompanies.length,
      previousTableKey: tableKey
    })
    setSorting([])
    setColumnFilters([])
    setRowSelection({})
    setColumnVisibility({})
    setTableKey(prev => prev + 1) // Force table re-initialization
  }, [semanticFilterActive])

  const table = useReactTable({
    data: safeCompanies,
    columns,
    getRowId: (row) => row.id, // Use stable row ID instead of array index
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
          key={tableKey}
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
