
import { useState } from "react"
import { Message, ToolResult } from "@/types/message"
import { ContentSection, SuggestedAction } from "@/types/chat"

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])

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

  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    addMessage,
    updateLastMessage,
    clearMessages
  }
}
