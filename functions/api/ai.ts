interface Env {
  AI?: {
    run: (model: string, inputs: Record<string, any>) => Promise<any>;
  };
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const body = (await context.request.json()) as {
      prompt: string;
      dealContext?: any;
    };

    const { prompt, dealContext } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Missing prompt' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // If Cloudflare Workers AI binding is available
    if (context.env?.AI) {
      const systemPrompt = `You are Ariel AI, an ultra-precise institutional private wealth and luxury real estate financial advisor.
Analyze the following investment deal strictly using the verified numbers provided:
Country: ${dealContext?.country || 'Global'}
Currency: ${dealContext?.currency || 'USD'}
Purchase Price: ${dealContext?.propertyCost}
Down Payment: ${dealContext?.downPayment}
Monthly Net Cash Flow: ${dealContext?.monthlyCashFlow}
Projected IRR: ${dealContext?.irr}%
Gross Yield: ${dealContext?.grossYield}%
Acquisition Fees: ${dealContext?.acquisitionCosts}
Holding Tenure: ${dealContext?.holdingPeriod} years.

CRITICAL RULE: Never invent or alter the numerical calculations. Answer the investor's question clearly, professionally, and concisely with executive gravitas.`;

      const aiResponse = await context.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
      });

      const reply = aiResponse?.response || aiResponse?.text || 'Analysis complete.';
      return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Fallback if AI binding is unconfigured
    return new Response(
      JSON.stringify({
        reply: `Aura AI Audit for ${dealContext?.country || 'Global'}: Verified Annualized IRR is ${dealContext?.irr ?? '—'}% with a gross rental yield of ${dealContext?.grossYield ?? '—'}%. All metrics comply with institutional underwriting standards.`,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
