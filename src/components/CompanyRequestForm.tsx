
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"

export function CompanyRequestForm() {
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [bayzatRelationship, setBayzatRelationship] = useState("prospect")
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const getRelationshipColor = (relationship: string): "default" | "secondary" | "outline" => {
    return relationship === 'customer' ? "default" : "outline"
  }

  return (
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

          <div className="flex items-center justify-between">
            <ToggleGroup
              type="single"
              value={bayzatRelationship}
              onValueChange={(value) => value && setBayzatRelationship(value)}
              className="justify-start"
            >
              <ToggleGroupItem 
                value="prospect" 
                className="text-sm px-4 py-2 data-[state=on]:bg-muted data-[state=on]:text-foreground"
              >
                Prospect
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="customer" 
                className="text-sm px-4 py-2 data-[state=on]:bg-muted data-[state=on]:text-foreground"
              >
                Customer
              </ToggleGroupItem>
            </ToggleGroup>

            <Button 
              type="submit" 
              disabled={isSubmitting || !linkedinUrl.trim()}
              className="ml-auto"
            >
              {isSubmitting ? "Submitting..." : "Request Analysis"}
            </Button>
          </div>
        </form>

        {requests && requests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Requests</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {requests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-2 border rounded-sm">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getStatusIcon(request.status)}
                    <span className="text-xs truncate">{request.linkedin_url}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge 
                      variant={getRelationshipColor(request.bayzat_relationship)} 
                      className="text-xs"
                    >
                      {request.bayzat_relationship}
                    </Badge>
                    <Badge variant={getStatusColor(request.status)} className="text-xs">
                      {request.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
