import { useState } from "react"
import { format } from "date-fns"
import { Building2, ChevronUp, ChevronDown, Loader2 } from "lucide-react"
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
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

interface RequestsTableProps {
  requests: RequestItem[]
  onCompanySelected?: (company: any) => void
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

type SortField = 'company' | 'status' | 'relationship' | 'created_at' | 'requester'
type SortDirection = 'asc' | 'desc'

export function RequestsTable({ requests, onCompanySelected }: RequestsTableProps) {
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [loadingCompanyId, setLoadingCompanyId] = useState<number | null>(null)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRequestClick = async (request: RequestItem) => {
    if (request.status !== 'completed' || !onCompanySelected) return
    
    setLoadingCompanyId(request.id)
    try {
      // First try to find company by exact URL match
      let { data: company, error } = await supabase
        .from('companies2')
        .select('*')
        .eq('url', request.linkedin_url)
        .maybeSingle()

      if (error) throw error

      // If no exact match, try fuzzy search by company name
      if (!company) {
        const companyName = extractCompanyNameFromUrl(request.linkedin_url)
        const { data: fuzzyMatches, error: fuzzyError } = await supabase
          .from('companies2')
          .select('*')
          .ilike('company_name', `%${companyName}%`)
          .limit(1)
          .maybeSingle()

        if (fuzzyError) throw fuzzyError
        company = fuzzyMatches
      }

      if (company) {
        onCompanySelected(company)
      } else {
        toast.error('Company not found', {
          description: 'The company data may still be processing.'
        })
      }
    } catch (error) {
      console.error('Error fetching company:', error)
      toast.error('Failed to load company', {
        description: 'Please try again later.'
      })
    } finally {
      setLoadingCompanyId(null)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, request: RequestItem) => {
    if (request.status === 'completed' && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      handleRequestClick(request)
    }
  }

  const getSortedRequests = () => {
    if (!requests) return []
    
    return [...requests].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number
      
      switch (sortField) {
        case 'company':
          aValue = extractCompanyNameFromUrl(a.linkedin_url).toLowerCase()
          bValue = extractCompanyNameFromUrl(b.linkedin_url).toLowerCase()
          break
        case 'status':
          aValue = a.status.toLowerCase()
          bValue = b.status.toLowerCase()
          break
        case 'relationship':
          aValue = a.bayzat_relationship.toLowerCase()
          bValue = b.bayzat_relationship.toLowerCase()
          break
        case 'created_at':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        case 'requester':
          aValue = (a.requester || 'Unknown').toLowerCase()
          bValue = (b.requester || 'Unknown').toLowerCase()
          break
        default:
          return 0
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-3 w-3" /> : 
            <ChevronDown className="h-3 w-3" />
        )}
      </div>
    </TableHead>
  )

  const sortedRequests = getSortedRequests()

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
              <SortableHeader field="company">Company</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="relationship">Relationship</SortableHeader>
              <SortableHeader field="created_at">Requested On</SortableHeader>
              <SortableHeader field="requester">Requested By</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.map((request) => {
              const isClickable = request.status === 'completed' && onCompanySelected
              const isLoading = loadingCompanyId === request.id
              
              return (
                <TableRow 
                  key={request.id}
                  className={isClickable ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}
                  onClick={() => isClickable && !isLoading && handleRequestClick(request)}
                  onKeyDown={(e) => handleKeyDown(e, request)}
                  tabIndex={isClickable ? 0 : undefined}
                  role={isClickable ? 'button' : undefined}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                      ) : (
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      )}
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
                  {format(new Date(request.created_at), 'MMM d, yyyy h:mm a')}
                </TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.requester || 'Unknown'}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}