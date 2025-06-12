
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Calendar } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface EducationSectionProps {
  employee: EmployeeWithDepartment
}

export function EducationSection({ employee }: EducationSectionProps) {
  // Get real education data from LinkedIn
  const educationData = employee.linkedin_data?.education || []

  const getInstitutionInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatEducationYear = (education: any) => {
    if (education.duration) {
      return education.duration
    }
    
    const startYear = education.start_date?.year
    const endYear = education.end_date?.year
    
    if (startYear && endYear) {
      return `${startYear} - ${endYear}`
    } else if (startYear) {
      return `${startYear} - Present`
    }
    
    return 'Unknown'
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        {educationData && educationData.length > 0 ? (
          <div className="space-y-3">
            {educationData.map((edu: any, index: number) => (
              <div key={index} className={`flex gap-3 pb-3 border-b last:border-b-0 ${index > 0 ? 'pt-1' : ''}`}>
                {/* Content */}
                <div className="flex gap-2.5 flex-1 min-w-0">
                  {/* Institution logo */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={edu.school_logo_url || undefined} />
                    <AvatarFallback className="text-xs font-medium bg-muted">
                      {getInstitutionInitials(edu.school || 'UN')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Education details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm leading-tight">
                          {edu.degree || edu.field_of_study || 'Degree'}
                        </h4>
                        {edu.field_of_study && edu.degree !== edu.field_of_study && (
                          <p className="text-sm text-muted-foreground">{edu.field_of_study}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                        {edu.grade && (
                          <p className="text-xs text-muted-foreground">Grade: {edu.grade}</p>
                        )}
                        {edu.activities && (
                          <p className="text-xs text-muted-foreground mt-1">Activities: {edu.activities}</p>
                        )}
                      </div>
                      
                      {/* Education year */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-3">
                        <Calendar className="h-3 w-3" />
                        <span>{formatEducationYear(edu)}</span>
                      </div>
                    </div>
                    
                    {edu.description && (
                      <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No education information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
