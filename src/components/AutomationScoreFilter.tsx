import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Bot, Cpu, Database, FileSpreadsheet, Workflow, HelpCircle } from "lucide-react"
import { AutomationFilter } from "@/types/company"

interface AutomationScoreFilterProps {
  automationFilter: AutomationFilter
  onAutomationFilterChange: (filter: AutomationFilter) => void
}

const automationLevels = [
  {
    score: 1,
    label: "Manual",
    description: "Excel-only, paper, manual processes",
    icon: FileSpreadsheet,
    color: "bg-red-100 text-red-800 border-red-200"
  },
  {
    score: 2,
    label: "Basic Tools",
    description: "Basic standalone tools or legacy point solutions",
    icon: Database,
    color: "bg-orange-100 text-orange-800 border-orange-200"
  },
  {
    score: 3,
    label: "ERP/Mixed",
    description: "ERP, Mix of multiple systems and manual processes",
    icon: Workflow,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200"
  },
  {
    score: 4,
    label: "Integrated",
    description: "Integrated business systems",
    icon: Cpu,
    color: "bg-blue-100 text-blue-800 border-blue-200"
  },
  {
    score: 5,
    label: "AI/Advanced",
    description: "AI/ML, advanced automation",
    icon: Bot,
    color: "bg-green-100 text-green-800 border-green-200"
  }
]

export function AutomationScoreFilter({
  automationFilter,
  onAutomationFilterChange
}: AutomationScoreFilterProps) {
  const handleDepartmentChange = (department: 'overall' | 'hr' | 'finance', value: string) => {
    const scoreValue = value === 'any' ? undefined : parseInt(value)
    onAutomationFilterChange({
      ...automationFilter,
      [department]: scoreValue
    })
  }

  const getScoreOptions = () => [
    { value: 'any', label: 'Any' },
    ...automationLevels.map(level => ({
      value: level.score.toString(),
      label: `${level.score} - ${level.label}`
    }))
  ]

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-muted-foreground" />
          <Label className="text-sm font-medium">Automation Score</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs p-3 z-50">
              <div className="space-y-2">
                <div className="font-semibold text-sm">Automation Score Legend</div>
                {automationLevels.map((level) => {
                  const IconComponent = level.icon
                  return (
                    <div key={level.score} className="flex items-start gap-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <IconComponent className="h-4 w-4 flex-shrink-0" />
                        <Badge variant="outline" className={`${level.color} flex-shrink-0`}>
                          {level.score}
                        </Badge>
                        <div className="min-w-0">
                          <div className="font-medium text-sm">{level.label}</div>
                          <div className="text-xs text-muted-foreground">{level.description}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      
      {/* Overall Automation */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Overall Automation</Label>
        <Select
          value={automationFilter.overall?.toString() || 'any'}
          onValueChange={(value) => handleDepartmentChange('overall', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getScoreOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* HR Automation */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">HR Automation</Label>
        <Select
          value={automationFilter.hr?.toString() || 'any'}
          onValueChange={(value) => handleDepartmentChange('hr', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getScoreOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Finance Automation */}
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Finance Automation</Label>
        <Select
          value={automationFilter.finance?.toString() || 'any'}
          onValueChange={(value) => handleDepartmentChange('finance', value)}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getScoreOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      </div>
    </TooltipProvider>
  )
}
