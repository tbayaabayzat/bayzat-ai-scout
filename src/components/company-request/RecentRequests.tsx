
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { RequestItem } from "./RequestItem"
import { RequestItem as RequestItemType } from "./types"

interface RecentRequestsProps {
  requests: RequestItemType[]
  onCompanySelected: (company: any) => void
}

export function RecentRequests({ requests, onCompanySelected }: RecentRequestsProps) {
  const [isLoadingCompany, setIsLoadingCompany] = useState(false)
  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleRequestClick = async (request: RequestItemType) => {
    if (request.status !== 'completed') return

    setIsLoadingCompany(true)
    setLoadingRequestId(request.id)
    
    try {
      console.log('Looking up company for URL:', request.linkedin_url)
      
      const { data: companies, error } = await supabase
        .from('companies2')
        .select('*')
        .eq('url', request.linkedin_url)
        .limit(1)

      if (error) {
        console.error('Error fetching company:', error)
        throw error
      }

      if (companies && companies.length > 0) {
        console.log('Found company:', companies[0])
        onCompanySelected(companies[0])
      } else {
        toast({
          title: "Company not found",
          description: "The company data is not available in our database yet.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error looking up company:', error)
      toast({
        title: "Error loading company",
        description: "Failed to load company details. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoadingCompany(false)
      setLoadingRequestId(null)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, request: RequestItemType) => {
    if (request.status === 'completed' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      handleRequestClick(request)
    }
  }

  if (!requests || requests.length === 0) {
    return null
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-foreground">Recent Requests</h4>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {requests.map((request) => (
          <RequestItem
            key={request.id}
            request={request}
            isLoading={loadingRequestId === request.id}
            onClick={handleRequestClick}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
      {requests.some(r => r.status === 'completed') && (
        <p className="text-xs text-muted-foreground mt-3 px-1">
          💡 Click on completed requests to view detailed company analysis
        </p>
      )}
    </div>
  )
}
