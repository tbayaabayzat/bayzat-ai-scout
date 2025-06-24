
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useMessages } from "@/hooks/useMessages"
import { sendChatMessage } from "@/services/chatApi"

export function useChatState() {
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const { user } = useAuth()
  const { messages, addMessage, updateLastMessage, clearMessages } = useMessages()

  const sendMessage = async (userMessage: string) => {
    addMessage('user', userMessage)
    setIsLoading(true)
    setIsStreaming(true)

    try {
      const allMessages = [...messages, {
        id: crypto.randomUUID(),
        role: 'user' as const,
        content: userMessage,
        timestamp: new Date()
      }]

      const response = await sendChatMessage(allMessages, user?.id)

      addMessage('assistant', '')

      if (response.message) {
        let currentContent = ""
        const words = response.message.split(" ")
        
        for (let i = 0; i < words.length; i++) {
          currentContent += (i > 0 ? " " : "") + words[i]
          updateLastMessage(currentContent)
          await new Promise(resolve => setTimeout(resolve, 30))
        }
        
        updateLastMessage(currentContent, {
          isComplete: true,
          toolResults: response.tool_results,
          contentType: response.content_type,
          sections: response.sections,
          suggestedActions: response.suggested_actions
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
    clearMessages()
  }

  return {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    clearChat
  }
}
