
export interface ProcessedEvidence {
  employee?: string
  role?: string
  description?: string
  linkedin_url?: string
  task?: string
  quote?: string
  confidence?: string
}

export const processEvidence = (evidence: any[]): ProcessedEvidence[] => {
  if (!Array.isArray(evidence)) return []
  
  return evidence.map(item => {
    if (typeof item === 'string') {
      return { description: item }
    }
    
    return {
      employee: item.employee || item.name,
      role: item.role || item.title,
      description: item.description || item.task || item.quote,
      linkedin_url: item.linkedin_url,
      task: item.task,
      quote: item.quote,
      confidence: item.confidence
    }
  }).filter(item => item.description || item.employee || item.task || item.quote)
}

export const extractSystemEvidence = (systems: any, systemKey: string): ProcessedEvidence[] => {
  if (!systems || !systems[systemKey]) return []
  return processEvidence(systems[systemKey].evidence || [])
}

export const extractAutomationEvidence = (aiAnalysis: any, department?: string): ProcessedEvidence[] => {
  if (!aiAnalysis?.automation_level) return []
  
  if (department) {
    // Look for department-specific evidence
    const deptData = aiAnalysis.automation_level[department]
    if (deptData && typeof deptData === 'object' && deptData.evidence) {
      return processEvidence(deptData.evidence)
    }
  }
  
  // Fall back to general automation evidence
  return processEvidence(aiAnalysis.automation_level.evidence || [])
}

export const extractProcessEvidence = (processData: any, department: string, activity?: string): ProcessedEvidence[] => {
  if (!processData || !processData[department]) return []
  
  const deptData = processData[department]
  
  if (activity && deptData.activities_evidence && deptData.activities_evidence[activity]) {
    return processEvidence(deptData.activities_evidence[activity])
  }
  
  return processEvidence(deptData.evidence || [])
}

export const extractNotableFactsEvidence = (aiAnalysis: any): ProcessedEvidence[] => {
  if (!aiAnalysis?.other_notable_facts) return []
  
  const allEvidence = []
  
  if (Array.isArray(aiAnalysis.other_notable_facts)) {
    aiAnalysis.other_notable_facts.forEach((fact: any) => {
      if (fact?.evidence) {
        allEvidence.push(...processEvidence(fact.evidence))
      }
    })
  }
  
  return allEvidence
}
