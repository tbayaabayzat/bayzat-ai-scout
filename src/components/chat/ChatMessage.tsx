
import { useState } from "react"
import { Copy, Check, User, Bot, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CompanyCards } from "./CompanyCards"
import { ChatDataTable } from "./ChatDataTable"
import { ChatChart } from "./ChatChart"
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
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatContent = (content: string) => {
    // Simple formatting for better readability
    return content
      .split('\n')
      .map((line, index) => {
        // Handle bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return (
            <li key={index} className="ml-4">
              {line.trim().substring(1).trim()}
            </li>
          )
        }
        // Handle bold text
        const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        return (
          <p key={index} className={line.trim() ? "mb-2" : "mb-1"}>
            <span dangerouslySetInnerHTML={{ __html: boldFormatted }} />
          </p>
        )
      })
  }

  const renderSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case 'company-cards':
        return (
          <CompanyCards
            key={index}
            companies={section.data}
            onCompanyClick={onCompanyClick || (() => {})}
          />
        )
      
      case 'data-table':
        return (
          <ChatDataTable
            key={index}
            data={{
              columns: section.metadata?.columns || Object.keys(section.data[0] || {}),
              data: section.data,
              exportable: section.metadata?.exportable
            }}
          />
        )
      
      case 'chart':
        return (
          <ChatChart
            key={index}
            data={section.data}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className={cn(
      "group flex gap-4 px-4 py-6 rounded-2xl transition-all duration-200",
      isUser 
        ? "bg-primary/5 ml-12" 
        : "bg-muted/30 hover:bg-muted/40"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-background border border-border"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4 text-primary" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-medium text-sm">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {message.isStreaming && (
            <Badge variant="secondary" className="text-xs">
              Thinking...
            </Badge>
          )}
          {message.contentType === 'mixed' && (
            <Badge variant="outline" className="text-xs">
              Rich Content
            </Badge>
          )}
        </div>

        {/* Text content */}
        <div className="prose prose-sm max-w-none text-foreground">
          {typeof message.content === 'string' ? (
            <div className="space-y-1">
              {formatContent(message.content)}
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>

        {/* Rich content sections */}
        {message.sections && message.sections.length > 0 && (
          <div className="mt-4">
            {message.sections.map((section, index) => renderSection(section, index))}
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
          <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50">
            <div className="text-xs font-medium text-muted-foreground mb-2">
              Tool Results
            </div>
            <div className="space-y-2">
              {message.toolResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={result.success ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {result.tool}
                    </Badge>
                    <span className="text-muted-foreground">
                      {result.execution_time_ms}ms
                    </span>
                  </div>
                  {result.data && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!isUser && (
          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
