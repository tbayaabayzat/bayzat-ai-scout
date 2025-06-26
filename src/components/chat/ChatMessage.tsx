
import { MessageHeader } from "./MessageHeader"
import { MessageContent } from "./MessageContent"
import { MessageSections } from "./MessageSections"
import { MessageToolResults } from "./MessageToolResults"
import { SuggestedActions } from "./SuggestedActions"
import { CompanyCardData, SuggestedAction } from "@/types/chat"
import { EmployeeWithDepartment } from "@/types/employee"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  toolResults?: any[]
  contentType?: 'text' | 'mixed'
  sections?: any[]
  suggestedActions?: SuggestedAction[]
}

interface ChatMessageProps {
  message: Message
  onCompanyClick: (company: CompanyCardData) => void
  onEmployeeClick: (employee: EmployeeWithDepartment) => void
  onSuggestedActionClick: (action: SuggestedAction) => void
}

export function ChatMessage({ 
  message, 
  onCompanyClick,
  onEmployeeClick, 
  onSuggestedActionClick 
}: ChatMessageProps) {
  console.log('ChatMessage - Rendering with onCompanyClick:', !!onCompanyClick)
  
  return (
    <div className="flex items-start gap-4 px-6">
      <MessageHeader 
        isUser={message.role === 'user'} 
        timestamp={message.timestamp}
        isStreaming={message.isStreaming}
        contentType={message.contentType}
      />
      
      <div className="flex-1 space-y-4 min-w-0">
        {message.content && (
          <MessageContent content={message.content} />
        )}
        
        {message.sections && message.sections.length > 0 && (
          <MessageSections 
            sections={message.sections} 
            onCompanyClick={onCompanyClick}
            onEmployeeClick={onEmployeeClick}
          />
        )}
        
        {message.toolResults && message.toolResults.length > 0 && (
          <MessageToolResults toolResults={message.toolResults} />
        )}
        
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <SuggestedActions 
            actions={message.suggestedActions}
            onActionClick={onSuggestedActionClick}
          />
        )}
      </div>
    </div>
  )
}
