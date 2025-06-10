
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function CompaniesHeader() {
  return (
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Company Intelligence</h2>
        <p className="text-muted-foreground">
          Discover and analyze companies with AI-powered insights
        </p>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <Mail className="h-4 w-4 mr-2" />
        Draft Outreach
      </Button>
    </div>
  )
}
