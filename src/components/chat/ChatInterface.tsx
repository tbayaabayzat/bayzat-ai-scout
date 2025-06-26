
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChatHeader } from "./ChatHeader"
import { ChatEmptyState } from "./ChatEmptyState"
import { ChatMessageList } from "./ChatMessageList"
import { ChatInputForm } from "./ChatInputForm"
import { CompanyDetailSheet } from "../company-detail/CompanyDetailSheet"
import { EmployeeDetailSheet } from "../employee-detail/EmployeeDetailSheet"
import { CompanyCardData, SuggestedAction } from "@/types/chat"
import { EmployeeWithDepartment } from "@/types/employee"
import { useChatState } from "@/hooks/useChatState"

export function ChatInterface() {
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithDepartment | null>(null)
  const [isCompanySheetOpen, setIsCompanySheetOpen] = useState(false)
  const [isEmployeeSheetOpen, setIsEmployeeSheetOpen] = useState(false)
  const [input, setInput] = useState("")
  
  const { messages, isLoading, isStreaming, sendMessage, clearChat } = useChatState()

  const handleCompanyClick = (company: CompanyCardData) => {
    // Pass the complete company data including ai_analysis
    const companyData = {
      id: company.id,
      company_name: company.company_name,
      industry: company.industry,
      employee_count: company.employee_count,
      logo_url: company.logo_url,
      website_url: company.website_url,
      bayzat_relationship: company.bayzat_relationship,
      description: company.description,
      ai_analysis: company.ai_analysis, // Include ai_analysis data
      tagline: company.tagline,
      founded_year: company.founded_year,
      headquarter: company.headquarter,
      // Include any other fields that might be needed
      has_erp: company.has_erp,
      has_hris: company.has_hris,
      has_accounting: company.has_accounting,
      has_payroll: company.has_payroll,
      automation_overall: company.automation_overall,
      automation_hr: company.automation_hr,
      automation_finance: company.automation_finance,
      automation_operations: company.automation_operations,
      automation_sales: company.automation_sales,
      location: company.location
    }
    
    setSelectedCompany(companyData)
    setIsCompanySheetOpen(true)
  }

  const handleEmployeeClick = (employee: EmployeeWithDepartment) => {
    setSelectedEmployee(employee)
    setIsEmployeeSheetOpen(true)
  }

  const handleSuggestedActionClick = (action: SuggestedAction) => {
    setInput(action.query)
  }

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
  }

  const handleSubmit = (message: string, mode?: string) => {
    console.log('🎯 ChatInterface handleSubmit:', { message, mode })
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
              onEmployeeClick={handleEmployeeClick}
              onSuggestedActionClick={handleSuggestedActionClick}
            />
          )}

          <ChatInputForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            value={input}
            onValueChange={setInput}
            showModeSelector={false} // Keep simple for now, can be enabled later
          />
        </Card>
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={isCompanySheetOpen}
        onOpenChange={setIsCompanySheetOpen}
      />

      <EmployeeDetailSheet
        employee={selectedEmployee}
        open={isEmployeeSheetOpen}
        onOpenChange={setIsEmployeeSheetOpen}
      />
    </>
  )
}
