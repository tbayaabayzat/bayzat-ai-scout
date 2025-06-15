
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users } from "lucide-react"
import { CompanyDescriptionCell } from "@/components/CompanyDescriptionCell"
import { AutomationScorePopover } from "@/components/AutomationScorePopover"
import { SystemsDisplay } from "@/components/SystemsDisplay"
import { CompaniesTableStatusCell } from "@/components/CompaniesTableStatusCell"
import { Company } from "@/hooks/useCompaniesData"

export function getCompaniesTableColumns(handleCompanyClick: (company: Company) => void): ColumnDef<Company>[] {
  return [
    {
      accessorKey: "company_name",
      header: "Company",
      enableSorting: true,
      cell: ({ row }) => <CompanyDescriptionCell company={row.original} onCompanyClick={handleCompanyClick} />
    },
    {
      accessorKey: "industry",
      header: "Industry",
      enableSorting: true,
      cell: ({ row }) => {
        const industry = row.getValue("industry") as string
        return industry ? (
          <Badge 
            variant="outline" 
            className="text-xs cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleCompanyClick(row.original)}
          >
            {industry}
          </Badge>
        ) : null
      }
    },
    {
      id: "location",
      header: "Location",
      enableSorting: true,
      accessorFn: (row) => {
        const headquarter = row.headquarter
        if (!headquarter) return ""
        
        return typeof headquarter === 'string' ? headquarter : 
          headquarter.city || headquarter.country || JSON.stringify(headquarter)
      },
      cell: ({ row }) => {
        const headquarter = row.original.headquarter
        if (!headquarter) return null
        
        const location = typeof headquarter === 'string' ? headquarter : 
          headquarter.city || headquarter.country || JSON.stringify(headquarter)
        
        return (
          <div 
            className="flex items-center space-x-1 text-sm cursor-pointer hover:text-primary transition-colors"
            onClick={() => handleCompanyClick(row.original)}
          >
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{location}</span>
          </div>
        )
      }
    },
    {
      accessorKey: "employee_count",
      header: "Employees",
      enableSorting: true,
      sortingFn: "basic",
      cell: ({ row }) => {
        const count = row.getValue("employee_count") as number
        return count ? (
          <div 
            className="flex items-center space-x-1 text-sm cursor-pointer hover:text-primary transition-colors"
            onClick={() => handleCompanyClick(row.original)}
          >
            <Users className="h-3 w-3 text-muted-foreground" />
            <span>{count.toLocaleString()}</span>
          </div>
        ) : null
      }
    },
    {
      accessorKey: "bayzat_relationship",
      header: "Status",
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const relationshipOrder = { customer: 3, partner: 2, prospect: 1 }
        const aValue = relationshipOrder[rowA.getValue("bayzat_relationship") as keyof typeof relationshipOrder] || 0
        const bValue = relationshipOrder[rowB.getValue("bayzat_relationship") as keyof typeof relationshipOrder] || 0
        return aValue - bValue
      },
      cell: ({ row }) => {
        const relationship = row.getValue("bayzat_relationship") as string
        console.log('Relationship value for', row.original.company_name, ':', relationship)
        return (
          <CompaniesTableStatusCell 
            relationship={relationship}
            onCompanyClick={() => handleCompanyClick(row.original)}
          />
        )
      }
    },
    {
      id: "automation",
      header: "Automation",
      enableSorting: true,
      accessorFn: (row) => {
        const analysis = row.ai_analysis
        if (analysis?.automation_level?.overall) {
          return analysis.automation_level.overall
        }
        return 0
      },
      sortingFn: "basic",
      cell: ({ row }) => {
        const analysis = row.original.ai_analysis
        console.log('Automation analysis for', row.original.company_name, ':', analysis)
        
        let score = 0
        if (analysis?.automation_level?.overall) {
          score = analysis.automation_level.overall
          console.log('Found automation score in automation_level.overall:', score)
        } else {
          console.log('No automation score found for', row.original.company_name)
        }
        
        return <AutomationScorePopover score={score} analysis={analysis} />
      }
    },
    {
      id: "systems",
      header: "Systems",
      cell: ({ row }) => {
        let systems = null
        if (row.original.ai_analysis?.systems) {
          systems = row.original.ai_analysis.systems
        }
        console.log('Systems for', row.original.company_name, ':', systems)
        return (
          <SystemsDisplay 
            systems={systems}
            has_erp={row.original.has_erp}
            has_hris={row.original.has_hris}
            has_accounting={row.original.has_accounting}
            has_payroll={row.original.has_payroll}
          />
        )
      }
    }
  ]
}
