
import { Company } from "@/types/company"

// Helper functions to extract data from ai_analysis
export const extractSystemBoolean = (aiAnalysis: any, systemName: string): boolean => {
  if (!aiAnalysis?.systems?.[systemName]) return false
  return aiAnalysis.systems[systemName].name !== "None"
}

export const extractAutomationScore = (aiAnalysis: any, department: string): number => {
  if (!aiAnalysis?.automation_level) return 0
  return aiAnalysis.automation_level[department] || 0
}

export const transformCompanyData = (data: any[]): Company[] => {
  return (data || []).map(item => {
    console.log('Transforming company:', item.company_name, 'with fields:', Object.keys(item))
    console.log('Company ID field:', item.company_id)
    console.log('Logo URL field:', item.logo_url)
    
    const company: Company = {
      id: item.id,
      company_id: item.company_id,
      company_name: item.company_name,
      website_url: item.website_url,
      logo_url: item.logo_url,
      url: item.url,
      tagline: item.tagline,
      industry: item.industry,
      headquarter: item.headquarter,
      employee_count: item.employee_count,
      bayzat_relationship: item.bayzat_relationship,
      ai_analysis: item.ai_analysis,
      description: item.description,
      founded_year: item.founded_year,
      // Extract systems data from ai_analysis
      has_erp: extractSystemBoolean(item.ai_analysis, 'ERP'),
      has_hris: extractSystemBoolean(item.ai_analysis, 'HRIS'),
      has_accounting: extractSystemBoolean(item.ai_analysis, 'Accounting'),
      has_payroll: extractSystemBoolean(item.ai_analysis, 'Payroll'),
      // Extract automation scores from ai_analysis
      automation_overall: extractAutomationScore(item.ai_analysis, 'overall'),
      automation_hr: extractAutomationScore(item.ai_analysis, 'hr'),
      automation_finance: extractAutomationScore(item.ai_analysis, 'finance'),
    }
    
    console.log('Transformed company fields:', Object.keys(company))
    return company
  })
}
