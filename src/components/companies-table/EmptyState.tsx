
interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message = "No data found. Check console for debugging info." }: EmptyStateProps) {
  return (
    <div className="text-sm text-orange-600 mt-2">
      {message}
    </div>
  )
}
