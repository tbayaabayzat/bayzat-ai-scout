import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, TrendingUp, Zap } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface SkillsSectionProps {
  employee: EmployeeWithDepartment
}

export function SkillsSection({ employee }: SkillsSectionProps) {
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

  return (
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
                <Badge key={index} variant="secondary" className="text-xs">
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
  )
}
