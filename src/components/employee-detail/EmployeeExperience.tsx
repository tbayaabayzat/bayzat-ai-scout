
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, Building2, TrendingUp, Activity, Target, User } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface EmployeeExperienceProps {
  employee: EmployeeWithDepartment
}

export function EmployeeExperience({ employee }: EmployeeExperienceProps) {
  // Mock experience data - in real implementation, this would come from the database
  const mockExperience = [
    {
      title: employee.headline || "Current Position",
      company: employee.current_company_name || "Current Company",
      duration: "Present",
      isCurrent: true,
      description: "Leading initiatives and driving growth in the organization."
    },
    {
      title: "Previous Role",
      company: "Previous Company",
      duration: "2+ years",
      isCurrent: false,
      description: "Gained valuable experience in the industry and developed key skills."
    }
  ]

  const careerProgression = {
    totalYears: employee.years_of_experience || 0,
    companies: 2,
    averageTenure: employee.years_of_experience ? Math.round(employee.years_of_experience / 2) : 0
  }

  // Extract just the title from headline, removing company name after "at"
  const getCurrentTitle = (headline: string | null): string => {
    if (!headline) return "Current Position"
    
    // Split by " at " and take the first part (the title)
    const titlePart = headline.split(' at ')[0].trim()
    return titlePart || headline
  }

  return (
    <div className="space-y-6">
      {/* Career Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Career Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-semibold">{careerProgression.totalYears}</div>
              <div className="text-xs text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-semibold">{careerProgression.companies}</div>
              <div className="text-xs text-muted-foreground">Companies</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-semibold">{careerProgression.averageTenure}y</div>
              <div className="text-xs text-muted-foreground">Avg Tenure</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-sm font-medium text-center px-2">
                {getCurrentTitle(employee.headline)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Current Title</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Experience Timeline */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockExperience.map((exp, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className={`w-3 h-3 rounded-full mt-2 ${exp.isCurrent ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{exp.duration}</span>
                      {exp.isCurrent && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Career Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Career Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h5 className="font-medium text-sm mb-1">Career Trajectory</h5>
              <p className="text-xs text-muted-foreground">
                Demonstrates consistent growth within the {employee.department} department with {careerProgression.totalYears} years of experience.
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <h5 className="font-medium text-sm mb-1">Stability Index</h5>
              <p className="text-xs text-muted-foreground">
                Shows good career stability with an average tenure of {careerProgression.averageTenure} years per role.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
