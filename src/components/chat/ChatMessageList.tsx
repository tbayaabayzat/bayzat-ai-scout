
import { useRef, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "./ChatMessage"
import { CompanyCardData, ContentSection, SuggestedAction } from "@/types/chat"
import { EmployeeWithDepartment } from "@/types/employee"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  toolResults?: any[]
  contentType?: 'text' | 'mixed'
  sections?: ContentSection[]
  suggestedActions?: SuggestedAction[]
}

interface ChatMessageListProps {
  messages: Message[]
  isStreaming: boolean
  onCompanyClick: (company: CompanyCardData) => void
  onEmployeeClick: (employee: EmployeeWithDepartment) => void
  onSuggestedActionClick: (action: SuggestedAction) => void
}

export function ChatMessageList({ 
  messages, 
  isStreaming, 
  onCompanyClick,
  onEmployeeClick, 
  onSuggestedActionClick 
}: ChatMessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <ScrollArea className="flex-1">
      <div className="space-y-4 py-6 px-2 max-w-full">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message}
            onCompanyClick={onCompanyClick}
            onEmployeeClick={onEmployeeClick}
            onSuggestedActionClick={onSuggestedActionClick}
          />
        ))}
        {isStreaming && (
          <div className="flex items-center gap-3 text-muted-foreground px-6">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </ScrollArea>
  )
}
