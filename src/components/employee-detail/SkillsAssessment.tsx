
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployeeWithDepartment } from "@/types/employee"

interface SkillsAssessmentProps {
  employee: EmployeeWithDepartment
}

export function SkillsAssessment({ employee }: SkillsAssessmentProps) {
  // Generate dynamic skills assessment
  const generateSkillsAssessment = () => {
    const linkedinSkills = employee.linkedin_data?.skills || []
    
    // Categorize skills
    const categorizeSkill = (skillName: string) => {
      const skill = skillName.toLowerCase()
      
      const technicalPatterns = [
        'python', 'javascript', 'react', 'node', 'aws', 'docker', 'kubernetes', 'java', 'c++', 'sql',
        'mysql', 'postgresql', 'mongodb', 'redis', 'api', 'rest', 'graphql', 'microservices',
        'machine learning', 'ai', 'data science', 'analytics', 'blockchain', 'cloud', 'devops',
        'programming', 'development', 'software', 'coding', 'database', 'algorithm', 'framework'
      ]
      
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

    const processedSkills = linkedinSkills.map((skill: any) => ({
      name: skill.name,
      category: categorizeSkill(skill.name)
    }))

    const skillsByCategory = {
      technical: processedSkills.filter(skill => skill.category === 'technical').map(s => s.name),
      soft: processedSkills.filter(skill => skill.category === 'soft').map(s => s.name),
      tools: processedSkills.filter(skill => skill.category === 'tools').map(s => s.name)
    }

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
  )
}
