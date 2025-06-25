
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MessageActionsProps {
  content: string
}

export function MessageActions({ content }: MessageActionsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
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
  )
}
