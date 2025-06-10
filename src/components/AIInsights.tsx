
import { TrendingUp, Users, Building2, Zap, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface InsightCard {
  icon: React.ReactNode
  title: string
  description: string
  value?: string | number
  trend?: "up" | "down" | "stable"
  color?: "default" | "destructive" | "secondary"
}

interface AIInsightsProps {
  insights?: InsightCard[]
  title?: string
}

export function AIInsights({ insights = [], title = "AI Insights" }: AIInsightsProps) {
  const defaultInsights: InsightCard[] = [
    {
      icon: <Building2 className="h-4 w-4" />,
      title: "Legacy System Opportunities",
      description: "Companies still using pre-2020 ERP systems",
      value: "47%",
      trend: "up",
      color: "destructive"
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Manual HR Processes",
      description: "Companies without dedicated HRIS",
      value: "62%",
      trend: "down",
      color: "secondary"
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "High Automation Potential",
      description: "Companies with automation scores below 3",
      value: "34%",
      trend: "stable",
      color: "default"
    },
    {
      icon: <TrendingUp className="h-4 w-4" />,
      title: "Growth Companies",
      description: "Companies with 50+ employees, rapid hiring",
      value: "156",
      trend: "up",
      color: "default"
    }
  ]

  const displayInsights = insights.length > 0 ? insights : defaultInsights

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <AlertTriangle className="h-3 w-3 text-red-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-muted" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>
          Real-time market intelligence powered by AI analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayInsights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-accent rounded-md">
                {insight.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{insight.title}</p>
                  <div className="flex items-center space-x-2">
                    {insight.value && (
                      <Badge variant={insight.color}>{insight.value}</Badge>
                    )}
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
