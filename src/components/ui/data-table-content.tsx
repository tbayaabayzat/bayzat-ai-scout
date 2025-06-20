
import * as React from "react"
import { ReactTable, flexRender } from "@tanstack/react-table"
import { ArrowUp, ArrowDown } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableContentProps<TData> {
  table: ReactTable<TData>
}

export function DataTableContent<TData>({
  table,
}: DataTableContentProps<TData>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted()
                
                return (
                  <TableHead key={header.id} className="relative">
                    <div 
                      className={`flex items-center justify-between ${
                        canSort ? 'cursor-pointer select-none hover:text-foreground transition-colors' : ''
                      }`}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className="flex items-center space-x-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {canSort && (
                          <div className="flex flex-col items-center justify-center ml-1">
                            {sorted === "asc" ? (
                              <ArrowUp className="h-3 w-3 text-primary" />
                            ) : sorted === "desc" ? (
                              <ArrowDown className="h-3 w-3 text-primary" />
                            ) : (
                              <div className="flex flex-col">
                                <ArrowUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-0.5" />
                                <ArrowDown className="h-2.5 w-2.5 text-muted-foreground/40" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
