
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, ExternalLink } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"
import { getDepartmentConfig, getDepartmentColorClass } from "@/utils/employeeDepartmentUtils"

interface EmployeeCardProps {
  employee: EmployeeWithDepartment
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const departmentConfig = getDepartmentConfig(employee.department)
  const colorClass = getDepartmentColorClass(departmentConfig.color)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="group hover:bg-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar with department indicator */}
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={employee.profile_picture_url || undefined} />
              <AvatarFallback className="text-xs font-medium">
                {getInitials(employee.full_name || 'U N')}
              </AvatarFallback>
            </Avatar>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${colorClass}`} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Name and External Link */}
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium truncate">{employee.full_name}</h4>
              {employee.profile_url && (
                <a 
                  href={employee.profile_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>

            {/* Job Title */}
            {employee.headline && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {employee.headline}
              </p>
            )}

            {/* Department Badge */}
            <div className="flex items-center gap-2 mb-2">
              <departmentConfig.icon className="h-3 w-3 text-muted-foreground" />
              <Badge variant={departmentConfig.badgeVariant} className="text-xs">
                {departmentConfig.name}
              </Badge>
            </div>

            {/* Location and Experience */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {employee.location_full && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{employee.location_full}</span>
                </div>
              )}
              {employee.years_of_experience && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{employee.years_of_experience}y exp</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
