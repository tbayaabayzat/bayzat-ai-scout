
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Users } from "lucide-react"

interface SubProcessesGridProps {
  subProcesses: any
}

export function SubProcessesGrid({ subProcesses }: SubProcessesGridProps) {
  if (!subProcesses) {
    return null
  }

  const processItems = [
    { key: 'payroll', label: 'Payroll Management', icon: '💰' },
    { key: 'attendance', label: 'Attendance Tracking', icon: '⏰' },
    { key: 'performance', label: 'Performance Management', icon: '📊' },
    { key: 'recruitment', label: 'Recruitment & Hiring', icon: '👥' },
    { key: 'onboarding', label: 'Employee Onboarding', icon: '🎯' },
    { key: 'training', label: 'Training & Development', icon: '📚' },
    { key: 'benefits', label: 'Benefits Administration', icon: '🏥' },
    { key: 'compliance', label: 'HR Compliance', icon: '📋' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          HR Sub-Processes Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {processItems.map((item) => {
            const processData = subProcesses[item.key]
            const isMentioned = processData?.mentioned === true

            return (
              <div
                key={item.key}
                className={`p-4 border rounded-lg transition-colors ${
                  isMentioned 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'border bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  </div>
                  {isMentioned ? (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <Badge 
                    variant={isMentioned ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {isMentioned ? "Mentioned" : "Not Mentioned"}
                  </Badge>
                  
                  {/* Evidence temporarily disabled */}
                  <div className="h-5 w-5 rounded bg-muted opacity-50" />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
