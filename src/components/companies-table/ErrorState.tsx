
interface ErrorStateProps {
  error: any
}

export function ErrorState({ error }: ErrorStateProps) {
  console.error('Query error:', error)
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <p className="text-red-500 mb-2">Error loading companies</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <p className="text-xs text-muted-foreground mt-2">Check browser console for details</p>
      </div>
    </div>
  )
}
