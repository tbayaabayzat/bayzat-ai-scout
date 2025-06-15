
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bot, Cpu, Database, FileSpreadsheet, Workflow } from "lucide-react"
import { AutomationFilter } from "@/hooks/useCompaniesData"

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
  const handleScoreToggle = (score: number) => {
    const currentScores = automationFilter.selectedScores || []
    const isSelected = currentScores.includes(score)
    
    const newScores = isSelected
      ? currentScores.filter(s => s !== score)
      : [...currentScores, score]
    
    onAutomationFilterChange({
      ...automationFilter,
      selectedScores: newScores.length > 0 ? newScores : undefined
    })
  }

  const handleDepartmentChange = (department: string) => {
    onAutomationFilterChange({
      ...automationFilter,
      department: department as 'overall' | 'hr' | 'finance'
    })
  }

  const selectedScores = automationFilter.selectedScores || []

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Automation Score</Label>
        {selectedScores.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {selectedScores.length} selected
          </Badge>
        )}
      </div>
      
      <div>
        <Label className="text-xs text-muted-foreground mb-2 block">Department</Label>
        <Select
          value={automationFilter.department || 'overall'}
          onValueChange={handleDepartmentChange}
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
          Automation Levels (select multiple)
        </Label>
        <div className="space-y-2">
          {automationLevels.map(({ score, label, description, icon: Icon, color }) => (
            <Button
              key={score}
              variant={selectedScores.includes(score) ? "default" : "outline"}
              size="sm"
              className={`w-full justify-start p-3 h-auto ${
                selectedScores.includes(score) ? '' : 'hover:bg-muted/50'
              }`}
              onClick={() => handleScoreToggle(score)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${color}`}>
                  {score}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-sm">{label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {description}
                  </div>
                </div>
                <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
