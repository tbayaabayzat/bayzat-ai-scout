
import { TestDepartmentClassification } from "@/components/TestDepartmentClassification"
import { TestBatchClassification } from "@/components/TestBatchClassification"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TestClassification = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Department Classification Testing</h1>
        <p className="text-muted-foreground">
          Test the employee department classification system and run batch updates
        </p>
      </div>
      
      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual">Individual Testing</TabsTrigger>
          <TabsTrigger value="batch">Batch Processing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual" className="space-y-4">
          <TestDepartmentClassification />
        </TabsContent>
        
        <TabsContent value="batch" className="space-y-4">
          <TestBatchClassification />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TestClassification
