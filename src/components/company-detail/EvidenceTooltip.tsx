
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ExternalLink, Users } from "lucide-react"

interface EvidenceTooltipProps {
  evidence: any
  children: React.ReactNode
}

export function EvidenceTooltip({ evidence, children }: EvidenceTooltipProps) {
  if (!evidence) return children

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-3">
          <div className="space-y-2">
            {evidence.profile_url && (
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span className="text-xs">Source: Employee Profile</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0"
                  onClick={() => window.open(evidence.profile_url.replace('/in/', '/in/'), '_blank')}
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
            {evidence.fullname && (
              <p className="text-xs font-medium">{evidence.fullname}</p>
            )}
            {typeof evidence === 'string' && (
              <p className="text-xs text-muted-foreground">{evidence}</p>
            )}
            {evidence.text && typeof evidence.text === 'string' && (
              <p className="text-xs text-muted-foreground">{evidence.text}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
