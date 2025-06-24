
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChatHeader } from "./ChatHeader"
import { ChatEmptyState } from "./ChatEmptyState"
import { ChatMessageList } from "./ChatMessageList"
import { ChatInputForm } from "./ChatInputForm"
import { CompanyDetailSheet } from "../company-detail/CompanyDetailSheet"
import { CompanyCardData, SuggestedAction } from "@/types/chat"
import { useChatState } from "@/hooks/useChatState"

export function ChatInterface() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [isCompanySheetOpen, setIsCompanySheetOpen] = useState(false)
  const [input, setInput] = useState("")
  
  const { messages, isLoading, isStreaming, sendMessage, clearChat } = useChatState()

  const handleCompanyClick = (company: CompanyCardData) => {
    const companyData = {
      id: company.id,
      company_name: company.company_name,
      industry: company.industry,
      employee_count: company.employee_count,
      logo_url: company.logo_url,
      website_url: company.website_url,
      bayzat_relationship: company.bayzat_relationship,
      description: company.description,
    }
    
    setSelectedCompany(companyData)
    setIsCompanySheetOpen(true)
  }

  const handleSuggestedActionClick = (action: SuggestedAction) => {
    setInput(action.query)
  }

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
  }

  const handleSubmit = (message: string) => {
    sendMessage(message)
  }

  return (
    <>
      <div className="flex flex-col h-full max-w-6xl mx-auto">
        <ChatHeader onClear={clearChat} messageCount={messages.length} />
        
        <Card className="flex-1 flex flex-col border-0 shadow-none bg-transparent">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <ChatEmptyState onSelectQuery={handleSuggestedQuery} />
            </div>
          ) : (
            <ChatMessageList
              messages={messages}
              isStreaming={isStreaming}
              onCompanyClick={handleCompanyClick}
              onSuggestedActionClick={handleSuggestedActionClick}
            />
          )}

          <ChatInputForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            value={input}
            onValueChange={setInput}
          />
        </Card>
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={isCompanySheetOpen}
        onOpenChange={setIsCompanySheetOpen}
      />
    </>
  )
}
