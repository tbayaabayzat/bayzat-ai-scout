
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

// Type definitions for the RPC responses
interface TestClassificationResult {
  job_title: string
  classified_department: string
  response_raw: any
  success: boolean
  error_message?: string
}

interface BatchClassificationResult {
  processed_count: number
  success_count: number
  error_count: number
}

interface DirectWebhookResult {
  success: boolean
  department?: string
  response_raw: any
  error_message?: string
  status?: number
}

export function TestDepartmentClassification() {
  const [jobTitle, setJobTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<TestClassificationResult | null>(null)
  const [directWebhookResult, setDirectWebhookResult] = useState<DirectWebhookResult | null>(null)

  const testDirectWebhook = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title")
      return
    }

    setIsLoading(true)
    try {
      const requestBody = {
        headline: jobTitle,
        current_title: jobTitle,
        years_of_experience: null,
        about: null
      }

      console.log('Making direct webhook request with:', requestBody)

      const response = await fetch('https://automation.bayzat.com/webhook/7732390f-d53f-4adf-8310-668c9c692371', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('Webhook response status:', response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Webhook error response:', errorText)
        setDirectWebhookResult({
          success: false,
          error_message: `HTTP ${response.status}: ${errorText}`,
          response_raw: { error: errorText, status: response.status },
          status: response.status
        })
        toast.error(`Direct webhook failed: HTTP ${response.status}`)
        return
      }

      const responseData = await response.json()
      console.log('Webhook success response:', responseData)

      const department = responseData?.department || 'Other'
      
      setDirectWebhookResult({
        success: true,
        department,
        response_raw: responseData,
        status: response.status
      })
      
      toast.success(`Direct webhook success: ${department}`)

    } catch (err) {
      console.error('Direct webhook error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setDirectWebhookResult({
        success: false,
        error_message: errorMessage,
        response_raw: { error: errorMessage }
      })
      toast.error(`Direct webhook failed: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testClassification = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await (supabase.rpc as any)('test_department_classification', {
        test_job_title: jobTitle
      }) as { data: TestClassificationResult[] | null, error: any }

      if (error) {
        console.error('Test error:', error)
        toast.error(`Test failed: ${error.message}`)
        return
      }

      if (data && data.length > 0) {
        setTestResult(data[0])
        toast.success("Classification test completed")
      } else {
        toast.error("No data returned from classification test")
      }
    } catch (err) {
      console.error('Test error:', err)
      toast.error("Failed to run classification test")
    } finally {
      setIsLoading(false)
    }
  }

  const runBatchClassification = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await (supabase.rpc as any)('reclassify_employee_departments', {
        batch_size: 5
      }) as { data: BatchClassificationResult[] | null, error: any }

      if (error) {
        console.error('Batch classification error:', error)
        toast.error(`Batch classification failed: ${error.message}`)
        return
      }

      if (data && data.length > 0) {
        const result = data[0]
        toast.success(`Batch complete: ${result.processed_count} processed, ${result.success_count} successful, ${result.error_count} errors`)
      } else {
        toast.error("No data returned from batch classification")
      }
    } catch (err) {
      console.error('Batch classification error:', err)
      toast.error("Failed to run batch classification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Department Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a job title (e.g., 'Software Engineer', 'Marketing Manager')"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button onClick={testDirectWebhook} disabled={isLoading} variant="default">
              {isLoading ? "Testing..." : "Test Webhook Directly"}
            </Button>
            <Button onClick={testClassification} disabled={isLoading} variant="outline">
              {isLoading ? "Testing..." : "Test via Database Function"}
            </Button>
          </div>

          {directWebhookResult && (
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900">Direct Webhook Result</h3>
              <div><strong>Job Title:</strong> {jobTitle}</div>
              <div className="flex items-center gap-2">
                <strong>Department:</strong>
                <Badge variant={directWebhookResult.success ? "default" : "destructive"}>
                  {directWebhookResult.department || 'Error'}
                </Badge>
              </div>
              <div><strong>Success:</strong> {directWebhookResult.success ? "✅" : "❌"}</div>
              {directWebhookResult.status && (
                <div><strong>HTTP Status:</strong> {directWebhookResult.status}</div>
              )}
              {directWebhookResult.error_message && (
                <div className="text-red-600">
                  <strong>Error:</strong> {directWebhookResult.error_message}
                </div>
              )}
              <details className="text-xs">
                <summary className="cursor-pointer font-medium">Raw Response</summary>
                <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto">
                  {JSON.stringify(directWebhookResult.response_raw, null, 2)}
                </pre>
              </details>
            </div>
          )}

          {testResult && (
            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <h3 className="font-semibold">Database Function Result</h3>
              <div><strong>Job Title:</strong> {testResult.job_title}</div>
              <div className="flex items-center gap-2">
                <strong>Department:</strong>
                <Badge variant={testResult.success ? "default" : "destructive"}>
                  {testResult.classified_department}
                </Badge>
              </div>
              <div><strong>Success:</strong> {testResult.success ? "✅" : "❌"}</div>
              {testResult.error_message && (
                <div className="text-red-600">
                  <strong>Error:</strong> {testResult.error_message}
                </div>
              )}
              <details className="text-xs">
                <summary className="cursor-pointer font-medium">Raw Response</summary>
                <pre className="mt-2 p-2 bg-background rounded text-xs overflow-auto">
                  {JSON.stringify(testResult.response_raw, null, 2)}
                </pre>
              </details>
            </div>
          )}

          <Separator />

          <div className="border-t pt-4">
            <Button 
              onClick={runBatchClassification} 
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? "Running..." : "Run Batch Classification (5 employees)"}
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              This will classify 5 employees with 'Other' department
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
