
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { CompanyDetailSheet } from "./company-detail/CompanyDetailSheet"
import { RequestForm } from "./company-request/RequestForm"
import { RequestsTable } from "./company-request/RequestsTable"
import { RequestItem } from "./company-request/types"

export function CompanyRequestForm() {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isCompanySheetOpen, setIsCompanySheetOpen] = useState(false)

  const { data: requests, refetch } = useQuery({
    queryKey: ['linkedin-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('linkedin_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      
      // Type assertion to ensure compatibility with RequestItem interface
      return (data || []).map((item: any) => ({
        ...item,
        status: item.status as 'pending' | 'completed' | 'failed',
        bayzat_relationship: item.bayzat_relationship as 'prospect' | 'customer' | 'partner',
        requester: item.requester || null
      })) as RequestItem[]
    }
  })

  const handleRequestSubmitted = () => {
    refetch()
  }

  const handleCompanySelected = (company: any) => {
    setSelectedCompany(company)
    setIsCompanySheetOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Request Company Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RequestForm onRequestSubmitted={handleRequestSubmitted} />
          <RequestsTable 
            requests={requests} 
            onCompanySelected={handleCompanySelected}
          />
        </CardContent>
      </Card>

      <CompanyDetailSheet
        company={selectedCompany}
        open={isCompanySheetOpen}
        onOpenChange={setIsCompanySheetOpen}
      />
    </>
  )
}
