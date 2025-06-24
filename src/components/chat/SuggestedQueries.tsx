
import { Button } from "@/components/ui/button"
import { Building2, Users, TrendingUp, Search, Settings, BarChart3 } from "lucide-react"

interface SuggestedQueriesProps {
  onSelect: (query: string) => void
}

const suggestedQueries = [
  {
    icon: Building2,
    title: "Company Analysis",
    query: "Show me companies using NetSuite with 50-500 employees",
    description: "Find companies by system and size"
  },
  {
    icon: Users,
    title: "HR Systems",
    query: "Which companies have no HRIS system?",
    description: "Identify automation opportunities"
  },
  {
    icon: TrendingUp,
    title: "Market Trends",
    query: "Find rapidly growing companies in the UAE",
    description: "Discover expansion opportunities"
  },
  {
    icon: Search,
    title: "Decision Makers",
    query: "Find HR managers at tech companies in Dubai",
    description: "Target key stakeholders"
  },
  {
    icon: Settings,
    title: "System Gaps",
    query: "Companies using Tally but missing modern payroll systems",
    description: "Spot modernization needs"
  },
  {
    icon: BarChart3,
    title: "Automation Scores",
    query: "Show companies with low automation scores in finance",
    description: "Find process improvement potential"
  }
]

export function SuggestedQueries({ onSelect }: SuggestedQueriesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
      {suggestedQueries.map((item, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onSelect(item.query)}
          className="h-auto p-4 text-left justify-start bg-background/50 hover:bg-background/80 border-border/60 hover:border-primary/40 transition-all duration-200"
        >
          <div className="flex items-start gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm mb-1">{item.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}
