
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

interface ChatDataTableProps {
  data: DataTableData
  onExport?: (format: 'csv' | 'json') => void
}

export function ChatDataTable({ data, onExport }: ChatDataTableProps) {
  // Add validation to ensure data.data is an array
  if (!data || !Array.isArray(data.data)) {
    console.error('ChatDataTable: Invalid data structure', data)
    return (
      <div className="my-4 border rounded-lg p-4">
        <p className="text-muted-foreground">No data available to display</p>
      </div>
    )
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
        const score = parseInt(value)
        const scoreColor = score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'
        return <span className={`font-medium ${scoreColor}`}>{score}%</span>
      
      case 'employee_count':
        return typeof value === 'number' ? value.toLocaleString() : value
      
      case 'website_url':
        return value ? (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate max-w-[200px] inline-block"
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
              <TableRow key={index}>
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
