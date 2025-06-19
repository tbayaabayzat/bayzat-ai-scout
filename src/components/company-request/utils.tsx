
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

export const validateLinkedInUrl = (url: string): boolean => {
  return url.includes('linkedin.com/company/')
}
