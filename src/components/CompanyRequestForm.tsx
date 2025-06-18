
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Plus, ExternalLink, Clock, CheckCircle, AlertCircle, Building2, Users, Handshake } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { CompanyDetailSheet } from "./company-detail/CompanyDetailSheet"

export function CompanyRequestForm() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [bayzatRelationship, setBayzatRelationship] = useState("prospect")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [isCompanySheetOpen, setIsCompanySheetOpen] = useState(false)
  const [isLoadingCompany, setIsLoadingCompany] = useState(false)
  const { toast } = useToast()

  const { data: requests, refetch } = useQuery({
    queryKey: ['linkedin-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('linkedin_queue')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      if (error) throw error
      return data || []
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!linkedinUrl.trim()) return

    // Basic LinkedIn URL validation
    if (!linkedinUrl.includes('linkedin.com/company/')) {
      toast({
        title: "Invalid URL",
        description: "Please provide a valid LinkedIn company profile URL",
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
            linkedin_url: linkedinUrl.trim(),
            status: 'pending',
            bayzat_relationship: bayzatRelationship
          }
        ])

      if (error) throw error

      toast({
        title: "Request submitted!",
        description: `We'll process this ${bayzatRelationship} profile and notify you when it's ready`
      })

      setLinkedinUrl("")
      setBayzatRelationship("prospect")
      refetch()
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

  const handleRequestClick = async (request: any) => {
    if (request.status !== 'completed') return

    setIsLoadingCompany(true)
    
    try {
      console.log('Looking up company for URL:', request.linkedin_url)
      
      // Query companies2 table to find matching company by URL
      const { data: companies, error } = await supabase
        .from('companies2')
        .select('*')
        .eq('url', request.linkedin_url)
        .limit(1)

      if (error) {
        console.error('Error fetching company:', error)
        throw error
      }

      if (companies && companies.length > 0) {
        console.log('Found company:', companies[0])
        setSelectedCompany(companies[0])
        setIsCompanySheetOpen(true)
      } else {
        toast({
          title: "Company not found",
          description: "The company data is not available in our database yet.",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error looking up company:', error)
      toast({
        title: "Error loading company",
        description: "Failed to load company details. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoadingCompany(false)
    }
  }

  const getStatusIcon = (status: string) => {
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

  const getStatusColor = (status: string): "default" | "secondary" | "destructive" => {
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

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'customer':
        return <Users className="h-3 w-3" />
      case 'partner':
        return <Handshake className="h-3 w-3" />
      default:
        return <Building2 className="h-3 w-3" />
    }
  }

  const getRelationshipColor = (relationship: string): "default" | "secondary" | "outline" => {
    switch (relationship) {
      case 'customer':
        return "default"
      case 'partner':
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Request Company Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin-url">LinkedIn Company URL</Label>
              <Input
                id="linkedin-url"
                placeholder="https://linkedin.com/company/example-company"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-3">
              <Label>Relationship with Bayzat</Label>
              <RadioGroup
                value={bayzatRelationship}
                onValueChange={setBayzatRelationship}
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
              disabled={isSubmitting || !linkedinUrl.trim()}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Request Analysis"}
            </Button>
          </form>

          {requests && requests.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Requests</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {requests.map((request) => (
                  <div 
                    key={request.id} 
                    className={`flex items-center justify-between p-2 border rounded-sm transition-colors ${
                      request.status === 'completed' 
                        ? 'cursor-pointer hover:bg-muted/50 hover:border-primary/20' 
                        : ''
                    }`}
                    onClick={() => handleRequestClick(request)}
                    role={request.status === 'completed' ? 'button' : undefined}
                    tabIndex={request.status === 'completed' ? 0 : undefined}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {isLoadingCompany && request.status === 'completed' ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      ) : (
                        getStatusIcon(request.status)
                      )}
                      <span className="text-xs truncate">{request.linkedin_url}</span>
                      {request.status === 'completed' && (
                        <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge 
                        variant={getRelationshipColor(request.bayzat_relationship)} 
                        className="text-xs flex items-center gap-1"
                      >
                        {getRelationshipIcon(request.bayzat_relationship)}
                        {request.bayzat_relationship}
                      </Badge>
                      <Badge variant={getStatusColor(request.status)} className="text-xs">
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              {requests.some(r => r.status === 'completed') && (
                <p className="text-xs text-muted-foreground mt-2">
                  Click on completed requests to view company details
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <CompanyDetailSheet
        company={selectedCompany}
        open={isCompanySheetOpen}
        onOpenChange={setIsCompanySheetOpen}
      />
    </>
  )
}
