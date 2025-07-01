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
  console.log('processEvidence - Input evidence:', evidence)
  
  if (!Array.isArray(evidence)) {
    console.log('processEvidence - Not an array, returning empty')
    return []
  }
  
  const processed = evidence.map(item => {
    console.log('processEvidence - Processing item:', item)
    
    if (typeof item === 'string') {
      return { description: item }
    }
    
    // Map database fields to component expected fields
    const processedItem = {
      employee: item.fullname || item.employee || item.name,
      role: item.role || item.title,
      description: item.evidence || item.description || item.task || item.quote,
      linkedin_url: item.profile_url || item.linkedin_url,
      task: item.task,
      quote: item.quote,
      confidence: item.confidence
    }
    
    console.log('processEvidence - Processed item:', processedItem)
    return processedItem
  }).filter(item => {
    // Check if any of the key properties exist and have values
    const hasDescription = item.description && item.description.trim().length > 0
    const hasEmployee = 'employee' in item && item.employee && item.employee.trim().length > 0
    const hasTask = 'task' in item && item.task && item.task.trim().length > 0
    const hasQuote = 'quote' in item && item.quote && item.quote.trim().length > 0
    
    return hasDescription || hasEmployee || hasTask || hasQuote
  })
  
  console.log('processEvidence - Final processed evidence:', processed)
  return processed
}

export const extractSystemEvidence = (systems: any, systemKey: string): ProcessedEvidence[] => {
  console.log(`extractSystemEvidence - systems:`, systems, `systemKey:`, systemKey)
  
  if (!systems || !systems[systemKey]) {
    console.log(`extractSystemEvidence - No data for ${systemKey}`)
    return []
  }
  
  const evidence = systems[systemKey].evidence || []
  console.log(`extractSystemEvidence - Raw evidence for ${systemKey}:`, evidence)
  
  const processed = processEvidence(evidence)
  console.log(`extractSystemEvidence - Processed evidence for ${systemKey}:`, processed)
  
  return processed
}

export const extractAutomationEvidence = (aiAnalysis: any, department?: string): ProcessedEvidence[] => {
  console.log('extractAutomationEvidence - aiAnalysis:', aiAnalysis, 'department:', department)
  
  if (!aiAnalysis?.automation_level) {
    console.log('extractAutomationEvidence - No automation_level data')
    return []
  }
  
  if (department) {
    // Look for department-specific evidence
    const deptData = aiAnalysis.automation_level[department]
    console.log(`extractAutomationEvidence - Department ${department} data:`, deptData)
    
    if (deptData && typeof deptData === 'object' && deptData.evidence) {
      const processed = processEvidence(deptData.evidence)
      console.log(`extractAutomationEvidence - Department ${department} processed:`, processed)
      return processed
    }
  }
  
  // Fall back to general automation evidence
  const generalEvidence = aiAnalysis.automation_level.evidence || []
  console.log('extractAutomationEvidence - General evidence:', generalEvidence)
  
  const processed = processEvidence(generalEvidence)
  console.log('extractAutomationEvidence - General processed:', processed)
  
  return processed
}

export const extractProcessEvidence = (processData: any, department: string, activity?: string): ProcessedEvidence[] => {
  console.log('extractProcessEvidence - processData:', processData, 'department:', department, 'activity:', activity)
  
  if (!processData || !processData[department]) {
    console.log(`extractProcessEvidence - No data for department ${department}`)
    return []
  }
  
  const deptData = processData[department]
  console.log(`extractProcessEvidence - Department ${department} data:`, deptData)
  
  if (activity && deptData.activities_evidence && deptData.activities_evidence[activity]) {
    const activityEvidence = deptData.activities_evidence[activity]
    console.log(`extractProcessEvidence - Activity ${activity} evidence:`, activityEvidence)
    const processed = processEvidence(activityEvidence)
    console.log(`extractProcessEvidence - Activity ${activity} processed:`, processed)
    return processed
  }
  
  const generalEvidence = deptData.evidence || []
  console.log(`extractProcessEvidence - General department evidence:`, generalEvidence)
  
  const processed = processEvidence(generalEvidence)
  console.log(`extractProcessEvidence - General department processed:`, processed)
  
  return processed
}

export const extractNotableFactsEvidence = (aiAnalysis: any): ProcessedEvidence[] => {
  console.log('extractNotableFactsEvidence - aiAnalysis:', aiAnalysis)
  
  if (!aiAnalysis?.other_notable_facts) {
    console.log('extractNotableFactsEvidence - No other_notable_facts')
    return []
  }
  
  const allEvidence = []
  
  if (Array.isArray(aiAnalysis.other_notable_facts)) {
    aiAnalysis.other_notable_facts.forEach((fact: any, index: number) => {
      console.log(`extractNotableFactsEvidence - Fact ${index}:`, fact)
      
      if (fact?.evidence) {
        console.log(`extractNotableFactsEvidence - Fact ${index} evidence:`, fact.evidence)
        const processed = processEvidence(fact.evidence)
        console.log(`extractNotableFactsEvidence - Fact ${index} processed:`, processed)
        allEvidence.push(...processed)
      }
    })
  }
  
  console.log('extractNotableFactsEvidence - All processed evidence:', allEvidence)
  return allEvidence
}
