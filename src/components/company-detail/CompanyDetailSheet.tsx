
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Settings } from "lucide-react"
import { CompanyOverview } from "./CompanyOverview"
import { AutomationSection } from "./AutomationSection"
import { ProcessesSection } from "./ProcessesSection"

interface CompanyDetailSheetProps {
  company: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDetailSheet({ company, open, onOpenChange }: CompanyDetailSheetProps) {
  const [activeSection, setActiveSection] = useState("overview")

  const aiAnalysis = company.ai_analysis

  const sections = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "processes", label: "Processes", icon: Settings },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[800px] sm:w-[900px] max-w-[50vw] overflow-y-auto">
        <SheetHeader className="border-b pb-4 mb-6">
          <SheetTitle className="flex items-center gap-3">
            {company.logo_url ? (
              <img 
                src={company.logo_url} 
                alt={`${company.company_name} logo`}
                className="h-8 w-8 rounded object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <Building2 className={`h-8 w-8 ${company.logo_url ? 'hidden' : ''}`} />
            <div>
              <div className="text-xl font-semibold">{company.company_name}</div>
              {company.industry && (
                <div className="text-sm text-muted-foreground">{company.industry}</div>
              )}
            </div>
          </SheetTitle>
          <SheetDescription>
            Comprehensive company analysis and details
          </SheetDescription>
        </SheetHeader>

        <div className="flex gap-1 mb-6 border-b">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {activeSection === "overview" && (
          <CompanyOverview company={company} aiAnalysis={aiAnalysis} />
        )}

        {activeSection === "automation" && (
          <AutomationSection aiAnalysis={aiAnalysis} />
        )}

        {activeSection === "processes" && (
          <ProcessesSection aiAnalysis={aiAnalysis} />
        )}
      </SheetContent>
    </Sheet>
  )
}
