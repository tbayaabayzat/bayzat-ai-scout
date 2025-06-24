
import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Loader2, Copy, Check, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { ChatMessage } from "./ChatMessage"
import { SuggestedQueries } from "./SuggestedQueries"
import { ChatHeader } from "./ChatHeader"

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

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addMessage = (role: 'user' | 'assistant', content: string, toolResults?: ToolResult[]) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
      toolResults,
      isStreaming: role === 'assistant' && content === ''
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const updateLastMessage = (content: string, isComplete = false) => {
    setMessages(prev => {
      const updated = [...prev]
      if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
        updated[updated.length - 1].content = content
        if (isComplete) {
          updated[updated.length - 1].isStreaming = false
        }
      }
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    addMessage('user', userMessage)
    setIsLoading(true)
    setIsStreaming(true)

    try {
      // Create properly formatted messages array for the API
      const formattedMessages = messages.concat([{
        id: crypto.randomUUID(),
        role: 'user' as const,
        content: userMessage,
        timestamp: new Date()
      }]).map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      }))

      const { data, error } = await supabase.functions.invoke('chat-interface', {
        body: {
          messages: formattedMessages,
          stream: true,
          user_id: user?.id || 'anonymous'
        }
      })

      if (error) {
        throw error
      }

      // Add assistant message placeholder
      addMessage('assistant', '')

      // Handle the response
      if (data?.message) {
        // Simulate streaming for better UX
        const response = data.message
        let currentContent = ""
        const words = response.split(" ")
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? " " : "") + words[i]
          updateLastMessage(currentContent)
          await new Promise(resolve => setTimeout(resolve, 50))
        }
        
        updateLastMessage(currentContent, true)
        
        // Add tool results if available
        if (data.tool_results && data.tool_results.length > 0) {
          setMessages(prev => {
            const updated = [...prev]
            if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
              updated[updated.length - 1].toolResults = data.tool_results
            }
            return updated
          })
        }
      } else {
        updateLastMessage('I processed your request successfully. How else can I help you?', true)
      }

    } catch (error) {
      console.error('Chat error:', error)
      addMessage('assistant', 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.')
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
    inputRef.current?.focus()
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <ChatHeader onClear={clearChat} messageCount={messages.length} />
      
      <Card className="flex-1 flex flex-col border-0 shadow-none bg-transparent">
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
                <p className="text-muted-foreground text-center mb-8 max-w-md">
                  Ask me anything about your companies, employees, or systems. I can help you find insights and analyze your data.
                </p>
                <SuggestedQueries onSelect={handleSuggestedQuery} />
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isStreaming && (
                  <div className="flex items-center gap-3 text-muted-foreground">
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
              </>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about companies, employees, or systems..."
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
              <span>Press Enter to send</span>
              {user && (
                <span>Signed in as {user.email}</span>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
