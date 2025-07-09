import { useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Globe } from "lucide-react"
import type { CountryFilter } from "@/types/company"
import { getCountryOptions, CountryOption } from "@/utils/countryUtils"

interface CountryFilterProps {
  countryFilter: CountryFilter
  onCountryFilterChange: (filter: CountryFilter) => void
}

export function CountryFilter({
  countryFilter,
  onCountryFilterChange
}: CountryFilterProps) {
  const countryOptions = useMemo(() => getCountryOptions(), [])
  const selectedCountries = countryFilter.selectedCountries || []
  
  const handleCountryToggle = (countryCode: string) => {
    const isSelected = selectedCountries.includes(countryCode)
    
    if (countryCode === 'OTHER') {
      // Handle "Other" selection - remove SA and AE if "Other" is being selected
      if (isSelected) {
        // Deselecting "Other"
        const newSelectedCountries = selectedCountries.filter(code => code !== 'OTHER')
        onCountryFilterChange({
          selectedCountries: newSelectedCountries.length > 0 ? newSelectedCountries : undefined
        })
      } else {
        // Selecting "Other" - remove SA and AE from selection
        const withoutSpecific = selectedCountries.filter(code => !['SA', 'AE'].includes(code))
        const newSelectedCountries = [...withoutSpecific, 'OTHER']
        onCountryFilterChange({
          selectedCountries: newSelectedCountries
        })
      }
    } else {
      // Handle SA or AE selection - remove "Other" if specific country is being selected
      if (isSelected) {
        // Deselecting SA or AE
        const newSelectedCountries = selectedCountries.filter(code => code !== countryCode)
        onCountryFilterChange({
          selectedCountries: newSelectedCountries.length > 0 ? newSelectedCountries : undefined
        })
      } else {
        // Selecting SA or AE - remove "Other" from selection
        const withoutOther = selectedCountries.filter(code => code !== 'OTHER')
        const newSelectedCountries = [...withoutOther, countryCode]
        onCountryFilterChange({
          selectedCountries: newSelectedCountries
        })
      }
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <Label className="text-sm font-medium">Country</Label>
        {selectedCountries.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {selectedCountries.length} selected
          </Badge>
        )}
      </div>
      
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {countryOptions.map((country: CountryOption) => (
          <div 
            key={country.code} 
            className="flex items-center justify-between p-2 rounded-md border bg-card/50 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-emoji select-none" style={{ 
                fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, serif',
                fontSize: '16px',
                lineHeight: '1'
              }}>
                {country.flag}
              </span>
              <span className="text-sm">{country.name}</span>
            </div>
            <Checkbox
              checked={selectedCountries.includes(country.code)}
              onCheckedChange={() => handleCountryToggle(country.code)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}