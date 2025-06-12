
import { useState } from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
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

// Custom sheet variants for nested sheets (no overlay)
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        right:
          "inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface NestedSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
  VariantProps<typeof sheetVariants> {
  showOverlay?: boolean
}

const NestedSheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  NestedSheetContentProps
>(({ side = "right", className, children, showOverlay = false, ...props }, ref) => (
  <SheetPrimitive.Portal>
    {showOverlay && (
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    )}
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
))
NestedSheetContent.displayName = "NestedSheetContent"

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
    <SheetPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <NestedSheetContent 
        side="right" 
        showOverlay={!showBackButton}
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
      </NestedSheetContent>
    </SheetPrimitive.Root>
  )
}
