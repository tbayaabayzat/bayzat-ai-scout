
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Info, User, ExternalLink } from "lucide-react"

interface EvidenceItem {
  employee?: string
  role?: string
  description?: string
  linkedin_url?: string
  task?: string
}

interface EvidenceIndicatorProps {
  evidence: EvidenceItem[]
  label?: string
  size?: "sm" | "md"
}

export function EvidenceIndicator({ evidence, label = "Evidence", size = "sm" }: EvidenceIndicatorProps) {
  if (!evidence || evidence.length === 0) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size={size === "sm" ? "sm" : "default"} className="h-auto p-1">
          <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100">
            <Info className="h-3 w-3" />
            {label} ({evidence.length})
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">{label} Details</h4>
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
                {(item.description || item.task) && (
                  <p className="text-xs text-muted-foreground">
                    {item.description || item.task}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
