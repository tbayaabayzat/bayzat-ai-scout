
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetPortal,
  SheetOverlay,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, GraduationCap, ExternalLink } from "lucide-react"
import { EmployeeOverview } from "./EmployeeOverview"
import { EmployeeExperience } from "./EmployeeExperience"
import { EmployeeSkillsEducation } from "./EmployeeSkillsEducation"
import { EmployeeWithDepartment } from "@/types/employee"
import { getDepartmentConfig, getDepartmentColorClass } from "@/utils/employeeDepartmentUtils"
import { useIsMobile } from "@/hooks/use-mobile"
import { CustomSheetHeader } from "@/components/ui/custom-sheet-header"

interface EmployeeDetailSheetProps {
  employee: EmployeeWithDepartment | null
  open: boolean
  onOpenChange: (open: boolean) => void
  showBackButton?: boolean
  onBack?: () => void
}

export function EmployeeDetailSheet({ 
  employee, 
  open, 
  onOpenChange, 
  showBackButton = false, 
  onBack 
}: EmployeeDetailSheetProps) {
  const [activeSection, setActiveSection] = useState("overview")
  const isMobile = useIsMobile()

  if (!employee) return null

  const departmentConfig = getDepartmentConfig(employee.department)
  const colorClass = getDepartmentColorClass(departmentConfig.color)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const sections = [
    { id: "overview", label: "Overview", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills & Education", icon: GraduationCap },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetPortal>
        {/* Only render overlay if not in nested context */}
        {!showBackButton && <SheetOverlay />}
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
            showBackButton={showBackButton}
            onBack={onBack}
          >
            <SheetHeader className={`border-b mb-6 ${isMobile ? 'pb-4' : 'pb-8 mb-10'}`}>
              <SheetTitle className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.profile_picture_url || undefined} />
                    <AvatarFallback className="text-sm font-medium">
                      {getInitials(employee.full_name || 'U N')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${colorClass}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>
                      {employee.full_name}
                    </div>
                    {employee.profile_url && (
                      <a 
                        href={employee.profile_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <departmentConfig.icon className="h-3 w-3 text-muted-foreground" />
                    <Badge variant={departmentConfig.badgeVariant} className="text-xs">
                      {departmentConfig.name}
                    </Badge>
                  </div>
                </div>
              </SheetTitle>
              <SheetDescription>
                {employee.headline || "Professional profile and insights"}
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
              <EmployeeOverview employee={employee} />
            )}

            {activeSection === "experience" && (
              <EmployeeExperience employee={employee} />
            )}

            {activeSection === "skills" && (
              <EmployeeSkillsEducation employee={employee} />
            )}
          </div>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
