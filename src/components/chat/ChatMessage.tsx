
import { useState } from "react"
import { Copy, Check, User, Bot, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
  toolResults?: ToolResult[]
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
}

export function ChatMessage({ message }: ChatMessageProps) {
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
        </div>

        <div className="prose prose-sm max-w-none text-foreground">
          {typeof message.content === 'string' ? (
            <div className="space-y-1">
              {formatContent(message.content)}
            </div>
          ) : (
            <p>{message.content}</p>
          )}
        </div>

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
