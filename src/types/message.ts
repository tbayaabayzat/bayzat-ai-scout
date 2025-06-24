
import { ContentSection, SuggestedAction } from "@/types/chat"

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  toolResults?: ToolResult[]
  contentType?: 'text' | 'mixed'
  sections?: ContentSection[]
  suggestedActions?: SuggestedAction[]
}

export interface ToolResult {
  tool: string
  success: boolean
  data?: any
  error?: string
  execution_time_ms: number
}

export interface ChatApiResponse {
  message?: string
  tool_results?: ToolResult[]
  content_type?: 'text' | 'mixed'
  sections?: ContentSection[]
  suggested_actions?: SuggestedAction[]
}
