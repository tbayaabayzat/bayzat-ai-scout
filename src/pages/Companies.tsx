import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ColumnDef } from "@tanstack/react-table"
import { supabase } from "@/integrations/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Crown, Mail } from "lucide-react"
import { SmartSearch } from "@/components/SmartSearch"
import { DataTable } from "@/components/ui/data-table"
import { CompanyDescriptionCell } from "@/components/CompanyDescriptionCell"
import { AutomationScorePopover } from "@/components/AutomationScorePopover"
import { SystemsDisplay } from "@/components/SystemsDisplay"

type Company = {
  id: string
  company_name: string
  website_url?: string
  industry?: string
  headquarter?: any
  employee_count?: number
  bayzat_relationship: string
  ai_analysis?: any
  description?: string
  founded_year?: number
}

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("")

  const { data: companies, isLoading, error } = useQuery({
    queryKey: ['companies', searchTerm, selectedFilter],
    queryFn: async () => {
      console.log('=== Starting companies fetch ===')
      console.log('Search term:', searchTerm)
      console.log('Selected filter:', selectedFilter)
      
      try {
        // First, let's try a simple count query to see if the table exists and has data
        const { count, error: countError } = await supabase
          .from('companies2')
          .select('*', { count: 'exact', head: true })
        
        console.log('Table row count:', count)
        if (countError) {
          console.error('Count query error:', countError)
        }

        let query = supabase
          .from('companies2')
          .select('*')
          .limit(50) // Start with smaller limit for debugging

        if (searchTerm) {
          query = query.or(`company_name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,industry.ilike.%${searchTerm}%`)
        }

        // Apply AI-powered filters
        if (selectedFilter === "Legacy Systems") {
          query = query.lt('founded_year', 2015)
        } else if (selectedFilter === "High Manual Work") {
          query = query.contains('ai_analysis', { automation_score_overall: { range: [0, 3] } })
        } else if (selectedFilter === "Missing HRIS") {
          query = query.contains('ai_analysis', { systems_inventory: { has_hris: false } })
        } else if (selectedFilter === "Customers Only") {
          query = query.eq('bayzat_relationship', 'customer')
        } else if (selectedFilter === "Prospects Only") {
          query = query.eq('bayzat_relationship', 'prospect')
        }

        console.log('Executing query...')
        const { data, error } = await query
        
        if (error) {
          console.error('Query error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          })
          throw error
        }
        
        console.log('Query successful!')
        console.log('Raw data received:', data)
        console.log('Number of records:', data?.length || 0)
        
        if (data && data.length > 0) {
          console.log('Sample record:', data[0])
        } else {
          console.log('No data returned from query')
        }
        
        return data || []
      } catch (err) {
        console.error('Fetch error:', err)
        throw err
      }
    }
  })

  // Debug logging
  console.log('=== Component render state ===')
  console.log('Loading:', isLoading)
  console.log('Error:', error)
  console.log('Companies data:', companies)
  console.log('Companies length:', companies?.length)

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
      cell: ({ row }) => getRelationshipBadge(row.getValue("bayzat_relationship"))
    },
    {
      id: "automation",
      header: "Automation",
      cell: ({ row }) => {
        const analysis = row.original.ai_analysis
        const score = analysis?.automation_score_overall || 0
        
        return <AutomationScorePopover score={score} analysis={analysis} />
      }
    },
    {
      id: "systems",
      header: "Systems",
      cell: ({ row }) => {
        const systems = row.original.ai_analysis?.systems_inventory
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

  const aiFilters = [
    "Legacy Systems",
    "High Manual Work", 
    "Missing HRIS",
    "Growth Companies",
    "Modern Tech Stack",
    "Customers Only",
    "Prospects Only"
  ]

  if (error) {
    console.error('Query error:', error)
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Company Intelligence</h2>
          <p className="text-muted-foreground">
            Discover and analyze companies with AI-powered insights
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Mail className="h-4 w-4 mr-2" />
          Draft Outreach
        </Button>
      </div>

      <SmartSearch
        placeholder="Ask about companies, systems, or opportunities..."
        onSearch={setSearchTerm}
        onFilterSelect={setSelectedFilter}
        filters={aiFilters}
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading companies...</span>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading companies</p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <p className="text-xs text-muted-foreground mt-2">Check browser console for details</p>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {companies?.length || 0} companies
            </div>
            {companies?.length === 0 && (
              <div className="text-sm text-orange-600">
                No data found. Check console for debugging info.
              </div>
            )}
          </div>
          <DataTable 
            columns={columns} 
            data={companies || []} 
            searchColumn="company_name"
            searchPlaceholder="Search companies..."
          />
        </div>
      )}
    </div>
  )
}
