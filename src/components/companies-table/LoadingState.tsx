
interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading companies..." }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span className="ml-2">{message}</span>
    </div>
  )
}
