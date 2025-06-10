
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Building2, Users, Target, Zap } from "lucide-react"

export function ProspectInsights() {
  const insights = [
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "High-Value Prospects",
      description: "Companies with 200+ employees lacking modern systems",
      value: "47",
      trend: "up",
      color: "default" as const
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Decision Makers",
      description: "CTOs and HR Directors at target companies",
      value: "156",
      trend: "up", 
      color: "default" as const
    },
    {
      icon: <Target className="h-4 w-4" />,
      title: "Ready to Buy",
      description: "Companies actively seeking HR solutions",
      value: "23",
      trend: "stable",
      color: "secondary" as const
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Automation Gap",
      description: "Manual processes costing 20+ hours/week",
      value: "68%",
      trend: "up",
      color: "destructive" as const
    }
  ]

  const getTrendIcon = (trend: string) => {
    return <TrendingUp className="h-3 w-3 text-green-500" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Market Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-accent rounded-md">
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{insight.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant={insight.color}>{insight.value}</Badge>
                    {getTrendIcon(insight.trend)}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
