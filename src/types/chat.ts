
export interface ChatRequest {
  messages: ChatMessage[]
  stream?: boolean
  user_id?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export interface ContentSection {
  type: 'text' | 'company-cards' | 'data-table' | 'chart' | 'actions'
  data: any
  metadata?: any
}

export interface SuggestedAction {
  label: string
  query: string
  type: 'query' | 'filter' | 'action'
}

export interface ChatResponse {
  success: boolean
  message?: string
  error?: string
  content_type?: 'text' | 'mixed'
  sections?: ContentSection[]
  tool_results?: ToolResult[]
  suggested_actions?: SuggestedAction[]
}

export interface ToolResult {
  tool: string
  success: boolean
  data?: any
  error?: string
  execution_time_ms: number
}

export interface StreamResponse {
  content?: string
  done?: boolean
  tool_results?: ToolResult[]
}

// Company card specific types
export interface CompanyCardData {
  id: string
  company_name: string
  industry?: string
  employee_count?: number
  logo_url?: string
  website_url?: string
  bayzat_relationship: string
  automation_overall?: number
  location?: string
  description?: string
}

// Chart data types
export interface ChartData {
  type: 'bar' | 'pie' | 'line' | 'scatter'
  data: any[]
  title: string
}

// Data table types
export interface DataTableData {
  columns: string[]
  data: any[]
  exportable?: boolean
}
