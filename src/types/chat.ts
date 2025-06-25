

export interface CompanyCardData {
  id: string
  company_name: string
  industry?: string
  employee_count?: number
  logo_url?: string
  website_url?: string
  bayzat_relationship?: string
  description?: string
  tagline?: string
  founded_year?: number
  headquarter?: any
  ai_analysis?: any // Add ai_analysis to the type
  // Enhanced automation fields
  has_erp?: boolean
  has_hris?: boolean
  has_accounting?: boolean
  has_payroll?: boolean
  automation_overall?: number
  automation_hr?: number
  automation_finance?: number
  automation_operations?: number
  automation_sales?: number
  location?: string
}

export interface SuggestedAction {
  label: string
  query: string
  type: 'query' | 'filter' | 'action'
}

export interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'scatter'
  data: any[]
  title: string
}

export interface DataTableData {
  columns: string[]
  data: any[]
  exportable?: boolean
}

export interface ContentSection {
  type: 'text' | 'company-cards' | 'data-table' | 'chart' | 'actions'
  data: any
  metadata?: any
}

export interface MessageSection {
  type: 'text' | 'company-cards' | 'data-table' | 'chart' | 'actions'
  data: any
  metadata?: any
}

export interface ChatResponse {
  message: string
  content_type: 'text' | 'mixed'
  sections: MessageSection[]
  tool_results?: any[]
  suggested_actions?: SuggestedAction[]
}

