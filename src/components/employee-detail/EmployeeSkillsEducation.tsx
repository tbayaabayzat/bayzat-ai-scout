
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

  // Categorize skills based on common patterns
  const categorizeSkill = (skillName: string) => {
    const skill = skillName.toLowerCase()
    
    // Technical skills patterns
    const technicalPatterns = [
      'python', 'javascript', 'react', 'node', 'aws', 'docker', 'kubernetes', 'java', 'c++', 'sql',
      'mysql', 'postgresql', 'mongodb', 'redis', 'api', 'rest', 'graphql', 'microservices',
      'machine learning', 'ai', 'data science', 'analytics', 'blockchain', 'cloud', 'devops',
      'programming', 'development', 'software', 'coding', 'database', 'algorithm', 'framework'
    ]
    
    // Tools & Platforms patterns
    const toolsPatterns = [
      'salesforce', 'hubspot', 'jira', 'confluence', 'slack', 'teams', 'zoom', 'excel',
      'powerpoint', 'word', 'google', 'adobe', 'figma', 'sketch', 'photoshop', 'illustrator',
      'tableau', 'power bi', 'jenkins', 'github', 'gitlab', 'bitbucket', 'wordpress',
      'shopify', 'mailchimp', 'hootsuite', 'buffer', 'analytics', 'crm', 'erp'
    ]
    
    if (technicalPatterns.some(pattern => skill.includes(pattern))) {
      return 'technical'
    }
    if (toolsPatterns.some(pattern => skill.includes(pattern))) {
      return 'tools'
    }
    return 'soft'
  }

  // Get real skills data from LinkedIn with fallback to empty array
  const linkedinSkills = employee.linkedin_data?.skills || []
  
  // Process skills and categorize them
  const processedSkills = linkedinSkills.map((skill: any) => ({
    name: skill.name,
    category: categorizeSkill(skill.name)
  }))

  const skillsByCategory = {
    technical: processedSkills.filter(skill => skill.category === 'technical').map(s => s.name),
    soft: processedSkills.filter(skill => skill.category === 'soft').map(s => s.name),
    tools: processedSkills.filter(skill => skill.category === 'tools').map(s => s.name)
  }

  // Get real certifications data from LinkedIn with fallback to empty array
  const linkedinCertifications = employee.linkedin_data?.certifications || []

  const certifications = linkedinCertifications.map((cert: any) => ({
    name: cert.name,
    issuer: cert.organization || cert.authority || 'Unknown Issuer',
    year: cert.issue_date ? new Date(cert.issue_date).getFullYear().toString() : 'Unknown'
  }))

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

  // Generate dynamic skills assessment
  const generateSkillsAssessment = () => {
    const totalSkills = processedSkills.length
    const hasStrongTechnical = skillsByCategory.technical.length >= 3
    const hasDiverseSkills = skillsByCategory.technical.length > 0 && skillsByCategory.soft.length > 0 && skillsByCategory.tools.length > 0
    const experience = employee.years_of_experience || 0
    
    if (totalSkills === 0) {
      return `Profile shows ${employee.department.toLowerCase()} background with ${experience} years of experience. Skills information not available.`
    }
    
    let assessment = `Strong ${employee.department.toLowerCase()} professional with ${totalSkills} documented skills. `
    
    if (hasStrongTechnical) {
      assessment += `Demonstrates solid technical expertise with ${skillsByCategory.technical.length} technical skills. `
    }
    
    if (hasDiverseSkills) {
      assessment += `Well-rounded skill set spanning technical, soft skills, and tools/platforms. `
    }
    
    if (experience >= 5) {
      assessment += `${experience} years of experience aligns well with demonstrated competencies.`
    } else if (experience > 0) {
      assessment += `${experience} years of experience with promising skill development trajectory.`
    }
    
    return assessment
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
          {skillsByCategory.technical.length > 0 && (
            <div>
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Code className="h-3 w-3" />
                Technical Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.technical.map((skill, index) => (
                  <Badge key={index} variant="default" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {skillsByCategory.soft.length > 0 && (
            <div>
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Users className="h-3 w-3" />
                Soft Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.soft.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {skillsByCategory.tools.length > 0 && (
            <div>
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                Tools & Platforms
              </h5>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory.tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {processedSkills.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <Code className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No skills information available</p>
            </div>
          )}
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
          {certifications.length > 0 ? (
            <div className="space-y-4">
              {certifications.map((cert, index) => (
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
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">No certifications available</p>
            </div>
          )}
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
              {generateSkillsAssessment()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
