import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Building2, ExternalLink, Users, Calendar, MapPin, Zap, Settings, AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react"
import { SystemsDisplay } from "@/components/SystemsDisplay"

interface CompanyDetailSheetProps {
  company: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CompanyDetailSheet({ company, open, onOpenChange }: CompanyDetailSheetProps) {
  const [activeSection, setActiveSection] = useState("overview")

  const aiAnalysis = company.ai_analysis

  const getAutomationScoreColor = (score: number) => {
    if (score >= 4) return "bg-green-500"
    if (score >= 3) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getAutomationLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  const EvidenceTooltip = ({ evidence, children }: { evidence: any, children: React.ReactNode }) => {
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
              {evidence.text && (
                <p className="text-xs text-muted-foreground">{evidence.text}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

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

        {/* Section Navigation */}
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

        {/* Overview Section */}
        {activeSection === "overview" && (
          <div className="space-y-6">
            {/* Quick Actions Bar */}
            <div className="flex gap-2">
              {company.website_url && (
                <Button size="sm" variant="outline" asChild>
                  <a href={company.website_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {company.url && (
                <Button size="sm" variant="outline" asChild>
                  <a href={company.url} target="_blank" rel="noopener noreferrer">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>

            {/* Company Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {company.employee_count && (
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Employees
                  </div>
                  <div className="text-2xl font-semibold">{company.employee_count.toLocaleString()}</div>
                </div>
              )}
              
              {company.founded_year && (
                <div className="space-y-1">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Founded
                  </div>
                  <div className="text-2xl font-semibold">{company.founded_year}</div>
                </div>
              )}
              
              {company.headquarter && (
                <div className="space-y-1 col-span-2">
                  <div className="text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Headquarters
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {typeof company.headquarter === 'string' 
                      ? company.headquarter 
                      : company.headquarter.city || company.headquarter.country || JSON.stringify(company.headquarter)
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            {company.description && (
              <div className="space-y-2">
                <h4 className="font-medium">About</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
              </div>
            )}

            {/* Systems Overview */}
            <div className="space-y-2">
              <h4 className="font-medium">Systems</h4>
              <SystemsDisplay systems={aiAnalysis?.systems} />
            </div>

            {/* Notable Facts */}
            {aiAnalysis?.other_notable_facts && Array.isArray(aiAnalysis.other_notable_facts) && aiAnalysis.other_notable_facts.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Notable Facts</h4>
                <div className="space-y-2">
                  {aiAnalysis.other_notable_facts.map((fact: any, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                      <Info className="h-4 w-4 mt-0.5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm">{fact.fact || fact}</p>
                        {fact.evidence && (
                          <EvidenceTooltip evidence={fact.evidence}>
                            <Badge variant="outline" className="mt-1 text-xs cursor-help">
                              Evidence available
                            </Badge>
                          </EvidenceTooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Automation Section */}
        {activeSection === "automation" && (
          <div className="space-y-6">
            {/* Overall Score */}
            {aiAnalysis?.automation_level?.overall && (
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Overall Automation Score</h4>
                  <Badge className={`${getAutomationScoreColor(aiAnalysis.automation_level.overall)} text-white`}>
                    {getAutomationLabel(aiAnalysis.automation_level.overall)} ({aiAnalysis.automation_level.overall}/5)
                  </Badge>
                </div>
                <Progress 
                  value={aiAnalysis.automation_level.overall * 20} 
                  className="h-3"
                />
              </div>
            )}

            {/* Department Breakdown */}
            {aiAnalysis?.automation_level && (
              <div className="space-y-4">
                <h4 className="font-medium">Department Breakdown</h4>
                <div className="space-y-3">
                  {Object.entries(aiAnalysis.automation_level)
                    .filter(([key]) => key !== 'overall')
                    .map(([department, score]: [string, any]) => (
                      <div key={department} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium capitalize">
                            {department.replace('_', ' ')}
                          </span>
                          <span className="text-sm text-muted-foreground">{score}/5</span>
                        </div>
                        <Progress 
                          value={score * 20} 
                          className="h-2"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Automation Rationale */}
            {aiAnalysis?.automation_rationale && (
              <div className="space-y-2">
                <h4 className="font-medium">Analysis Rationale</h4>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {aiAnalysis.automation_rationale}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Processes Section */}
        {activeSection === "processes" && (
          <div className="space-y-6">
            {/* Processes Mentioned */}
            {aiAnalysis?.processes_mentioned && Array.isArray(aiAnalysis.processes_mentioned) && aiAnalysis.processes_mentioned.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Processes Mentioned
                </h4>
                <div className="space-y-2">
                  {aiAnalysis.processes_mentioned.map((process: any, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 border rounded-lg">
                      <Settings className="h-4 w-4 mt-0.5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{process.process || process}</p>
                        {process.description && (
                          <p className="text-xs text-muted-foreground mt-1">{process.description}</p>
                        )}
                        {process.evidence && (
                          <EvidenceTooltip evidence={process.evidence}>
                            <Badge variant="outline" className="mt-2 text-xs cursor-help">
                              View Evidence
                            </Badge>
                          </EvidenceTooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Manual Work Indicators */}
            {aiAnalysis?.manual_work_indicators && Array.isArray(aiAnalysis.manual_work_indicators) && aiAnalysis.manual_work_indicators.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Manual Work Indicators
                </h4>
                <div className="space-y-2">
                  {aiAnalysis.manual_work_indicators.map((indicator: any, index: number) => (
                    <div key={index} className="flex items-start gap-2 p-3 border border-orange-200 rounded-lg bg-orange-50">
                      <XCircle className="h-4 w-4 mt-0.5 text-orange-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{indicator.indicator || indicator}</p>
                        {indicator.description && (
                          <p className="text-xs text-muted-foreground mt-1">{indicator.description}</p>
                        )}
                        {indicator.evidence && (
                          <EvidenceTooltip evidence={indicator.evidence}>
                            <Badge variant="outline" className="mt-2 text-xs cursor-help">
                              View Evidence
                            </Badge>
                          </EvidenceTooltip>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No process data */}
            {(!aiAnalysis?.processes_mentioned || aiAnalysis.processes_mentioned.length === 0) && 
             (!aiAnalysis?.manual_work_indicators || aiAnalysis.manual_work_indicators.length === 0) && (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No process information available</p>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
