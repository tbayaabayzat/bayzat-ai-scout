
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Claude API key - will be set via environment variables
const claudeApiKey = Deno.env.get('ANTHROPIC_API_KEY');

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
  industryFilter?: string;
  automationFilter?: { min?: number; max?: number };
  employeeCountFilter?: { min?: number; max?: number };
  systemFilters?: { missing?: string[]; has?: string[] };
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
  
  // Industry detection
  let industryFilter: string | undefined;
  const industryKeywords = {
    'restaurant': ['restaurant', 'food service', 'dining', 'catering', 'food'],
    'technology': ['tech', 'software', 'saas', 'it services'],
    'healthcare': ['healthcare', 'medical', 'hospital', 'clinic'],
    'retail': ['retail', 'e-commerce', 'shopping'],
    'finance': ['finance', 'banking', 'fintech', 'investment']
  };
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      industryFilter = industry;
      break;
    }
  }
  
  // Automation level detection
  let automationFilter: { min?: number; max?: number } | undefined;
  if (lowerQuery.includes('low automation') || lowerQuery.includes('poor automation')) {
    automationFilter = { max: 30 };
  } else if (lowerQuery.includes('high automation') || lowerQuery.includes('well automated')) {
    automationFilter = { min: 70 };
  } else if (lowerQuery.includes('medium automation')) {
    automationFilter = { min: 30, max: 70 };
  }
  
  // Employee count detection
  let employeeCountFilter: { min?: number; max?: number } | undefined;
  const employeeMatch = lowerQuery.match(/(\d+)\s*(?:to|-)\s*(\d+)\s*employee/);
  if (employeeMatch) {
    const min = parseInt(employeeMatch[1]);
    const max = parseInt(employeeMatch[2]);
    employeeCountFilter = { min, max };
  } else if (lowerQuery.includes('small companies') || lowerQuery.includes('small business')) {
    employeeCountFilter = { max: 50 };
  } else if (lowerQuery.includes('large companies') || lowerQuery.includes('enterprise')) {
    employeeCountFilter = { min: 200 };
  }
  
  // System detection
  let systemFilters: { missing?: string[]; has?: string[] } | undefined;
  const missing: string[] = [];
  const has: string[] = [];
  
  if (lowerQuery.includes('no hr') || lowerQuery.includes('missing hr')) missing.push('hris');
  if (lowerQuery.includes('no erp') || lowerQuery.includes('missing erp')) missing.push('erp');
  if (lowerQuery.includes('using netsuite') || lowerQuery.includes('has netsuite')) has.push('netsuite');
  if (lowerQuery.includes('using sap') || lowerQuery.includes('has sap')) has.push('sap');
  
  if (missing.length > 0 || has.length > 0) {
    systemFilters = {};
    if (missing.length > 0) systemFilters.missing = missing;
    if (has.length > 0) systemFilters.has = has;
  }
  
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
    companyMentions,
    industryFilter,
    automationFilter,
    employeeCountFilter,
    systemFilters
  };
}

