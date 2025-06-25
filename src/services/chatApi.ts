
import { supabase } from "@/integrations/supabase/client"
import { Message } from "@/types/message"
import { ChatApiResponse } from "@/types/message"

export async function sendChatMessage(
  messages: Message[],
  userId: string = 'anonymous'
): Promise<ChatApiResponse> {
  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: msg.timestamp.toISOString()
  }))

  const { data, error } = await supabase.functions.invoke('chat-interface', {
    body: {
      messages: formattedMessages,
      stream: true,
      user_id: userId
    }
  })

  if (error) {
    throw error
  }

  console.log('Raw edge function response:', data)

  // Handle the wrapped response structure from edge function
  if (data && data.success) {
    return {
      message: data.message,
      tool_results: data.tool_results,
      content_type: data.content_type,
      sections: data.sections,
      suggested_actions: data.suggested_actions
    }
  } else if (data && data.success === false) {
    throw new Error(data.error || 'Chat request failed')
  }

  // Fallback for direct response structure (backwards compatibility)
  return data || {}
}
