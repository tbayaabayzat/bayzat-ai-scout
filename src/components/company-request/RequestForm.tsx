
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2, Users, Handshake } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { RequestFormData } from "./types"
import { validateLinkedInUrl, sanitizeLinkedInCompanyUrl } from "./utils"

interface RequestFormProps {
  onRequestSubmitted: () => void
}

export function RequestForm({ onRequestSubmitted }: RequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    linkedinUrl: "",
    bayzatRelationship: "prospect"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.linkedinUrl.trim()) return

    // Sanitize the URL first
    const sanitizedUrl = sanitizeLinkedInCompanyUrl(formData.linkedinUrl)
    
    // If URL was cleaned, update the input and notify user
    if (sanitizedUrl !== formData.linkedinUrl.trim() && sanitizedUrl) {
      setFormData(prev => ({ ...prev, linkedinUrl: sanitizedUrl }))
      toast({
        title: "URL cleaned",
        description: "We removed tracking parameters from your URL"
      })
    }

    // Validate the sanitized URL
    if (!sanitizedUrl || !validateLinkedInUrl(sanitizedUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please provide a valid LinkedIn company profile URL (format: https://www.linkedin.com/company/<company>)",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('linkedin_queue')
        .insert([
          {
            linkedin_url: sanitizedUrl,
            status: 'pending',
            bayzat_relationship: formData.bayzatRelationship,
            requester: user?.email || null
          }
        ])

      if (error) throw error

      toast({
        title: "Request submitted!",
        description: `We'll process this ${formData.bayzatRelationship} profile and notify you when it's ready`
      })

      setFormData({
        linkedinUrl: "",
        bayzatRelationship: "prospect"
      })
      onRequestSubmitted()
    } catch (error) {
      toast({
        title: "Failed to submit request",
        description: "Please try again later",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text')
    const sanitizedUrl = sanitizeLinkedInCompanyUrl(pastedText)
    
    if (sanitizedUrl && sanitizedUrl !== pastedText.trim()) {
      e.preventDefault()
      setFormData(prev => ({ ...prev, linkedinUrl: sanitizedUrl }))
      toast({
        title: "URL cleaned",
        description: "We removed tracking parameters from your URL"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="linkedin-url">LinkedIn Company URL</Label>
        <Input
          id="linkedin-url"
          placeholder="https://linkedin.com/company/example-company"
          value={formData.linkedinUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
          onPaste={handlePaste}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-3">
        <Label>Relationship with Bayzat</Label>
        <RadioGroup
          value={formData.bayzatRelationship}
          onValueChange={(value) => setFormData(prev => ({ ...prev, bayzatRelationship: value as any }))}
          className="grid grid-cols-3 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="prospect" id="prospect" />
            <Label htmlFor="prospect" className="flex items-center gap-2 cursor-pointer">
              <Building2 className="h-4 w-4" />
              Prospect
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="customer" id="customer" />
            <Label htmlFor="customer" className="flex items-center gap-2 cursor-pointer">
              <Users className="h-4 w-4" />
              Customer
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="partner" id="partner" />
            <Label htmlFor="partner" className="flex items-center gap-2 cursor-pointer">
              <Handshake className="h-4 w-4" />
              Partner
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || !formData.linkedinUrl.trim()}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Request Analysis"}
      </Button>
    </form>
  )
}
