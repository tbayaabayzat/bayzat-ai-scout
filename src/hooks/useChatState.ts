
import { useState, useRef } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { ContentSection, SuggestedAction } from "@/types/chat"

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

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const { user } = useAuth()

  const addMessage = (role: 'user' | 'assistant', content: string, options?: {
    toolResults?: ToolResult[]
    contentType?: 'text' | 'mixed'
    sections?: ContentSection[]
    suggestedActions?: SuggestedAction[]
  }) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
      isStreaming: role === 'assistant' && content === '',
      ...options
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const updateLastMessage = (content: string, options?: {
    isComplete?: boolean
    toolResults?: ToolResult[]
    contentType?: 'text' | 'mixed'
    sections?: ContentSection[]
    suggestedActions?: SuggestedAction[]
  }) => {
    setMessages(prev => {
      const updated = [...prev]
      if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
        updated[updated.length - 1].content = content
        if (options?.isComplete) {
          updated[updated.length - 1].isStreaming = false
        }
        if (options?.toolResults) {
          updated[updated.length - 1].toolResults = options.toolResults
        }
        if (options?.contentType) {
          updated[updated.length - 1].contentType = options.contentType
        }
        if (options?.sections) {
          updated[updated.length - 1].sections = options.sections
        }
        if (options?.suggestedActions) {
          updated[updated.length - 1].suggestedActions = options.suggestedActions
        }
      }
      return updated
    })
  }

  const sendMessage = async (userMessage: string) => {
    addMessage('user', userMessage)
    setIsLoading(true)
    setIsStreaming(true)

    try {
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

      addMessage('assistant', '')

      if (data?.message) {
        const response = data.message
        let currentContent = ""
        const words = response.split(" ")
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? " " : "") + words[i]
          updateLastMessage(currentContent)
          await new Promise(resolve => setTimeout(resolve, 30))
        }
        
        updateLastMessage(currentContent, {
          isComplete: true,
          toolResults: data.tool_results,
          contentType: data.content_type,
          sections: data.sections,
          suggestedActions: data.suggested_actions
        })
      } else {
        updateLastMessage('I processed your request successfully. How else can I help you?', { isComplete: true })
      }

    } catch (error) {
      console.error('Chat error:', error)
      addMessage('assistant', 'I apologize, but I encountered an error processing your request. Please try again or rephrase your question.')
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    clearChat
  }
}
