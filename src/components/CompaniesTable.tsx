
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Crown } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { CompanyDescriptionCell } from "@/components/CompanyDescriptionCell"
import { AutomationScorePopover } from "@/components/AutomationScorePopover"
import { SystemsDisplay } from "@/components/SystemsDisplay"
import { Company } from "@/hooks/useCompaniesData"

interface CompaniesTableProps {
  companies: Company[]
  isLoading: boolean
  error: any
}

export function CompaniesTable({ companies, isLoading, error }: CompaniesTableProps) {
  const getRelationshipBadge = (relationship: string) => {
    switch (relationship) {
      case 'customer':
        return <Badge variant="default" className="bg-green-500 text-white"><Crown className="h-3 w-3 mr-1" />Customer</Badge>
      case 'partner':
        return <Badge variant="secondary"><Users className="h-3 w-3 mr-1" />Partner</Badge>
      case 'prospect':
      default:
        return <Badge variant="outline">Prospect</Badge>
    }
  }

  const columns: ColumnDef<Company>[] = [
    {
      accessorKey: "company_name",
      header: "Company",
      enableColumnFilter: true,
      cell: ({ row }) => <CompanyDescriptionCell company={row.original} />
    },
    {
      accessorKey: "industry",
      header: "Industry",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const industry = row.getValue("industry") as string
        return industry ? (
          <Badge variant="outline" className="text-xs">
            {industry}
          </Badge>
        ) : null
      }
    },
    {
      accessorKey: "headquarter",
      header: "Location",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const headquarter = row.getValue("headquarter") as any
        if (!headquarter) return null
        
        const location = typeof headquarter === 'string' ? headquarter : 
          headquarter.city || headquarter.country || JSON.stringify(headquarter)
        
        return (
          <div className="flex items-center space-x-1 text-sm">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{location}</span>
          </div>
        )
      }
    },
    {
      accessorKey: "employee_count",
      header: "Employees",
      cell: ({ row }) => {
        const count = row.getValue("employee_count") as number
        return count ? (
          <div className="flex items-center space-x-1 text-sm">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span>{count.toLocaleString()}</span>
          </div>
        ) : null
      }
    },
    {
      accessorKey: "bayzat_relationship",
      header: "Status",
      enableColumnFilter: true,
      cell: ({ row }) => {
        const relationship = row.getValue("bayzat_relationship") as string
        console.log('Relationship value for', row.original.company_name, ':', relationship)
        return getRelationshipBadge(relationship)
      }
    },
    {
      id: "automation",
      header: "Automation",
      cell: ({ row }) => {
        const analysis = row.original.ai_analysis
        console.log('Automation analysis for', row.original.company_name, ':', analysis)
        
        // Try multiple possible paths for the automation score
        let score = 0
        if (analysis?.automation_level?.overall) {
          score = analysis.automation_level.overall
          console.log('Found automation score in automation_level.overall:', score)
        } else if (analysis?.automation_score_overall) {
          score = analysis.automation_score_overall
          console.log('Found automation score in automation_score_overall:', score)
        } else if (analysis?.overall_automation_score) {
          score = analysis.overall_automation_score
          console.log('Found automation score in overall_automation_score:', score)
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
        const systems = row.original.ai_analysis?.systems_inventory
        console.log('Systems for', row.original.company_name, ':', systems)
        return <SystemsDisplay systems={systems} />
      }
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-end">
          <Button size="sm" variant="outline" className="text-xs">
            Analyze
          </Button>
          <Button size="sm" className="text-xs bg-primary hover:bg-primary/90">
            Contact
          </Button>
        </div>
      )
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
  )
}
