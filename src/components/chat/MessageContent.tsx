
interface MessageContentProps {
  content: string
}

export function MessageContent({ content }: MessageContentProps) {
  const formatContent = (content: string) => {
    // Simple formatting for better readability
    return content
      .split('\n')
      .map((line, index) => {
        // Handle bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          return (
            <li key={index} className="ml-4">
              {line.trim().substring(1).trim()}
            </li>
          )
        }
        // Handle bold text
        const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        return (
          <p key={index} className={line.trim() ? "mb-2" : "mb-1"}>
            <span dangerouslySetInnerHTML={{ __html: boldFormatted }} />
          </p>
        )
      })
  }

  return (
    <div className="prose prose-sm max-w-none text-foreground">
      <div className="space-y-1">
        {formatContent(content)}
      </div>
    </div>
  )
}
