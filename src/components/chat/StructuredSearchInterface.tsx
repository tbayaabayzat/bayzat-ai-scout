
import { useState } from "react"
import { Search, Building2, Users, BarChart3, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { sendStructuredQuery } from "@/services/chatApi"
import { CompanyCards } from "./CompanyCards"
import { EmployeeCards } from "./EmployeeCards"
import { ChatDataTable } from "./ChatDataTable"
import { ChatChart } from "./ChatChart"
import { CompanyDetailSheet } from "../company-detail/CompanyDetailSheet"
import { useAuth } from "@/hooks/useAuth"
import { CompanyCardData } from "@/types/chat"

export function StructuredSearchInterface() {
  const [query, setQuery] = useState("")
  const [mode, setMode] = useState<'company' | 'employee' | 'analytics' | 'smart'>('smart')
  const [limit, setLimit] = useState(20)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<any>(null)
  const [isCompanySheetOpen, setIsCompanySheetOpen] = useState(false)
  const { user } = useAuth()

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    
    try {
      console.log('🔍 Structured search:', { query, mode, limit })
      const response = await sendStructuredQuery(query.trim(), mode, limit, user?.id)
      setResults(response)
      console.log('✅ Search results:', response)
    } catch (err) {
      console.error('❌ Search error:', err)
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch()
    }
  }

  const handleCompanyClick = (company: CompanyCardData) => {
    setSelectedCompany(company)
    setIsCompanySheetOpen(true)
  }

  const getModeIcon = (modeValue: string) => {
    switch (modeValue) {
      case 'company': return <Building2 className="w-4 h-4" />
      case 'employee': return <Users className="w-4 h-4" />
      case 'analytics': return <BarChart3 className="w-4 h-4" />
      default: return <Search className="w-4 h-4" />
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Structured Search Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your search query..."
                className="flex-1"
                disabled={isLoading}
              />
              
              <Select value={mode} onValueChange={(value: any) => setMode(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      {getModeIcon(mode)}
                      <span className="capitalize">{mode}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smart">
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4" />
                      Smart
                    </div>
                  </SelectItem>
                  <SelectItem value="company">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Companies
                    </div>
                  </SelectItem>
                  <SelectItem value="employee">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Employees
                    </div>
                  </SelectItem>
                  <SelectItem value="analytics">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>

            {error && (
              <div className="text-red-600 text-sm p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-6">
            {/* Intent Display */}
            {results.intent && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Query Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Detected Mode:</span>
                      <span className="ml-2 capitalize">{results.intent.detected_mode}</span>
                    </div>
                    {results.intent.filters_applied && (
                      <div>
                        <span className="font-medium">Filters Applied:</span>
                        <div className="ml-2 text-muted-foreground">
                          {Object.entries(results.intent.filters_applied)
                            .filter(([_, value]) => value)
                            .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
                            .join(', ') || 'None'}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Display */}
            {results.sections?.map((section: any, index: number) => (
              <div key={index}>
                {section.type === 'company-cards' && (
                  <CompanyCards 
                    companies={section.data} 
                    onCompanyClick={handleCompanyClick} 
                  />
                )}
                
                {section.type === 'employee-cards' && (
                  <EmployeeCards 
                    employees={section.data} 
                    onEmployeeClick={() => {}} 
                  />
                )}
                
                {section.type === 'data-table' && (
                  <ChatDataTable 
                    data={section.data}
                    onCompanyClick={handleCompanyClick}
                  />
                )}
                
                {section.type === 'chart' && (
                  <ChatChart 
                    data={section.data}
                  />
                )}
              </div>
            ))}

            {/* Message Display */}
            {results.message && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">{results.message}</p>
                </CardContent>
              </Card>
            )}

            {/* Suggested Actions */}
            {results.suggested_actions && results.suggested_actions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Follow-ups</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.suggested_actions.map((action: any, index: number) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(action.query)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      <CompanyDetailSheet
        company={selectedCompany}
        open={isCompanySheetOpen}
        onOpenChange={setIsCompanySheetOpen}
      />
    </>
  )
}
