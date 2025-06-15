
export type Company = {
  id: string
  company_name: string
  website_url?: string
  industry?: string
  headquarter?: any
  employee_count?: number
  bayzat_relationship: string
  ai_analysis?: any
  description?: string
  founded_year?: number
  // Fields from ai_analysis extraction
  has_erp?: boolean
  has_hris?: boolean
  has_accounting?: boolean
  has_payroll?: boolean
  automation_overall?: number
  automation_hr?: number
  automation_finance?: number
}

export type SystemsFilter = {
  erp?: boolean | null
  hris?: boolean | null
  accounting?: boolean | null
  payroll?: boolean | null
}

export type EmployeeCountFilter = {
  min?: number
  max?: number
}

export type AutomationFilter = {
  selectedScores?: number[]
  department?: 'overall' | 'hr' | 'finance'
}
