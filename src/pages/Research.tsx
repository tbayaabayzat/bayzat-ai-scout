
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Brain, Target, TrendingUp, Zap, Database } from "lucide-react"

export default function Research() {
  const tools = [
    {
      title: "Company Intelligence",
      description: "AI-powered company research and analysis",
      icon: Brain,
      features: ["Industry insights", "Competitor analysis", "Growth metrics"],
      status: "Available"
    },
    {
      title: "Prospect Finder",
      description: "Find key decision makers and contacts",
      icon: Target,
      features: ["Role-based search", "Contact discovery", "Engagement scoring"],
      status: "Available"
    },
    {
      title: "Market Analysis",
      description: "Industry trends and market intelligence",
      icon: TrendingUp,
      features: ["Market size", "Growth trends", "Opportunity mapping"],
      status: "Coming Soon"
    },
    {
      title: "AI Insights",
      description: "Machine learning powered recommendations",
      icon: Zap,
      features: ["Predictive scoring", "Personalized outreach", "Success patterns"],
      status: "Beta"
    },
    {
      title: "Data Enrichment",
      description: "Enhance profiles with additional data points",
      icon: Database,
      features: ["Contact info", "Company updates", "Social signals"],
      status: "Available"
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Research Tools</h2>
        <p className="text-muted-foreground">
          AI-powered research and prospecting capabilities
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <tool.icon className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tool.status === 'Available' ? 'bg-green-100 text-green-800' :
                        tool.status === 'Beta' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {tool.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">
                {tool.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full" 
                  variant={tool.status === 'Available' ? 'default' : 'secondary'}
                  disabled={tool.status === 'Coming Soon'}
                >
                  {tool.status === 'Coming Soon' ? 'Coming Soon' : 'Launch Tool'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Quick Research</span>
          </CardTitle>
          <CardDescription>
            Start your research with these common use cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Company Research</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Find companies in healthcare sector
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Research fintech startups in UAE
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Analyze competitor landscape
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Prospect Research</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Find HR Directors at tech companies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Identify decision makers at target accounts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Research warm introduction paths
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
