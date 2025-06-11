
import { TestDepartmentClassification } from "@/components/TestDepartmentClassification"

export default function TestClassification() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Department Classification Test</h2>
        <p className="text-muted-foreground">
          Test and debug the employee department classification system
        </p>
      </div>
      
      <TestDepartmentClassification />
    </div>
  )
}
