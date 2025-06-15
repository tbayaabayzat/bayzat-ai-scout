
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter, X } from "lucide-react"

interface SystemFiltersProps {
  systemFilters: string[]
  onSystemFiltersChange: (filters: string[]) => void
}

export function SystemFilters({ systemFilters, onSystemFiltersChange }: SystemFiltersProps) {
  const systemOptions = [
    "Has ERP",
    "Has HRIS", 
    "Has Accounting",
    "Has Payroll"
  ]

  const handleFilterToggle = (filter: string) => {
    if (systemFilters.includes(filter)) {
      onSystemFiltersChange(systemFilters.filter(f => f !== filter))
    } else {
      onSystemFiltersChange([...systemFilters, filter])
    }
  }

  const clearAllFilters = () => {
    onSystemFiltersChange([])
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Systems
            {systemFilters.length > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                {systemFilters.length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {systemOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={systemFilters.includes(option)}
              onCheckedChange={() => handleFilterToggle(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {systemFilters.map((filter) => (
        <Badge
          key={filter}
          variant="secondary"
          className="gap-1 pr-1 cursor-pointer hover:bg-secondary/80"
          onClick={() => handleFilterToggle(filter)}
        >
          {filter}
          <X className="h-3 w-3" />
        </Badge>
      ))}

      {systemFilters.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  )
}
