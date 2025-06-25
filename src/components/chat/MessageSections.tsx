
import { CompanyCards } from "./CompanyCards"
import { ChatDataTable } from "./ChatDataTable"
import { ChatChart } from "./ChatChart"
import { ContentSection, CompanyCardData } from "@/types/chat"

interface MessageSectionsProps {
  sections: ContentSection[]
  onCompanyClick?: (company: CompanyCardData) => void
}

export function MessageSections({ sections, onCompanyClick }: MessageSectionsProps) {
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
      
      case 'data-table':
        // Handle both direct data and nested DataTable object
        let tableData
        
        if (section.data?.DataTable) {
          // Data is nested in a DataTable object
          const dataTableObj = section.data.DataTable
          console.log('MessageSections - Found nested DataTable:', dataTableObj)
          
          tableData = {
            columns: dataTableObj.columns || [],
            data: dataTableObj.topRows || [],
            exportable: section.metadata?.exportable || true
          }
        } else {
          // Data is direct
          console.log('MessageSections - Using direct data for table:', section.data)
          tableData = {
            columns: section.metadata?.columns || Object.keys(section.data[0] || {}),
            data: Array.isArray(section.data) ? section.data : [],
            exportable: section.metadata?.exportable
          }
        }
        
        console.log('MessageSections - Final table data:', tableData)
        
        return (
          <ChatDataTable
            key={index}
            data={tableData}
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
