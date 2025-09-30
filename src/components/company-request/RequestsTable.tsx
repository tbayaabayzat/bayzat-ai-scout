import { useState } from "react"
import { format } from "date-fns"
import { Building2, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RequestItem } from "./types"

interface RequestsTableProps {
  requests: RequestItem[]
  onCompanySelected: (company: any) => void
}

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'completed':
      return 'default'
    case 'pending':
      return 'secondary'
    case 'failed':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const getRelationshipBadgeVariant = (relationship: string) => {
  switch (relationship) {
    case 'customer':
      return 'default'
    case 'prospect':
      return 'secondary'
    case 'partner':
      return 'outline'
    default:
      return 'secondary'
  }
}

const extractCompanyNameFromUrl = (url: string): string => {
  try {
    const urlParts = url.split('/')
    const companySlug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
    return companySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  } catch {
    return 'Unknown Company'
  }
}

export function RequestsTable({ requests, onCompanySelected }: RequestsTableProps) {
  const [isLoadingCompany, setIsLoadingCompany] = useState(false)
  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null)
  const { toast } = useToast()

  const handleViewCompany = async (request: RequestItem) => {
    if (request.status !== 'completed') return

    setIsLoadingCompany(true)
    setLoadingRequestId(request.id)
    
    try {
      console.log('🔍 Looking up company for URL:', request.linkedin_url)
      
      // First try direct URL match
      let { data: companies, error } = await supabase
        .from('companies2')
        .select('*')
        .eq('url', request.linkedin_url)
        .limit(1)

      if (error) {
        console.error('❌ Error fetching company by URL:', error)
        throw error
      }

      // If no exact match, try fuzzy matching
      if (!companies || companies.length === 0) {
        console.log('🔍 No exact URL match, trying fuzzy search...')
        
        const urlParts = request.linkedin_url.split('/')
        const companySlug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
        
        if (companySlug) {
          const { data: fuzzyCompanies, error: fuzzyError } = await supabase
            .from('companies2')
            .select('*')
            .or(`company_name.ilike.%${companySlug}%,universal_name.ilike.%${companySlug}%`)
            .limit(5)

          if (fuzzyError) {
            console.error('❌ Error in fuzzy search:', fuzzyError)
          } else if (fuzzyCompanies && fuzzyCompanies.length > 0) {
            console.log('✅ Found fuzzy matches:', fuzzyCompanies.map(c => c.company_name))
            companies = fuzzyCompanies
          }
        }
      }

      if (companies && companies.length > 0) {
        console.log('✅ Found company:', companies[0].company_name)
        onCompanySelected(companies[0])
      } else {
        console.log('❌ No company found for URL:', request.linkedin_url)
        toast({
          title: "Company not found",
          description: "The analysis may still be processing or the company may not be in our database yet.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('❌ Error looking up company:', error)
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

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Building2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No recent requests found</p>
        <p className="text-sm">Submit a LinkedIn company URL above to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-foreground">Recent Requests</h4>
        <span className="text-xs text-muted-foreground">
          {requests.length} request{requests.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Relationship</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{extractCompanyNameFromUrl(request.linkedin_url)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getRelationshipBadgeVariant(request.bayzat_relationship)}>
                    {request.bayzat_relationship}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(request.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {request.requester || 'Unknown'}
                </TableCell>
                <TableCell className="text-right">
                  {request.status === 'completed' ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewCompany(request)}
                      disabled={loadingRequestId === request.id}
                      className="h-8 px-2"
                    >
                      {loadingRequestId === request.id ? (
                        "Loading..."
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </>
                      )}
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {request.status === 'pending' ? 'Processing...' : 'Failed'}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {requests.some(r => r.status === 'completed') && (
        <p className="text-xs text-muted-foreground">
          💡 Click "View" on completed requests to see detailed company analysis
        </p>
      )}
    </div>
  )
}