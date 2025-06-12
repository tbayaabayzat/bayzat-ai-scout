
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award, Code, Users, TrendingUp, Zap } from "lucide-react"
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

  const mockEducation = [
    {
      degree: "Bachelor's Degree",
      field: "Business Administration",
      institution: "University",
      year: "2018"
    }
  ]

  const mockCertifications = [
    {
      name: "Professional Certification",
      issuer: "Industry Association",
      year: "2022"
    }
  ]

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
          <div className="space-y-4">
            {mockEducation.map((edu, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-2" />
                <div className="flex-1">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.field}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2" />
                <div className="flex-1">
                  <h4 className="font-medium">{cert.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{cert.issuer}</span>
                    <span>•</span>
                    <span>{cert.year}</span>
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
