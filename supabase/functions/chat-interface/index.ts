
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

interface ContentSection {
  type: 'text' | 'company-cards' | 'data-table' | 'chart' | 'actions';
  data: any;
  metadata?: any;
}

interface SuggestedAction {
  label: string;
  query: string;
  type: 'query' | 'filter' | 'action';
}

interface EnhancedChatResponse {
  message: string;
  content_type: 'text' | 'mixed';
  sections: ContentSection[];
  tool_results: ToolResult[];
  suggested_actions?: SuggestedAction[];
}

// Enhanced query processing to detect intent and content types
function analyzeQueryIntent(query: string): {
  needsVisualization: boolean;
  needsCompanyCards: boolean;
  needsDataTable: boolean;
  chartType?: 'bar' | 'pie' | 'line' | 'scatter';
  companyMentions: string[];
} {
  const lowerQuery = query.toLowerCase();
  
  // Chart/visualization keywords
  const chartKeywords = ['chart', 'graph', 'visualize', 'plot', 'distribution', 'trend'];
  const needsVisualization = chartKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Chart type detection
  let chartType: 'bar' | 'pie' | 'line' | 'scatter' | undefined;
  if (lowerQuery.includes('pie') || lowerQuery.includes('distribution')) chartType = 'pie';
  else if (lowerQuery.includes('trend') || lowerQuery.includes('over time')) chartType = 'line';
  else if (lowerQuery.includes('scatter') || lowerQuery.includes('correlation')) chartType = 'scatter';
  else if (needsVisualization) chartType = 'bar';
  
  // Company card detection
  const companyKeywords = ['company', 'companies', 'show me', 'list'];
  const needsCompanyCards = companyKeywords.some(keyword => lowerQuery.includes(keyword)) && 
                           !lowerQuery.includes('count') && !lowerQuery.includes('how many');
  
  // Data table detection
  const tableKeywords = ['table', 'export', 'detailed', 'breakdown', 'all data'];
  const needsDataTable = tableKeywords.some(keyword => lowerQuery.includes(keyword)) || 
                         lowerQuery.includes('show all') || lowerQuery.includes('list all');
  
  // Extract potential company mentions (basic implementation)
  const companyMentions: string[] = [];
  const commonCompanyTerms = ['bayzat', 'netsuite', 'oracle', 'sap', 'microsoft'];
  commonCompanyTerms.forEach(term => {
    if (lowerQuery.includes(term)) {
      companyMentions.push(term);
    }
  });
  
  return {
    needsVisualization,
    needsCompanyCards,
    needsDataTable,
    chartType,
    companyMentions
  };
}

// Enhanced company data fetching with logo and detailed info
async function fetchCompaniesWithDetails(filters: any, limit = 20): Promise<any[]> {
  const { data, error } = await supabase
    .from('companies2')
    .select(`
      id,
      company_name,
      industry,
      employee_count,
      website_url,
      logo_url,
      bayzat_relationship,
      founded_year,
      description,
      tagline,
      ai_analysis,
      headquarter
    `)
    .limit(limit);
  
  if (error) throw error;
  
  // Enhance with automation scores and other computed fields
  return data?.map(company => ({
    ...company,
    has_erp: company.ai_analysis?.systems?.erp || false,
    has_hris: company.ai_analysis?.systems?.hris || false,
    has_accounting: company.ai_analysis?.systems?.accounting || false,
    has_payroll: company.ai_analysis?.systems?.payroll || false,
    automation_overall: company.ai_analysis?.automation_scores?.overall || 0,
    automation_hr: company.ai_analysis?.automation_scores?.hr || 0,
    automation_finance: company.ai_analysis?.automation_scores?.finance || 0,
    location: company.headquarter?.city || 'Unknown'
  })) || [];
}

// Generate chart data based on query intent
function generateChartData(companies: any[], chartType: string): any {
  switch (chartType) {
    case 'pie':
      // Industry distribution
      const industryCount = companies.reduce((acc, company) => {
        const industry = company.industry || 'Unknown';
        acc[industry] = (acc[industry] || 0) + 1;
        return acc;
      }, {});
      
      return {
        type: 'pie',
        data: Object.entries(industryCount).map(([name, value]) => ({ name, value })),
        title: 'Companies by Industry'
      };
      
    case 'bar':
      // Employee count ranges
      const ranges = companies.reduce((acc, company) => {
        const count = company.employee_count || 0;
        let range;
        if (count < 50) range = '1-49';
        else if (count < 200) range = '50-199';
        else if (count < 500) range = '200-499';
        else if (count < 1000) range = '500-999';
        else range = '1000+';
        
        acc[range] = (acc[range] || 0) + 1;
        return acc;
      }, {});
      
      return {
        type: 'bar',
        data: Object.entries(ranges).map(([range, count]) => ({ range, count })),
        title: 'Companies by Employee Count'
      };
      
    case 'scatter':
      // Automation vs Employee count
      return {
        type: 'scatter',
        data: companies.map(company => ({
          x: company.employee_count || 0,
          y: company.automation_overall || 0,
          name: company.company_name
        })),
        title: 'Automation Score vs Employee Count'
      };
      
    default:
      return null;
  }
}

