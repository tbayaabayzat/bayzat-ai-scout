
import { Button } from "@/components/ui/button"
import { SuggestedAction } from "@/types/chat"
import { Search, Filter, Zap } from "lucide-react"

interface SuggestedActionsProps {
  actions: SuggestedAction[]
  onActionClick: (action: SuggestedAction) => void
}

export function SuggestedActions({ actions, onActionClick }: SuggestedActionsProps) {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'query': return Search
      case 'filter': return Filter
      case 'action': return Zap
      default: return Search
    }
  }

  if (actions.length === 0) return null

  return (
    <div className="my-4 p-4 bg-muted/30 rounded-lg">
      <h4 className="text-sm font-medium text-muted-foreground mb-3">
        Suggested actions:
      </h4>
      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => {
          const Icon = getActionIcon(action.type)
          return (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => onActionClick(action)}
              className="h-auto p-2 text-left justify-start hover:bg-background/80"
            >
              <Icon className="w-3 h-3 mr-2 flex-shrink-0" />
              <span className="text-xs">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
