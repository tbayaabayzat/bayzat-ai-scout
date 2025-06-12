import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Building2, Zap, Wrench, Users } from "lucide-react"
import { CompanyOverview } from "./CompanyOverview"
import { AutomationSection } from "./AutomationSection"
import { ProcessesSection } from "./ProcessesSection"
import { EmployeesSection } from "./EmployeesSection"
import { EmployeeDetailSheet } from "../employee-detail/EmployeeDetailSheet"
import { EmployeeWithDepartment } from "@/types/employee"
import { useIsMobile } from "@/hooks/use-mobile"
import { CustomSheetHeader } from "@/components/ui/custom-sheet-header"

interface CompanyDetailSheetProps {
  company: any
  open: boolean
  onOpenChange: (open: boolean) => void
  onCompanyClick?: (companyName: string, companyUrn?: string) => void
}

export function CompanyDetailSheet({ company, open, onOpenChange, onCompanyClick }: CompanyDetailSheetProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeWithDepartment | null>(null)
  const [isEmployeeSheetOpen, setIsEmployeeSheetOpen] = useState(false)
  const isMobile = useIsMobile()

  const aiAnalysis = company.ai_analysis

  const sections = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "processes", label: "Processes", icon: Wrench },
    { id: "employees", label: "Employees", icon: Users },
  ]

  const handleEmployeeClick = (employee: EmployeeWithDepartment) => {
    setSelectedEmployee(employee)
    setIsEmployeeSheetOpen(true)
  }

  const handleEmployeeSheetClose = (open: boolean) => {
    setIsEmployeeSheetOpen(open)
    if (!open) {
      setSelectedEmployee(null)
    }
  }

  const handleEmployeeSheetBack = () => {
    setIsEmployeeSheetOpen(false)
    setSelectedEmployee(null)
  }

  const handleEmployeeCompanyClick = (companyName: string, companyUrn?: string) => {
    // Close the employee sheet first
    setIsEmployeeSheetOpen(false)
    setSelectedEmployee(null)
    
    // If it's the same company, don't do anything (already viewing this company)
    if (companyName === company.company_name) {
      return
    }
    
    // Otherwise, let the parent handle navigation to the new company
    if (onCompanyClick) {
      onCompanyClick(companyName, companyUrn)
    }
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent 
          side="right" 
          className={`overflow-y-auto ${
            isMobile 
              ? 'w-full max-w-full p-4' 
              : '!w-[1400px] !sm:w-[1600px] !max-w-[70vw] !min-w-[800px] p-8'
          } [&>button]:hidden`}
        >
          <CustomSheetHeader
            onClose={() => onOpenChange(false)}
            showBackButton={false}
          >
            <SheetHeader className={`border-b mb-6 ${isMobile ? 'pb-4' : 'pb-8 mb-10'}`}>
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
                  <div className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>{company.company_name}</div>
                </div>
              </SheetTitle>
              <SheetDescription>
                {company.tagline || "Comprehensive company analysis and details"}
              </SheetDescription>
            </SheetHeader>
          </CustomSheetHeader>

          <div className={`flex gap-1 border-b ${isMobile ? 'mb-6 pb-2' : 'mb-10 pb-3'}`}>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                size={isMobile ? "sm" : "sm"}
                onClick={() => setActiveSection(section.id)}
                className={`relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors ${
                  isMobile ? 'px-3 py-2 text-xs' : 'px-5 py-3'
                } ${
                  activeSection === section.id 
                    ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:content-[""]' 
                    : ''
                }`}
              >
                <section.icon className="h-4 w-4" />
                {section.label}
              </Button>
            ))}
          </div>

          <div className={isMobile ? '' : 'px-3'}>
            {activeSection === "overview" && (
              <CompanyOverview company={company} aiAnalysis={aiAnalysis} />
            )}

            {activeSection === "automation" && (
              <AutomationSection aiAnalysis={aiAnalysis} />
            )}

            {activeSection === "processes" && (
              <ProcessesSection aiAnalysis={aiAnalysis} />
            )}

            {activeSection === "employees" && (
              <EmployeesSection company={company} onEmployeeClick={handleEmployeeClick} />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Employee Detail Sheet - nested navigation */}
      <EmployeeDetailSheet
        employee={selectedEmployee}
        open={isEmployeeSheetOpen}
        onOpenChange={handleEmployeeSheetClose}
        showBackButton={true}
        onBack={handleEmployeeSheetBack}
        onCompanyClick={handleEmployeeCompanyClick}
      />
    </>
  )
}
