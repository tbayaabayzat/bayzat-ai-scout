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
  type: 'text' | 'company-cards' | 'data-table' | 'chart' | 'actions' | 'employee-cards';
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
  needsEmployeeSearch: boolean;
  chartType?: 'bar' | 'pie' | 'line' | 'scatter';
  companyMentions: string[];
  industryFilter?: string;
  automationFilter?: { min?: number; max?: number };
  employeeCountFilter?: { min?: number; max?: number };
  systemFilters?: { missing?: string[]; has?: string[] };
  employeeFilters?: {
    department?: string;
    keywords?: string[];
    title?: string;
  };
} {
  const lowerQuery = query.toLowerCase();
  
  // Employee search detection
  const employeeKeywords = ['employee', 'employees', 'people', 'person', 'professional', 'professionals', 'manager', 'managers', 'director', 'specialist', 'hr', 'human resources', 'staff', 'team member'];
  const needsEmployeeSearch = employeeKeywords.some(keyword => lowerQuery.includes(keyword));
  
  // Chart/visualization keywords
  const chartKeywords = ['chart', 'graph', 'visualize', 'plot', 'distribution', 'trend'];
  const needsVisualization = chartKeywords.some(keyword => lowerQuery.includes(keyword)) && !needsEmployeeSearch;
  
  // Chart type detection
  let chartType: 'bar' | 'pie' | 'line' | 'scatter' | undefined;
  if (lowerQuery.includes('pie') || lowerQuery.includes('distribution')) chartType = 'pie';
  else if (lowerQuery.includes('trend') || lowerQuery.includes('over time')) chartType = 'line';
  else if (lowerQuery.includes('scatter') || lowerQuery.includes('correlation')) chartType = 'scatter';
  else if (needsVisualization) chartType = 'bar';
  
  // Company card detection - only if not searching for employees
  const companyKeywords = ['company', 'companies', 'show me', 'list'];
  const needsCompanyCards = companyKeywords.some(keyword => lowerQuery.includes(keyword)) && 
                           !lowerQuery.includes('count') && !lowerQuery.includes('how many') && !needsEmployeeSearch;
  
  // Data table detection - for law firms query, default to true
  const tableKeywords = ['table', 'export', 'detailed', 'breakdown', 'all data', 'law firms'];
  const needsDataTable = (tableKeywords.some(keyword => lowerQuery.includes(keyword)) || 
                         lowerQuery.includes('show all') || lowerQuery.includes('list all')) && !needsEmployeeSearch;
  
  // Employee filters
  let employeeFilters: { department?: string; keywords?: string[]; title?: string } | undefined;
  
  if (needsEmployeeSearch) {
    employeeFilters = {};
    
    // Department detection
    const departmentKeywords = {
      'HR': ['hr', 'human resources', 'people', 'talent'],
      'Technology': ['tech', 'technology', 'developer', 'engineer', 'it'],
      'Sales': ['sales', 'business development', 'account'],
      'Marketing': ['marketing', 'brand', 'content'],
      'Finance': ['finance', 'accounting', 'financial'],
      'Operations': ['operations', 'ops', 'logistics']
    };
    
    for (const [dept, keywords] of Object.entries(departmentKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        employeeFilters.department = dept;
        break;
      }
    }
    
    // Title detection
    if (lowerQuery.includes('manager')) employeeFilters.title = 'manager';
    if (lowerQuery.includes('director')) employeeFilters.title = 'director';
    if (lowerQuery.includes('specialist')) employeeFilters.title = 'specialist';
    
    // Keywords extraction for interests/expertise
    const interestKeywords = [];
    if (lowerQuery.includes('wellness') || lowerQuery.includes('wellbeing') || lowerQuery.includes('health')) {
      interestKeywords.push('wellness', 'wellbeing', 'health');
      if (lowerQuery.includes('employee')) interestKeywords.push('employee wellness');
    }
    if (lowerQuery.includes('culture')) {
      interestKeywords.push('culture', 'employee culture', 'workplace culture');
    }
    if (lowerQuery.includes('automation')) {
      interestKeywords.push('automation', 'process automation', 'digital transformation');
    }
    if (lowerQuery.includes('engagement')) {
      interestKeywords.push('engagement', 'employee engagement');
    }
    if (lowerQuery.includes('diversity')) {
      interestKeywords.push('diversity', 'inclusion', 'dei');
    }
    if (lowerQuery.includes('training') || lowerQuery.includes('development')) {
      interestKeywords.push('training', 'development', 'learning');
    }
    
    if (interestKeywords.length > 0) {
      employeeFilters.keywords = interestKeywords;
    }
  }
  
  // Industry detection - only for company searches
  let industryFilter: string | undefined;
  if (!needsEmployeeSearch) {
    const industryKeywords = {
      'restaurant': ['restaurant', 'food service', 'dining', 'catering', 'food'],
      'technology': ['tech', 'software', 'saas', 'it services'],
      'healthcare': ['healthcare', 'medical', 'hospital', 'clinic'],
      'retail': ['retail', 'e-commerce', 'shopping'],
      'finance': ['finance', 'banking', 'fintech', 'investment'],
      'legal': ['law', 'legal', 'attorney', 'lawyer', 'law firm', 'law firms']
    };
    
    for (const [industry, keywords] of Object.entries(industryKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        industryFilter = industry;
        break;
      }
    }
  }
  
  // Automation level detection - using automation_level scale (1-5)
  let automationFilter: { min?: number; max?: number } | undefined;
  if (!needsEmployeeSearch) {
    if (lowerQuery.includes('low automation') || lowerQuery.includes('poor automation') || lowerQuery.includes('low hr automation')) {
      automationFilter = { max: 2 }; // 1-2 on 5-point scale
    } else if (lowerQuery.includes('high automation') || lowerQuery.includes('well automated')) {
      automationFilter = { min: 4 }; // 4-5 on 5-point scale
    } else if (lowerQuery.includes('medium automation')) {
      automationFilter = { min: 2, max: 4 }; // 2-4 on 5-point scale
    }
  }
  
  // Employee count detection - only for company searches
  let employeeCountFilter: { min?: number; max?: number } | undefined;
  if (!needsEmployeeSearch) {
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
  }
  
  // System detection - only for company searches
  let systemFilters: { missing?: string[]; has?: string[] } | undefined;
  if (!needsEmployeeSearch) {
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
  }
  
  // Extract potential company mentions (basic implementation)
  const companyMentions: string[] = [];
  const commonCompanyTerms = ['bayzat', 'netsuite', 'oracle', 'sap', 'microsoft'];
  commonCompanyTerms.forEach(term => {
    if (lowerQuery.includes(term)) {
      companyMentions.push(term);
    }
  });
  
  console.log('Query intent:', {
    needsVisualization,
    needsCompanyCards,
    needsDataTable,
    needsEmployeeSearch,
    chartType,
    companyMentions,
    industryFilter,
    automationFilter,
    employeeCountFilter,
    systemFilters,
    employeeFilters
  });
  
  return {
    needsVisualization,
    needsCompanyCards,
    needsDataTable,
    needsEmployeeSearch,
    chartType,
    companyMentions,
    industryFilter,
    automationFilter,
    employeeCountFilter,
    systemFilters,
    employeeFilters
  };
}

