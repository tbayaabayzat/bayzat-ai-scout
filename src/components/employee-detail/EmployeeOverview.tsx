
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Building2, Users, TrendingUp, Activity, Target, User } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeeOverviewProps {
  employee: EmployeeWithDepartment
}

export function EmployeeOverview({ employee }: EmployeeOverviewProps) {
  const getEngagementColor = (level?: string): string => {
    switch (level?.toLowerCase()) {
      case 'very high': return 'bg-green-500'
      case 'high': return 'bg-blue-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-orange-500'
      case 'very low': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getEngagementPercentage = (level?: string): number => {
    switch (level?.toLowerCase()) {
      case 'very high': return 90
      case 'high': return 75
      case 'medium': return 50
      case 'low': return 25
      case 'very low': return 10
      default: return 0
    }
  }

  const getActivityColor = (status?: string): string => {
    switch (status?.toLowerCase()) {
      case 'active': return 'text-green-600'
      case 'moderately active': return 'text-yellow-600'
      case 'inactive': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getResponseRateColor = (rate?: string): string => {
    switch (rate?.toLowerCase()) {
      case 'high': return 'text-green-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const engagementLevel = employee.engagement_level || 'Medium'
  const engagementColor = getEngagementColor(engagementLevel)
  const engagementPercentage = getEngagementPercentage(engagementLevel)
  const activityStatus = employee.profile_activity_status || 'Active'
  const responseRate = employee.response_rate || 'Medium'

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
                  <span className="text-sm font-medium">{engagementLevel}</span>
                  <span className="text-sm text-muted-foreground">{engagementPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${engagementColor}`}
                    style={{ width: `${engagementPercentage}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Based on AI analysis of profile data and engagement factors
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
              <div className={`text-lg font-semibold ${getActivityColor(activityStatus)}`}>
                {activityStatus}
              </div>
              <div className="text-xs text-muted-foreground">Profile Activity</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Target className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <div className={`text-lg font-semibold ${getResponseRateColor(responseRate)}`}>
                {responseRate}
              </div>
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
