
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

  return data || {}
}
