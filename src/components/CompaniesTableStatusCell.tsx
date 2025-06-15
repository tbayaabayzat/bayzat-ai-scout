
import { Badge } from "@/components/ui/badge"
import { Crown, Users } from "lucide-react"

interface CompaniesTableStatusCellProps {
  relationship: string
  onCompanyClick: () => void
}

export function CompaniesTableStatusCell({ relationship, onCompanyClick }: CompaniesTableStatusCellProps) {
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

  return (
    <div onClick={onCompanyClick}>
      {getRelationshipBadge(relationship)}
    </div>
  )
}
