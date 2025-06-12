
import React from "react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomSheetHeaderProps {
  onClose: () => void
  showBackButton?: boolean
  onBack?: () => void
  children?: React.ReactNode
  className?: string
}

export function CustomSheetHeader({ 
  onClose, 
  showBackButton = false, 
  onBack, 
  children, 
  className 
}: CustomSheetHeaderProps) {
  const handleButtonClick = () => {
    if (showBackButton && onBack) {
      onBack()
    } else {
      onClose()
    }
  }

  return (
    <div className={className}>
      {children}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-6 w-6"
        onClick={handleButtonClick}
      >
        {showBackButton ? (
          <ArrowLeft className="h-4 w-4" />
        ) : (
          <X className="h-4 w-4" />
        )}
        <span className="sr-only">{showBackButton ? 'Back' : 'Close'}</span>
      </Button>
    </div>
  )
}
