
import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface ChatInputFormProps {
  onSubmit: (message: string) => void
  isLoading: boolean
  value?: string
  onValueChange?: (value: string) => void
}

export function ChatInputForm({ onSubmit, isLoading, value = "", onValueChange }: ChatInputFormProps) {
  const [input, setInput] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (value !== input) {
      setInput(value)
    }
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const message = input.trim()
    setInput("")
    onValueChange?.("")
    onSubmit(message)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    onValueChange?.(newValue)
  }

  return (
    <div className="p-6 pt-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about companies, create charts, analyze data..."
            className="pr-12 h-12 text-base border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/40 focus:bg-background transition-all duration-200"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !input.trim()}
            className={cn(
              "absolute right-2 h-8 w-8 rounded-lg",
              "bg-primary/90 hover:bg-primary shadow-sm",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Press Enter to send • Rich content supported</span>
          {user && (
            <span>Signed in as {user.email}</span>
          )}
        </div>
      </form>
    </div>
  )
}
