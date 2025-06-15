
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SystemFilter } from "@/hooks/useCompaniesData"

interface SystemColumnFilterProps {
  systemFilter: SystemFilter
  onSystemFilterChange: (filter: SystemFilter) => void
}

export function SystemColumnFilter({ systemFilter, onSystemFilterChange }: SystemColumnFilterProps) {
  const hasActiveFilters = Object.values(systemFilter).some(value => value)

  const handleFilterChange = (key: keyof SystemFilter, value: boolean) => {
    onSystemFilterChange({
      ...systemFilter,
      [key]: value
    })
  }

  const clearAllFilters = () => {
    onSystemFilterChange({
      has_erp: false,
      has_hris: false,
      has_accounting: false,
      has_payroll: false
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-6 w-6 p-0 ${hasActiveFilters ? 'text-primary' : 'text-muted-foreground'}`}
        >
          <Filter className="h-3 w-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">Filter by Systems</h4>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-6 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="erp-filter" className="text-sm font-medium">
                ERP System
              </label>
              <Switch
                id="erp-filter"
                checked={systemFilter.has_erp}
                onCheckedChange={(value) => handleFilterChange('has_erp', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="hris-filter" className="text-sm font-medium">
                HRIS System
              </label>
              <Switch
                id="hris-filter"
                checked={systemFilter.has_hris}
                onCheckedChange={(value) => handleFilterChange('has_hris', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="accounting-filter" className="text-sm font-medium">
                Accounting System
              </label>
              <Switch
                id="accounting-filter"
                checked={systemFilter.has_accounting}
                onCheckedChange={(value) => handleFilterChange('has_accounting', value)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label htmlFor="payroll-filter" className="text-sm font-medium">
                Payroll System
              </label>
              <Switch
                id="payroll-filter"
                checked={systemFilter.has_payroll}
                onCheckedChange={(value) => handleFilterChange('has_payroll', value)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
