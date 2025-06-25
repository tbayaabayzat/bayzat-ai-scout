
import { User, Bot } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MessageHeaderProps {
  isUser: boolean
  timestamp: Date
  isStreaming?: boolean
  contentType?: 'text' | 'mixed'
}

export function MessageHeader({ isUser, timestamp, isStreaming, contentType }: MessageHeaderProps) {
  return (
    <>
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
            {timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          {isStreaming && (
            <Badge variant="secondary" className="text-xs">
              Thinking...
            </Badge>
          )}
          {contentType === 'mixed' && (
            <Badge variant="outline" className="text-xs">
              Rich Content
            </Badge>
          )}
        </div>
      </div>
    </>
  )
}
