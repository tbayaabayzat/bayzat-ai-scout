
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
      console.log('Processed response in useChatState:', response)

      // Check if we have rich content sections or other data to display
      const hasRichContent = (response.sections && response.sections.length > 0) ||
                            (response.tool_results && response.tool_results.length > 0) ||
                            (response.suggested_actions && response.suggested_actions.length > 0)

      console.log('Has rich content:', hasRichContent)
      console.log('Sections:', response.sections)
      console.log('Tool results:', response.tool_results)
      console.log('Suggested actions:', response.suggested_actions)

      // Determine the message content to display
      let messageContent = response.message || ''
      
      // If no message but we have rich content, provide a helpful intro
      if (!messageContent && hasRichContent) {
        messageContent = "Here's what I found:"
      }
      
      // If we have neither message nor rich content, use fallback
      if (!messageContent && !hasRichContent) {
        messageContent = 'I processed your request successfully. How else can I help you?'
      }

      addMessage('assistant', '')

      if (messageContent) {
        let currentContent = ""
        const words = messageContent.split(" ")
        
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
        // Handle case where we only have rich content without text
        updateLastMessage('', {
          isComplete: true,
          toolResults: response.tool_results,
          contentType: response.content_type,
          sections: response.sections,
          suggestedActions: response.suggested_actions
        })
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
