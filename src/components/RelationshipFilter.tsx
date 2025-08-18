import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Handshake, Heart, Users } from "lucide-react"
import { type RelationshipFilter, type RelationshipValue } from "@/types/company"

interface RelationshipFilterProps {
  relationshipFilter: RelationshipFilter
  onRelationshipFilterChange: (filter: RelationshipFilter) => void
}

const RELATIONSHIP_OPTIONS = [
  { 
    value: 'customer' as RelationshipValue, 
    label: 'Customer', 
    icon: Heart,
    description: 'Active customers'
  },
  { 
    value: 'partner' as RelationshipValue, 
    label: 'Partner', 
    icon: Handshake,
    description: 'Business partners'
  },
  { 
    value: 'prospect' as RelationshipValue, 
    label: 'Prospect', 
    icon: Users,
    description: 'Potential customers'
  }
]

export function RelationshipFilter({
  relationshipFilter,
  onRelationshipFilterChange
}: RelationshipFilterProps) {
  const selectedRelationships = relationshipFilter.selectedRelationships || []

  const handleRelationshipToggle = (relationship: RelationshipValue) => {
    const isSelected = selectedRelationships.includes(relationship)
    const newSelection = isSelected
      ? selectedRelationships.filter(r => r !== relationship)
      : [...selectedRelationships, relationship]

    onRelationshipFilterChange({
      selectedRelationships: newSelection.length > 0 ? newSelection : undefined
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Handshake className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Bayzat Relationship</Label>
      </div>
      <div className="space-y-2">
        {RELATIONSHIP_OPTIONS.map(({ value, label, icon: Icon, description }) => (
          <div
            key={value}
            className="flex items-center justify-between p-2 rounded-md border bg-card/50 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-3 w-3 text-muted-foreground" />
              <div className="flex flex-col">
                <span className="text-sm">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </div>
            </div>
            <Checkbox
              checked={selectedRelationships.includes(value)}
              onCheckedChange={() => handleRelationshipToggle(value)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}