
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Building2, Users, TrendingUp, Activity, Target, User } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeeOverviewProps {
  employee: EmployeeWithDepartment
}

export function EmployeeOverview({ employee }: EmployeeOverviewProps) {
  // Calculate engagement potential score (0-100)
  const calculateEngagementPotential = (employee: EmployeeWithDepartment): number => {
    let score = 0
    
    // Profile completeness (40 points max)
    if (employee.profile_picture_url) score += 10
    if (employee.headline) score += 10
    if (employee.location_full) score += 10
    if (employee.years_of_experience) score += 10
    
    // Role factors (30 points max)
    const seniorityKeywords = ['director', 'vp', 'head', 'chief', 'manager', 'lead', 'senior']
    if (employee.headline && seniorityKeywords.some(keyword => 
      employee.headline!.toLowerCase().includes(keyword))) {
      score += 20
    }
    if (employee.department === 'Executive') score += 10
    
    // Experience factors (30 points max)
    if (employee.years_of_experience) {
      if (employee.years_of_experience >= 10) score += 15
      else if (employee.years_of_experience >= 5) score += 10
      else score += 5
    }
    if (employee.current_company_name) score += 15
    
    return Math.min(score, 100)
  }

  const engagementScore = calculateEngagementPotential(employee)
  
  const getEngagementLabel = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: 'Very High', color: 'bg-green-500' }
    if (score >= 60) return { label: 'High', color: 'bg-blue-500' }
    if (score >= 40) return { label: 'Medium', color: 'bg-yellow-500' }
    return { label: 'Low', color: 'bg-gray-500' }
  }

  const engagement = getEngagementLabel(engagementScore)

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employee.location_full && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{employee.location_full}</span>
              </div>
            )}
            {employee.years_of_experience && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{employee.years_of_experience} years of experience</span>
              </div>
            )}
            {employee.current_company_name && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{employee.current_company_name}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Engagement Potential
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{engagement.label}</span>
                  <span className="text-sm text-muted-foreground">{engagementScore}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${engagement.color}`}
                    style={{ width: `${engagementScore}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Based on profile completeness, role seniority, and experience level
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network & Activity Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Network & Activity Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-lg font-semibold">500+</div>
              <div className="text-xs text-muted-foreground">Estimated Connections</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-lg font-semibold">Active</div>
              <div className="text-xs text-muted-foreground">Profile Activity</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className="text-lg font-semibold">High</div>
              <div className="text-xs text-muted-foreground">Response Rate</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h5 className="font-medium text-sm mb-2">Outreach Recommendations</h5>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Best time to reach out: Weekday mornings (9-11 AM)</li>
              <li>• Preferred communication: LinkedIn InMail or connection request</li>
              <li>• Mention mutual connections or industry insights</li>
              {employee.department === 'Executive' && (
                <li>• Executive-level contact - consider warm introduction</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      {employee.headline && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {employee.headline}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
