
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { ChatHeader } from "./ChatHeader"
import { ChatEmptyState } from "./ChatEmptyState"
import { ChatInputForm } from "./ChatInputForm"

export function DashboardChatInterface() {
  const [input, setInput] = useState("")
  const navigate = useNavigate()

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
  }

  const handleSubmit = (message: string) => {
    // Encode the message and navigate to chat page
    const encodedMessage = encodeURIComponent(message)
    navigate(`/chat?message=${encodedMessage}`)
  }

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto">
      <ChatHeader onClear={() => {}} messageCount={0} />
      
      <Card className="flex-1 flex flex-col border-0 shadow-none bg-transparent">
        <div className="flex-1 flex items-center justify-center">
          <ChatEmptyState onSelectQuery={handleSuggestedQuery} />
        </div>

        <ChatInputForm
          onSubmit={handleSubmit}
          isLoading={false}
          value={input}
          onValueChange={setInput}
          showModeSelector={false}
        />
      </Card>
    </div>
  )
}
