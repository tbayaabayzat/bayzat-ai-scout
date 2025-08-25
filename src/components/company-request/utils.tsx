
import React from "react"
import { Clock, CheckCircle, AlertCircle, Building2, Users, Handshake } from "lucide-react"

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case 'failed':
      return <AlertCircle className="h-4 w-4 text-red-500" />
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
}

export const getStatusColor = (status: string): "default" | "secondary" | "destructive" => {
  switch (status) {
    case 'pending':
      return "secondary"
    case 'completed':
      return "default"
    case 'failed':
      return "destructive"
    default:
      return "secondary"
  }
}

export const getRelationshipIcon = (relationship: string) => {
  switch (relationship) {
    case 'customer':
      return <Users className="h-3 w-3" />
    case 'partner':
      return <Handshake className="h-3 w-3" />
    default:
      return <Building2 className="h-3 w-3" />
  }
}

export const getRelationshipColor = (relationship: string): "default" | "secondary" | "outline" => {
  switch (relationship) {
    case 'customer':
      return "default"
    case 'partner':
      return "secondary"
    default:
      return "outline"
  }
}

export const sanitizeLinkedInCompanyUrl = (input: string): string => {
  if (!input.trim()) return ""
  
  let url = input.trim()
  
  // Add protocol if missing
  if (!/^https?:\/\//.test(url)) {
    url = `https://${url}`
  }
  
  try {
    const urlObj = new URL(url)
    
    // Check if it's a LinkedIn domain
    if (!urlObj.hostname.includes('linkedin.com')) {
      return ""
    }
    
    // Extract path and check if it's a company URL
    const pathMatch = urlObj.pathname.match(/^\/company\/([^\/]+)\/?$/)
    if (!pathMatch) {
      return ""
    }
    
    let slug = pathMatch[1]
    
    // Decode URL encoding once
    slug = decodeURIComponent(slug)
    
    // Remove everything from first special character onwards
    const specialChars = /[?#&=;%]/
    const specialCharIndex = slug.search(specialChars)
    if (specialCharIndex !== -1) {
      slug = slug.substring(0, specialCharIndex)
    }
    
    // Clean slug - only allow alphanumeric, hyphens, underscores, and periods
    slug = slug.replace(/[^A-Za-z0-9\-_.]/g, '')
    
    // Return empty if slug is empty after cleaning
    if (!slug) return ""
    
    // Return normalized URL
    return `https://www.linkedin.com/company/${slug}`
  } catch {
    return ""
  }
}

export const validateLinkedInUrl = (url: string): boolean => {
  if (!url.trim()) return false
  
  try {
    const urlObj = new URL(url)
    
    // Must be LinkedIn domain
    if (!urlObj.hostname.includes('linkedin.com')) {
      return false
    }
    
    // Must be company URL with valid slug
    const pathMatch = urlObj.pathname.match(/^\/company\/([A-Za-z0-9\-_.]+)\/?$/)
    return !!pathMatch
  } catch {
    return false
  }
}
