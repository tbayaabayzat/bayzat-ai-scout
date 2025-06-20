
import * as React from "react"
import { Table } from "@tanstack/react-table"

import { DataTableHeader } from "@/components/ui/data-table-header"
import { DataTableContent } from "@/components/ui/data-table-content"
import { DataTablePagination } from "@/components/ui/data-table-pagination"

interface DataTableProps<TData, TValue> {
  table: Table<TData>
  currentPageRows?: number
  totalRows?: number
}

export function DataTable<TData, TValue>({
  table,
  currentPageRows,
  totalRows,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="w-full">
      <DataTableHeader 
        table={table}
        currentPageRows={currentPageRows}
        totalRows={totalRows}
      />
      <DataTableContent table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
