
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, TrendingUp, ChevronDown } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"
import { ExperienceItem } from "./ExperienceItem"
import { processExperienceData } from "@/utils/experienceUtils"

interface EmployeeExperienceProps {
  employee: EmployeeWithDepartment
}

export function EmployeeExperience({ employee }: EmployeeExperienceProps) {
  const [showAllExperience, setShowAllExperience] = useState(false)
  
  // Process real experience data from the employee
  const experienceData = processExperienceData(employee.linkedin_data?.experience || [])
  
  // Pagination logic
  const initialDisplayCount = 3
  const displayedExperience = showAllExperience 
    ? experienceData 
    : experienceData.slice(0, initialDisplayCount)
  
  const hasMoreExperience = experienceData.length > initialDisplayCount

  const careerProgression = {
    totalYears: employee.years_of_experience || 0,
    companies: experienceData.length,
    averageTenure: experienceData.length > 0 ? Math.round((employee.years_of_experience || 0) / experienceData.length) : 0
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
          {experienceData.length > 0 ? (
            <div className="space-y-0">
              {displayedExperience.map((exp, index) => (
                <ExperienceItem 
                  key={index} 
                  experience={exp} 
                  index={index}
                />
              ))}
              
              {/* Load More Button */}
              {hasMoreExperience && !showAllExperience && (
                <div className="pt-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllExperience(true)}
                    className="text-sm"
                  >
                    <ChevronDown className="h-4 w-4 mr-2" />
                    Show {experienceData.length - initialDisplayCount} more positions
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No work experience data available</p>
            </div>
          )}
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
                Demonstrates consistent growth within the {employee.department} department with {careerProgression.totalYears} years of experience across {careerProgression.companies} organizations.
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <h5 className="font-medium text-sm mb-1">Professional Stability</h5>
              <p className="text-xs text-muted-foreground">
                Shows strong career stability with an average tenure of {careerProgression.averageTenure} years per role, indicating commitment and growth potential.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
