
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Search, Building2, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface ChatInputFormProps {
  onSubmit: (message: string, mode?: string) => void
  isLoading: boolean
  value?: string
  onValueChange?: (value: string) => void
  showModeSelector?: boolean
}

export function ChatInputForm({ 
  onSubmit, 
  isLoading, 
  value = "", 
  onValueChange,
  showModeSelector = false 
}: ChatInputFormProps) {
  const [input, setInput] = useState(value)
  const [mode, setMode] = useState<string>('smart')
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
    onSubmit(message, showModeSelector ? mode : undefined)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)
    onValueChange?.(newValue)
  }

  const getModeIcon = (modeValue: string) => {
    switch (modeValue) {
      case 'company': return <Building2 className="w-4 h-4" />
      case 'employee': return <Users className="w-4 h-4" />
      case 'analytics': return <BarChart3 className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 pt-0">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2">
          {showModeSelector && (
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-32">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    {getModeIcon(mode)}
                    <span className="capitalize text-sm">{mode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Smart
                  </div>
                </SelectItem>
                <SelectItem value="company">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Companies
                  </div>
                </SelectItem>
                <SelectItem value="employee">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Employees
                  </div>
                </SelectItem>
                <SelectItem value="analytics">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Analytics
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          
          <div className="relative flex items-center flex-1">
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
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>
            Press Enter to send • Rich content supported
            {showModeSelector && (
              <span className="ml-2 opacity-70">
                Mode: {mode === 'smart' ? 'AI will choose best approach' : `Focus on ${mode}`}
              </span>
            )}
          </span>
          {user && (
            <span>Signed in as {user.email}</span>
          )}
        </div>
      </form>
    </div>
  )
}
