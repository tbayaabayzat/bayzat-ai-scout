
export interface RequestItem {
  id: number
  linkedin_url: string
  status: 'pending' | 'completed' | 'failed'
  bayzat_relationship: 'prospect' | 'customer' | 'partner'
  created_at: string
}

export interface RequestFormData {
  linkedinUrl: string
  bayzatRelationship: 'prospect' | 'customer' | 'partner'
}