// Generate smart action suggestions based on context
function generateSuggestedActions(companies: any[], query: string): SuggestedAction[] {
  const actions: SuggestedAction[] = [];
  
  if (companies.length > 0) {
    // Industry-based suggestions
    const industries = [...new Set(companies.map(c => c.industry).filter(Boolean))];
    if (industries.length > 1) {
      actions.push({
        label: `Compare ${industries[0]} vs ${industries[1]} companies`,
        query: `Compare automation scores between ${industries[0]} and ${industries[1]} companies`,
        type: 'query'
      });
    }
    
    // Size-based suggestions
    const hasLargeCompanies = companies.some(c => (c.employee_count || 0) > 500);
    const hasSmallCompanies = companies.some(c => (c.employee_count || 0) < 100);
    
    if (hasLargeCompanies && hasSmallCompanies) {
      actions.push({
        label: 'Compare large vs small companies',
        query: 'Compare automation levels between companies with 500+ employees vs under 100 employees',
        type: 'query'
      });
    }
    
    // System-based suggestions
    const lowAutomation = companies.filter(c => (c.automation_overall || 0) < 30);
    if (lowAutomation.length > 0) {
      actions.push({
        label: 'Find prospects with low automation',
        query: 'Show companies with automation scores below 30%',
        type: 'filter'
      });
    }
    
    // Employee suggestions
    if (companies.length <= 5) {
      actions.push({
        label: 'Find key employees at these companies',
        query: `Find HR managers and decision makers at ${companies.slice(0, 3).map(c => c.company_name).join(', ')}`,
        type: 'query'
      });
    }
  }
  
  // General suggestions
  actions.push(
    {
      label: 'Show automation trends by industry',
      query: 'Create a chart showing automation scores by industry',
      type: 'query'
    },
    {
      label: 'Find rapidly growing companies',
      query: 'Show companies founded after 2015 with 50+ employees',
      type: 'filter'
    }
  );
  
  return actions.slice(0, 4); // Limit to 4 suggestions
}

// Enhanced data query execution with rich response generation
async function executeEnhancedDataQuery(query: string): Promise<{ toolResults: ToolResult[], response: EnhancedChatResponse }> {
  const startTime = Date.now();
  const intent = analyzeQueryIntent(query);
  const toolResults: ToolResult[] = [];
  const sections: ContentSection[] = [];
  
  try {
    console.log('Enhanced query analysis:', intent);
    
    // Fetch relevant data based on query
    const companies = await fetchCompaniesWithDetails({}, intent.needsDataTable ? 50 : 20);
    
    toolResults.push({
      tool: 'enhanced_company_search',
      success: true,
      data: companies,
      execution_time_ms: Date.now() - startTime
    });
    
    let message = '';
    
    // Generate company cards if requested
    if (intent.needsCompanyCards && companies.length > 0) {
      sections.push({
        type: 'company-cards',
        data: companies.slice(0, 8), // Limit to 8 cards for UI
        metadata: { total: companies.length }
      });
      message += `Found ${companies.length} companies. Here are the top matches:\n\n`;
    }
    
    // Generate data table if requested
    if (intent.needsDataTable) {
      sections.push({
        type: 'data-table',
        data: companies,
        metadata: {
          columns: ['company_name', 'industry', 'employee_count', 'automation_overall', 'bayzat_relationship'],
          exportable: true
        }
      });
      message += `Detailed data table with ${companies.length} companies:\n\n`;
    }
    
    // Generate chart if visualization is requested
    if (intent.needsVisualization && intent.chartType) {
      const chartData = generateChartData(companies, intent.chartType);
      if (chartData) {
        sections.push({
          type: 'chart',
          data: chartData,
          metadata: { exportable: true }
        });
        message += `${chartData.title} visualization:\n\n`;
      }
    }
    
    // Add text content if no rich content was generated
    if (sections.length === 0) {
      if (companies.length > 0) {
        message = `I found ${companies.length} companies matching your criteria:\n\n`;
        companies.slice(0, 5).forEach(company => {
          message += `• **${company.company_name}** (${company.industry || 'Unknown industry'})\n`;
          message += `  - ${company.employee_count || 'Unknown'} employees\n`;
          message += `  - Automation score: ${company.automation_overall || 0}%\n\n`;
        });
        
        if (companies.length > 5) {
          message += `... and ${companies.length - 5} more companies.`;
        }
      } else {
        message = "I couldn't find any companies matching your criteria. Try adjusting your search parameters.";
      }
    }
    
    // Generate suggested actions
    const suggestedActions = generateSuggestedActions(companies, query);
    
    const response: EnhancedChatResponse = {
      message,
      content_type: sections.length > 0 ? 'mixed' : 'text',
      sections,
      tool_results: toolResults,
      suggested_actions: suggestedActions
    };
    
    return { toolResults, response };
    
  } catch (error) {
    console.error('Enhanced query execution error:', error);
    toolResults.push({
      tool: 'enhanced_data_query',
      success: false,
      error: error.message,
      execution_time_ms: Date.now() - startTime
    });
    
    const response: EnhancedChatResponse = {
      message: 'I encountered an error processing your request. Please try rephrasing your question.',
      content_type: 'text',
      sections: [],
      tool_results: toolResults
    };
    
    return { toolResults, response };
  }
}

