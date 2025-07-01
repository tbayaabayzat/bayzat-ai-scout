
// Utility functions for processing evidence data from ai_analysis

export interface EvidenceItem {
  employee?: string
  role?: string
  description?: string
  linkedin_url?: string
  task?: string
  quote?: string
  full_name?: string
  profile_url?: string
}

// Extract evidence from various sections of ai_analysis
export const extractSystemEvidence = (aiAnalysis: any, systemType: string): EvidenceItem[] => {
  if (!aiAnalysis?.systems?.[systemType]?.evidence) return []
  
  return aiAnalysis.systems[systemType].evidence.map((item: any) => ({
    employee: item.full_name || item.employee,
    role: item.role,
    description: item.quote || item.description,
    linkedin_url: item.profile_url || item.linkedin_url,
  }))
}

// Extract evidence from automation level data
export const extractAutomationEvidence = (aiAnalysis: any): EvidenceItem[] => {
  if (!aiAnalysis?.automation_level?.evidence) return []
  
  return aiAnalysis.automation_level.evidence.map((item: any) => ({
    employee: item.full_name || item.employee,
    role: item.role,
    description: item.quote || item.description,
    linkedin_url: item.profile_url || item.linkedin_url,
  }))
}

// Extract evidence from process data
export const extractProcessEvidence = (aiAnalysis: any, department: string): EvidenceItem[] => {
  if (!aiAnalysis?.processes_mentioned?.[department]?.evidence) return []
  
  return aiAnalysis.processes_mentioned[department].evidence.map((item: any) => ({
    employee: item.full_name || item.employee,
    role: item.role,
    description: item.quote || item.description || item.task,
    linkedin_url: item.profile_url || item.linkedin_url,
  }))
}

// Extract evidence from notable facts
export const extractNotableFactsEvidence = (aiAnalysis: any): EvidenceItem[] => {
  if (!aiAnalysis?.other_notable_facts) return []
  
  const evidenceItems: EvidenceItem[] = []
  
  aiAnalysis.other_notable_facts.forEach((fact: any) => {
    if (fact?.evidence && Array.isArray(fact.evidence)) {
      fact.evidence.forEach((item: any) => {
        evidenceItems.push({
          employee: item.full_name || item.employee,
          role: item.role,
          description: item.quote || item.description,
          linkedin_url: item.profile_url || item.linkedin_url,
        })
      })
    }
  })
  
  return evidenceItems
}

// Extract evidence from manual work indicators
export const extractManualWorkEvidence = (aiAnalysis: any): EvidenceItem[] => {
  if (!aiAnalysis?.manual_work_indicators) return []
  
  const evidenceItems: EvidenceItem[] = []
  
  aiAnalysis.manual_work_indicators.forEach((indicator: any) => {
    if (indicator?.evidence && Array.isArray(indicator.evidence)) {
      indicator.evidence.forEach((item: any) => {
        evidenceItems.push({
          employee: item.full_name || item.employee,
          role: item.role,
          description: item.quote || item.description,
          linkedin_url: item.profile_url || item.linkedin_url,
        })
      })
    }
  })
  
  return evidenceItems
}
