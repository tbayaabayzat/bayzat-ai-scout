import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Crown } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { CompanyDescriptionCell } from "@/components/CompanyDescriptionCell"
import { AutomationScorePopover } from "@/components/AutomationScorePopover"
import { SystemsDisplay } from "@/components/SystemsDisplay"
import { CompanyDetailSheet } from "@/components/company-detail/CompanyDetailSheet"
import { Company } from "@/hooks/useCompaniesData"

interface CompaniesTableProps {
  companies: Company[]
  isLoading: boolean
  error: any
}

export function CompaniesTable({ companies, isLoading, error }: CompaniesTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company)
    setSheetOpen(true)
  }

  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case 'customer':
        return <Badge variant="default" className="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors"><Crown className="h-3 w-3 mr-1" />Customer</Badge>
      case 'partner':
        return <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80 transition-colors"><Users className="h-3 w-3 mr-1" />Partner</Badge>
      case 'prospect':
      default:
        return <Badge variant="outline" className="cursor-pointer hover:bg-muted transition-colors">Prospect</Badge>
    }
  }

  const columns: ColumnDef<Company>[] = [
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
          <div onClick={() => handleCompanyClick(row.original)}>
            {getRelationshipBadge(relationship)}
          </div>
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
        
        // Based on the schema, the automation score is in automation_level.overall
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
        // Based on the schema, systems are in the systems object
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading companies...</span>
      </div>
    )
  }

  if (error) {
    console.error('Query error:', error)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading companies</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <p className="text-xs text-muted-foreground mt-2">Check browser console for details</p>
        </div>
      </div>
    )
  }

  // Handle undefined companies data
  const safeCompanies = companies || []
  console.log('CompaniesTable rendering with', safeCompanies.length, 'companies')

  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {safeCompanies.length} companies
          </div>
          {safeCompanies.length === 0 && !isLoading && (
            <div className="text-sm text-orange-600">
              No data found. Check console for debugging info.
            </div>
          )}
        </div>
        <DataTable 
          columns={columns} 
          data={safeCompanies} 
          searchColumn="company_name"
          searchPlaceholder="Search companies..."
        />
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  )
}
