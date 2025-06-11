
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"

interface BatchClassificationResult {
  processed_count: number
  success_count: number
  error_count: number
}

interface CompanyEmployee {
  id: string
  full_name: string
  headline: string
  department: string
  current_company_name: string
}

export function TestBatchClassification() {
  const [isRunning, setIsRunning] = useState(false)
  const [lastResult, setLastResult] = useState<BatchClassificationResult | null>(null)

  // Query to find Arabian Ethicals employees
  const { data: arabianEthicalsEmployees, isLoading: loadingEmployees, refetch: refetchEmployees } = useQuery({
    queryKey: ['arabian-ethicals-employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('id, full_name, headline, department, current_company_name')
        .ilike('current_company_name', '%arabian%ethicals%')
        .limit(20)

      if (error) {
        console.error('Error fetching Arabian Ethicals employees:', error)
        throw error
      }

      return data as CompanyEmployee[]
    }
  })

  const runBatchClassification = async (batchSize: number = 10) => {
    setIsRunning(true)
    try {
      const { data, error } = await (supabase.rpc as any)('reclassify_employee_departments', {
        batch_size: batchSize
      }) as { data: BatchClassificationResult[] | null, error: any }

      if (error) {
        console.error('Batch classification error:', error)
        toast.error(`Batch classification failed: ${error.message}`)
        return
      }

      if (data && data.length > 0) {
        const result = data[0]
        setLastResult(result)
        toast.success(`Batch complete: ${result.processed_count} processed, ${result.success_count} successful, ${result.error_count} errors`)
        
        // Refetch Arabian Ethicals employees to see updates
        setTimeout(() => {
          refetchEmployees()
        }, 2000)
      } else {
        toast.warning("No employees found to process")
      }
    } catch (err) {
      console.error('Batch classification error:', err)
      toast.error("Failed to run batch classification")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Batch Employee Department Classification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Button onClick={() => runBatchClassification(5)} disabled={isRunning} variant="default">
              {isRunning ? "Running..." : "Process 5 Employees"}
            </Button>
            <Button onClick={() => runBatchClassification(10)} disabled={isRunning} variant="outline">
              {isRunning ? "Running..." : "Process 10 Employees"}
            </Button>
            <Button onClick={() => runBatchClassification(20)} disabled={isRunning} variant="outline">
              {isRunning ? "Running..." : "Process 20 Employees"}
            </Button>
          </div>

          {lastResult && (
            <div className="space-y-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900">Last Batch Result</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Processed:</strong> {lastResult.processed_count}
                </div>
                <div>
                  <strong>Successful:</strong> {lastResult.success_count}
                </div>
                <div>
                  <strong>Errors:</strong> {lastResult.error_count}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Arabian Ethicals Employees Test</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingEmployees ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : arabianEthicalsEmployees && arabianEthicalsEmployees.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Found {arabianEthicalsEmployees.length} employees</h4>
                <Button onClick={() => refetchEmployees()} variant="outline" size="sm">
                  Refresh
                </Button>
              </div>
              <div className="grid gap-3">
                {arabianEthicalsEmployees.map((employee) => (
                  <div key={employee.id} className="p-3 border rounded-lg bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{employee.full_name}</div>
                        <div className="text-sm text-muted-foreground">{employee.headline}</div>
                        <div className="text-xs text-muted-foreground">{employee.current_company_name}</div>
                      </div>
                      <Badge variant={employee.department === 'Other' ? 'outline' : 'default'}>
                        {employee.department || 'Unclassified'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No Arabian Ethicals employees found</p>
              <p className="text-xs mt-1">Try searching for other company names or check the database</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
