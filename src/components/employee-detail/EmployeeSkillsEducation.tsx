import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Award, Code, Users, TrendingUp, Zap, Calendar } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"
import { getDepartmentConfig } from "@/utils/employeeDepartmentUtils"

interface EmployeeSkillsEducationProps {
  employee: EmployeeWithDepartment
}

export function EmployeeSkillsEducation({ employee }: EmployeeSkillsEducationProps) {
  const departmentConfig = getDepartmentConfig(employee.department)

  // Mock skills based on department
  const getDepartmentSkills = (department: string) => {
    const skillsMap: Record<string, { technical: string[], soft: string[], tools: string[] }> = {
      'Engineering': {
        technical: ['Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker'],
        soft: ['Problem Solving', 'Code Review', 'Technical Leadership'],
        tools: ['Git', 'JIRA', 'Kubernetes', 'MongoDB']
      },
      'Sales': {
        technical: ['CRM Management', 'Sales Analytics', 'Lead Generation'],
        soft: ['Negotiation', 'Relationship Building', 'Presentation'],
        tools: ['Salesforce', 'HubSpot', 'LinkedIn Sales Navigator']
      },
      'Marketing': {
        technical: ['Digital Marketing', 'SEO/SEM', 'Content Strategy'],
        soft: ['Creative Thinking', 'Brand Management', 'Campaign Planning'],
        tools: ['Google Analytics', 'Adobe Creative Suite', 'Mailchimp']
      },
      'HR': {
        technical: ['Talent Acquisition', 'Performance Management', 'Compensation Analysis'],
        soft: ['Employee Relations', 'Conflict Resolution', 'Leadership Development'],
        tools: ['Workday', 'BambooHR', 'LinkedIn Recruiter']
      },
      'Finance': {
        technical: ['Financial Analysis', 'Budgeting', 'Risk Assessment'],
        soft: ['Analytical Thinking', 'Attention to Detail', 'Strategic Planning'],
        tools: ['Excel', 'SAP', 'QuickBooks', 'Tableau']
      }
    }

    return skillsMap[department] || {
      technical: ['Industry Knowledge', 'Process Improvement', 'Data Analysis'],
      soft: ['Communication', 'Teamwork', 'Problem Solving'],
      tools: ['Microsoft Office', 'Project Management Tools']
    }
  }

  const skills = getDepartmentSkills(employee.department)

  // Get real education data from LinkedIn
  const educationData = employee.linkedin_data?.education || employee.education || []

  const mockCertifications = [
    {
      name: "Project Management Professional (PMP)",
      issuer: "Project Management Institute",
      year: "2022"
    },
    {
      name: "Google Analytics Certified",
      issuer: "Google",
      year: "2023"
    }
  ]

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
    <div className="space-y-6">
      {/* Skills Overview */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Core Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Code className="h-3 w-3" />
              Technical Skills
            </h5>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill, index) => (
                <Badge key={index} variant="default" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Users className="h-3 w-3" />
              Soft Skills
            </h5>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Tools & Platforms
            </h5>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((tool, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
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
                  {/* Timeline dot */}
                  <div className={`w-2 h-2 rounded-full bg-blue-500 ${index > 0 ? 'mt-5' : 'mt-1'} flex-shrink-0`} />
                  
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

      {/* Certifications */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCertifications.map((cert, index) => (
              <div key={index} className={`flex gap-3 pb-4 border-b last:border-b-0 ${index > 0 ? 'pt-2' : ''}`}>
                {/* Timeline dot */}
                <div className={`w-2.5 h-2.5 rounded-full bg-green-500 ${index > 0 ? 'mt-6' : 'mt-1.5'} flex-shrink-0`} />
                
                {/* Content */}
                <div className="flex gap-3 flex-1 min-w-0">
                  {/* Certification icon */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-muted">
                      <Award className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Certification details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                      </div>
                      
                      {/* Certification year */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-4">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skills Assessment */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Skills Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Strong technical foundation in {employee.department.toLowerCase()} with well-rounded soft skills. 
              Experience level aligns with {employee.years_of_experience} years in the industry.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
