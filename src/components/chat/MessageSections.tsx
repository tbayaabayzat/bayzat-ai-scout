
import { CompanyCards } from "./CompanyCards"
import { EmployeeCards } from "./EmployeeCards"
import { ChatDataTable } from "./ChatDataTable"
import { ChatChart } from "./ChatChart"
import { ContentSection, CompanyCardData } from "@/types/chat"
import { EmployeeWithDepartment } from "@/types/employee"

interface MessageSectionsProps {
  sections: ContentSection[]
  onCompanyClick?: (company: CompanyCardData) => void
  onEmployeeClick?: (employee: EmployeeWithDepartment) => void
}

export function MessageSections({ sections, onCompanyClick, onEmployeeClick }: MessageSectionsProps) {
  console.log('MessageSections - Rendering with onCompanyClick:', !!onCompanyClick)
  
  const renderSection = (section: ContentSection, index: number) => {
    console.log('MessageSections - Processing section:', section.type, section)

    switch (section.type) {
      case 'company-cards':
        return (
          <CompanyCards
            key={index}
            companies={section.data}
            onCompanyClick={onCompanyClick || (() => {})}
          />
        )
      
      case 'employee-cards':
        return (
          <EmployeeCards
            key={index}
            employees={section.data}
            onEmployeeClick={onEmployeeClick || (() => {})}
          />
        )
      
      case 'data-table':
        console.log('MessageSections - Processing data-table section:', section.data)
        console.log('MessageSections - onCompanyClick for data-table:', !!onCompanyClick)
        
        let tableData
        
        if (section.data?.DataTable) {
          // Data is nested in a DataTable object
          const dataTableObj = section.data.DataTable
          console.log('MessageSections - Found nested DataTable:', dataTableObj)
          
          tableData = {
            columns: dataTableObj.columns || [],
            data: dataTableObj.topRows || dataTableObj.data || [],
            exportable: section.metadata?.exportable !== false
          }
        } else if (section.data?.columns && section.data?.data) {
          // Direct structure with columns and data properties
          console.log('MessageSections - Found direct columns/data structure')
          tableData = {
            columns: section.data.columns,
            data: section.data.data,
            exportable: section.metadata?.exportable !== false
          }
        } else if (Array.isArray(section.data)) {
          // Data is a direct array - infer columns from first item
          console.log('MessageSections - Data is direct array, inferring columns')
          const columns = section.data.length > 0 ? Object.keys(section.data[0]) : []
          tableData = {
            columns: columns,
            data: section.data,
            exportable: section.metadata?.exportable !== false
          }
        } else {
          // Fallback - try to extract from metadata or use empty structure
          console.log('MessageSections - Using fallback structure')
          tableData = {
            columns: section.metadata?.columns || [],
            data: [],
            exportable: section.metadata?.exportable !== false
          }
        }
        
        console.log('MessageSections - Final table data:', {
          columnsCount: tableData.columns?.length || 0,
          dataCount: tableData.data?.length || 0,
          columns: tableData.columns,
          firstRow: tableData.data?.[0]
        })
        
        return (
          <ChatDataTable
            key={index}
            data={tableData}
            onCompanyClick={onCompanyClick}
          />
        )
      
      case 'chart':
        // Handle both direct data and nested BarChart object
        let chartData
        
        if (section.data?.BarChart) {
          // Data is nested in a BarChart object
          const barChartObj = section.data.BarChart
          console.log('MessageSections - Found nested BarChart:', barChartObj)
          
          chartData = {
            type: 'bar' as const,
            data: barChartObj.data || [],
            title: barChartObj.title || 'Chart'
          }
        } else {
          // Data is direct
          console.log('MessageSections - Using direct data for chart:', section.data)
          chartData = section.data
        }
        
        console.log('MessageSections - Final chart data:', chartData)
        
        return (
          <ChatChart
            key={index}
            data={chartData}
          />
        )
      
      default:
        console.log('MessageSections - Unknown section type:', section.type)
        return null
    }
  }

  return (
    <div>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}
