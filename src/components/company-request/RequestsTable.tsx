import { format } from "date-fns"
import { Building2 } from "lucide-react"
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

export function RequestsTable({ requests }: RequestsTableProps) {

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}