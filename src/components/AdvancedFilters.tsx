
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Database, Users, Bot, X, Filter } from "lucide-react"
import { SystemsFilter, EmployeeCountFilter, AutomationFilter } from "@/hooks/useCompaniesData"

interface AdvancedFiltersProps {
  systemsFilter: SystemsFilter
  onSystemsFilterChange: (filter: SystemsFilter) => void
  employeeCountFilter: EmployeeCountFilter
  onEmployeeCountFilterChange: (filter: EmployeeCountFilter) => void
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

export function AdvancedFilters({
  systemsFilter,
  onSystemsFilterChange,
  employeeCountFilter,
  onEmployeeCountFilterChange,
  automationFilter,
  onAutomationFilterChange
}: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const systemsConfig = [
    { key: 'erp', label: 'ERP', icon: Database },
    { key: 'hris', label: 'HRIS', icon: Users },
    { key: 'accounting', label: 'Accounting', icon: Database },
    { key: 'payroll', label: 'Payroll', icon: Users }
  ]

  const getActiveFiltersCount = () => {
    let count = 0
    
    // Count active systems filters
    count += Object.values(systemsFilter).filter(v => v !== null && v !== undefined).length
    
    // Count employee count filters
    if (employeeCountFilter.min !== undefined || employeeCountFilter.max !== undefined) count++
    
    // Count automation filters
    if (automationFilter.min !== undefined || automationFilter.max !== undefined) count++
    
    return count
  }

  const clearAllFilters = () => {
    onSystemsFilterChange({})
    onEmployeeCountFilterChange({})
    onAutomationFilterChange({})
  }

  const handleSystemToggle = (system: string, value: boolean | null) => {
    onSystemsFilterChange({
      ...systemsFilter,
      [system]: value
    })
  }

  const handleEmployeeCountChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? undefined : parseInt(value)
    onEmployeeCountFilterChange({
      ...employeeCountFilter,
      [field]: numValue
    })
  }

  const handleAutomationScoreChange = (values: number[]) => {
    onAutomationFilterChange({
      ...automationFilter,
      min: values[0],
      max: values[1]
    })
  }

  const handleAutomationDepartmentChange = (department: string) => {
    onAutomationFilterChange({
      ...automationFilter,
      department: department as 'overall' | 'hr' | 'finance'
    })
  }

  const activeCount = getActiveFiltersCount()

  return (
    <div className="space-y-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between hover:bg-muted/50 transition-all duration-200"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
              {activeCount > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {activeCount}
                </Badge>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Systems Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Systems</Label>
              </div>
              <div className="space-y-2">
                {systemsConfig.map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-2 rounded-md border bg-card/50">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{label}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant={systemsFilter[key as keyof SystemsFilter] === true ? "default" : "outline"}
                        className="h-6 px-2 text-xs"
                        onClick={() => handleSystemToggle(key, systemsFilter[key as keyof SystemsFilter] === true ? null : true)}
                      >
                        Has
                      </Button>
                      <Button
                        size="sm"
                        variant={systemsFilter[key as keyof SystemsFilter] === false ? "default" : "outline"}
                        className="h-6 px-2 text-xs"
                        onClick={() => handleSystemToggle(key, systemsFilter[key as keyof SystemsFilter] === false ? null : false)}
                      >
                        Missing
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employee Count Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Employee Count</Label>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Min</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={employeeCountFilter.min ?? ''}
                      onChange={(e) => handleEmployeeCountChange('min', e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Max</Label>
                    <Input
                      type="number"
                      placeholder="10,000"
                      value={employeeCountFilter.max ?? ''}
                      onChange={(e) => handleEmployeeCountChange('max', e.target.value)}
                      className="h-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Automation Score Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Automation Score</Label>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Department</Label>
                  <Select
                    value={automationFilter.department || 'overall'}
                    onValueChange={handleAutomationDepartmentChange}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overall">Overall</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">
                    Score Range: {automationFilter.min || 0} - {automationFilter.max || 100}
                  </Label>
                  <Slider
                    value={[automationFilter.min || 0, automationFilter.max || 100]}
                    onValueChange={handleAutomationScoreChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {activeCount > 0 && (
            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="gap-2"
              >
                <X className="h-3 w-3" />
                Clear All Filters
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