// Enhanced company data fetching with smart filtering
async function fetchCompaniesWithFilters(intent: ReturnType<typeof analyzeQueryIntent>, limit = 20): Promise<any[]> {
  let query = supabase
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
    `);
  
  // Apply industry filter
  if (intent.industryFilter) {
    query = query.ilike('industry', `%${intent.industryFilter}%`);
  }
  
  // Apply employee count filter
  if (intent.employeeCountFilter) {
    if (intent.employeeCountFilter.min) {
      query = query.gte('employee_count', intent.employeeCountFilter.min);
    }
    if (intent.employeeCountFilter.max) {
      query = query.lte('employee_count', intent.employeeCountFilter.max);
    }
  }
  
  query = query.limit(limit);
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  let filteredData = data || [];
  
  // Apply automation filter (post-processing since it's in JSON)
  if (intent.automationFilter && filteredData.length > 0) {
    filteredData = filteredData.filter(company => {
      const automationScore = company.ai_analysis?.automation_scores?.overall || 0;
      if (intent.automationFilter!.min && automationScore < intent.automationFilter!.min) return false;
      if (intent.automationFilter!.max && automationScore > intent.automationFilter!.max) return false;
      return true;
    });
  }
  
  // Apply system filters (post-processing since it's in JSON)
  if (intent.systemFilters && filteredData.length > 0) {
    filteredData = filteredData.filter(company => {
      const systems = company.ai_analysis?.systems || {};
      
      // Check missing systems
      if (intent.systemFilters!.missing) {
        for (const system of intent.systemFilters!.missing) {
          if (systems[system] === true) return false; // System exists, but we want missing
        }
      }
      
      // Check required systems
      if (intent.systemFilters!.has) {
        for (const system of intent.systemFilters!.has) {
          if (systems[system] !== true) return false; // System doesn't exist, but we need it
        }
      }
      
      return true;
    });
  }
  
  // Enhance with computed fields
  return filteredData.map(company => ({
    ...company,
    has_erp: company.ai_analysis?.systems?.erp || false,
    has_hris: company.ai_analysis?.systems?.hris || false,
    has_accounting: company.ai_analysis?.systems?.accounting || false,
    has_payroll: company.ai_analysis?.systems?.payroll || false,
    automation_overall: company.ai_analysis?.automation_scores?.overall || 0,
    automation_hr: company.ai_analysis?.automation_scores?.hr || 0,
    automation_finance: company.ai_analysis?.automation_scores?.finance || 0,
    location: company.headquarter?.city || 'Unknown'
  }));
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
      // Automation scores by industry
      const automationByIndustry = companies.reduce((acc, company) => {
        const industry = company.industry || 'Unknown';
        if (!acc[industry]) acc[industry] = { total: 0, count: 0 };
        acc[industry].total += company.automation_overall || 0;
        acc[industry].count += 1;
        return acc;
      }, {});
      
      return {
        type: 'bar',
        data: Object.entries(automationByIndustry).map(([industry, data]: [string, any]) => ({
          industry,
          automation: Math.round(data.total / data.count)
        })),
        title: 'Average Automation Score by Industry'
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
function generateSuggestedActions(companies: any[], query: string, intent: ReturnType<typeof analyzeQueryIntent>): SuggestedAction[] {
  const actions: SuggestedAction[] = [];
  
  if (companies.length > 0) {
    // Industry-specific suggestions
    if (intent.industryFilter === 'restaurant') {
      actions.push({
        label: 'Find restaurants with low HR automation',
        query: 'Show me restaurants with poor HR automation that need Bayzat services',
        type: 'query'
      });
      
      actions.push({
        label: 'Compare restaurant automation levels',
        query: 'Create a chart showing automation levels across different restaurant sizes',
        type: 'query'
      });
    }
    
    // Automation-based suggestions
    const lowAutomation = companies.filter(c => (c.automation_overall || 0) < 30);
    if (lowAutomation.length > 0) {
      actions.push({
        label: `Target ${lowAutomation.length} low-automation prospects`,
        query: 'Show detailed profiles of companies with automation scores below 30%',
        type: 'filter'
      });
    }
    
    // System-based suggestions
    const noHRIS = companies.filter(c => !c.has_hris);
    if (noHRIS.length > 0) {
      actions.push({
        label: `${noHRIS.length} companies need HR systems`,
        query: 'Show companies without HRIS that are perfect Bayzat prospects',
        type: 'action'
      });
    }
  }
  
  // General business development suggestions
  actions.push({
    label: 'Find high-growth prospects',
    query: 'Show me companies founded after 2018 with 50+ employees and low automation',
    type: 'query'
  });
  
  return actions.slice(0, 4); // Limit to 4 suggestions
}

// Enhanced data query execution with intelligent filtering
async function executeEnhancedDataQuery(query: string): Promise<{ toolResults: ToolResult[], response: EnhancedChatResponse }> {
  const startTime = Date.now();
  const intent = analyzeQueryIntent(query);
  const toolResults: ToolResult[] = [];
  const sections: ContentSection[] = [];
  
  try {
    console.log('🎯 Enhanced query analysis:', intent);
    
    // Fetch filtered data based on intelligent intent detection
    const companies = await fetchCompaniesWithFilters(intent, intent.needsDataTable ? 50 : 20);
    
    toolResults.push({
      tool: 'intelligent_company_search',
      success: true,
      data: companies,
      execution_time_ms: Date.now() - startTime
    });
    
    console.log(`📊 Found ${companies.length} companies matching criteria`);
    
    let message = '';
    
    // Generate company cards if requested
    if (intent.needsCompanyCards && companies.length > 0) {
      sections.push({
        type: 'company-cards',
        data: companies.slice(0, 8), // Limit to 8 cards for UI
        metadata: { total: companies.length, filters: intent }
      });
      
      const filterDescription = [];
      if (intent.industryFilter) filterDescription.push(`in ${intent.industryFilter}`);
      if (intent.employeeCountFilter) {
        const { min, max } = intent.employeeCountFilter;
        if (min && max) filterDescription.push(`with ${min}-${max} employees`);
        else if (min) filterDescription.push(`with ${min}+ employees`);
        else if (max) filterDescription.push(`with under ${max} employees`);
      }
      if (intent.automationFilter) {
        const { min, max } = intent.automationFilter;
        if (max && max <= 30) filterDescription.push('with low automation');
        else if (min && min >= 70) filterDescription.push('with high automation');
      }
      
      message += `Found ${companies.length} companies ${filterDescription.join(' ')}. Here are the top matches:\n\n`;
    }
    
    // Generate data table if requested
    if (intent.needsDataTable) {
      sections.push({
        type: 'data-table',
        data: companies,
        metadata: {
          columns: ['company_name', 'industry', 'employee_count', 'automation_overall', 'bayzat_relationship'],
          exportable: true,
          filters: intent
        }
      });
    }
    
    // Generate chart if visualization is requested
    if (intent.needsVisualization && intent.chartType) {
      const chartData = generateChartData(companies, intent.chartType);
      if (chartData) {
        sections.push({
          type: 'chart',
          data: chartData,
          metadata: { exportable: true, filters: intent }
        });
      }
    }
    
    // Generate suggested actions
    const suggestedActions = generateSuggestedActions(companies, query, intent);
    
    const response: EnhancedChatResponse = {
      message: message || `I found ${companies.length} companies matching your criteria.`,
      content_type: sections.length > 0 ? 'mixed' : 'text',
      sections,
      tool_results: toolResults,
      suggested_actions: suggestedActions
    };
    
    return { toolResults, response };
    
  } catch (error) {
    console.error('❌ Enhanced query execution error:', error);
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

// Enhanced AI response generation using Claude
async function generateEnhancedAIResponse(messages: ChatMessage[], enhancedResponse: EnhancedChatResponse): Promise<string> {
  if (!claudeApiKey) {
    console.log('⚠️ No Claude API key found, using fallback response');
    return enhancedResponse.message || "I'm sorry, but I need an Anthropic API key to generate intelligent responses.";
  }
  
  try {
    // Prepare system message for Claude
    let systemMessage = `You are an AI business intelligence assistant for Bayzat, a leading HR and payroll platform in the Middle East. You specialize in analyzing company data to identify sales prospects and business opportunities.

Your role is to help sales and business development teams by:
- Analyzing company automation levels and identifying gaps
- Finding prospects who need HR, payroll, or business management solutions
- Providing actionable business intelligence and market insights
- Highlighting opportunities for Bayzat's services

When analyzing data, focus on:
- Companies with low automation scores (potential prospects)
- Businesses missing key HR/payroll systems
- Industry-specific challenges and opportunities
- Growth patterns and market trends

The system has prepared rich content including:
${enhancedResponse.sections.map(s => `- ${s.type}: ${JSON.stringify(s.metadata || {})}`).join('\n')}`;
    
    if (enhancedResponse.tool_results && enhancedResponse.tool_results.length > 0) {
      systemMessage += `\n\nData context:\n`;
      enhancedResponse.tool_results.forEach(result => {
        if (result.success && result.data) {
          systemMessage += `\n${result.tool} (${result.execution_time_ms}ms):\n`;
          if (Array.isArray(result.data)) {
            systemMessage += `Found ${result.data.length} companies\n`;
            // Include sample data for context
            if (result.data.length > 0) {
              const sample = result.data[0];
              systemMessage += `Sample company: ${sample.company_name} - ${sample.industry} - ${sample.employee_count} employees - ${sample.automation_overall}% automation\n`;
            }
          }
        }
      });
    }
    
    // Prepare messages for Claude (exclude system messages from the array)
    const claudeMessages = messages
      .filter(msg => msg.role !== 'system')
      .slice(-5) // Keep last 5 messages for context
      .map(msg => ({
        role: msg.role,
        content: msg.content
      }));
    
    console.log('🤖 Calling Claude API with system message length:', systemMessage.length);
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeApiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: systemMessage,
        messages: claudeMessages
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Claude API response received');
    
    return data.content[0]?.text || enhancedResponse.message;
    
  } catch (error) {
    console.error('❌ Claude API error:', error);
    return enhancedResponse.message || `I encountered an error while generating a response: ${error.message}`;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log('🚀 Enhanced chat interface request received');
    
    const { messages, stream, user_id }: ChatRequest = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error('Messages array is required');
    }
    
    // Get the latest user message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role !== 'user') {
      throw new Error('Latest message must be from user');
    }
    
    console.log('📝 Processing user query:', latestMessage.content);
    
    // Execute enhanced data processing with intelligent filtering
    const { toolResults, response: enhancedResponse } = await executeEnhancedDataQuery(latestMessage.content);
    
    // Generate AI response with Claude and enhanced context
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
      console.error('⚠️ Failed to log query:', logError);
    }
    
    console.log('✅ Sending enhanced response with', enhancedResponse.sections.length, 'rich sections');
    
    return new Response(JSON.stringify(finalResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('❌ Error in enhanced chat-interface function:', error);
    
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
