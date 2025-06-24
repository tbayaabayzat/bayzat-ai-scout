
import { Sparkles } from "lucide-react"
import { SuggestedQueries } from "./SuggestedQueries"

interface ChatEmptyStateProps {
  onSelectQuery: (query: string) => void
}

export function ChatEmptyState({ onSelectQuery }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
      <p className="text-muted-foreground text-center mb-8 max-w-md">
        Ask me anything about your companies, employees, or systems. I can help you find insights and analyze your data with rich visualizations.
      </p>
      <SuggestedQueries onSelect={onSelectQuery} />
    </div>
  )
}
