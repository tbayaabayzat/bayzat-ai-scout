
import { cn } from "@/lib/utils"
import { MessageHeader } from "./MessageHeader"
import { MessageContent } from "./MessageContent"
import { MessageSections } from "./MessageSections"
import { MessageToolResults } from "./MessageToolResults"
import { MessageActions } from "./MessageActions"
import { SuggestedActions } from "./SuggestedActions"
import { CompanyCardData, ContentSection, SuggestedAction } from "@/types/chat"

interface Message {
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

interface ToolResult {
  tool: string
  success: boolean
  data?: any
  error?: string
  execution_time_ms: number
}

interface ChatMessageProps {
  message: Message
  onCompanyClick?: (company: CompanyCardData) => void
  onSuggestedActionClick?: (action: SuggestedAction) => void
}

export function ChatMessage({ message, onCompanyClick, onSuggestedActionClick }: ChatMessageProps) {
  const isUser = message.role === 'user'

  // Check if we have any content to display
  const hasTextContent = message.content && message.content.trim().length > 0
  const hasRichContent = (message.sections && message.sections.length > 0) ||
                         (message.toolResults && message.toolResults.length > 0) ||
                         (message.suggestedActions && message.suggestedActions.length > 0)

  // Don't render empty assistant messages without rich content
  if (!isUser && !hasTextContent && !hasRichContent) {
    return null
  }

  return (
    <div className={cn(
      "group flex gap-4 px-4 py-6 rounded-2xl transition-all duration-200",
      isUser 
        ? "bg-primary/5 ml-12" 
        : "bg-muted/30 hover:bg-muted/40"
    )}>
      <MessageHeader
        isUser={isUser}
        timestamp={message.timestamp}
        isStreaming={message.isStreaming}
        contentType={message.contentType}
      />

      <div className="flex-1 min-w-0">
        {/* Text content - only render if there's actual content */}
        {hasTextContent && (
          <MessageContent content={message.content} />
        )}

        {/* Rich content sections */}
        {message.sections && message.sections.length > 0 && (
          <div className={hasTextContent ? "mt-4" : ""}>
            <MessageSections 
              sections={message.sections}
              onCompanyClick={onCompanyClick}
            />
          </div>
        )}

        {/* Suggested actions */}
        {message.suggestedActions && message.suggestedActions.length > 0 && (
          <SuggestedActions
            actions={message.suggestedActions}
            onActionClick={onSuggestedActionClick || (() => {})}
          />
        )}

        {/* Tool results */}
        {message.toolResults && message.toolResults.length > 0 && (
          <MessageToolResults toolResults={message.toolResults} />
        )}

        {/* Message actions */}
        {!isUser && hasTextContent && (
          <MessageActions content={message.content} />
        )}
      </div>
    </div>
  )
}
