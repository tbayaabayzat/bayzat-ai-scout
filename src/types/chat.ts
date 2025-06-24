
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

export interface ChatResponse {
  success: boolean
  message?: string
  error?: string
  tool_results?: ToolResult[]
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
