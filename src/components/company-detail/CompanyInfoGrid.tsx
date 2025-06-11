
import { Users, Calendar, MapPin } from "lucide-react"

interface CompanyInfoGridProps {
  company: any
}

export function CompanyInfoGrid({ company }: CompanyInfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {company.employee_count && (
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            Employees
          </div>
          <div className="text-2xl font-semibold">{company.employee_count.toLocaleString()}</div>
        </div>
      )}
      
      {company.founded_year && (
        <div className="space-y-1">
          <div className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Founded
          </div>
          <div className="text-2xl font-semibold">{company.founded_year}</div>
        </div>
      )}
      
      {company.headquarter && (
        <div className="space-y-1 col-span-2">
          <div className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Headquarters
          </div>
          <div className="text-sm text-muted-foreground">
            {typeof company.headquarter === 'string' 
              ? company.headquarter 
              : company.headquarter.city || company.headquarter.country || JSON.stringify(company.headquarter)
            }
          </div>
        </div>
      )}
    </div>
  )
}
