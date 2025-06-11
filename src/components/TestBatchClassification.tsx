
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
  updated_at: string
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
        .select('id, full_name, headline, department, current_company_name, updated_at')
        .ilike('current_company_name', '%arabian%ethicals%')
        .limit(20)
        .order('updated_at', { ascending: false })

      if (error) {
        console.error('Error fetching Arabian Ethicals employees:', error)
        throw error
      }

      return data as CompanyEmployee[]
    }
  })

  // Query to get department distribution
  const { data: departmentStats, refetch: refetchStats } = useQuery({
    queryKey: ['department-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('department')
        .not('department', 'is', null)

      if (error) {
        console.error('Error fetching department stats:', error)
        throw error
      }

      // Count departments
      const counts: Record<string, number> = {}
      data.forEach(emp => {
        const dept = emp.department || 'Other'
        counts[dept] = (counts[dept] || 0) + 1
      })

      return Object.entries(counts)
        .map(([department, count]) => ({ department, count }))
        .sort((a, b) => b.count - a.count)
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
        
        // Refetch data to see updates
        setTimeout(() => {
          refetchEmployees()
          refetchStats()
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

  const testSingleClassification = async () => {
    setIsRunning(true)
    try {
      // Update a test employee to trigger the classification
      const { data: testEmployee } = await supabase
        .from('employee_profiles')
        .select('id, headline')
        .not('headline', 'is', null)
        .limit(1)
        .single()

      if (testEmployee) {
        const { error } = await supabase
          .from('employee_profiles')
          .update({ 
            headline: `${testEmployee.headline} - Updated ${new Date().toISOString().slice(11, 19)}`
          })
          .eq('id', testEmployee.id)

        if (error) {
          toast.error(`Failed to update test employee: ${error.message}`)
        } else {
          toast.success("Test update completed - check if department was classified")
          setTimeout(() => {
            refetchEmployees()
            refetchStats()
          }, 3000)
        }
      }
    } catch (err) {
      console.error('Test classification error:', err)
      toast.error("Failed to run test classification")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Department Classification Testing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Button onClick={testSingleClassification} disabled={isRunning} variant="default">
              {isRunning ? "Running..." : "Test Single Update"}
            </Button>
            <Button onClick={() => runBatchClassification(5)} disabled={isRunning} variant="outline">
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

      {/* Department Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Department Classification Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          {departmentStats && departmentStats.length > 0 ? (
            <div className="grid gap-2">
              {departmentStats.map(({ department, count }) => (
                <div key={department} className="flex items-center justify-between p-2 border rounded">
                  <Badge variant={department === 'Other' ? 'outline' : 'default'}>
                    {department}
                  </Badge>
                  <span className="font-medium">{count} employees</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Loading department statistics...</p>
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
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(employee.updated_at).toLocaleString()}
                        </div>
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
