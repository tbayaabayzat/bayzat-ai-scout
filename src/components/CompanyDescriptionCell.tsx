
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Building2, ExternalLink } from "lucide-react"

interface CompanyDescriptionCellProps {
  company: any
}

export function CompanyDescriptionCell({ company }: CompanyDescriptionCellProps) {
  const [open, setOpen] = useState(false)

  const truncatedDescription = company.description?.length > 100 
    ? company.description.substring(0, 100) + "..."
    : company.description

  return (
    <div className="flex items-center space-x-3">
      <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="font-medium">{company.company_name}</div>
        {company.website_url && (
          <div className="text-sm text-muted-foreground">
            <a 
              href={company.website_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary inline-flex items-center gap-1"
            >
              {company.website_url.replace(/^https?:\/\//, '')}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
        {company.description && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="link" className="h-auto p-0 text-left justify-start text-xs text-muted-foreground">
                {truncatedDescription}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {company.company_name}
                </SheetTitle>
                <SheetDescription>
                  Company Overview and Details
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {company.website_url && (
                  <div>
                    <h4 className="font-medium mb-2">Website</h4>
                    <a 
                      href={company.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {company.website_url}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
                
                {company.industry && (
                  <div>
                    <h4 className="font-medium mb-2">Industry</h4>
                    <p className="text-sm text-muted-foreground">{company.industry}</p>
                  </div>
                )}
                
                {company.description && (
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{company.description}</p>
                  </div>
                )}
                
                {company.founded_year && (
                  <div>
                    <h4 className="font-medium mb-2">Founded</h4>
                    <p className="text-sm text-muted-foreground">{company.founded_year}</p>
                  </div>
                )}
                
                {company.employee_count && (
                  <div>
                    <h4 className="font-medium mb-2">Employee Count</h4>
                    <p className="text-sm text-muted-foreground">{company.employee_count.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  )
}
