
import { Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AIFilterBadgeProps {
  query: string
  onClear: () => void
  onRerun?: () => void
}

export function AIFilterBadge({ query, onClear, onRerun }: AIFilterBadgeProps) {
  const truncatedQuery = query.length > 50 ? `${query.substring(0, 50)}...` : query

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <Sparkles className="h-4 w-4 text-bayzat-purple" />
          <span className="text-sm font-medium text-foreground">Active AI Search</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge 
          variant="outline" 
          className="bg-bayzat-purple/10 border-bayzat-purple/30 text-bayzat-purple hover:bg-bayzat-purple/20 transition-colors cursor-pointer px-3 py-1.5 h-auto"
          onClick={onRerun}
        >
          <Sparkles className="h-3 w-3 mr-2" />
          <span className="text-sm">{truncatedQuery}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            className="h-4 w-4 p-0 ml-2 hover:bg-bayzat-purple/20 text-bayzat-purple hover:text-bayzat-purple"
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      </div>
    </div>
  )
}
