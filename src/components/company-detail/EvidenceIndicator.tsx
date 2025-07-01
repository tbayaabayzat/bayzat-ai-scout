
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Info, User, ExternalLink, FileText } from "lucide-react"

interface EvidenceItem {
  employee?: string
  role?: string
  description?: string
  linkedin_url?: string
  task?: string
  quote?: string
  confidence?: string
}

interface EvidenceIndicatorProps {
  evidence: EvidenceItem[]
  size?: "sm" | "md"
  className?: string
}

export function EvidenceIndicator({ evidence, size = "sm", className = "" }: EvidenceIndicatorProps) {
  if (!evidence || evidence.length === 0) {
    return null
  }

  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4"
  const containerSize = size === "sm" ? "h-5 w-5" : "h-6 w-6"

  return (
    <TooltipProvider>
      <Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`${containerSize} p-0 hover:bg-blue-50 relative ${className}`}
              >
                <div className="relative">
                  <FileText className={`${iconSize} text-blue-600 opacity-70 hover:opacity-100 transition-opacity`} />
                  {evidence.length > 1 && (
                    <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center font-medium">
                      {evidence.length > 9 ? '9+' : evidence.length}
                    </div>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {evidence.length === 1 ? 'Evidence available' : `${evidence.length} evidence sources`}
          </TooltipContent>
        </Tooltip>
        
        <PopoverContent className="w-80" align="start">
          <div className="space-y-3">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              Evidence ({evidence.length})
            </h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {evidence.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg bg-muted/30">
                  {item.employee && (
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{item.employee}</span>
                      {item.role && (
                        <Badge variant="secondary" className="text-xs">
                          {item.role}
                        </Badge>
                      )}
                      {item.linkedin_url && (
                        <a 
                          href={item.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  )}
                  {(item.description || item.task || item.quote) && (
                    <p className="text-xs text-muted-foreground">
                      {item.quote && `"${item.quote}"`}
                      {!item.quote && (item.description || item.task)}
                    </p>
                  )}
                  {item.confidence && (
                    <Badge variant="outline" className="text-xs mt-2">
                      {item.confidence}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}
