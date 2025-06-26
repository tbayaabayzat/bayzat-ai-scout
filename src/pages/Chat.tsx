
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ChatInterface } from "@/components/chat/ChatInterface"
import { useChatState } from "@/hooks/useChatState"

export default function Chat() {
  const location = useLocation()
  const { sendMessage } = useChatState()

  useEffect(() => {
    // Check for initial message in URL parameters
    const searchParams = new URLSearchParams(location.search)
    const initialMessage = searchParams.get('message')
    
    if (initialMessage) {
      const decodedMessage = decodeURIComponent(initialMessage)
      // Send the message after a short delay to ensure component is mounted
      setTimeout(() => {
        sendMessage(decodedMessage)
      }, 100)
      
      // Clean up URL by removing the message parameter
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [location.search, sendMessage])

  return (
    <div className="flex-1 flex flex-col h-screen bg-background">
      <ChatInterface />
    </div>
  )
}
