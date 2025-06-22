
import { Badge } from "@/components/ui/badge"
import { Crown, Users } from "lucide-react"

interface RelationshipBadgeProps {
  relationship: string
  onClick: () => void
}

export function RelationshipBadge({ relationship, onClick }: RelationshipBadgeProps) {
  const getBadgeContent = () => {
    switch (relationship) {
      case 'customer':
        return (
          <Badge 
            variant="default" 
            className="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors"
            onClick={onClick}
          >
            <Crown className="h-3 w-3 mr-1" />
            Customer
          </Badge>
        )
      case 'partner':
        return (
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={onClick}
          >
            <Users className="h-3 w-3 mr-1" />
            Partner
          </Badge>
        )
      case 'prospect':
      default:
        return (
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={onClick}
          >
            Prospect
          </Badge>
        )
    }
  }

  return getBadgeContent()
}
