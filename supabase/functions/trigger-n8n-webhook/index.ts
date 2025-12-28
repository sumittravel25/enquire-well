import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.json();
    
    const webhookPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      timeline: formData.timeline,
      financing: formData.financing,
      purpose: formData.purpose,
      decision_maker: formData.decision_maker,
      activity: formData.activity,
      budget: formData.budget,
      site_visit: formData.site_visit,
      submitted_at: new Date().toISOString(),
    };

    console.log('Sending to n8n webhook:', webhookPayload);

    const response = await fetch('https://sumeettz.app.n8n.cloud/webhook-test/real-estate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    const responseText = await response.text();
    console.log('n8n webhook response:', response.status, responseText);

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook triggered successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error triggering n8n webhook:', error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});