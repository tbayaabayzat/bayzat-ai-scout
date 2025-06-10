
import { useState } from "react"
import { TrendingUp, Users, Building2, Zap, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
    <div className="border-t border-sidebar-border/50 pt-4">
      <div className="relative mb-4">
        <div 
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{
            boxShadow: '0 0 8px rgba(var(--primary), 0.3)'
          }}
        />
      </div>
      
      <div className="px-3">
        <div className="flex items-start space-x-3 mb-4">
          <div className="flex-shrink-0 p-2 bg-primary/10 rounded-md">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="text-left">
            <div className="font-medium text-sm">{title}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Real-time market intelligence
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {displayInsights.map((insight, index) => (
            <div key={index} className="text-left">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex-shrink-0 p-1 bg-accent/50 rounded">
                  {insight.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    {insight.value && (
                      <Badge variant={insight.color} className="text-xs">{insight.value}</Badge>
                    )}
                    {getTrendIcon(insight.trend)}
                  </div>
                </div>
              </div>
              <div className="ml-0">
                <p className="text-xs font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