// Enhanced AI response generation
async function generateEnhancedAIResponse(messages: ChatMessage[], enhancedResponse: EnhancedChatResponse): Promise<string> {
  if (!openAIApiKey) {
    return enhancedResponse.message || "I'm sorry, but I need an OpenAI API key to generate intelligent responses.";
  }
  
  try {
    // Prepare context with enhanced data
    let systemMessage = `You are an AI data assistant for Bayzat, specialized in helping analyze company and employee data. 
    You have access to a database of companies and their employee profiles. 
    Provide helpful, accurate insights based on the data provided.
    
    When presenting data, format it clearly and highlight key insights.
    Focus on actionable business intelligence and opportunities.
    
    The system has already prepared rich content sections for the user including:
    ${enhancedResponse.sections.map(s => `- ${s.type}: ${JSON.stringify(s.metadata || {})}`).join('\n')}`;
    
    if (enhancedResponse.tool_results && enhancedResponse.tool_results.length > 0) {
      systemMessage += `\n\nData context:\n`;
      enhancedResponse.tool_results.forEach(result => {
        if (result.success && result.data) {
          systemMessage += `\n${result.tool} (${result.execution_time_ms}ms):\n`;
          if (Array.isArray(result.data)) {
            systemMessage += `Found ${result.data.length} records\n`;
            // Include sample data for context
            if (result.data.length > 0) {
              systemMessage += `Sample: ${JSON.stringify(result.data[0], null, 2)}\n`;
            }
          } else {
            systemMessage += `${JSON.stringify(result.data, null, 2)}\n`;
          }
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
    return data.choices[0]?.message?.content || enhancedResponse.message;
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    return enhancedResponse.message || `I encountered an error while generating a response: ${error.message}`;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('Enhanced chat interface request received');
    
    const { messages, stream, user_id }: ChatRequest = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Messages array is required');
    }
    
    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== 'user') {
      throw new Error('Latest message must be from user');
    }
    
    console.log('Processing enhanced user query:', latestMessage.content);
    
    // Execute enhanced data processing
    const { toolResults, response: enhancedResponse } = await executeEnhancedDataQuery(latestMessage.content);
    
    // Generate AI response with enhanced context
    const aiResponse = await generateEnhancedAIResponse(messages, enhancedResponse);
    
    // Create final response structure
    const finalResponse = {
      success: true,
      message: aiResponse,
      content_type: enhancedResponse.content_type,
      sections: enhancedResponse.sections,
      tool_results: toolResults.filter(r => r.success && r.data),
      suggested_actions: enhancedResponse.suggested_actions
    };
    
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
      console.error('Failed to log enhanced query:', logError);
    }
    
    console.log('Sending enhanced response with', enhancedResponse.sections.length, 'rich sections');
    
    return new Response(JSON.stringify(finalResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in enhanced chat-interface function:', error);
    
    const errorResponse = {
      success: false,
      error: error.message,
      message: 'I apologize, but I encountered an error processing your request. Please try again.',
      content_type: 'text',
      sections: [],
      tool_results: []
    };
    
    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
