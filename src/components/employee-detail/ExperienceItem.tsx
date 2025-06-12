
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Calendar, MapPin, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { ExperienceItem as ExperienceItemType, formatExperienceDate, calculateDuration } from "@/utils/experienceUtils"

interface ExperienceItemProps {
  experience: ExperienceItemType
  index: number
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const startDateFormatted = formatExperienceDate(experience.start_date)
  const endDateFormatted = experience.is_current ? 'Present' : formatExperienceDate(experience.end_date, experience.is_current)
  const duration = calculateDuration(experience.start_date, experience.end_date, experience.is_current)
  
  const getCompanyInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const handleCompanyClick = () => {
    if (experience.company_linkedin_url) {
      window.open(experience.company_linkedin_url, '_blank')
    }
  }

  return (
    <div className="flex gap-4 pb-8 border-b last:border-b-0">
      {/* Timeline dot */}
      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
        experience.is_current ? 'bg-green-500' : 'bg-muted-foreground'
      }`} />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-3 mb-4">
          {/* Company logo */}
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={experience.company_logo_url} alt={experience.company} />
            <AvatarFallback className="text-xs font-medium bg-muted">
              {getCompanyInitials(experience.company)}
            </AvatarFallback>
          </Avatar>
          
          {/* Title and company info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-base leading-tight">{experience.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <button
                    onClick={handleCompanyClick}
                    className={`text-sm text-muted-foreground hover:text-primary transition-colors truncate ${
                      experience.company_linkedin_url ? 'cursor-pointer hover:underline' : 'cursor-default'
                    }`}
                  >
                    {experience.company}
                  </button>
                  {experience.company_linkedin_url && (
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  )}
                </div>
              </div>
              
              {/* Date and current badge */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{startDateFormatted} - {endDateFormatted}</span>
                </div>
                {duration && (
                  <span className="text-xs text-muted-foreground">({duration})</span>
                )}
                {experience.is_current && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Location */}
            {experience.location && (
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{experience.location}</span>
              </div>
            )}
            
            {/* Description */}
            {experience.description && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isExpanded 
                    ? experience.description 
                    : truncateDescription(experience.description)
                  }
                </p>
                {experience.description.length > 120 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 p-0 h-auto text-xs text-primary hover:bg-transparent"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Show more
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
            
            {/* Skills */}
            {experience.skills && experience.skills.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {experience.skills.slice(0, isExpanded ? experience.skills.length : 3).map((skill, skillIndex) => (
                  <Badge key={skillIndex} variant="secondary" className="text-xs px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
                {!isExpanded && experience.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    +{experience.skills.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
