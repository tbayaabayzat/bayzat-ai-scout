
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
        return (
          <ChatDataTable
            key={index}
            data={{
              columns: section.metadata?.columns || Object.keys(section.data[0] || {}),
              data: section.data,
              exportable: section.metadata?.exportable
            }}
          />
        )
      
      case 'chart':
        return (
          <ChatChart
            key={index}
            data={section.data}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}
