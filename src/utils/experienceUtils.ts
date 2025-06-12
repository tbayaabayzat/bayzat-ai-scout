
import { format, parseISO } from 'date-fns'

export interface ExperienceItem {
  title: string
  company: string
  company_logo_url?: string
  company_linkedin_url?: string
  description?: string
  location?: string
  start_date?: {
    year?: number
    month?: number
  }
  end_date?: {
    year?: number
    month?: number
  }
  skills?: string[]
  is_current?: boolean
}

export const formatExperienceDate = (date?: { year?: number; month?: number }): string => {
  if (!date?.year) return 'Unknown'
  
  const month = date.month ? String(date.month).padStart(2, '0') : '01'
  const dateStr = `${date.year}-${month}-01`
  
  try {
    return format(parseISO(dateStr), 'MMM yyyy')
  } catch {
    return `${date.year}`
  }
}

export const calculateDuration = (
  startDate?: { year?: number; month?: number },
  endDate?: { year?: number; month?: number },
  isCurrent?: boolean
): string => {
  if (!startDate?.year) return ''
  
  const start = new Date(startDate.year, (startDate.month || 1) - 1)
  const end = isCurrent || !endDate?.year 
    ? new Date() 
    : new Date(endDate.year, (endDate.month || 12) - 1)
  
  const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  
  if (diffInMonths < 1) return '1 mo'
  if (diffInMonths < 12) return `${diffInMonths} mos`
  
  const years = Math.floor(diffInMonths / 12)
  const months = diffInMonths % 12
  
  if (months === 0) return `${years} yr${years > 1 ? 's' : ''}`
  return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
}

export const processExperienceData = (experienceData: any[]): ExperienceItem[] => {
  if (!Array.isArray(experienceData)) return []
  
  return experienceData.map(exp => ({
    title: exp.title || 'Unknown Position',
    company: exp.company || 'Unknown Company',
    company_logo_url: exp.company_logo_url,
    company_linkedin_url: exp.company_linkedin_url,
    description: exp.description,
    location: exp.location,
    start_date: exp.start_date,
    end_date: exp.end_date,
    skills: exp.skills || [],
    is_current: !exp.end_date
  }))
}
