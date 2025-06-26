
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RequestItem as RequestItemType } from "./types"
import { getStatusIcon, getStatusColor, getRelationshipIcon, getRelationshipColor } from "./utils"

interface RequestItemProps {
  request: RequestItemType
  isLoading: boolean
  onClick: (request: RequestItemType) => void
  onKeyDown: (event: React.KeyboardEvent, request: RequestItemType) => void
}

export function RequestItem({ request, isLoading, onClick, onKeyDown }: RequestItemProps) {
  const isClickable = request.status === 'completed'

  const handleClick = () => {
    console.log('🖱️ RequestItem clicked:', {
      id: request.id,
      status: request.status,
      isClickable,
      url: request.linkedin_url
    })
    
    if (isClickable) {
      onClick(request)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log('⌨️ RequestItem key pressed:', {
      key: e.key,
      isClickable,
      status: request.status
    })
    onKeyDown(e, request)
  }

  return (
    <div 
      className={`
        group relative rounded-lg border transition-all duration-200
        ${isClickable 
          ? 'cursor-pointer hover:border-primary/40 hover:bg-accent/50 hover:shadow-sm focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20' 
          : 'cursor-default border-border bg-muted/20'
        }
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? `View company details for ${request.linkedin_url}` : undefined}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              getStatusIcon(request.status)
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm text-foreground truncate font-medium">
              {request.linkedin_url}
            </p>
            {isClickable && (
              <p className="text-xs text-muted-foreground mt-0.5">
                Click to view company details
              </p>
            )}
          </div>
          
          {isClickable && (
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-3">
          <Badge 
            variant={getRelationshipColor(request.bayzat_relationship)} 
            className="text-xs flex items-center gap-1"
          >
            {getRelationshipIcon(request.bayzat_relationship)}
            {request.bayzat_relationship}
          </Badge>
          <Badge variant={getStatusColor(request.status)} className="text-xs">
            {request.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}
