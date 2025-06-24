
import { Trash2, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ChatHeaderProps {
  onClear: () => void
  messageCount: number
}

export function ChatHeader({ onClear, messageCount }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 pb-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">AI Data Assistant</h1>
          <p className="text-sm text-muted-foreground">
            Intelligent insights for your business data
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {messageCount > 0 && (
          <>
            <Badge variant="secondary" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" />
              {messageCount} messages
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
