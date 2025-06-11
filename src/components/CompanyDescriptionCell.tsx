import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Building2, ExternalLink } from "lucide-react"
import { CompanyDetailSheet } from "@/components/company-detail/CompanyDetailSheet"

interface CompanyDescriptionCellProps {
  company: any
}

export function CompanyDescriptionCell({ company }: CompanyDescriptionCellProps) {
  const [sheetOpen, setSheetOpen] = useState(false)

  const truncatedDescription = company.description?.length > 120 
    ? company.description.substring(0, 120) + "..."
    : company.description

  return (
    <>
      <div className="flex items-center space-x-3 w-60">
        {/* Company Logo */}
        <div className="flex-shrink-0">
          {company.logo_url ? (
            <img 
              src={company.logo_url} 
              alt={`${company.company_name} logo`}
              className="h-8 w-8 rounded object-contain"
              onError={(e) => {
                // Fallback to building icon if logo fails to load
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <Building2 className={`h-8 w-8 text-muted-foreground ${company.logo_url ? 'hidden' : ''}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-medium">{company.company_name}</div>
          
          {/* Clickable Icons Row */}
          <div className="flex items-center space-x-2 mt-1">
            {company.website_url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={company.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{company.website_url}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {company.url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a 
                      href={company.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{company.url}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {company.description && (
            <Button 
              variant="link" 
              className="h-auto p-0 text-left justify-start text-xs text-muted-foreground mt-1 whitespace-normal leading-4 line-clamp-2"
              onClick={() => setSheetOpen(true)}
            >
              {truncatedDescription}
            </Button>
          )}
        </div>
      </div>

      <CompanyDetailSheet
        company={company}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}
