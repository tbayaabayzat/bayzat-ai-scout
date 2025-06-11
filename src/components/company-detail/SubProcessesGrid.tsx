
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Users } from "lucide-react"
import { EvidenceIndicator } from "./EvidenceIndicator"

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
          <Users className="h-5 w-5 text-blue-500" />
          HR Sub-Processes Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {processItems.map((item) => {
            const processData = subProcesses[item.key]
            const isMentioned = processData?.mentioned === true
            const evidence = processData?.evidence || []

            return (
              <div
                key={item.key}
                className={`p-4 border rounded-lg transition-colors ${
                  isMentioned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {isMentioned ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={isMentioned ? "default" : "secondary"}
                    className={isMentioned ? "bg-green-600" : ""}
                  >
                    {isMentioned ? "Mentioned" : "Not Mentioned"}
                  </Badge>
                  
                  {evidence.length > 0 && (
                    <EvidenceIndicator evidence={evidence} label="Evidence" size="sm" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
