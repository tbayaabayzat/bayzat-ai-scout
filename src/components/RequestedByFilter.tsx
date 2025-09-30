import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User, ChevronDown, X } from "lucide-react"
import { RequestedByFilter as RequestedByFilterType } from "@/types/company"
import { supabase } from "@/integrations/supabase/client"

interface RequestedByFilterProps {
  requestedByFilter: RequestedByFilterType
  onRequestedByFilterChange: (filter: RequestedByFilterType) => void
}

export function RequestedByFilter({
  requestedByFilter,
  onRequestedByFilterChange
}: RequestedByFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [requesters, setRequesters] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log('🎬 [RequestedByFilter] Component mounted, fetching requesters')
    fetchRequesters()
  }, [])

  useEffect(() => {
    console.log('🔄 [RequestedByFilter] requesters state changed:', {
      count: requesters.length,
      sample: requesters.slice(0, 5)
    })
  }, [requesters])

  const fetchRequesters = async () => {
    setLoading(true)
    console.log('🔍 [RequestedByFilter] fetchRequesters() called')
    try {
      // Use the RPC function to fetch requesters (bypasses RLS)
      const { data, error } = await supabase
        .rpc('get_linkedin_requesters' as any) as any
      
      console.log('📊 [RequestedByFilter] RPC response:', { 
        hasData: !!data, 
        dataLength: data?.length || 0,
        hasError: !!error,
        error 
      })
      
      if (error) throw error

      // Log raw data sample
      console.log('📋 [RequestedByFilter] Raw data sample (first 5):', data?.slice(0, 5))
      console.log('📋 [RequestedByFilter] Looking for adnan:', data?.filter((item: any) => item.requester?.includes('adnan')))
      console.log('📋 [RequestedByFilter] Looking for sean:', data?.filter((item: any) => item.requester?.toLowerCase().includes('sean')))

      // Get unique requesters and filter out batch import tags
      const allRequesters = ((data || []) as any[]).map((item: any) => item.requester as string)
      console.log('🔢 [RequestedByFilter] Total requesters before uniqueness:', allRequesters.length)
      
      const uniqueRequesters: string[] = [...new Set(allRequesters)]
        .filter((requester): requester is string => 
          Boolean(requester) && 
          typeof requester === 'string' &&
          !requester.includes('batch_import') && 
          !requester.includes('_batch_')
        )
        .sort()

      console.log('✅ [RequestedByFilter] Final unique requesters:', {
        count: uniqueRequesters.length,
        list: uniqueRequesters.slice(0, 10),
        hasAdnan: uniqueRequesters.some(r => r.includes('adnan')),
        hasSean: uniqueRequesters.some(r => r.toLowerCase().includes('sean')),
        adnanValues: uniqueRequesters.filter(r => r.includes('adnan')),
        seanValues: uniqueRequesters.filter(r => r.toLowerCase().includes('sean'))
      })
      
      setRequesters(uniqueRequesters)
      console.log('💾 [RequestedByFilter] setRequesters() called with', uniqueRequesters.length, 'items')
    } catch (error) {
      console.error('❌ [RequestedByFilter] Failed to fetch requesters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRequesterToggle = (requester: string, checked: boolean) => {
    const currentSelected = requestedByFilter.selectedRequesters || []
    const newSelected = checked
      ? [...currentSelected, requester]
      : currentSelected.filter(r => r !== requester)

    onRequestedByFilterChange({
      selectedRequesters: newSelected.length > 0 ? newSelected : undefined
    })
  }

  const clearFilter = () => {
    onRequestedByFilterChange({ selectedRequesters: undefined })
  }

  const selectAll = () => {
    onRequestedByFilterChange({ selectedRequesters: [...filteredRequesters] })
  }

  const clearAll = () => {
    onRequestedByFilterChange({ selectedRequesters: undefined })
  }

  const filteredRequesters = requesters.filter(requester =>
    requester.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  console.log('🔎 [RequestedByFilter] Filtering:', {
    totalRequesters: requesters.length,
    searchTerm,
    filteredCount: filteredRequesters.length,
    filteredSample: filteredRequesters.slice(0, 5)
  })

  const selectedCount = requestedByFilter.selectedRequesters?.length || 0

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Requested By</Label>
        {selectedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            className="h-4 w-4 p-0 hover:bg-destructive/10"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between h-10"
            disabled={loading}
          >
            <span className="text-sm">
              {selectedCount > 0
                ? `${selectedCount} requester${selectedCount > 1 ? 's' : ''} selected`
                : loading
                ? 'Loading requesters...'
                : 'Select requesters'
              }
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0">
          <div className="p-4 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Input
                placeholder="Search requesters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            
            {/* Action Buttons */}
            {filteredRequesters.length > 0 && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAll}
                  className="h-6 px-2 text-xs flex-1"
                >
                  Select All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="h-6 px-2 text-xs flex-1"
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Requesters List */}
            <div className="space-y-1 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="text-center text-sm text-muted-foreground py-4">
                  Loading requesters...
                </div>
              ) : filteredRequesters.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground py-4">
                  {searchTerm ? 'No requesters match your search' : 'No requesters found'}
                </div>
              ) : (
                filteredRequesters.map((requester) => (
                  <div key={requester} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
                    <Checkbox
                      id={requester}
                      checked={requestedByFilter.selectedRequesters?.includes(requester) || false}
                      onCheckedChange={(checked) => handleRequesterToggle(requester, checked as boolean)}
                    />
                    <Label
                      htmlFor={requester}
                      className="text-sm cursor-pointer flex-1 truncate"
                      title={requester}
                    >
                      {requester}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Selected requesters badges */}
      {selectedCount > 0 && (
        <div className="flex flex-wrap gap-1">
          {requestedByFilter.selectedRequesters?.map((requester) => (
            <Badge
              key={requester}
              variant="secondary"
              className="text-xs max-w-[200px] truncate"
              title={requester}
            >
              {requester.split('@')[0]}
              <Button
                variant="ghost"
                size="sm"
                className="h-3 w-3 p-0 ml-1 hover:bg-destructive/20"
                onClick={() => handleRequesterToggle(requester, false)}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}