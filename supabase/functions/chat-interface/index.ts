
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// OpenAI API key - will be set via environment variables
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  stream?: boolean;
  user_id?: string;
}

interface ToolResult {
  tool: string;
  success: boolean;
  data?: any;
  error?: string;
  execution_time_ms: number;
}

// Function to execute database queries based on user intent
async function executeDataQuery(query: string): Promise<ToolResult> {
  const startTime = Date.now();
  
  try {
    console.log('Executing data query:', query);
    
    // Analyze the query to determine what data to fetch
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('compan') && (lowerQuery.includes('netsuite') || lowerQuery.includes('erp'))) {
      // Query for companies using NetSuite
      const { data, error } = await supabase
        .from('companies2')
        .select('company_name, industry, employee_count, website_url')
        .ilike('ai_analysis', '%netsuite%')
        .limit(10);
      
      if (error) throw error;
      
      return {
        tool: 'company_search',
        success: true,
        data: data,
        execution_time_ms: Date.now() - startTime
      };
    }
    
    if (lowerQuery.includes('compan') && lowerQuery.includes('employee')) {
      // Query for companies by employee count
      const match = lowerQuery.match(/(\d+)[-–](\d+)/);
      if (match) {
        const minEmployees = parseInt(match[1]);
        const maxEmployees = parseInt(match[2]);
        
        const { data, error } = await supabase
          .from('companies2')
          .select('company_name, industry, employee_count, website_url, bayzat_relationship')
          .gte('employee_count', minEmployees)
          .lte('employee_count', maxEmployees)
          .limit(20);
        
        if (error) throw error;
        
        return {
          tool: 'employee_count_search',
          success: true,
          data: data,
          execution_time_ms: Date.now() - startTime
        };
      }
    }
    
    if (lowerQuery.includes('hr') && (lowerQuery.includes('manager') || lowerQuery.includes('director'))) {
      // Query for HR professionals
      const { data, error } = await supabase
        .from('employee_profiles')
        .select('full_name, current_title, current_company_name, location_city, engagement_potential')
        .ilike('current_title', '%hr%')
        .or('current_title.ilike.%human resource%,current_title.ilike.%people%')
        .order('engagement_potential', { ascending: false })
        .limit(15);
      
      if (error) throw error;
      
      return {
        tool: 'hr_professional_search',
        success: true,
        data: data,
        execution_time_ms: Date.now() - startTime
      };
    }
    
    if (lowerQuery.includes('grow') || lowerQuery.includes('rapid')) {
      // Query for growing companies
      const { data, error } = await supabase
        .from('companies2')
        .select('company_name, industry, employee_count, founded_year, website_url')
        .gte('founded_year', 2015)
        .gte('employee_count', 20)
        .order('employee_count', { ascending: false })
        .limit(15);
      
      if (error) throw error;
      
      return {
        tool: 'growing_companies_search',
        success: true,
        data: data,
        execution_time_ms: Date.now() - startTime
      };
    }
    
    // Default: return general company data
    const { data, error } = await supabase
      .from('companies2')
      .select('company_name, industry, employee_count, bayzat_relationship')
      .limit(10);
    
    if (error) throw error;
    
    return {
      tool: 'general_company_search',
      success: true,
      data: data,
      execution_time_ms: Date.now() - startTime
    };
    
  } catch (error) {
    console.error('Database query error:', error);
    return {
      tool: 'data_query',
      success: false,
      error: error.message,
      execution_time_ms: Date.now() - startTime
    };
  }
}

// Function to generate AI response using OpenAI
async function generateAIResponse(messages: ChatMessage[], toolResults?: ToolResult[]): Promise<string> {
  if (!openAIApiKey) {
    return "I'm sorry, but I need an OpenAI API key to generate intelligent responses. Please configure the OPENAI_API_KEY environment variable.";
  }
  
  try {
    // Prepare context with tool results
    let systemMessage = `You are an AI data assistant for Bayzat, specialized in helping analyze company and employee data. 
    You have access to a database of companies and their employee profiles. 
    Provide helpful, accurate insights based on the data provided.
    
    When presenting data, format it clearly and highlight key insights.
    Focus on actionable business intelligence and opportunities.`;
    
    if (toolResults && toolResults.length > 0) {
      systemMessage += `\n\nHere are the results from database queries:\n`;
      toolResults.forEach(result => {
        if (result.success && result.data) {
          systemMessage += `\n${result.tool} (${result.execution_time_ms}ms):\n${JSON.stringify(result.data, null, 2)}\n`;
        } else if (!result.success) {
          systemMessage += `\n${result.tool} failed: ${result.error}\n`;
        }
      });
    }
    
    const apiMessages = [
      { role: 'system', content: systemMessage },
      ...messages.slice(-5) // Keep last 5 messages for context
    ];
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: apiMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    return `I encountered an error while generating a response: ${error.message}. I can still help you with basic data queries.`;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('Chat interface request received');
    
    const { messages, stream, user_id }: ChatRequest = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Messages array is required');
    }
    
    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== 'user') {
      throw new Error('Latest message must be from user');
    }
    
    console.log('Processing user query:', latestMessage.content);
    
    // Execute relevant database queries based on user intent
    const toolResults: ToolResult[] = [];
    
    // Analyze the user's query and execute appropriate database searches
    const dataResult = await executeDataQuery(latestMessage.content);
    toolResults.push(dataResult);
    
    // Generate AI response based on the data
    const aiResponse = await generateAIResponse(messages, toolResults);
    
    // Log the query for analytics
    try {
      await supabase.from('chat_query_log').insert({
        user_id: user_id || 'anonymous',
        query: latestMessage.content,
        response: aiResponse,
        tool_calls: toolResults.map(r => ({ tool: r.tool, success: r.success })),
        results: toolResults,
        execution_time_ms: toolResults.reduce((sum, r) => sum + r.execution_time_ms, 0),
        success: true
      });
    } catch (logError) {
      console.error('Failed to log query:', logError);
    }
    
    const response = {
      success: true,
      message: aiResponse,
      tool_results: toolResults.filter(r => r.success && r.data)
    };
    
    console.log('Sending response');
    
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in chat-interface function:', error);
    
    const errorResponse = {
      success: false,
      error: error.message,
      message: 'I apologize, but I encountered an error processing your request. Please try again.'
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
