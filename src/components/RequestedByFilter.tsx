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
    fetchRequesters()
  }, [])

  const fetchRequesters = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('linkedin_profiles_queue')
        .select('requested_by')
        .not('requested_by', 'is', null)
        .neq('requested_by', '')

      if (error) throw error

      // Get unique requesters and filter out batch import tags
      const uniqueRequesters = [...new Set(data.map(item => item.requested_by))]
        .filter(requester => 
          requester && 
          !requester.includes('batch_import') && 
          !requester.includes('_batch_') &&
          requester.includes('@') // Only show email addresses
        )
        .sort()

      setRequesters(uniqueRequesters)
    } catch (error) {
      console.error('Failed to fetch requesters:', error)
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