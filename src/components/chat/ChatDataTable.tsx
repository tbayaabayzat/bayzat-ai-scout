import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DataTableData } from "@/types/chat"
import { CompanyCardData } from "@/types/chat"

interface ChatDataTableProps {
  data: DataTableData
  onExport?: (format: 'csv' | 'json') => void
  onCompanyClick?: (company: CompanyCardData) => void
}

export function ChatDataTable({ data, onExport, onCompanyClick }: ChatDataTableProps) {
  console.log('ChatDataTable - Received data:', data)
  console.log('ChatDataTable - onCompanyClick handler:', !!onCompanyClick)

  // Add validation to ensure data.data is an array
  if (!data || !Array.isArray(data.data)) {
    console.error('ChatDataTable: Invalid data structure', data)
    return (
      <div className="my-4 border rounded-lg p-4">
        <p className="text-muted-foreground">No data available to display</p>
      </div>
    )
  }

  const getAutomationScoreColor = (score: number) => {
    if (score >= 4) return "bg-bayzat-pink"
    if (score >= 3) return "bg-bayzat-purple"
    return "bg-bayzat-dark-purple"
  }

  const getAutomationLabel = (score: number) => {
    if (score >= 4) return "High"
    if (score >= 3) return "Medium"
    return "Low"
  }

  const isCompanyTable = data.columns.some(col => 
    ['company_name', 'id', 'industry', 'employee_count'].includes(col)
  )

  const handleRowClick = (row: any) => {
    if (isCompanyTable && onCompanyClick && row.company_name) {
      console.log('ChatDataTable - Row clicked:', row)
      
      // Simplified helper functions that return proper primitive values or undefined
      const safeExtractString = (value: any): string | undefined => {
        if (value === null || value === undefined) return undefined
        if (typeof value === 'string') return value
        if (typeof value === 'object') {
          if (value._type === 'undefined') return undefined
          if (value.value !== undefined) return String(value.value)
        }
        return String(value)
      }

      const safeExtractNumber = (value: any): number | undefined => {
        if (value === null || value === undefined) return undefined
        if (typeof value === 'number') return value
        if (typeof value === 'object') {
          if (value._type === 'undefined') return undefined
          if (value.value !== undefined) {
            const num = Number(value.value)
            return isNaN(num) ? undefined : num
          }
        }
        const num = Number(value)
        return isNaN(num) ? undefined : num
      }

      const safeExtractBoolean = (value: any): boolean | undefined => {
        if (value === null || value === undefined) return undefined
        if (typeof value === 'boolean') return value
        if (typeof value === 'object') {
          if (value._type === 'undefined') return undefined
          if (value.value !== undefined) return Boolean(value.value)
        }
        return Boolean(value)
      }

      // Transform row data to CompanyCardData format with clean data extraction
      const companyData: CompanyCardData = {
        id: safeExtractString(row.id) || safeExtractString(row.company_id) || String(Math.random()),
        company_name: safeExtractString(row.company_name) || '',
        industry: safeExtractString(row.industry),
        employee_count: safeExtractNumber(row.employee_count),
        logo_url: safeExtractString(row.logo_url),
        website_url: safeExtractString(row.website_url),
        bayzat_relationship: safeExtractString(row.bayzat_relationship),
        description: safeExtractString(row.description),
        tagline: safeExtractString(row.tagline),
        founded_year: safeExtractNumber(row.founded_year),
        headquarter: row.headquarter,
        ai_analysis: row.ai_analysis,
        has_erp: safeExtractBoolean(row.has_erp),
        has_hris: safeExtractBoolean(row.has_hris),
        has_accounting: safeExtractBoolean(row.has_accounting),
        has_payroll: safeExtractBoolean(row.has_payroll),
        automation_overall: safeExtractNumber(row.automation_overall),
        automation_hr: safeExtractNumber(row.automation_hr),
        automation_finance: safeExtractNumber(row.automation_finance),
        automation_operations: safeExtractNumber(row.automation_operations),
        automation_sales: safeExtractNumber(row.automation_sales),
        location: safeExtractString(row.location)
      }
      
      console.log('ChatDataTable - Transformed company data:', companyData)
      onCompanyClick(companyData)
    }
  }

  const formatCellValue = (value: any, column: string): React.ReactNode => {
    if (value === null || value === undefined) return '-'
    
    // Special formatting for specific columns
    switch (column) {
      case 'bayzat_relationship':
        const relationshipColors = {
          client: 'bg-green-100 text-green-800',
          prospect: 'bg-blue-100 text-blue-800',
          partner: 'bg-purple-100 text-purple-800'
        }
        return (
          <Badge className={`text-xs ${relationshipColors[value?.toLowerCase()] || 'bg-gray-100 text-gray-800'}`}>
            {value}
          </Badge>
        )
      
      case 'automation_overall':
      case 'automation_hr':
      case 'automation_finance':
      case 'automation_operations':
      case 'automation_sales':
        const score = typeof value === 'number' ? value : parseFloat(value)
        if (isNaN(score)) return '-'
        return (
          <Badge className={`${getAutomationScoreColor(score)} text-white text-xs`}>
            {getAutomationLabel(score)} ({score.toFixed(1)})
          </Badge>
        )
      
      case 'employee_count':
        return typeof value === 'number' ? value.toLocaleString() : value
      
      case 'website_url':
        return value ? (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[200px] inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            {value}
          </a>
        ) : '-'
      
      default:
        return typeof value === 'string' && value.length > 50 
          ? `${value.substring(0, 50)}...` 
          : String(value)
    }
  }

  const formatColumnHeader = (column: string): string => {
    return column
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const exportData = (format: 'csv' | 'json') => {
    if (format === 'csv') {
      const headers = data.columns.join(',')
      const rows = data.data.map(row => 
        data.columns.map(col => {
          const value = row[col]
          const stringValue = String(value || '')
          // Escape quotes and wrap in quotes if contains comma
          return stringValue.includes(',') ? `"${stringValue.replace(/"/g, '""')}"` : stringValue
        }).join(',')
      )
      const csvContent = [headers, ...rows].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'chat-data.csv'
      a.click()
      URL.revokeObjectURL(url)
    } else {
      const jsonContent = JSON.stringify(data.data, null, 2)
      const blob = new Blob([jsonContent], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'chat-data.json'
      a.click()
      URL.revokeObjectURL(url)
    }
    
    onExport?.(format)
  }

  return (
    <div className="my-4 border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div>
          <h3 className="font-medium">Data Table</h3>
          <p className="text-sm text-muted-foreground">
            Showing {data.data.length} records
            {isCompanyTable && ' • Click rows to view details'}
          </p>
        </div>
        {data.exportable && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportData('csv')}
            >
              <Download className="w-4 h-4 mr-1" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportData('json')}
            >
              <Download className="w-4 h-4 mr-1" />
              JSON
            </Button>
          </div>
        )}
      </div>
      
      <div className="overflow-auto max-h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              {data.columns.map((column) => (
                <TableHead key={column} className="font-medium">
                  {formatColumnHeader(column)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((row, index) => (
              <TableRow 
                key={index}
                className={isCompanyTable && onCompanyClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                onClick={() => handleRowClick(row)}
              >
                {data.columns.map((column) => (
                  <TableCell key={column} className="py-2">
                    {formatCellValue(row[column], column)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
