
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Building2, DollarSign, Users, Settings, Zap, TrendingUp, HeadphonesIcon } from "lucide-react"
import { EvidenceIndicator } from "./EvidenceIndicator"
import { useState } from "react"

interface DepartmentProcessCardProps {
  department: string
  activities: any[]
  evidence: any[]
}

const getDepartmentIcon = (department: string) => {
  const icons: Record<string, any> = {
    finance: DollarSign,
    hr: Users,
    operations: Settings,
    it: Zap,
    sales: TrendingUp,
    marketing: TrendingUp,
    support: HeadphonesIcon,
    customer_service: HeadphonesIcon
  }
  return icons[department.toLowerCase()] || Building2
}

const getDepartmentColor = (department: string) => {
  const colors: Record<string, string> = {
    finance: "text-green-600 bg-green-50 border-green-200",
    hr: "text-blue-600 bg-blue-50 border-blue-200",
    operations: "text-purple-600 bg-purple-50 border-purple-200",
    it: "text-orange-600 bg-orange-50 border-orange-200",
    sales: "text-red-600 bg-red-50 border-red-200",
    marketing: "text-pink-600 bg-pink-50 border-pink-200",
    support: "text-indigo-600 bg-indigo-50 border-indigo-200",
    customer_service: "text-indigo-600 bg-indigo-50 border-indigo-200"
  }
  return colors[department.toLowerCase()] || "text-gray-600 bg-gray-50 border-gray-200"
}

export function DepartmentProcessCard({ department, activities, evidence }: DepartmentProcessCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = getDepartmentIcon(department)
  const colorClass = getDepartmentColor(department)

  const formatDepartmentName = (dept: string) => {
    return dept.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <Card className={`border ${colorClass.split(' ')[2]}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-lg font-semibold">{formatDepartmentName(department)}</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    {activities?.length || 0} activities tracked
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {evidence && evidence.length > 0 && (
                  <EvidenceIndicator evidence={evidence} label="Evidence" />
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {activities && activities.length > 0 ? (
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
                    <span className="text-sm font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Settings className="h-6 w-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No activities tracked for this department</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
