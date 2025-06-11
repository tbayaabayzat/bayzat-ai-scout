
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Building2, DollarSign, Users, Zap, TrendingUp, HeadphonesIcon } from "lucide-react"
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
    operations: Building2,
    it: Zap,
    sales: TrendingUp,
    marketing: TrendingUp,
    support: HeadphonesIcon,
    customer_service: HeadphonesIcon
  }
  return icons[department.toLowerCase()] || Building2
}

const formatDepartmentName = (dept: string) => {
  const cleaned = dept.replace(/_/g, ' ').toLowerCase()
  
  // Special cases for HR and IT
  if (cleaned === 'hr' || cleaned === 'human resources') return 'HR'
  if (cleaned === 'it' || cleaned === 'information technology') return 'IT'
  
  // Capitalize first letter for other departments
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

export function DepartmentProcessCard({ department, activities, evidence }: DepartmentProcessCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = getDepartmentIcon(department)

  return (
    <Card className="border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
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
                <ChevronDown className={`h-4 w-4 transition-transform text-muted-foreground ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {activities && activities.length > 0 ? (
              <div className="space-y-2">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                    <span className="text-sm font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <Building2 className="h-6 w-6 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No activities tracked for this department</p>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
