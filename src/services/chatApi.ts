
import { supabase } from "@/integrations/supabase/client"
import { Message } from "@/types/message"
import { ChatApiResponse } from "@/types/message"

export async function sendChatMessage(
  messages: Message[],
  userId: string = 'anonymous'
): Promise<ChatApiResponse> {
  console.log('🚀 sendChatMessage called with:', {
    messagesCount: messages.length,
    userId,
    lastMessage: messages[messages.length - 1]?.content
  })

  const formattedMessages = messages.map(msg => ({
    role: msg.role,
    content: msg.content,
    timestamp: msg.timestamp.toISOString()
  }))

  console.log('📤 Sending to edge function:', {
    messages: formattedMessages,
    stream: true,
    user_id: userId
  })

  const { data, error } = await supabase.functions.invoke('chat-interface', {
    body: {
      messages: formattedMessages,
      stream: true,
      user_id: userId
    }
  })

  if (error) {
    console.error('❌ Edge function error:', error)
    throw error
  }

  console.log('📥 Raw edge function response:', data)

  // Handle the wrapped response structure from edge function
  if (data && data.success) {
    console.log('✅ Processing successful response')
    console.log('- Message:', data.message ? 'present' : 'missing')
    console.log('- Content type:', data.content_type)
    console.log('- Sections:', data.sections ? data.sections.length : 0)
    console.log('- Tool results:', data.tool_results ? data.tool_results.length : 0)
    console.log('- Suggested actions:', data.suggested_actions ? data.suggested_actions.length : 0)
    
    if (data.sections && data.sections.length > 0) {
      console.log('📋 Sections detail:')
      data.sections.forEach((section: any, index: number) => {
        console.log(`  ${index + 1}. ${section.type}:`, section.data ? Object.keys(section.data) : 'no data')
      })
    }
    
    return {
      message: data.message,
      tool_results: data.tool_results,
      content_type: data.content_type,
      sections: data.sections,
      suggested_actions: data.suggested_actions
    }
  } else if (data && data.success === false) {
    console.error('❌ Edge function returned error:', data.error)
    throw new Error(data.error || 'Chat request failed')
  }

  console.log('⚠️ Unexpected response format, using fallback')
  // Fallback for direct response structure (backwards compatibility)
  return data || {}
}
