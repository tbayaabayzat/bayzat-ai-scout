
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Award, Calendar } from "lucide-react"
import { EmployeeWithDepartment } from "@/types/employee"

interface CertificationsSectionProps {
  employee: EmployeeWithDepartment
}

export function CertificationsSection({ employee }: CertificationsSectionProps) {
  // Get real certifications data from LinkedIn with fallback to empty array
  const linkedinCertifications = employee.linkedin_data?.certifications || []

  const certifications = linkedinCertifications.map((cert: any) => ({
    name: cert.name,
    issuer: cert.organization || cert.authority || 'Unknown Issuer',
    year: cert.issue_date ? new Date(cert.issue_date).getFullYear().toString() : 'Unknown'
  }))

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Award className="h-4 w-4" />
          Certifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {certifications.length > 0 ? (
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className={`flex gap-3 pb-4 border-b last:border-b-0 ${index > 0 ? 'pt-2' : ''}`}>
                {/* Content */}
                <div className="flex gap-3 flex-1 min-w-0">
                  {/* Certification icon */}
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-muted">
                      <Award className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Certification details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-sm leading-tight">{cert.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                      </div>
                      
                      {/* Certification year */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0 ml-4">
                        <Calendar className="h-3 w-3" />
                        <span>{cert.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Award className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No certifications available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
