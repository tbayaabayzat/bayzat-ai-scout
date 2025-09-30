import { useState } from "react"
import { format } from "date-fns"
import { Building2, ChevronUp, ChevronDown } from "lucide-react"
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

export function RequestsTable({ requests }: RequestsTableProps) {
  const [sortField, setSortField] = useState<SortField>('created_at')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
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
            {sortedRequests.map((request) => (
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
                  {format(new Date(request.created_at), 'MMM d, yyyy h:mm a')}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {request.requester || 'Unknown'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}