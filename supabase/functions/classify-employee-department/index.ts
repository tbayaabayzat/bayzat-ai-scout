
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DEPARTMENTS = [
  'Engineering',
  'IT',
  'Sales', 
  'Marketing',
  'Human Resources',
  'Finance & Accounting',
  'Operations',
  'Customer Success',
  'Product Management',
  'Executive',
  'Other'
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobTitle } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a department classification expert. Given a job title, classify it into one of these departments: ${DEPARTMENTS.join(', ')}. 
            
            Guidelines:
            - Engineering: Software engineers, developers, architects, DevOps
            - IT: System administrators, IT support, infrastructure, security
            - Sales: Account executives, sales reps, business development
            - Marketing: Marketing managers, content creators, growth, digital marketing
            - Human Resources: HR managers, recruiters, people operations
            - Finance & Accounting: Finance managers, accountants, controllers, analysts
            - Operations: Operations managers, logistics, supply chain, general operations
            - Customer Success: Customer success managers, support, account managers
            - Product Management: Product managers, product owners, UX/UI designers
            - Executive: C-level, VPs, directors, founders
            - Other: Anything that doesn't clearly fit the above
            
            Return only the department name, nothing else.`
          },
          {
            role: 'user',
            content: `Classify this job title: "${jobTitle}"`
          }
        ],
        temperature: 0.1,
        max_tokens: 20
      }),
    });

    const data = await response.json();
    const department = data.choices[0].message.content.trim();

    // Validate the response is one of our departments
    const validDepartment = DEPARTMENTS.includes(department) ? department : 'Other';

    return new Response(JSON.stringify({ department: validDepartment }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in classify-employee-department function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
