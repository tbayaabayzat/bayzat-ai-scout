
import * as React from "react"
import { Table } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableHeaderProps<TData> {
  table: Table<TData>
  currentPageRows?: number
  totalRows?: number
}

export function DataTableHeader<TData>({
  table,
  currentPageRows,
  totalRows,
}: DataTableHeaderProps<TData>) {
  return (
    <div className="flex items-center justify-between py-4 gap-4">
      {currentPageRows !== undefined && totalRows !== undefined && (
        <div className="text-sm text-muted-foreground">
          Showing {currentPageRows} of {totalRows} companies
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
