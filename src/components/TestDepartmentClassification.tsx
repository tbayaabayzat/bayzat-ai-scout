
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export function TestDepartmentClassification() {
  const [jobTitle, setJobTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  const testClassification = async () => {
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title")
      return
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.rpc('test_department_classification' as never, {
        test_job_title: jobTitle
      } as never)

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
      const { data, error } = await supabase.rpc('reclassify_employee_departments' as never, {
        batch_size: 5
      } as never)

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
            <Button onClick={testClassification} disabled={isLoading}>
              {isLoading ? "Testing..." : "Test"}
            </Button>
          </div>

          {testResult && (
            <div className="space-y-3 p-4 bg-muted rounded-lg">
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