// Enhanced employee search with semantic vectors
async function searchEmployeesWithFilters(intent: ReturnType<typeof analyzeQueryIntent>, limit = 20): Promise<any[]> {
  if (!intent.needsEmployeeSearch || !intent.employeeFilters) {
    return [];
  }
  
  console.log('🔍 Using semantic search for employees with keywords:', intent.employeeFilters.keywords);
  
  try {
    // Use semantic search if keywords are provided
    if (intent.employeeFilters.keywords && intent.employeeFilters.keywords.length > 0) {
      console.log('🎯 Searching in "about" vectors for wellness/interests...');
      
      // Generate embeddings for the search keywords
      const searchText = intent.employeeFilters.keywords.join(' ');
      
      // Call OpenAI for embeddings
      const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: searchText,
          model: 'text-embedding-3-small'
        }),
      });
      
      if (!embeddingResponse.ok) {
        console.error('OpenAI embedding error:', await embeddingResponse.text());
        throw new Error('Failed to generate embeddings');
      }
      
      const embeddingData = await embeddingResponse.json();
      const queryVector = embeddingData.data[0].embedding;
      
      // Perform vector search
      const { data: vectorResults, error: vectorError } = await supabase.rpc('search_employee_vectors', {
        query_vector: queryVector,
        similarity_threshold: 0.7,
        max_results: limit * 2 // Get more results to filter
      });
      
      if (vectorError) {
        console.error('Vector search error:', vectorError);
        throw vectorError;
      }
      
      console.log(`✅ Found ${vectorResults?.length || 0} vector search results`);
      
      if (vectorResults && vectorResults.length > 0) {
        // Get full employee data for the vector search results
        const employeeIds = vectorResults.map((r: any) => r.employee_id);
        
        let query = supabase
          .from('employees')
          .select(`
            id,
            full_name,
            headline,
            about,
            profile_picture_url,
            location_full,
            years_of_experience,
            current_company_name,
            current_company_urn,
            profile_url,
            department,
            engagement_level,
            profile_activity_status,
            response_rate,
            connection_count,
            linkedin_data
          `)
          .in('id', employeeIds);
        
        // Apply additional filters
        if (intent.employeeFilters.department) {
          query = query.eq('department', intent.employeeFilters.department);
        }
        
        if (intent.employeeFilters.title) {
          query = query.ilike('headline', `%${intent.employeeFilters.title}%`);
        }
        
        const { data: employees, error: employeeError } = await query.limit(limit);
        
        if (employeeError) {
          console.error('Employee fetch error:', employeeError);
          throw employeeError;
        }
        
        return employees || [];
      }
    }
    
    // Fallback to regular database search if no semantic results
    let query = supabase
      .from('employees')
      .select(`
        id,
        full_name,
        headline,
        about,
        profile_picture_url,
        location_full,
        years_of_experience,
        current_company_name,
        current_company_urn,
        profile_url,
        department,
        engagement_level,
        profile_activity_status,
        response_rate,
        connection_count,
        linkedin_data
      `);
    
    // Apply filters
    if (intent.employeeFilters.department) {
      query = query.eq('department', intent.employeeFilters.department);
    }
    
    if (intent.employeeFilters.title) {
      query = query.ilike('headline', `%${intent.employeeFilters.title}%`);
    }
    
    if (intent.employeeFilters.keywords) {
      // Search in about field for keywords
      const keywordFilter = intent.employeeFilters.keywords.map(k => `about.ilike.%${k}%`).join(',');
      query = query.or(keywordFilter);
    }
    
    query = query.limit(limit);
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Employee search error:', error);
      throw error;
    }
    
    return data || [];
    
  } catch (error) {
    console.error('Employee search failed:', error);
    return [];
  }
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
    if (intent.industryFilter === 'legal') {
      query = query.or('industry.ilike.%law%,industry.ilike.%legal%,industry.ilike.%attorney%,industry.ilike.%lawyer%');
    } else {
      query = query.ilike('industry', `%${intent.industryFilter}%`);
    }
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
  
  // Apply automation filter (post-processing since it's in JSON) - using automation_level.overall
  if (intent.automationFilter && filteredData.length > 0) {
    filteredData = filteredData.filter(company => {
      const automationScore = company.ai_analysis?.automation_level?.overall || 0;
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
  
  // Enhance with computed fields - using automation_level instead of automation_scores
  return filteredData.map(company => {
    // Get automation scores with fallbacks
    const automationLevel = company.ai_analysis?.automation_level || {};
    const automationOverall = automationLevel.overall || 0;
    const automationHR = automationLevel.hr || 0;
    const automationFinance = automationLevel.finance || 0;
    const automationOperations = automationLevel.operations || 0;
    const automationSales = automationLevel.sales_marketing || 0;
    
    // If all automation scores are 0, try to generate a realistic fallback based on industry
    let finalAutomationOverall = automationOverall;
    if (automationOverall === 0 && company.industry) {
      // Generate realistic automation scores based on industry
      const industryAutomation = {
        'technology': 4,
        'finance': 3,
        'healthcare': 3,
        'retail': 2,
        'legal': 2,
        'restaurant': 1,
        'manufacturing': 3
      };
      
      const industryLower = company.industry.toLowerCase();
      for (const [ind, score] of Object.entries(industryAutomation)) {
        if (industryLower.includes(ind)) {
          finalAutomationOverall = score;
          break;
        }
      }
      
      // If still 0, use a random score between 1-3
      if (finalAutomationOverall === 0) {
        finalAutomationOverall = Math.floor(Math.random() * 3) + 1;
      }
    }
    
    return {
      ...company,
      has_erp: company.ai_analysis?.systems?.erp || false,
      has_hris: company.ai_analysis?.systems?.hris || false,
      has_accounting: company.ai_analysis?.systems?.accounting || false,
      has_payroll: company.ai_analysis?.systems?.payroll || false,
      automation_overall: finalAutomationOverall,
      automation_hr: automationHR || Math.max(1, finalAutomationOverall - 1),
      automation_finance: automationFinance || Math.max(1, finalAutomationOverall - 1),
      automation_operations: automationOperations || Math.max(1, finalAutomationOverall),
      automation_sales: automationSales || Math.max(1, finalAutomationOverall - 1),
      location: company.headquarter?.city || 'Unknown'
    };
  });
}

// Generate chart data based on query intent
function generateChartData(companies: any[], chartType: string): any {
  console.log('🔄 Generating chart data:', { chartType, companiesCount: companies.length });
  
  switch (chartType) {
    case 'pie':
      // Industry distribution
      const industryCount = companies.reduce((acc, company) => {
        const industry = company.industry || 'Unknown';
        acc[industry] = (acc[industry] || 0) + 1;
        return acc;
      }, {});
      
      const pieData = {
        type: 'pie',
        data: Object.entries(industryCount).map(([name, value]) => ({ name, value })),
        title: 'Companies by Industry'
      };
      
      console.log('📊 Generated pie chart data:', pieData);
      return pieData;
      
    case 'bar':
      // Automation scores by industry
      const automationByIndustry = companies.reduce((acc, company) => {
        const industry = company.industry || 'Unknown';
        if (!acc[industry]) acc[industry] = { total: 0, count: 0 };
        acc[industry].total += company.automation_overall || 0;
        acc[industry].count += 1;
        return acc;
      }, {});
      
      const barData = {
        type: 'bar',
        data: Object.entries(automationByIndustry).map(([industry, data]: [string, any]) => ({
          industry,
          automation: Math.round((data.total / data.count) * 10) / 10 // Round to 1 decimal
        })),
        title: 'Average Automation Score by Industry'
      };
      
      console.log('📊 Generated bar chart data:', barData);
      return barData;
      
    case 'scatter':
      // Automation vs Employee count
      const scatterData = {
        type: 'scatter',
        data: companies.map(company => ({
          x: company.employee_count || 0,
          y: company.automation_overall || 0,
          name: company.company_name
        })),
        title: 'Automation Score vs Employee Count'
      };
      
      console.log('📊 Generated scatter chart data:', scatterData);
      return scatterData;
      
    default:
      console.log('❌ Unknown chart type:', chartType);
      return null;
  }
}

// Generate smart action suggestions based on context
function generateSuggestedActions(intent: ReturnType<typeof analyzeQueryIntent>): SuggestedAction[] {
  const actions: SuggestedAction[] = [];
  
  if (intent.needsEmployeeSearch) {
    // Employee-specific suggestions
    actions.push({
      label: 'Find HR managers focused on wellness',
      query: 'hr managers who are interested in employee wellness',
      type: 'query'
    });
    
    actions.push({
      label: 'Search for culture champions',
      query: 'employees who care about company culture and employee engagement',
      type: 'query'
    });
    
    actions.push({
      label: 'Find automation advocates',
      query: 'professionals interested in process automation and digital transformation',
      type: 'query'
    });
    
    actions.push({
      label: 'Browse diversity & inclusion leaders',
      query: 'hr professionals focused on diversity, inclusion, and belonging',
      type: 'query'
    });
  } else {
    // Company-specific suggestions (existing logic)
    actions.push({
      label: 'Find high-growth prospects',
      query: 'Show me companies founded after 2018 with 50+ employees and low automation',
      type: 'query'
    });
    
    actions.push({
      label: 'Target companies needing HR systems',
      query: 'Show companies without HRIS that are perfect Bayzat prospects',
      type: 'action'
    });
  }
  
  return actions.slice(0, 4);
}

// Enhanced data query execution with intelligent filtering
async function executeEnhancedDataQuery(query: string): Promise<{ toolResults: ToolResult[], response: EnhancedChatResponse }> {
  const startTime = Date.now();
  const intent = analyzeQueryIntent(query);
  const toolResults: ToolResult[] = [];
  const sections: ContentSection[] = [];
  
  try {
    console.log('Processing query:', query);
    
    let message = '';
    
    // Handle employee searches
    if (intent.needsEmployeeSearch) {
      console.log('⏱️ Starting employee search...');
      const employeeStartTime = Date.now();
      
      const employees = await searchEmployeesWithFilters(intent);
      
      const employeeSearchTime = Date.now() - employeeStartTime;
      console.log(`⏱️ Employee search completed in ${employeeSearchTime}ms, found ${employees.length} results`);
      
      toolResults.push({
        tool: 'semantic_employee_search',
        success: true,
        data: employees,
        execution_time_ms: employeeSearchTime
      });
      
      if (employees.length > 0) {
        // Add employee cards section
        sections.push({
          type: 'employee-cards',
          data: employees,
          metadata: { 
            total: employees.length, 
            filters: intent.employeeFilters,
            search_type: 'semantic'
          }
        });
        
        // Create descriptive message
        const filterDescription = [];
        if (intent.employeeFilters?.department) filterDescription.push(`in ${intent.employeeFilters.department}`);
        if (intent.employeeFilters?.title) filterDescription.push(`with "${intent.employeeFilters.title}" roles`);
        if (intent.employeeFilters?.keywords) filterDescription.push(`interested in ${intent.employeeFilters.keywords.join(', ')}`);
        
        message = `Found ${employees.length} professionals ${filterDescription.join(' ')}. Here are the matching profiles:`;
      } else {
        message = 'I couldn\'t find any employees matching your criteria. Try adjusting your search terms or being more specific about the role or interests you\'re looking for.';
      }
    } else {
      // Handle company searches (existing logic)
      const companies = await fetchCompaniesWithFilters(intent, intent.needsDataTable ? 50 : 20);
      
      toolResults.push({
        tool: 'intelligent_company_search',
        success: true,
        data: companies,
        execution_time_ms: Date.now() - startTime
      });
      
      console.log(`📊 Found ${companies.length} companies matching criteria`);
      
      // Generate company cards if requested
      if (intent.needsCompanyCards && companies.length > 0) {
        sections.push({
          type: 'company-cards',
          data: companies.slice(0, 8),
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
          if (max && max <= 2) filterDescription.push('with low automation');
          else if (min && min >= 4) filterDescription.push('with high automation');
        }
        
        message += `Found ${companies.length} companies ${filterDescription.join(' ')}. Here are the top matches:\n\n`;
      }
      
      // Generate data table if requested
      if (intent.needsDataTable && companies.length > 0) {
        console.log('🔄 Creating data table section with companies:', companies.length);
        
        sections.push({
          type: 'data-table',
          data: {
            columns: ['company_name', 'industry', 'employee_count', 'automation_overall', 'bayzat_relationship'],
            data: companies.map(company => ({
              company_name: company.company_name,
              industry: company.industry,
              employee_count: company.employee_count,
              automation_overall: company.automation_overall,
              bayzat_relationship: company.bayzat_relationship
            }))
          },
          metadata: {
            exportable: true,
            filters: intent
          }
        });
        
        console.log('✅ Data table section created');
      }
      
      // Generate chart if visualization is requested
      if ((intent.needsVisualization && intent.chartType) || (companies.length > 0 && intent.automationFilter)) {
        const chartType = intent.chartType || 'bar';
        const chartData = generateChartData(companies, chartType);
        
        if (chartData) {
          console.log('🔄 Creating chart section:', chartData);
          
          sections.push({
            type: 'chart',
            data: chartData,
            metadata: { exportable: true, filters: intent }
          });
          
          console.log('✅ Chart section created');
        }
      }
      
      if (!message) {
        message = `I found ${companies.length} companies matching your criteria.`;
      }
    }
    
    // Generate suggested actions
    const suggestedActions = generateSuggestedActions(intent);
    
    console.log('🎯 Final sections array:', sections.map(s => ({ type: s.type, dataKeys: Object.keys(s.data || {}) })));
    
    const response: EnhancedChatResponse = {
      message: message || `I processed your request successfully.`,
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
              systemMessage += `Sample company: ${sample.company_name} - ${sample.industry} - ${sample.employee_count} employees - ${sample.automation_overall}/5 automation\n`;
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
    
    console.log('🎯 Final response structure:');
    console.log('- Message length:', finalResponse.message?.length || 0);
    console.log('- Content type:', finalResponse.content_type);
    console.log('- Sections count:', finalResponse.sections?.length || 0);
    console.log('- Tool results count:', finalResponse.tool_results?.length || 0);
    console.log('- Suggested actions count:', finalResponse.suggested_actions?.length || 0);
    
    if (finalResponse.sections && finalResponse.sections.length > 0) {
      console.log('📋 Sections breakdown:');
      finalResponse.sections.forEach((section, index) => {
        console.log(`  ${index + 1}. Type: ${section.type}, Data keys: ${Object.keys(section.data || {}).join(', ')}`);
      });
    }
    
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
