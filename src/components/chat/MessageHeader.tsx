
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
    <div className="flex flex-col items-center gap-2">
      {/* Avatar */}
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

      {/* Metadata stack */}
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-medium text-xs">
          {isUser ? 'You' : 'AI'}
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
            Rich
          </Badge>
        )}
      </div>
    </div>
  )
}
